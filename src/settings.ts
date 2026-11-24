export const GOOGLE_TAG_ID: string | undefined = 'G-8V4FTZG54C';

export const INFORMATION = {
  name: 'Gholamreza Fadakar',
  nameFa: 'غلامرضا فداکار',
  profileImage: '/assets/img/profile.webp',
  PDFFile: '/assets/pdf/gholamreza-fadakar-resume.pdf',
  position: 'Senior Full-Stack Engineer',
  careerStart: 2013,
  location: 'Tehran, Iran',
  phone: '+989190074754',
  email: 'fadakargholamreza@gmail.com',
  website: 'https://fdkr.ir',
  github: 'https://github.com/fadakar',
  linkedin: 'https://ir.linkedin.com/in/gholamreza-fadakar-759300b1',
};

export const SUMMARY =
  'I build messaging software at Soroush Plus, from the web client to the gateway businesses use to reach customers across messengers.';

export const PROJECT_NAMES: Record<string, string> = {
  'vitrin.splus.ir': 'the Vitrin app',
  'map.splus.ir': 'the map app',
  'l.splus.ir': 'the link scanner',
  'bui.splus.ir': 'the cross-messenger gateway panel',
};

export interface Job {
  company: string;
  role: string;
  dates: string;
  current?: boolean;
  stack: string[];
  achievements: string[];
}

export const EXPERIENCE: Job[] = [
  {
    company: 'Mohaymen · Soroush Plus Messenger',
    role: 'Senior Backend Developer',
    dates: 'Aug 2025 – Present',
    current: true,
    stack: ['Java', 'Spring Boot', 'Oracle', 'Kafka', 'Redis', 'Kubernetes', 'Ceph S3', 'CI/CD'],
    achievements: [
      'Built business.splus.ir so businesses can send bulk messages across multiple messengers through one gateway.',
      'Added advertising tools that let businesses manage messenger campaigns from the gateway.',
    ],
  },
  {
    company: 'Mohaymen · Soroush Plus Messenger',
    role: 'Senior Full-Stack Developer',
    dates: 'Dec 2022 – Aug 2025',
    stack: [
      'TypeScript',
      'React',
      'React Native',
      'WebSocket',
      'Laravel',
      'PHP',
      'MySQL',
      'Nginx',
      'Tailwind CSS',
      'Kubernetes',
      'CI/CD',
    ],
    achievements: [
      'Built and maintained the messenger at web.splus.ir and adapted the web app into a React Native mobile client.',
      'Delivered vitrin.splus.ir, map.splus.ir, and l.splus.ir, along with the accounts and administration panels.',
      'Developed the Gangsters game backend, bui.splus.ir, and the website and management tools for soroushplus.com.',
    ],
  },
  {
    company: 'Hamyar Sanat',
    role: 'Senior Full-Stack PHP Developer',
    dates: '2020 – May 2022',
    stack: [
      'PHP',
      'Laravel',
      'Angular',
      'TypeScript',
      'MySQL',
      'Elasticsearch',
      'Nginx',
      'Tailwind CSS',
    ],
    achievements: [
      'Built three business applications for customer relationship management, accounting, and treasury operations.',
      'Developed and maintained both the Laravel backends and the Angular interfaces for all three applications.',
    ],
  },
  {
    company: 'Efadd',
    role: 'Senior Full-Stack PHP Developer',
    dates: '2017 – 2020',
    stack: ['PHP', 'Laravel', 'MySQL', 'RabbitMQ', 'Nginx'],
    achievements: [
      'Built shipment and accounting systems for distribution agencies and Iran National Post parcel operations.',
      'Developed warehouse software for central and provincial facilities, plus CRM, treasury, and centralized accounting systems for the holding company.',
    ],
  },
  {
    company: 'Selak Pardaz',
    role: 'Mid-Level Full-Stack PHP Developer',
    dates: 'Jun 2017 – Dec 2017',
    stack: ['PHP', 'Laravel', 'MySQL', 'Nginx', 'Bootstrap', 'jQuery'],
    achievements: [
      'Built the diet-plan generator for rejim.ir and a student management system that let teachers review student performance.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Mid-Level Full-Stack PHP Developer',
    dates: '2014 – 2017',
    stack: ['PHP', 'Laravel', 'MySQL', 'Nginx', 'Bootstrap', 'jQuery'],
    achievements: ['Built and maintained nearly 20 client websites using PHP and Laravel.'],
  },
  {
    company: 'Nahal Nik Royesh',
    role: 'Junior Backend PHP Developer',
    dates: '2013 – 2014',
    stack: ['PHP', 'Apache', 'MySQL', 'Bootstrap', 'jQuery'],
    achievements: [
      'Developed the backends for the artibition.net store and PAD, a social information portal.',
    ],
  },
];

export const SKILLS = [
  { title: 'Backend', names: ['Java', 'Spring Boot', 'Node.js', 'PHP', 'Laravel'] },
  {
    title: 'Frontend',
    names: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Angular',
      'React Native',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Bootstrap',
      'Material UI',
    ],
  },
  {
    title: 'Data & messaging',
    names: [
      'SQL',
      'Oracle',
      'MySQL',
      'MariaDB',
      'Redis',
      'Kafka',
      'RabbitMQ',
      'Elasticsearch',
      'WebSocket',
    ],
  },
  {
    title: 'Infrastructure',
    names: ['Docker', 'Kubernetes', 'Docker Swarm', 'Nginx', 'Linux', 'Bash', 'Ceph S3'],
  },
  {
    title: 'Delivery & tooling',
    names: ['Git', 'GitLab', 'GitHub', 'CI/CD', 'Prometheus', 'Grafana', 'Postman', 'Swagger'],
  },
];

export const EDUCATION = [
  {
    title: 'Associate Degree in Computer Software',
    school: 'Enghelab-e Eslami Technical College',
    year: '2015',
    grade: '17/20',
  },
  {
    title: 'Diploma in Computer Software',
    school: 'Shahid Ghasemi Conservatory',
    year: '2012',
    grade: '18/20',
  },
];

export const CERTIFICATIONS = [
  { title: 'React.js', institution: 'Sematec', year: '2023', grade: '95/100', file: 'reactjs.jpg' },
  {
    title: 'Development and Operations Administration Pack',
    institution: 'Sematec',
    year: '2022',
    grade: '100/100',
    file: 'devops.png',
  },
  {
    title: 'Linux Fundamentals and Basic Administration',
    institution: 'Sematec',
    year: '2022',
    grade: '95/100',
    file: 'lpic1.jpg',
  },
  {
    title: 'Java Standard & Enterprise Edition',
    institution: 'Laitec',
    year: '2022',
    grade: '100/100',
    file: 'j2ee.jpg',
  },
];

export const LANGUAGES = [
  { name: 'Persian', level: 'Native' },
  { name: 'English', level: 'Advanced' },
];
