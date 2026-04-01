'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS, Category } from '@/src/data/projects';

type FilterValue = 'All' | Category;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'All' },
  { label: 'AI/ML', value: 'AI/ML' },
  { label: 'Full Stack', value: 'Full Stack' },
  { label: 'Mobile', value: 'Mobile' },
];

const GRADIENTS = [
  'from-blue-900 to-blue-700',
  'from-indigo-900 to-indigo-700',
  'from-violet-900 to-violet-700',
  'from-cyan-900 to-cyan-700',
  'from-purple-900 to-purple-700',
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeFilter as Category));

  return (
    <main className="min-h-screen bg-[#080d1a] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-10">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-4">Project Gallery</h1>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-5" />
          <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            Explore my complete portfolio of projects with detailed insights, media, and live demos
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <svg
            className="w-4 h-4 text-gray-500 mr-1 flex-shrink-0"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#0d1117] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 cursor-pointer hover:bg-[#0d1420]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              className="flex flex-col rounded-2xl bg-[#0d1117] border border-white/8 overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/20 hover:scale-[1.025] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-[#0a0f1e]">
                {!imgErrors[project.id] ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [project.id]: true }))
                    }
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]} flex items-center justify-center`}
                  >
                    <svg
                      className="w-12 h-12 text-white/20"
                      fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {project.status === 'Live' && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-green-500 text-white">Live</span>
                  )}
                  {project.status === 'In Progress' && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-yellow-400 text-black">In Progress</span>
                  )}
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#162032] text-blue-300 border border-blue-500/40">Featured</span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {project.year}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base leading-snug line-clamp-2">{project.title}</h3>

                {/* Short desc */}
                <p className="text-gray-400 text-xs leading-5 line-clamp-2">{project.shortDesc}</p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-xs">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-500 text-xs">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/5">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                  >
                    View Details →
                  </Link>
                  <div className="flex items-center gap-2.5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0012 0z" />
                        </svg>
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-20 text-sm">No projects found in this category.</p>
        )}
      </div>
    </main>
  );
}
