'use client';

const SKILL_GROUPS = [
  {
    title: 'Languages',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: 'text-blue-400',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C/C++', 'C#'],
  },
  {
    title: 'AI & Machine Learning',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    color: 'text-purple-400',
    skills: ['PyTorch', 'Scikit-learn', 'TensorFlow Lite', 'Transfer Learning', 'Model Quantization (INT8)', 'YOLOv8', 'Logistic Regression', 'Naive Bayes', 'Decision Trees', 'KNN', 'Cross-Validation', 'Class Imbalance Handling', 'Ensemble Learning'],
  },
  {
    title: 'Deep Learning',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    color: 'text-indigo-400',
    skills: ['ResNet18', 'Swin Transformer', 'DistilBERT', 'CNNs', 'HuggingFace Transformers', 'AdamW Optimizer'],
  },
  {
    title: 'NLP',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    color: 'text-cyan-400',
    skills: ['Text Classification', 'TF-IDF', 'Bag-of-Words', 'N-gram Feature Extraction', 'Transformer Fine-Tuning', 'TTS', 'STT'],
  },
  {
    title: 'Computer Vision',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    color: 'text-green-400',
    skills: ['OpenCV', 'Image Preprocessing', 'Data Augmentation', 'Object Detection', 'Medical Imaging', 'CLAHE', 'Perspective Transform', 'OCR (Tesseract / EasyOCR)'],
  },
  {
    title: 'Web Development',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    color: 'text-blue-400',
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'FastAPI', 'REST API Development', 'TailwindCSS'],
  },
  {
    title: 'Databases',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    color: 'text-yellow-400',
    skills: ['MongoDB', 'Mongoose ODM', 'MySQL', 'SQL Server', 'NoSQL Schema Design'],
  },
  {
    title: 'Authentication & Security',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: 'text-red-400',
    skills: ['JWT', 'bcrypt', 'OAuth 2.0', 'Token-Based Auth', 'AES Encryption', 'RSA Encryption', 'SHA Hashing'],
  },
  {
    title: 'Embedded Systems & IoT',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    color: 'text-orange-400',
    skills: ['Raspberry Pi 4B', 'Edge AI Deployment', 'I2C & UART Protocols', 'GPS Module (NEO-6M)', 'ToF Distance Sensor'],
  },
  {
    title: 'Data Science',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: 'text-teal-400',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA', 'Feature Engineering', 'ROC-AUC', 'Confusion Matrix', 'Precision/Recall/F1'],
  },
  {
    title: 'Testing',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    color: 'text-green-400',
    skills: ['Jest', 'React Testing Library', 'Supertest'],
  },
  {
    title: 'Tools & Platforms',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    color: 'text-gray-400',
    skills: ['Git & GitHub', 'Google Colab (GPU)', 'Jupyter Notebook', 'VS Code', 'Postman', 'Roboflow', 'Kaggle', 'Hugging Face', 'MongoDB Atlas', 'Docker', 'AWS (EC2, RDS, S3)', 'Vercel', 'Jenkins'],
  },
  {
    title: 'Software Engineering',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: 'text-blue-300',
    skills: ['Agile', 'DevOps', 'CI/CD', 'Software Project Management', 'Quality Assurance'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 bg-[#080d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">04. Skills</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-white mb-4">Skills &amp; Technologies</h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6" />
          
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
                key={group.title}
                className="rounded-2xl bg-[#0d1117] border border-white/8 p-6 hover:border-blue-500/40 hover:bg-[#0d1420] transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 group cursor-pointer"
        >
              {/* Card header */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`${group.color} transition-transform duration-300 group-hover:scale-110`}>
                  {group.icon}
                </span>
                <h3 className="text-base font-bold text-white">{group.title}</h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md border border-white/8 bg-white/4 text-gray-300 text-xs font-medium hover:border-blue-500/40 hover:text-blue-300 hover:bg-blue-500/8 transition-all duration-150 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
