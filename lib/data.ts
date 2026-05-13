/**
 * Datos estáticos — actúan como FALLBACK cuando Supabase no está disponible
 * y como contenido inicial al hacer seed de la base de datos.
 *
 * Toda esta información proviene del CV oficial de Jonathan Rivas Toledo.
 */

import type {
  Project,
  Certification,
  ExperienceItem,
  SkillCategory,
  ProjectFolder,
} from './types';

// ════════════════════════════════════════════════════════════════════════════
//  IDENTIDAD
// ════════════════════════════════════════════════════════════════════════════
export const IDENTITY = {
  name: 'Jonathan Rivas',
  fullName: 'Jonathan Adrián Rivas Toledo',
  role: 'Software Engineer',
  specialties: ['AI', 'Systems', 'Automation'],
  tagline: 'Building intelligent digital systems with modern technologies.',
  location: 'Santa Ana, El Salvador',
  email: 'jonathan.rivas230206@gmail.com',
  phone: '+503 7381-9286',
  university: 'Universidad Católica de El Salvador',
  career: 'Ingeniería en Desarrollo de Software',
  gpa: '8.60',
  social: {
    github: 'https://github.com/JonathanRivas',
    linkedin: 'https://linkedin.com/in/jonathan-rivas-30a9933b5',
    email: 'mailto:jonathan.rivas230206@gmail.com',
  },
} as const;

// ════════════════════════════════════════════════════════════════════════════
//  ABOUT — bloque editorial estilo terminal
// ════════════════════════════════════════════════════════════════════════════
export const ABOUT_BLOCK = {
  prompt: 'whoami',
  intro:
    'Software engineering student focused on building intelligent, automated, and elegant digital systems.',
  focusAreas: [
    'AI systems & process automation',
    'Digital infrastructure & cybersecurity fundamentals',
    'Modern web interfaces & UX',
    'Technological leadership & team coordination',
  ],
  paragraph: [
    'Estudiante de Ingeniería en Desarrollo de Software (UNICAES, CUM 8.60) con formación técnica',
    'en infraestructura tecnológica y servicios informáticos, y certificación profesional en soporte IT',
    'por Google. Cofundador de DataDuck — grupo enfocado en el desarrollo, comercialización y gestión',
    'de soluciones de software. Experiencia en liderazgo a nivel nacional como vicepresidente del',
    'Consejo Nacional de Participación Estudiantil. Uso estratégico de herramientas de IA para',
    'automatización de procesos, productividad y desarrollo de soluciones tecnológicas modernas.',
  ].join(' '),
} as const;

// ════════════════════════════════════════════════════════════════════════════
//  SKILLS — agrupados por área profesional
// ════════════════════════════════════════════════════════════════════════════
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'Layout',
    description: 'Interfaces modernas y experiencias web fluidas.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    description: 'Lógica, APIs y servicios escalables.',
    items: ['Python', 'C#', 'C++', 'PHP', 'Node.js'],
  },
  {
    title: 'AI & Automation',
    icon: 'Sparkles',
    description: 'IA aplicada a productividad y procesos.',
    items: ['LLM tooling', 'Workflow automation', 'AI-assisted dev', 'Prompt engineering'],
  },
  {
    title: 'Infrastructure',
    icon: 'Network',
    description: 'Redes, servidores y soporte profesional.',
    items: ['Google IT Support', 'TCP/IP', 'Linux', 'Windows Server', 'Cloud basics'],
  },
  {
    title: 'Databases',
    icon: 'Database',
    description: 'Modelado y manejo de datos.',
    items: ['MySQL', 'SQLite', 'PostgreSQL', 'Supabase', 'Power Query'],
  },
  {
    title: 'Security & Systems',
    icon: 'Shield',
    description: 'Buenas prácticas y respuesta a incidentes.',
    items: ['Cybersecurity fundamentals', 'Incident response', 'IT defense', 'Risk management'],
  },
];

