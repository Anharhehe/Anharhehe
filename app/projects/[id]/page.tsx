'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/src/data/projects';

const GRADIENTS = [
  'from-blue-900 to-blue-700',
  'from-indigo-900 to-indigo-700',
  'from-violet-900 to-violet-700',
  'from-cyan-900 to-cyan-700',
  'from-purple-900 to-purple-700',
];

function toEmbedUrl(url: string): string {
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([^?&\s]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([^?&\s]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  // already embed or other
  return url;
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const idx = PROJECTS.findIndex((p) => p.id === id);
  const project = idx !== -1 ? PROJECTS[idx] : null;

  const [currentImage, setCurrentImage] = useState(0);
  const [imgErrors, setImgErrors] = useState<boolean[]>([]);

  useEffect(() => {
    if (project) setImgErrors(new Array(project.images.length).fill(false));
    setCurrentImage(0);
  }, [id, project]);

  if (!project) {
    return (
      <main className="min-h-screen bg-[#080d1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-6">Project not found.</p>
          <Link href="/projects" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const gradient = GRADIENTS[idx % GRADIENTS.length];
  const prevProject = idx > 0 ? PROJECTS[idx - 1] : null;
  const nextProject = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

  const handlePrev = () =>
    setCurrentImage((i) => (i === 0 ? project.images.length - 1 : i - 1));
  const handleNext = () =>
    setCurrentImage((i) => (i === project.images.length - 1 ? 0 : i + 1));

  const setThumbError = (i: number) =>
    setImgErrors((prev) => {
      const n = [...prev];
      n[i] = true;
      return n;
    });

  return (
    <main className="min-h-screen bg-[#080d1a] text-white pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-8 lg:px-10">

        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: image carousel ── */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/8">
              <div className="relative h-72 sm:h-[26rem]">
                {!imgErrors[currentImage] ? (
                  <img
                    key={project.images[currentImage]}
                    src={project.images[currentImage]}
                    alt={`${project.title} screenshot ${currentImage + 1}`}
                    className="w-full h-full object-contain"
                    onError={() => setThumbError(currentImage)}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                {/* Arrow buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm cursor-pointer"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm cursor-pointer"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Counter */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 text-xs text-white font-mono backdrop-blur-sm">
                  {currentImage + 1} / {project.images.length}
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-2 py-3">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentImage
                        ? 'w-6 h-2 bg-blue-400'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {project.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    i === currentImage ? 'border-blue-400' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {!imgErrors[i] ? (
                    <img
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-contain"
                      onError={() => setThumbError(i)}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
                  )}
                </button>
              ))}
            </div>

            {/* YouTube video */}
            {project.youtubeUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1117]">
                <div className="px-5 pt-4 pb-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Project Demo</h3>
                </div>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={toEmbedUrl(project.youtubeUrl)}
                    title={`${project.title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Right: project info ── */}
          <div className="lg:col-span-2 flex flex-col gap-5 lg:sticky lg:top-28">

            {/* Subtitle + status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">{project.subtitle}</span>
              {project.status === 'Live' && (
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">Live</span>
              )}
              {project.status === 'In Progress' && (
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">In Progress</span>
              )}
              {project.status === 'Completed' && (
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30">Completed</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-extrabold text-white leading-snug">{project.title}</h1>

            {/* Year */}
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {project.year}
            </div>

            {/* Short desc */}
            <p className="text-gray-300 text-sm leading-6">{project.shortDesc}</p>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {project.categories.map((c) => (
                <span key={c} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/15 text-blue-400 border border-blue-500/25">
                  {c}
                </span>
              ))}
            </div>

            {/* Tech stack */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2.5">Tech Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-gray-300 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-5 py-3 rounded-xl bg-white/8 border border-white/15 text-white font-semibold text-sm hover:bg-white/15 hover:border-white/25 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0012 0z" />
                  </svg>
                  View this Project on GitHub
                  <svg className="w-3.5 h-3.5 ml-auto opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2.5 w-full px-5 py-3 rounded-xl bg-white/3 border border-white/8 text-gray-600 font-semibold text-sm cursor-not-allowed select-none">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0012 0z" />
                  </svg>
                  GitHub — Coming Soon
                </div>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-5 py-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 font-semibold text-sm hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                  </svg>
                  Live Demo
                  <svg className="w-3.5 h-3.5 ml-auto opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Key highlights ── */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-white mb-6">Key Highlights</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-300 text-sm leading-6 bg-[#0d1117] border border-white/5 rounded-xl px-5 py-4"
              >
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Prev / Next navigation ── */}
        <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors max-w-xs"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              <span className="line-clamp-1">{prevProject.title.split('–')[0].trim()}</span>
            </Link>
          ) : (
            <div />
          )}
          <Link href="/projects" className="text-gray-600 hover:text-gray-400 text-xs transition-colors whitespace-nowrap mx-4">
            All Projects
          </Link>
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors max-w-xs text-right"
            >
              <span className="line-clamp-1">{nextProject.title.split('–')[0].trim()}</span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>

      </div>
    </main>
  );
}
