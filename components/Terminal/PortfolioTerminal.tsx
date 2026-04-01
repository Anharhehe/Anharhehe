'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type OutputLine = { text: string; type: 'input' | 'output' | 'error' | 'system' };

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    'Available commands:',
    'about        - Learn about me',
    'skills       - View my technical skills',
    'projects     - List my projects',
    'contact      - Get contact information',
    'experience   - View work experience',
    'social       - Social media links',
    'resume       - Download resume',
    'clear        - Clear terminal',
    'exit         - Close terminal',
    'ls           - List available sections',
    'whoami       - Display current user',
  ],

  about: () => [
    'Final-year BS Software Engineering student at FAST-NUCES, Islamabad (graduating 2026).',
    'I build production-ready systems — from AI-powered assistive technology with real-time',
    'edge deployment to deep learning medical imaging platforms. Experienced across',
    'full-stack web development, embedded AI, and applied ML engineering.',
    'Open to full-time software engineering roles.',
    '',
    '📍 Location:     Islamabad / Gujranwala, Pakistan',
    '🎓 Institution:  FAST-NUCES Islamabad',
    '💼 Status:       Final Year SE Student',
  ],

  skills: () => [
    '=== Languages ===',
    '  Python                      90%',
    '  JavaScript / TypeScript     88%',
    '  C / C++ / Java / C#         75%',
    '',
    '=== Frontend ===',
    '  React.js / Next.js          85%',
    '  TailwindCSS                 88%',
    '  HTML / CSS                  92%',
    '',
    '=== Backend ===',
    '  Node.js / Express           85%',
    '  FastAPI                     82%',
    '  REST API Development        88%',
    '',
    '=== AI / ML ===',
    '  PyTorch / TensorFlow Lite   80%',
    '  Computer Vision (OpenCV)    82%',
    '  NLP & Transformers          78%',
    '  YOLOv8 / Edge AI            80%',
    '',
    '=== Databases ===',
    '  MongoDB                     85%',
    '  MySQL / SQL Server          80%',
    '',
    '=== Embedded & IoT ===',
    '  Raspberry Pi / Edge Deploy  78%',
    '  I2C, UART, GPS, ToF         72%',
    '',
    '=== Cloud & Tools ===',
    '  AWS (EC2, S3, RDS, EB)      72%',
    '  Docker / Git / CI-CD        75%',
  ],

  projects: () => [
    'Featured Projects:',
    '',
    '1. SightWise – AI Smart Glasses for the Visually Impaired  [Final Year Project]',
    '   End-to-end AI assistive system: object detection, currency recognition (99.9%),',
    '   OCR, offline GPS, and voice control — all running on edge hardware.',
    '   Tech: YOLOv8, TFLite INT8, Raspberry Pi 4B, Vosk STT, Tesseract OCR',
    '',
    '2. BreastCare AI – Deep Learning Breast Cancer Detection',
    '   Swin Transformer trained on CBIS-DDSM achieving 87.5% accuracy & 0.884 ROC-AUC.',
    '   Dual-view ensemble, FastAPI backend, React frontend with PDF report generation.',
    '   Tech: Swin Transformer, FastAPI, React.js, PyTorch',
    '',
    '3. FogSight – Real-Time Vehicle Detection in Fog  [In Progress]',
    '   Mobile app + dehazing pipeline + YOLOv8 for foggy road safety detection.',
    '   Tech: YOLOv8, Image Dehazing, Hugging Face, React Native',
    '',
    '4. Identity Management System (IMS)',
    '   Multi-context identity platform (personal, professional, family, online)',
    '   with JWT auth, privacy controls, and GNews API integration.',
    '   Tech: React.js, Next.js, Node.js, MongoDB, TailwindCSS',
    '',
    '5. Depression Detection from Visual Content',
    '   Binary classifier using ResNet18 transfer learning and Logistic Regression',
    '   on 20,186 images. Compared architectures on precision, recall, F1.',
    '   Tech: PyTorch, ResNet18, Scikit-learn',
    '',
    '6. Sarcasm Detection on Reddit',
    '   Comparative study on 1.3M comments: Naive Bayes → TF-IDF LR → DistilBERT (76.65%).',
    '   Tech: DistilBERT, TF-IDF, Logistic Regression, Python',
    '',
    '7. Ergonomic Posture Assessment Agent',
    '   AI agent for posture analysis and ergonomic feedback, deployed on Hugging Face.',
    '   Tech: FastAPI, MediaPipe, OpenCV, Docker',
    '',
    '8. Cloud Photo Gallery',
    '   Scalable cloud-native photo gallery with S3 media storage on AWS.',
    '   Tech: React.js, Node.js, AWS (EC2, S3, RDS, Elastic Beanstalk)',
    '',
    '9. Brain Buddy',
    '   Educational platform with voice assistant and GPT-4-powered AI lessons.',
    '   Tech: React, Next.js, Node.js',
    '',
    '10. Secure Chat System',
    '    End-to-end encrypted messaging with AES, RSA, and SHA hashing.',
    '    Tech: JavaScript, CSS',
    '',
    '11. Dream Nest – E-Commerce Web Application',
    '    Full-featured e-commerce platform for furniture, mattresses, and sofas',
    '    with product listings, cart management, and checkout workflows.',
    '    Tech: Next.js, React.js, Node.js, MongoDB',
    '',
    '12. HR Management System',
    '    Comprehensive HRMS with employee and admin dashboards supporting',
    '    employee record management, salary calculation, and leave management.',
    '    Tech: React.js, Node.js, MongoDB',
    '',
    '13. Online Consultancy Platform',
    '    Client-facing web platform aggregating university information and blog',
    '    content with a responsive UI and SEO-optimised structure.',
    '    Tech: React.js, Next.js, Node.js',
    '',
    '14. Movies App',
    '    Cross-platform mobile app similar to IMDb — movie/TV show ratings,',
    '    cast info, reviews, trailers, and related recommendations.',
    '    Tech: React Native, iOS & Android',
  ],

  contact: () => [
    'Contact Information:',
    '',
    '📧 Email:     anharhehe@gmail.com',
    '📱 Phone:     +92 311 7791014',
    '📍 Location:  Islamabad / Gujranwala, Pakistan',
    '🌐 Website:   anharhehe.site',
    '',
    'Type "social" for social media links',
  ],

  experience: () => [
    'Work Experience:',
    '',
    '1. Web Development Intern (Full Stack) @ COMPU Services',
    '   8 Weeks · Remote',
    '   • Built full-stack features using React.js, Node.js, and Express.js',
    '   • Integrated RESTful APIs and worked on MongoDB/SQL database design',
    '   • Delivered within Agile sprint cycles using Git-based version control',
    '',
    '2. SEO Internship @ APPTech',
    '   Gujranwala, Pakistan',
    '   • Managed Google Search Console, Trends, on-page & technical SEO',
    '   • Executed backlink generation campaigns and competitor analysis',
    '   • Produced performance reports and ranking improvement recommendations',
  ],

  social: () => [
    'Social Media:',
    '',
    '🔗 LinkedIn:   https://www.linkedin.com/in/m-anhar-munir-b736252b9/',
    '🐙 GitHub:     https://github.com/Anharhehe',
    '🌐 Portfolio:  https://anharhehe.site',
  ],

  resume: () => ['Opening resume in new tab...'],

  ls: () => [
    'Available sections:',
    '  /home          → Hero section',
    '  /about         → About Me',
    '  /projects      → Projects Gallery',
    '  /skills        → Technical Skills',
    '  /experience    → Work Experience',
    '  /contact       → Contact',
  ],

  whoami: () => ['anhar@portfolio:~$'],
};