// ════════════════════════════════════════════════════════════════════════════
//  EXPERIENCE & LEADERSHIP — timeline minimalista
// ════════════════════════════════════════════════════════════════════════════
export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Cofundador · Operaciones y Estrategia',
    organization: 'DataDuck',
    period: '2025 — present',
    description:
      'Grupo de trabajo enfocado en desarrollo, comercialización y gestión de soluciones de software.',
    highlights: [
      'Planificación estratégica y operativa de proyectos tecnológicos',
      'Coordinación del equipo de desarrollo',
      'Apoyo en el diseño y desarrollo de soluciones digitales',
      'Impulso de innovación tecnológica con IA y automatización',
    ],
    type: 'tech',
    order_index: 1,
  },
  {
    id: 'exp-2',
    role: 'Vicepresidente',
    organization: 'Consejo Nacional de Participación Estudiantil',
    period: '2024 — 2025',
    description:
      'Representación a nivel nacional en procesos educativos junto al Ministerio de Educación.',
    highlights: [
      'Liderazgo de equipos estudiantiles a nivel municipal, departamental y nacional',
      'Participación en iniciativas del Ministerio de Educación',
      'Representante departamental y municipal',
      'Encuentro Nacional de Participación Estudiantil 2024',
    ],
    type: 'leadership',
    order_index: 2,
  },
  {
    id: 'exp-3',
    role: 'Presidente del Consejo de Alumnos · miembro de CDE',
    organization: 'Centro Escolar INSA',
    period: 'present',
    description:
      'Coordinación de actividades académicas y estudiantiles con +3,800 estudiantes.',
    highlights: [
      'Coordinación de actividades deportivas y culturales',
      'Gestión de riesgos y organización de secciones',
      'Participación en ferias tecnológicas — INSA',
      'Presentación de proyectos tecnológicos académicos',
    ],
    type: 'leadership',
    order_index: 3,
  },
  {
    id: 'exp-4',
    role: 'Desarrollador de Software',
    organization: 'Proyectos académicos y personales',
    period: '2023 — present',
    description:
      'Desarrollo de software, automatización y soluciones técnicas en múltiples lenguajes.',
    highlights: [
      'Python para automatización y resolución de problemas lógicos',
      'Interfaces web con HTML5, CSS3 y JavaScript',
      'Gestión de bases de datos con MySQL',
      'Buenas prácticas de ciberseguridad y respuesta a incidentes',
    ],
    type: 'tech',
    order_index: 4,
  },
];

// ════════════════════════════════════════════════════════════════════════════
//  PROJECTS — fallback. El sistema dinámico los lee desde Supabase.
// ════════════════════════════════════════════════════════════════════════════
export const PROJECT_FOLDERS: ProjectFolder[] = [
  { key: 'web',           label: 'WEB PROJECTS',  description: 'Sitios y plataformas web premium.' },
  { key: 'ai-automation', label: 'AI AUTOMATION', description: 'Sistemas inteligentes y automatización.' },
  { key: 'systems',       label: 'SYSTEMS',       description: 'Infraestructura, redes y soporte.' },
  { key: 'ui-ux',         label: 'UI / UX LAB',   description: 'Exploraciones de interfaz y motion.' },
];

export const PROJECTS_SEED: Project[] = [
  {
    id: 'proj-1',
    title: 'DataDuck Platform',
    slug: 'dataduck-platform',
    description:
      'Plataforma interna para gestión de proyectos, clientes y entregables del equipo DataDuck.',
    technologies: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind'],
    preview_image: '/placeholders/project-1.svg',
    github_url: null,
    live_url: null,
    category: 'web',
    featured: true,
    year: 2025,
    order_index: 1,
  },
  {
    id: 'proj-2',
    title: 'AI Workflow Automator',
    slug: 'ai-workflow-automator',
    description:
      'Automatización de flujos repetitivos usando LLMs y agentes para procesos académicos y empresariales.',
    technologies: ['Python', 'OpenAI', 'LangChain', 'Automation'],
    preview_image: '/placeholders/project-2.svg',
    github_url: null,
    live_url: null,
    category: 'ai-automation',
    featured: true,
    year: 2025,
    order_index: 2,
  },
  {
    id: 'proj-3',
    title: 'IT Infrastructure Toolkit',
    slug: 'it-infrastructure-toolkit',
    description:
      'Scripts y guías para diagnóstico de redes, soporte remoto y administración de sistemas.',
    technologies: ['Bash', 'PowerShell', 'Python', 'TCP/IP'],
    preview_image: '/placeholders/project-3.svg',
    github_url: null,
    live_url: null,
    category: 'systems',
    featured: false,
    year: 2024,
    order_index: 3,
  },
  {
    id: 'proj-4',
    title: 'Cinematic Portfolio Engine',
    slug: 'cinematic-portfolio',
    description:
      'Sistema editorial premium con motion design, glassmorphism y panel admin dinámico.',
    technologies: ['Next.js', 'Framer Motion', 'GSAP', 'Tailwind'],
    preview_image: '/placeholders/project-4.svg',
    github_url: null,
    live_url: null,
    category: 'ui-ux',
    featured: true,
    year: 2026,
    order_index: 4,
  },
];

