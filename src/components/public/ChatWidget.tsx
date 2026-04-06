'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatCircle, X, PaperPlaneTilt, SpinnerGap } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Message {
  id: string;
  session_id: string;
  sender: 'visitor' | 'admin';
  body: string;
  created_at: string;
}

const SESSION_KEY = 'ges_chat_session_id';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [starting, setStarting] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const supabase = createClient();

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) setSessionId(saved);
  }, []);

  // Load messages + subscribe when session is set
  useEffect(() => {
    if (!sessionId) return;

    supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data as Message[]);
      });

    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${sessionId}` },
        (payload) => {
          const msg = payload.new as Message;
          setMessages((prev) => {
            if (prev.find((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          if (!open && msg.sender === 'admin') setUnread((u) => u + 1);
        }
      )
      .subscribe();

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); };
  }, [sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to bottom on new messages
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      setUnread(0);
    }
  }, [messages, open]);

  async function startSession() {
    setStarting(true);
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ status: 'open' })
      .select('id')
      .single();
    setStarting(false);
    if (error || !data) return;
    localStorage.setItem(SESSION_KEY, data.id);
    setSessionId(data.id);
  }

  async function sendMessage() {
    if (!input.trim() || sending) return;
    const body = input.trim();
    setInput('');

    if (!sessionId) {
      await startSession();
      return;
    }

    setSending(true);
    await supabase.from('chat_messages').insert({ session_id: sessionId, sender: 'visitor', body });
    setSending(false);
  }

  function handleOpen() {
    setOpen(true);
    setUnread(0);
    if (!sessionId) startSession();
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label="Open live chat"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {open ? (
          <X size={22} weight="bold" className="text-primary-foreground" />
        ) : (
          <ChatCircle size={26} weight="duotone" className="text-primary-foreground" />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex flex-col w-80 sm:w-96 h-[480px] rounded-2xl border border-neutral-200 bg-card shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3 shrink-0">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Live Support</p>
              <p className="text-[10px] text-white/50">Global Express Shipments</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg text-white/50 hover:text-white transition-colors cursor-pointer" aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
            {/* Welcome message */}
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-card border border-neutral-200 px-3 py-2 shadow-xs">
                <p className="text-sm text-neutral-700">Hi there! How can we help you today?</p>
                <p className="text-[10px] text-neutral-400 mt-1">Support Team</p>
              </div>
            </div>

            {starting && (
              <div className="flex justify-center">
                <SpinnerGap size={16} className="text-neutral-400 animate-spin" />
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 ${
                    msg.sender === 'visitor'
                      ? 'bg-primary rounded-tr-sm'
                      : 'bg-card border border-neutral-200 rounded-tl-sm shadow-xs'
                  }`}
                >
                  <p className={`text-sm ${msg.sender === 'visitor' ? 'text-primary-foreground' : 'text-neutral-700'}`}>{msg.body}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === 'visitor' ? 'text-primary-foreground/50' : 'text-neutral-400'}`}>
                    {new Date(msg.created_at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-neutral-200 bg-card px-3 py-3 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Type a message…"
              className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm text-foreground placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || sending}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary disabled:opacity-40 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {sending ? (
                <SpinnerGap size={16} weight="bold" className="text-primary-foreground animate-spin" />
              ) : (
                <PaperPlaneTilt size={16} weight="duotone" className="text-primary-foreground" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
