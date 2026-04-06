'use client';

import { useState, useEffect, useRef } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, PaperPlaneTilt, SpinnerGap, LockSimple } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

interface Message {
  id: string;
  session_id: string;
  sender: 'visitor' | 'admin';
  body: string;
  created_at: string;
}

interface Session {
  id: string;
  status: 'open' | 'closed';
  created_at: string;
}

export default function AdminChatConversation({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [closing, setClosing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.from('chat_sessions').select('*').eq('id', sessionId).single().then(({ data }) => {
      if (data) setSession(data as Session);
    });

    supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setMessages(data as Message[]); });

    const channel = supabase
      .channel(`admin-convo:${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          const msg = payload.new as Message;
          setMessages((prev) => prev.find((m) => m.id === msg.id) ? prev : [...prev, msg]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendReply() {
    if (!input.trim() || sending || session?.status === 'closed') return;
    const body = input.trim();
    setInput('');
    setSending(true);
    await supabase.from('chat_messages').insert({ session_id: sessionId, sender: 'admin', body });
    setSending(false);
  }

  async function closeSession() {
    setClosing(true);
    await supabase.from('chat_sessions').update({ status: 'closed' }).eq('id', sessionId);
    setSession((s) => s ? { ...s, status: 'closed' } : s);
    setClosing(false);
  }

  const isClosed = session?.status === 'closed';

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Link href="/admin/chat" className="p-2 rounded-lg text-neutral-400 hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold text-foreground font-mono">#{sessionId.slice(0, 8)}</h1>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
              isClosed ? 'bg-neutral-100 text-neutral-400' : 'bg-green-50 text-green-600'
            }`}>
              {session?.status ?? '…'}
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            Started {session ? new Date(session.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '…'}
          </p>
        </div>
        {!isClosed && (
          <button
            onClick={closeSession}
            disabled={closing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-500 hover:text-danger hover:border-danger/30 transition-colors cursor-pointer disabled:opacity-50"
          >
            <LockSimple size={13} />
            Close Chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-neutral-200 bg-background px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-sm text-neutral-400 py-8">No messages yet.</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[70%] rounded-2xl px-3 py-2 ${
                msg.sender === 'admin'
                  ? 'bg-primary rounded-tr-sm'
                  : 'bg-card border border-neutral-200 rounded-tl-sm shadow-xs'
              }`}
            >
              <p className={`text-sm ${msg.sender === 'admin' ? 'text-primary-foreground' : 'text-neutral-700'}`}>{msg.body}</p>
              <p className={`text-[10px] mt-1 ${msg.sender === 'admin' ? 'text-primary-foreground/50' : 'text-neutral-400'}`}>
                {msg.sender === 'admin' ? 'You' : 'Visitor'} ·{' '}
                {new Date(msg.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 pt-3 shrink-0">
        {isClosed ? (
          <div className="flex-1 rounded-xl border border-neutral-200 bg-muted px-4 py-3 text-sm text-neutral-400 text-center">
            This conversation is closed.
          </div>
        ) : (
          <>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
              placeholder="Reply to visitor…"
              className="flex-1 rounded-xl border border-neutral-200 bg-background px-4 py-3 text-sm text-foreground placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={sendReply}
              disabled={!input.trim() || sending}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary disabled:opacity-40 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {sending ? (
                <SpinnerGap size={18} weight="bold" className="text-primary-foreground animate-spin" />
              ) : (
                <PaperPlaneTilt size={18} weight="duotone" className="text-primary-foreground" />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
