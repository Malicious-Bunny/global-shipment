'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChatCircle, Circle } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

interface Session {
  id: string;
  status: 'open' | 'closed';
  created_at: string;
  last_message?: string;
  last_at?: string;
  unread?: number;
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  async function loadSessions() {
    const { data: sessionRows } = await supabase
      .from('chat_sessions')
      .select('id, status, created_at')
      .order('created_at', { ascending: false });

    if (!sessionRows) { setLoading(false); return; }

    const enriched: Session[] = await Promise.all(
      sessionRows.map(async (s) => {
        const { data: msgs } = await supabase
          .from('chat_messages')
          .select('body, created_at')
          .eq('session_id', s.id)
          .order('created_at', { ascending: false })
          .limit(1);
        return {
          ...s,
          last_message: msgs?.[0]?.body ?? null,
          last_at: msgs?.[0]?.created_at ?? s.created_at,
        };
      })
    );

    setSessions(enriched);
    setLoading(false);
  }

  useEffect(() => {
    loadSessions();

    const channel = supabase
      .channel('admin-chat-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, () => loadSessions())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_sessions' }, () => loadSessions())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Live Chat</h1>
          <p className="text-sm text-neutral-500 mt-0.5">{sessions.filter(s => s.status === 'open').length} open conversation{sessions.filter(s => s.status === 'open').length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-neutral-200 animate-pulse" />)}
        </div>
      ) : sessions.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-background p-12 text-center">
          <ChatCircle size={36} className="mx-auto mb-3 text-neutral-300" weight="duotone" />
          <p className="text-sm text-neutral-500">No chat sessions yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => (
            <Link
              key={s.id}
              href={`/admin/chat/${s.id}`}
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-background px-5 py-4 shadow-xs hover:border-primary/40 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <ChatCircle size={20} weight="duotone" className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-foreground font-mono truncate">
                    #{s.id.slice(0, 8)}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    s.status === 'open' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    <Circle size={6} weight="fill" />
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 truncate">{s.last_message ?? 'No messages yet'}</p>
              </div>
              <time className="shrink-0 text-xs text-neutral-400">
                {new Date(s.last_at ?? s.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </time>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
