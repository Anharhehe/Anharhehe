'use client';

import Image from 'next/image';
import { useRef } from 'react';

const SKILLS = [
  'AI & Machine Learning',
  'Deep Learning',
  'NLP',
  'Computer Vision',
  'Web Development',
  'Databases',
  'Authentication & Security',
  'Embedded Systems & IoT',
  'Data Science',
  'Testing',
  'Tools & Platforms',
  'Software Engineering',
];

// Duplicate for seamless infinite scroll
const TICKER_ITEMS = [...SKILLS, ...SKILLS];

export default function AboutSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const photoRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-28 bg-[#080d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">02. About Me</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Photo + Skills ticker ── */}
          <div className="flex flex-col gap-8">

            {/* Photo */}
            <div
              ref={photoRef}
              className="group relative w-full mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 cursor-pointer"
            >
              {/* Grayscale layer – fades out on hover */}
              <div className="absolute inset-0 z-10 bg-transparent transition-all duration-700 group-hover:opacity-0 [filter:grayscale(1)] pointer-events-none" />

              <Image
                src="/me.jpeg"
                alt="Anhar Munir"
                width={780}
                height={560}
                className="w-full object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0"
                style={{ aspectRatio: '4/5' }}
                priority
              />

              {/* Available badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d1117]/80 backdrop-blur-sm border border-white/10 text-sm font-medium text-gray-200 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Work
              </div>

              {/* Hover color reveal hint */}
              <div className="absolute inset-0 z-10 ring-2 ring-inset ring-blue-500/0 group-hover:ring-blue-500/30 rounded-2xl transition-all duration-700 pointer-events-none" />
            </div>

            {/* Two badge cards like in the reference */}

          </div>

          {/* ── Right: Bio + Info + Actions ── */}
          <div className="flex flex-col gap-8 pt-2">

            {/* Heading */}
            <div>
              <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
                Who am I?
              </p>
              <h2 className="text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Anhar <span className="text-blue-400">Munir</span>
              </h2>
              <p className="text-gray-400 text-[0.97rem] leading-7">
                Final-year BS Software Engineering student at FAST-NUCES, Islamabad (graduating 2026).
                I build production-ready systems — from AI-powered assistive technology with real-time
                edge deployment to deep learning medical imaging platforms. Experienced across full-stack
                web development, embedded AI, and applied ML engineering. Open to full-time software
                engineering roles.
              </p>
            </div>

            {/* Info rows */}
            <div className="flex flex-col gap-3">
              {/* Location */}
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                Islamabad / Gujranwala, Pakistan
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=anharmunirse@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  anharmunirse@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                +92 311 7791014
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/m-anhar-munir-b736252b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-blue-600/20 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/Anharhehe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/anharhehe/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-500/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* CTA button */}
            <div>
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2.5 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Get In Touch
              </button>
            </div>

            {/* Skills ticker */}
            <div className="w-full overflow-hidden rounded-xl border border-white/8 bg-white/3 py-3 relative">
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#080d1a] to-transparent z-10 pointer-events-none" />
              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#080d1a] to-transparent z-10 pointer-events-none" />

              <div className="flex gap-6 animate-ticker w-max">
                {TICKER_ITEMS.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── What I Bring to the Table ── */}
        <div className="mt-28 border-t border-white/5 pt-24">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-5xl font-extrabold text-white mb-4">What I Bring to the Table</h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-8" />
            <p className="text-gray-400 text-[0.97rem] leading-7 max-w-2xl mx-auto">
              As a passionate BS Software Engineering student at FAST-NUCES Islamabad, I specialize
              in building innovative solutions using modern technologies. From full-stack web
              applications to cross-platform mobile apps and AI-powered systems, I love turning ideas
              into reality.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 cursor-pointer">
            {[
              { value: '2+',  label: 'Internships' },
              { value: '15+', label: 'Projects' },
              { value: '2+',  label: 'Certificates' },
              { value: '15+', label: 'Technologies' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 rounded-2xl bg-[#0d1117] border border-white/8 hover:border-blue-500/30 hover:bg-[#0d1420] transition-all duration-300 group"
              >
                <span className="text-5xl font-extrabold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {value}
                </span>
                <span className="text-gray-400 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {['PyTorch', 'YOLOv8', 'Transfer Learning', 'TensorFlow Lite', 'CNNs', 'Transformers', 'OpenCV', 'React.js', 'Next.js', 'FastAPI', 'MongoDB', 'Docker', 'AWS', 'Git & GitHub', 'CI/CD', 'ResNet50', 'Swin Transformer', 'OCR', 'NLP (TTS, STT)'].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 rounded-lg border border-white/10 bg-white/4 text-gray-300 text-sm font-medium hover:border-blue-500/40 hover:text-blue-300 hover:bg-blue-500/8 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-5">Interested in working together? Let&apos;s create something amazing!</p>
            <button
              onClick={() => scrollTo('contact')}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 cursor-pointer"
            >
              Start a Conversation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
