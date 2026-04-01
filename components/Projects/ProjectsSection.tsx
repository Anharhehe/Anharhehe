'use client';

import { useState } from 'react';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  shortDesc: string;
  tech: string[];
  bullets: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'SightWise – AI Smart Glasses for Visually Impaired',
    subtitle: 'Final Year Project',
    accentColor: 'bg-blue-600',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M20.188 10.934C21.35 12.002 21.35 11.998 20.188 13.066 18.768 14.348 15.636 17 12 17s-6.768-2.652-8.188-3.934C2.65 12.002 2.65 11.998 3.812 10.934 5.232 9.652 8.364 7 12 7s6.768 2.652 8.188 3.934z" />
      </svg>
    ),
    shortDesc: 'Prismora AI is an AI-powered platform designed to transform long-form podcasts into structured, searchable...',
    tech: ['YOLOv8', 'TFLite INT8', 'Raspberry Pi 4B', 'Vosk STT', 'pyttsx3', 'Tesseract OCR', 'OpenCV', 'GPS'],
    bullets: [
      'Developed a complete AI-powered smart glasses system for visually impaired individuals integrating YOLOv8-based indoor and outdoor object detection, achieving real-time inference on edge hardware.',
      'Built Pakistani currency recognition module with 99.9% accuracy and Tesseract OCR for real-time text reading from documents and signage.',
      'Implemented offline GPS navigation, live location sharing, and a fully voice-controlled interface using Vosk STT and pyttsx3 TTS.',
      'Optimized and deployed all AI modules on Raspberry Pi 4B using TFLite INT8 quantized models, achieving real-time edge inference within power constraints.',
    ],
  },
  {
    id: 2,
    title: 'FogSight – Real-Time Vehicle Detection in Foggy Conditions',
    subtitle: 'In Progress',
    accentColor: 'bg-blue-600',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    shortDesc: 'A comprehensive full-stack enterprise management system designed for service centers handling customer...',
    tech: ['YOLOv8', 'Hugging Face', 'React Native', 'Image Dehazing', 'OpenCV', 'Ultrasonic Sensor'],
    bullets: [
      'Developing an AI-powered road safety system that detects vehicles in foggy conditions via a mobile app integrated with a forward-facing camera and deep learning models hosted on Hugging Face.',
      'Designed an image dehazing pre-processing pipeline using OpenCV to enhance visibility before feeding frames into the YOLOv8 detection model, improving inference accuracy in adverse weather.',
      'Integrating an ultrasonic distance sensor to estimate proximity of detected vehicles and trigger real-time audio alerts through the car\'s speakers for driver safety.',
      'Targeting practical affordability and retrofittability — the system requires no vehicle hardware modifications beyond a mounted camera and smartphone.',
    ],
  },
  {
    id: 3,
    title: 'BreastCare AI – Deep Learning Breast Cancer Detection System',
    subtitle: 'AI / Medical Imaging',
    accentColor: 'bg-blue-600',
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    shortDesc: 'GadgetPro is a complete end-to-end MERN stack ecommerce solution designed for premium tech products...',
    tech: ['Swin Transformer', 'FastAPI', 'React.js', 'PyTorch', 'CBIS-DDSM', 'HuggingFace', 'Transfer Learning'],
    bullets: [
      'Built a full-stack AI web application for breast cancer detection using a fine-tuned Swin Transformer trained on the CBIS-DDSM mammography dataset, achieving 87.5% accuracy and 0.884 ROC-AUC.',
      'Implemented a dual-view ensemble analysis system (CC + MLO views) mimicking clinical radiologist workflow, reducing false positives through probability averaging.',
      'Developed a FastAPI backend with optimized model inference and caching, paired with a React frontend featuring drag-and-drop image upload, real-time results, and automated PDF report generation.',
      'Applied transfer learning, class weighting, and data augmentation techniques to address medical imaging challenges on ~30,000 image dataset.',
    ],
  },
];

const MAX_VISIBLE_TECH = 4;

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl shadow-black/60">
        {/* Header band */}
        <div className={`${project.accentColor} p-6 rounded-t-2xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-200 ease-out hover:scale-110 text-white cursor-pointer"
            >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 mb-4">
            {project.icon}
          </div>
          <span className="text-xs font-mono text-blue-200 uppercase tracking-widest mb-2 block">{project.subtitle}</span>
          <h2 className="text-xl font-extrabold text-white leading-snug">{project.title}</h2>
        </div>

        {/* Body */}
        <div className="p-7 flex flex-col gap-6">
          {/* Tech stack */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-md border border-white/10 bg-white/5 text-gray-300 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key Highlights</h3>
            <ul className="flex flex-col gap-3">
              {project.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-6">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 bg-[#080d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">04. Projects</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white mb-4">Featured Projects</h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-400 text-[0.97rem]">Showcasing my latest work and technical achievements</p>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PROJECTS.map((project) => {
            const visibleTech = project.tech.slice(0, MAX_VISIBLE_TECH);
            const extraCount = project.tech.length - MAX_VISIBLE_TECH;

            return (
              <div
                key={project.id}
                className="flex flex-col rounded-2xl bg-[#0d1117] border border-white/8 overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/20 hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelected(project)}
              >
                {/* Card header band */}
                <div className={`${project.accentColor} p-6`}>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <span className="text-xs font-mono text-blue-200 uppercase tracking-widest mb-1 block">{project.subtitle}</span>
                  <h3 className="text-lg font-extrabold text-white leading-snug">{project.title}</h3>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <p className="text-gray-400 text-sm leading-6 line-clamp-3">{project.bullets[0]}</p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2">
                    {visibleTech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-gray-300 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-gray-400 text-xs font-medium">
                        +{extraCount}
                      </span>
                    )}
                  </div>

                  {/* Bullet previews */}
                  <ul className="flex flex-col gap-1.5 mt-auto">
                    {project.bullets.slice(1, 4).map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-500 text-xs leading-5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span className="line-clamp-1">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* View details link */}
                  <button className="mt-3 flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors self-start">
                    View Details
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discover all projects button */}
        <div className="flex justify-end mt-10">
          <Link
            href="/projects"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg border border-blue-500/40 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Explore All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
