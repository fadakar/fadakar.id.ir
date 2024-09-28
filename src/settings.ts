import {calculateYearsToNow} from "./utils/datetime";
import {Level, Skill, SkillSection, UlList, ULListImage} from "./types";


export const GOOGLE_TAG_ID: string | undefined = 'G-8V4FTZG54C';
export const INFORMATION = {
  profileImage: '/assets/img/profile.jpeg',
  profileBackgroundImage: '/assets/img/profile-bg.webp',
  name: 'Gholamreza Fadakar',
  nameFa: 'غلامرضا فداکار',
  PDFFile: '/assets/pdf/gholamreza-fadakar-resume.pdf',
  position: 'Full-Stack Software Engineer',
  location: 'Iran, Tehran',
  experienceTime: calculateYearsToNow('2013-01-01'),
  birthday: '1994',
  phone: '+989190074754',
  email: 'fadakargholamreza@gmail.com',
  website: 'https://fdkr.ir',
  github: 'https://www.github.com/fadakar',
  linkedin: 'https://ir.linkedin.com/in/gholamreza-fadakar-759300b1',
};

export const SUMMERY: string = `
Passionate full-stack engineer with 9+ years of hands-on experience in developing scalable websites/applications using a wide range of front-end and back-end skills like HTML, CSS, Javascript, PHP, MySQL, laravel framework, angular framework, and etc.
I developed 30+ websites/applications from scratch in the areas of financial, accounting, treasury, customer relationship management, and warehouse management.
I am interested in knowledge sharing, exercising, and game playing.
`;


export const CLIENT_SIDE_SKILLS: Skill[] = [
  new Skill('Html', Level.expert),
  new Skill('CSS', Level.expert),
  new Skill('Javascript', Level.expert),
  new Skill('Typescript', Level.expert),
  new Skill('Angular', Level.expert),
  new Skill('ReactJs', Level.advance),
  new Skill('Vuejs/Vuex', Level.advance),
  new Skill('Tailwindcss', Level.expert),
  new Skill('Bootstrap', Level.expert),
  new Skill('Material UI', Level.expert),
];


export const SERVER_SIDE_SKILLS: Skill[] = [
  new Skill('PHP', Level.expert),
  new Skill('Laravel', Level.expert),
  new Skill('SQL', Level.expert),
  new Skill('Mysql', Level.expert),
  new Skill('Rest/Restful', Level.expert),
  new Skill('SOAP', Level.expert),
  new Skill('Nginx', Level.advance),
  new Skill('Apache', Level.advance),
  new Skill('Redis', Level.medium),
  new Skill('RabbitMQ', Level.medium),
  new Skill('ElasticSearch', Level.advance),
];


export const DEVOPS_SKILLS: Skill[] = [
  new Skill('Linux OS', Level.advance),
  new Skill('Bash', Level.advance),
  new Skill('Git', Level.expert),
  new Skill('Postman', Level.expert),
  new Skill('Swagger', Level.medium),
  new Skill('SOLID', Level.expert),
  new Skill('Design Patterns', Level.expert),
  new Skill('Agile/Scrum/Kanban', Level.expert),
  new Skill('Docker', Level.expert),
  new Skill('Docker Swarm', Level.advance),

  new Skill('CI/CD', Level.medium),
  new Skill('GitLab/Github', Level.expert),

  new Skill('Prometheus', Level.advance),
  new Skill('Grafana', Level.advance),


  new Skill('Analysis & Design', Level.expert),
  new Skill('Problem solving ability', Level.expert),
  new Skill('Creativity and innovation', Level.expert),
  new Skill('Team work', Level.expert),
];


export const FAMILIAR_SKILLS: Skill[] = [
  new Skill('Symfony Framework', Level.advance),
  new Skill('CodeIgniter Framework', Level.medium),
  new Skill('CakePhp Framework', Level.beginner),

  new Skill('TDD', Level.beginner),
  new Skill('NoSql/Mongodb', Level.expert),

  new Skill('Kubernetes', Level.medium),
  new Skill('Jenkins', Level.medium),
  new Skill('Ansible', Level.medium),


  new Skill('Node.js', Level.medium),
  new Skill('Express.js', Level.medium),
];