const SUGGESTIONS = Object.keys(COMMANDS);

const BOOT_LINES = [
  { text: "Welcome to Anhar Munir's Portfolio Terminal v1.0", type: 'system' as const },
  { text: 'Type "help" to see available commands', type: 'system' as const },
];

interface Props {
  onClose: () => void;
}

export default function PortfolioTerminal({ onClose }: Props) {
  const [history, setHistory] = useState<OutputLine[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const pushLines = useCallback((lines: OutputLine[]) => {
    setHistory((h) => [...h, ...lines]);
  }, []);

  const handleInput = useCallback(
    (value: string) => {
      setInput(value);
      const trimmed = value.trim().toLowerCase();
      const match = SUGGESTIONS.find((s) => s.startsWith(trimmed) && s !== trimmed && trimmed.length > 0);
      setSuggestion(match ? match.slice(trimmed.length) : '');
    },
    []
  );

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      const echoLine: OutputLine = { text: `$ ${raw.trim()}`, type: 'input' };

      if (!cmd) {
        pushLines([echoLine]);
        return;
      }

      setCmdHistory((h) => [raw.trim(), ...h]);
      setHistIdx(-1);
      setSuggestion('');

      if (cmd === 'clear') {
        setHistory([]);
        return;
      }
      if (cmd === 'exit') {
        onClose();
        return;
      }
      if (cmd === 'resume') {
        const a = document.createElement('a');
        a.href = '/resume.pdf';
        a.download = 'Anhar_Munir_Resume.pdf';
        a.click();
        pushLines([echoLine, { text: 'Downloading resume... ✓', type: 'output' }]);
        return;
      }

      const fn = COMMANDS[cmd];
      if (fn) {
        const lines: OutputLine[] = fn().map((t) => ({ text: t, type: 'output' as const }));
        pushLines([echoLine, ...lines]);
      } else {
        pushLines([
          echoLine,
          { text: `bash: ${cmd}: command not found. Type "help" for available commands.`, type: 'error' },
        ]);
      }
    },
    [onClose, pushLines]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
      setSuggestion('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        const completed = input.trim() + suggestion;
        setInput(completed);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      if (cmdHistory[next] !== undefined) setInput(cmdHistory[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const lineColor = (type: OutputLine['type']) => {
    if (type === 'input') return 'text-green-400';
    if (type === 'error') return 'text-red-400';
    if (type === 'system') return 'text-cyan-400';
    return 'text-gray-300';
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Window */}
      <div className="w-full max-w-3xl mx-4 rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 flex flex-col"
        style={{ height: '560px', background: '#0d1117' }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/8 flex-shrink-0">
          {/* Traffic lights */}
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-sm text-gray-400 font-mono">anhar@portfolio:~</span>
        </div>

        {/* Output area */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 font-mono text-sm leading-6 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className={`whitespace-pre-wrap break-all ${lineColor(line.type)}`}>
              {line.text || '\u00A0'}
            </div>
          ))}

          {/* Current input line */}
          <div className="flex items-center text-green-400 mt-1">
            <span className="mr-2 select-none">$</span>
            <div className="relative flex-1">
              {/* Ghost suggestion */}
              <span className="pointer-events-none absolute inset-0 flex items-center">
                <span className="invisible">{input}</span>
                <span className="text-gray-600">{suggestion}</span>
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none caret-green-400 text-green-400 font-mono text-sm"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
            </div>
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2 bg-[#161b22] border-t border-white/8 flex-shrink-0">
          <p className="text-xs text-gray-600 font-mono">
            Press <kbd className="bg-white/10 px-1 rounded">Tab</kbd> to autocomplete &nbsp;•&nbsp;
            <kbd className="bg-white/10 px-1 rounded">↑↓</kbd> history &nbsp;•&nbsp;
            Type <span className="text-gray-500">"help"</span> for commands &nbsp;•&nbsp;
            <kbd className="bg-white/10 px-1 rounded">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}