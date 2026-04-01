'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import PortfolioTerminal from '@/components/Terminal/PortfolioTerminal';

// --- Typing animation config ---
const ROLES = ['Full Stack Developer', 'AI/ML Engineer'];
const TYPE_SPEED = 80;
const DELETE_SPEED = 45;
const PAUSE_TYPED = 1600;
const PAUSE_DELETED = 400;

// --- Icosahedron geometry ---
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS: [number, number, number][] = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
];

function normalize(v: [number, number, number]): [number, number, number] {
  const l = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return [v[0] / l, v[1] / l, v[2] / l];
}

const VERTS = RAW_VERTS.map(normalize);

const EDGES: [number, number][] = [];
for (let i = 0; i < VERTS.length; i++) {
  for (let j = i + 1; j < VERTS.length; j++) {
    const dx = VERTS[i][0] - VERTS[j][0];
    const dy = VERTS[i][1] - VERTS[j][1];
    const dz = VERTS[i][2] - VERTS[j][2];
    if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.12) EDGES.push([i, j]);
  }
}

function rotX(v: [number, number, number], a: number): [number, number, number] {
  return [v[0], v[1] * Math.cos(a) - v[2] * Math.sin(a), v[1] * Math.sin(a) + v[2] * Math.cos(a)];
}
function rotY(v: [number, number, number], a: number): [number, number, number] {
  return [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];
}

export default function HeroSection() {
  // --- Typing state ---
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause-after-type' | 'deleting' | 'pause-after-delete'>('typing');

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (displayed.length < role.length) {
        timer = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), TYPE_SPEED);
      } else {
        timer = setTimeout(() => setPhase('pause-after-type'), PAUSE_TYPED);
      }
    } else if (phase === 'pause-after-type') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), DELETE_SPEED);
      } else {
        timer = setTimeout(() => {
          setRoleIdx((i) => (i + 1) % ROLES.length);
          setPhase('typing');
        }, PAUSE_DELETED);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, roleIdx]);

  // --- Canvas shape ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef({ x: 0.3, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const clickSpinRef = useRef(0);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  const handleCanvasClick = useCallback(() => {
    clickSpinRef.current += Math.PI * 1.5;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;

    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 16, 3);
      lastTime = time;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Auto-rotate
      angleRef.current.x += 0.003 * dt;
      angleRef.current.y += 0.005 * dt;

      // Click spin
      if (clickSpinRef.current > 0) {
        const spin = Math.min(clickSpinRef.current, 0.12 * dt);
        angleRef.current.y += spin;
        clickSpinRef.current -= spin;
      }

      const mx = mouseRef.current.x * 0.35;
      const my = mouseRef.current.y * 0.35;
      const cx = w / 2;
      const cy = h / 2;
      const size = Math.min(w, h) * 0.4;
      const FOV = 2.5;

      // Transform vertices
      const transformed = VERTS.map((v) => {
        let r = rotX(v, angleRef.current.x + my);
        r = rotY(r, angleRef.current.y + mx);
        return r;
      });

      // Project to 2D
      const projected = transformed.map((v) => {
        const depth = v[2] + 2.5;
        const s = (FOV / depth) * size;
        return { x: cx + v[0] * s, y: cy - v[1] * s, depth };
      });

      // Draw edges
      EDGES.forEach(([a, b]) => {
        const pa = projected[a];
        const pb = projected[b];
        const avgDepth = (pa.depth + pb.depth) / 2;
        const alpha = Math.max(0.08, Math.min(0.9, (avgDepth - 1.5) / 1.8));

        const grad = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
        grad.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.9})`);
        grad.addColorStop(1, `rgba(99, 102, 241, ${alpha * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw vertices with glow
      projected.forEach((p) => {
        const alpha = Math.max(0.15, Math.min(1, (p.depth - 1.5) / 1.8));

        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
        glow.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.35})`);
        glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        ctx.fill();
      });

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <>
      <section id="home" className="min-h-screen flex items-center bg-[#080d1a] pt-24">
      <div className="max-w-7xl mx-auto px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">

        {/* ── Left: Content ── */}
        <div className="flex flex-col gap-7">

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to full-time roles
          </div>

          {/* Name */}
          <div>
            <p className="text-cyan-400 text-lg font-medium mb-2 tracking-widest uppercase text-sm">
              Hello, I&apos;m
            </p>
            <h1 className="text-7xl font-extrabold tracking-tight leading-none">
              <span className="text-white">Anhar </span>
              <span className="text-blue-400">Munir</span>
              <span className="text-blue-400">.</span>
            </h1>
          </div>

          {/* Typing role */}
          <div className="flex items-center h-10">
            <span className="text-2xl font-mono font-bold text-gray-100 tracking-wide">
              {displayed}
            </span>
            <span className="ml-0.5 inline-block w-[3px] h-7 bg-blue-400 rounded-sm animate-pulse" />
          </div>

          {/* Bio */}
          <p className="text-gray-400 text-[0.95rem] leading-7 max-w-[520px]">
            Final year BS Software Engineering student at FAST NUCES, Islamabad (graduating 2026).
            I build production ready systems — from AI powered assistive technology with real time
            edge deployment to deep learning medical imaging platforms. Experienced across full stack
            web development, embedded AI, and applied ML engineering. Open to full time software
            engineering roles.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 max-w-[460px]">
            {/* Get In Touch */}
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Get In Touch
            </button>

            {/* View Projects */}
            <button
              onClick={() => scrollTo('projects')}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              View Projects
            </button>

            {/* Download CV */}
            <a
              href="/resume.pdf"
              download="Anhar_Munir_Resume.pdf"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>

            {/* Terminal */}
            <button
              onClick={() => setTerminalOpen(true)}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-emerald-950/60 border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 font-semibold rounded-lg transition-all duration-200 font-mono hover:-translate-y-0.5 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
               Terminal
            </button>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/m-anhar-munir-b736252b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-blue-600/20 hover:border-blue-500 hover:text-blue-400 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/Anharhehe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/anharhehe/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-pink-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            {/* Gmail */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=anharmunirse@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-red-600/20 hover:border-red-500 hover:text-red-400 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:shadow-red-500/20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right: Animated wireframe ── */}
        <div className="hidden lg:flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onClick={handleCanvasClick}
            className="w-full h-[520px] cursor-crosshair"
            style={{ background: 'transparent' }}
          />
        </div>

      </div>
    </section>

    {terminalOpen && <PortfolioTerminal onClose={() => setTerminalOpen(false)} />}
    </>
  );
}
