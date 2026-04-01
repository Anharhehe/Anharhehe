'use client';

const EXPERIENCES = [
  {
    title: 'Web Development Intern',
    company: 'COMPU Services',
    companyColor: 'text-blue-400',
    location: 'Remote',
    period: '2024 · 8 Weeks, Remote',
    bullets: [
      'Developed and maintained full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js) in a remote environment.',
      'Built RESTful APIs and integrated them with responsive front-end interfaces using React.js and TailwindCSS.',
      'Collaborated with a small team following Agile workflows, participating in code reviews, sprint planning, and iterative feature delivery.',
      'Gained practical exposure to database design, authentication flows (JWT), and deployment pipelines during the 8-week internship.',
    ],
  },
  {
    title: 'SEO Intern',
    company: 'APPTech Gujranwala',
    companyColor: 'text-blue-400',
    location: 'Gujranwala, Pakistan',
    period: '2023',
    bullets: [
      'Managed Google Search Console and Google Trends to monitor website performance and identify keyword opportunities.',
      'Executed on-page SEO (meta tags, headings, content optimization), off-page SEO (backlink outreach), and technical SEO (site speed, crawlability, sitemap submission).',
      'Built quality backlinks through directory submissions and outreach campaigns, improving domain authority for client websites.',
    ],
  },
];

const EDUCATION = [
  {
    degree: 'BS Software Engineering',
    institution: 'FAST-NUCES Islamabad',
    location: 'Islamabad, Pakistan',
    period: '2022 – 2026',
    bullets: [
      'Final year — graduating December 2026',
      'Specialisation in full-stack and AI/ML engineering',
      'Relevant Coursework: OOP, DSA, Databases, Algorithms, Software Engineering, AI/ML, Web (MERN), DevOps, Cloud (AWS), Information Security',
    ],
  },
  {
    degree: 'Intermediate in Science (Pre-Engineering)',
    institution: 'Quaid-e-Azam Public College',
    location: 'Gujranwala',
    period: '2020 – 2022',
    bullets: [],
  },
];

const CERTIFICATIONS = [
  { title: 'AWS Academy Cloud Foundations', issuer: 'Amazon Web Services' },
  { title: 'SEO Certification', issuer: 'APPTech Gujranwala (Internship Participant Certificate)' },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 bg-[#080d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">05. Experience</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white mb-4">Experience &amp; Education</h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Left: Professional Experience ── */}
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
              </svg>
              <h3 className="text-xl font-bold text-white">Professional Experience</h3>
            </div>

            <div className="flex flex-col gap-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.title} className="rounded-2xl bg-[#0d1117] border border-white/8 p-6 hover:border-blue-500/40 hover:bg-[#0d1420] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className="text-base font-bold text-white leading-snug">{exp.title}</h4>
                    <span className="flex-shrink-0 px-3 py-1 rounded-md bg-white/6 border border-white/10 text-xs text-gray-400 font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold mb-0.5 ${exp.companyColor}`}>{exp.company}</p>
                  <p className="text-xs text-gray-500 mb-4">{exp.location}</p>

                  <ul className="flex flex-col gap-2.5">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm leading-6">
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Education + Certifications ── */}
          <div className="flex flex-col gap-10">

            {/* Education */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>

              <div className="flex flex-col gap-5">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="rounded-2xl bg-[#0d1117] border border-white/8 p-6 hover:border-blue-500/40 hover:bg-[#0d1420] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-base font-bold text-white leading-snug">{edu.degree}</h4>
                      <span className="flex-shrink-0 px-3 py-1 rounded-md bg-white/6 border border-white/10 text-xs text-gray-400 font-mono whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-blue-400 mb-0.5">{edu.institution}</p>
                    <p className="text-xs text-gray-500 mb-4">{edu.location}</p>
                    {edu.bullets.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {edu.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm leading-6">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
                <h3 className="text-xl font-bold text-white">Certifications</h3>
              </div>

              <div className="flex flex-col gap-3">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.title} className="flex items-center gap-4 rounded-xl bg-[#0d1117] border border-white/8 px-5 py-4 hover:border-blue-500/40 hover:bg-[#0d1420] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
                    <svg className="w-7 h-7 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-white">{cert.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
