import { JSX } from 'react';
import { Card, Skill as SkillComponent } from './index';
import { Skill, SkillSection } from '../types';

interface Props {
  title: string;
  skills: Skill[] | SkillSection[];
  id?: string;
}

const printLine = (skills: Skill[], title?: string) => {
  if (title) return title;
  return skills.map((skill) => skill.name).join(', ');
};

const SkillChips = ({ skills }: { skills: Skill[] }) => {
  return (
    <ul className='flex flex-wrap gap-1.5 print:hidden'>
      {skills.map((skill) => (
        <SkillComponent key={skill.name} name={skill.name} />
      ))}
    </ul>
  );
};

const PrintLine = ({ line }: { line: string }) => {
  return <p className='hidden text-[11px] leading-snug text-slate-800 print:block'>{line}</p>;
};

const SkillList: ({ title, skills, id }: Props) => JSX.Element = ({ title, skills, id }) => {
  const isSection = skills[0] instanceof SkillSection;

  const renderContent = () => {
    if (!isSection) {
      const list = skills.filter((skill): skill is Skill => skill instanceof Skill);
      return (
        <>
          <SkillChips skills={list} />
          <PrintLine line={printLine(list)} />
        </>
      );
    }

    return (skills as SkillSection[]).map((section) => {
      return (
        <div key={section.title} className='mt-2 first:mt-0 print:mt-1'>
          <p className='text-sm font-medium text-slate-800 print:hidden'>{section.title}</p>
          <PrintLine line={printLine(section.skills, section.title)} />
        </div>
      );
    });
  };

  return (
    <Card title={title} id={id} dense>
      {renderContent()}
    </Card>
  );
};
export default SkillList;
