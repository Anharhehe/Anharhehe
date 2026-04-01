'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ── EmailJS credentials ────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_2t34r9k';
const EMAILJS_TEMPLATE_ID = 'template_z78t5zb';
const EMAILJS_PUBLIC_KEY  = 'yQCTfdBWHG2paWpGY';
// ──────────────────────────────────────────────────────────────────

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:    `${form.firstName} ${form.lastName}`,
          email:   form.email,
          subject: form.subject,
          message: form.message,
          time:    new Date().toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' }),
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-[#0d1117] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200';

  return (
    <section id="contact" className="py-28 bg-[#080d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">06. Contact</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white mb-4">Get In Touch</h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-[0.97rem]">
            Ready to collaborate? Let&apos;s discuss your next project!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── Left: Info ── */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Connect</h3>
              <p className="text-gray-400 text-[0.96rem] leading-7">
                I&apos;m always interested in new opportunities and challenging projects.
                Whether you&apos;re looking for a developer, have a question, or just want
                to connect, feel free to reach out!
              </p>
            </div>

            {/* Contact rows */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/20">
                  <svg className="w-4.5 h-4.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">Email</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=anharmunirse@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    anharmunirse@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/20">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">Phone</p>
                  <p className="text-gray-300 text-sm">+92 311 7791014</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-blue-600/15 border border-blue-500/20">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5 font-medium">Location</p>
                  <p className="text-gray-300 text-sm">Islamabad / Gujranwala, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-semibold text-white mb-4">Follow Me</p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/m-anhar-munir-b736252b9/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-blue-600/20 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://github.com/Anharhehe" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-200 hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/anharhehe/" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-200 hover:-translate-y-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="rounded-2xl bg-[#0d1117] border border-white/8 p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-white">First Name</label>
                  <input
                    type="text" name="firstName" required placeholder="first name"
                    value={form.firstName} onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-white">Last Name</label>
                  <input
                    type="text" name="lastName" required placeholder="last name"
                    value={form.lastName} onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-white">Email Address</label>
                <input
                  type="email" name="email" required placeholder="email@example.com"
                  value={form.email} onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-white">Subject</label>
                <input
                  type="text" name="subject" required placeholder="Project Collaboration"
                  value={form.subject} onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-white">Message</label>
                <textarea
                  name="message" required rows={5} placeholder="Tell me about your project..."
                  value={form.message} onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 cursor-pointer"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Feedback */}
              {status === 'success' && (
                <p className="text-center text-green-400 text-sm font-medium">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-400 text-sm font-medium">
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