// ════════════════════════════════════════════════════════════════════════════
//  CERTIFICATIONS — extraídas literalmente del CV
// ════════════════════════════════════════════════════════════════════════════
export const CERTIFICATIONS: Certification[] = [
  { id: 'c-1',  name: 'Google IT Support',                                organization: 'Google · Coursera',    year: 2025, verify_url: 'https://coursera.org/verify/professional-cert/google-it-support' },
  { id: 'c-2',  name: 'Technical Support Fundamentals',                   organization: 'Google',               year: 2025, verify_url: null },
  { id: 'c-3',  name: 'The Bits and Bytes of Computer Networking',        organization: 'Google',               year: 2025, verify_url: null },
  { id: 'c-4',  name: 'Operating Systems and You: Becoming a Power User', organization: 'Google',               year: 2025, verify_url: null },
  { id: 'c-5',  name: 'System Administration and IT Infrastructure',      organization: 'Google',               year: 2025, verify_url: null },
  { id: 'c-6',  name: 'IT Security: Defense Against the Digital Dark Arts', organization: 'Google',             year: 2025, verify_url: null },
  { id: 'c-7',  name: 'Accelerate Your Job Search with AI',               organization: 'Coursera',             year: 2025, verify_url: null },
  { id: 'c-8',  name: 'Microsoft Excel 2019 Associate',                   organization: 'Microsoft',            year: 2025, verify_url: null },
  { id: 'c-9',  name: 'Microsoft Word 2019 Associate',                    organization: 'Microsoft',            year: 2025, verify_url: null },
  { id: 'c-10', name: 'Microsoft PowerPoint 2019 Associate',              organization: 'Microsoft',            year: 2025, verify_url: null },
  { id: 'c-11', name: 'Microsoft Office Specialist Associate',            organization: 'Microsoft',            year: 2025, verify_url: null },
  { id: 'c-12', name: 'Diplomado en Ofimática (260 h)',                   organization: 'UNICAES',              year: 2025, verify_url: null },
  { id: 'c-13', name: 'Bases de Datos Avanzadas en Excel',                organization: 'Capacitación',         year: 2024, verify_url: null },
  { id: 'c-14', name: 'Bootcamp en Inteligencia Artificial',              organization: 'Tecnologías Emergentes', year: 2024, verify_url: null },
  { id: 'c-15', name: 'Blockchain y Tecnologías Emergentes',              organization: 'Capacitación',         year: 2024, verify_url: null },
  { id: 'c-16', name: 'Formación técnica en Bitcoin',                     organization: 'Node Nation · ONBTC',  year: 2024, verify_url: null },
  { id: 'c-17', name: 'Diploma en Desarrollo de Startups',                organization: 'Capacitación',         year: 2025, verify_url: null },
  { id: 'c-18', name: 'Diploma de Liderazgo Estudiantil',                 organization: 'CNPE',                 year: 2024, verify_url: null },
  { id: 'c-19', name: 'Competencias y Habilidades Socioemocionales',      organization: 'Capacitación',         year: 2025, verify_url: null },
];

// ════════════════════════════════════════════════════════════════════════════
//  STATS — para el about / hero (números editoriales)
// ════════════════════════════════════════════════════════════════════════════
export const STATS = [
  { value: '8.60', label: 'CUM Académico' },
  { value: '19+',  label: 'Certificaciones' },
  { value: '3+',   label: 'Roles de Liderazgo' },
  { value: '∞',    label: 'En aprendizaje' },
] as const;