export const LANGUAGE_SKILLS: SkillSection[] = [
  new SkillSection('Persian - Native', [
    new Skill('Reading', Level.expert),
    new Skill('Writing', Level.expert),
    new Skill('Speaking', Level.expert),
    new Skill('Listening', Level.expert),
  ]),
  new SkillSection('English', [
    new Skill('Reading', Level.advance),
    new Skill('Writing', Level.advance),
    new Skill('Speaking', Level.advance),
    new Skill('Listening', Level.advance),
  ]),
];


export const EDUCATIONS: UlList[] = [
  new UlList('Associate in Computer', [
    'Branch: Software',
    'University: Enghelab-e Eslami Technical College',
    'Location: Tehran, Iran',
    'Graduated: 2015',
    'GPA: 17/20',
  ]),
  new UlList('Diploma in Computer', [
    'Branch: Software',
    'School: Shahid Ghasemi Conservatory',
    'Location: Tehran, Iran',
    'Graduated: 2012',
    'GPA: 18/20',
  ]),
];

export const EXPERIENCE: UlList[] = [
  new UlList('Full Stack Developer', [
    'Company: Mohaymen CO ( Soroush Plus Messenger )',
    'Position: Senior Full Stack Developer',
    'Location: Tehran, Iran',
    'Date: DEC 2022 - Now',
    'Technologies: PHP, Laravel, Nginx, Mysql, Typescript, ReactJS, WebSocket, Tailwind',
  ]),
  new UlList('Full Stack PHP Developer', [
    'Company: Hamyar Sanat Co',
    'Position: Senior Full Stack PHP Developer',
    'Location: Tehran, Iran',
    'Date: 2020 - May 2022',
    'Technologies: PHP, Laravel, Nginx, Mysql, Elasticsearch, Typescript, Angular, Tailwind',
  ]),
  new UlList('Full Stack PHP Developer', [
    'Company: Efadd Co',
    'Position: Senior Full Stack PHP Developer',
    'Location: Tehran, Iran',
    'Date: 2017 - 2020',
    'Technologies: PHP, Laravel, Nginx, Mysql ,Rabbitmq',
  ]),
  new UlList('Full Stack PHP Developer', [
    'Company: Selak Pardaz Co',
    'Position: Mid-Level Full Stack PHP Developer',
    'Location: Tehran, Iran',
    'Date: June 2017 - December 2017',
    'Technologies: PHP, Laravel, Nginx, Mysql, Bootstrap, jquery',
  ]),
  new UlList('Full Stack PHP Developer', [
    'Freelancer',
    'Position: Mid-Level Full Stack PHP Developer',
    'Location: Tehran, Iran',
    'Date: 2014 - 2017',
    'Technologies: PHP, Laravel, Nginx, Mysql, Bootstrap, jquery',
  ]),
  new UlList('Backend PHP Developer', [
    'Company: Nahal Nik Royesh CO',
    'Position: Junior Backend PHP Developer',
    'Location: Tehran, Iran',
    'Date: 2013 - 2014',
    'Technologies: PHP Pure, Apache, Mysql, Bootstrap, jquery',
  ]),
];

export const CERTIFICATIONS: UlList[] = [
  new UlList('ReactJs', [
    'Institutions: Sematec Co',
    'Location: Tehran, Iran',
    'Date: 2023',
    'GPA: 95/100',
    new ULListImage('/assets/cert/reactjs.jpg', 'غلامرضا فداکار ریکت')
  ]),
  new UlList('Development And Operations Administration Pack', [
    'Institutions: Sematec Co',
    'Location: Tehran, Iran',
    'Date: 2022',
    'GPA : 100/100',
    new ULListImage('/assets/cert/devops.png', 'غلامرضا فداکار دیواپس')
  ]),
  new UlList('Linux Fundamentals And Basic Administration', [
    'Institutions: Sematec Co',
    'Location: Tehran, Iran',
    'Date: 2022',
    'GPA : 95/100',
    new ULListImage('/assets/cert/lpic1.jpg', 'غلامرضا فداکار لینوکس')
  ]),
  new UlList('Java Standard & Enterprise Edition', [
    'Institutions: Laitec Co',
    'Location: Tehran, Iran',
    'Date: 2022',
    'GPA : 100/100',
    new ULListImage('/assets/cert/j2ee.jpg', 'غلامرضا فداکار جاوا')
  ]),
];
