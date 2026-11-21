import { ExperienceList, SkillList } from './index';
import {
  CERTIFICATIONS,
  CLIENT_SIDE_SKILLS,
  DEVOPS_SKILLS,
  EDUCATIONS,
  EXPERIENCE,
  LANGUAGE_SKILLS,
  SERVER_SIDE_SKILLS,
  SUMMERY,
} from '../settings';
import { Card } from './index';
import { ULList } from './index';
import LinkedText from './LinkedText';
const Resume = () => {
  return (
    <>
      <Card title={'Summary'} id='summary'>
        <div className='space-y-3 text-sm leading-6 text-slate-700 print:space-y-1 print:text-[11px] print:leading-snug'>
          {SUMMERY.split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => (
              <p key={line}>
                <LinkedText text={line} />
              </p>
            ))}
        </div>
      </Card>
      <SkillList id='skills' title={'Client Side'} skills={CLIENT_SIDE_SKILLS} />
      <SkillList title={'Server Side'} skills={SERVER_SIDE_SKILLS} />
      <SkillList title={'Development & Operations'} skills={DEVOPS_SKILLS} />
      <Card title={'Education'} id='education'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 print:grid-cols-2 print:gap-3'>
          {EDUCATIONS.map((ulList, i) => {
            return <ULList key={i} title={ulList.title} items={ulList.items} />;
          })}
        </div>
      </Card>
      <ExperienceList items={EXPERIENCE} />
      <Card title={'Certification'} id='certification'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 print:grid-cols-2 print:gap-2'>
          {CERTIFICATIONS.map((ulList, i) => {
            return <ULList key={i} title={ulList.title} items={ulList.items} />;
          })}
        </div>
      </Card>
      <SkillList id='languages' title={'Languages'} skills={LANGUAGE_SKILLS} />
    </>
  );
};
export default Resume;
