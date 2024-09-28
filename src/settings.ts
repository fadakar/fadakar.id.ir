import {calculateYearsToNow} from "./utils/datetime";
import {SkillLevel, Skill, SkillSection, UlList, ULListImage} from "./types";


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
  new Skill('Html', SkillLevel.expert),
  new Skill('CSS', SkillLevel.expert),
  new Skill('Javascript', SkillLevel.expert),
  new Skill('Typescript', SkillLevel.expert),
  new Skill('Angular', SkillLevel.expert),
  new Skill('ReactJs', SkillLevel.advance),
  new Skill('Vuejs/Vuex', SkillLevel.advance),
  new Skill('Tailwindcss', SkillLevel.expert),
  new Skill('Bootstrap', SkillLevel.expert),
  new Skill('Material UI', SkillLevel.expert),
];


export const SERVER_SIDE_SKILLS: Skill[] = [
  new Skill('PHP', SkillLevel.expert),
  new Skill('Laravel', SkillLevel.expert),
  new Skill('SQL', SkillLevel.expert),
  new Skill('Mysql', SkillLevel.expert),
  new Skill('Rest/Restful', SkillLevel.expert),
  new Skill('SOAP', SkillLevel.expert),
  new Skill('Nginx', SkillLevel.advance),
  new Skill('Apache', SkillLevel.advance),
  new Skill('Redis', SkillLevel.medium),
  new Skill('RabbitMQ', SkillLevel.medium),
  new Skill('ElasticSearch', SkillLevel.advance),
];


export const DEVOPS_SKILLS: Skill[] = [
  new Skill('Linux OS', SkillLevel.advance),
  new Skill('Bash', SkillLevel.advance),
  new Skill('Git', SkillLevel.expert),
  new Skill('Postman', SkillLevel.expert),
  new Skill('Swagger', SkillLevel.medium),
  new Skill('SOLID', SkillLevel.expert),
  new Skill('Design Patterns', SkillLevel.expert),
  new Skill('Agile/Scrum/Kanban', SkillLevel.expert),
  new Skill('Docker', SkillLevel.expert),
  new Skill('Docker Swarm', SkillLevel.advance),

  new Skill('CI/CD', SkillLevel.medium),
  new Skill('GitLab/Github', SkillLevel.expert),

  new Skill('Prometheus', SkillLevel.advance),
  new Skill('Grafana', SkillLevel.advance),


  new Skill('Analysis & Design', SkillLevel.expert),
  new Skill('Problem solving ability', SkillLevel.expert),
  new Skill('Creativity and innovation', SkillLevel.expert),
  new Skill('Team work', SkillLevel.expert),
];


export const FAMILIAR_SKILLS: Skill[] = [
  new Skill('Symfony Framework', SkillLevel.advance),
  new Skill('CodeIgniter Framework', SkillLevel.medium),
  new Skill('CakePhp Framework', SkillLevel.beginner),

  new Skill('TDD', SkillLevel.beginner),
  new Skill('NoSql/Mongodb', SkillLevel.expert),

  new Skill('Kubernetes', SkillLevel.medium),
  new Skill('Jenkins', SkillLevel.medium),
  new Skill('Ansible', SkillLevel.medium),


  new Skill('Node.js', SkillLevel.medium),
  new Skill('Express.js', SkillLevel.medium),
];


export const LANGUAGE_SKILLS: SkillSection[] = [
  new SkillSection('Persian - Native', [
    new Skill('Reading', SkillLevel.expert),
    new Skill('Writing', SkillLevel.expert),
    new Skill('Speaking', SkillLevel.expert),
    new Skill('Listening', SkillLevel.expert),
  ]),
  new SkillSection('English', [
    new Skill('Reading', SkillLevel.advance),
    new Skill('Writing', SkillLevel.advance),
    new Skill('Speaking', SkillLevel.advance),
    new Skill('Listening', SkillLevel.advance),
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
