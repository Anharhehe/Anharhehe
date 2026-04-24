'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What are your main skills?',
  'Tell me about SightWise project',
  'What is your work experience?',
  'How can I contact you?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            "Hello! I'm Anhar's AI assistant. Ask me anything about his skills, projects, experience, or background.",
        },
      ]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, messages.length]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMessage: Message = { role: 'user', content: trimmed };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setError(null);
      setLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: updatedMessages.slice(1, -1), // exclude greeting + latest user msg
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to get a response. Please try again.');
        }

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply },
        ]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-6 right-24 z-[100] w-14 h-14 flex items-center justify-center rounded-full
          bg-gradient-to-br from-[#5b3fd4] to-[#2563eb] shadow-lg shadow-[#5b3fd4]/40 cursor-pointer
          transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#5b3fd4]/60
          group"
      >
        {open ? (
          /* X icon when open */
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* AI chat icon */
          <svg
            className="w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.53 1.1 4.82 2.9 6.48L4 22l4.78-1.55C10.1 20.8 11.03 21 12 21c5.52 0 10-4.03 10-9s-4.48-9-10-9z" />
            <circle cx="8.5" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none" />
          </svg>
        )}
      </button>

      {/* Chat Modal */}
      <div
        className={`fixed bottom-24 right-6 z-[99] w-[360px] flex flex-col
          bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl shadow-black/60
          transition-all duration-300 origin-bottom-right
          ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ maxHeight: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 text-gray-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white leading-none">AI Assistant</p>
            <p className="text-xs text-gray-500 mt-0.5">Ask about Anhar&apos;s work</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0" style={{ maxHeight: '320px' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                  <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-white text-gray-900 rounded-tr-sm font-medium'
                    : 'bg-white/5 border border-white/8 text-gray-300 rounded-tl-sm'
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center">
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions (shown only at start) */}
        {messages.length <= 1 && !loading && (
          <div className="px-4 pb-3 flex flex-col gap-1.5 flex-shrink-0">
            <p className="text-xs text-gray-600 font-medium uppercase tracking-wider mb-1">Suggested</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs text-gray-400 bg-white/4 border border-white/8 rounded-full px-3 py-1.5
                    hover:bg-white/8 hover:text-white hover:border-white/15 transition-all duration-200 cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-3 border-t border-white/10 flex-shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            disabled={loading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white
              placeholder:text-gray-600 outline-none focus:border-white/25 focus:bg-white/7
              transition-all duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white text-gray-900
              hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-200 cursor-pointer flex-shrink-0"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
