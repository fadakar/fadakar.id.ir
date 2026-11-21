import { JSX } from 'react';
import { Card, Skill as SkillComponent } from './index';
import { Skill, SkillSection } from '../types';

interface Props {
  title: string;
  skills: Skill[] | SkillSection[];
  id?: string;
  bare?: boolean;
}

const printLine = (skills: Skill[], title?: string, names = true) => {
  if (title && !names) return title;
  const list = skills.map((skill) => skill.name).join(', ');
  return title ? `${title}: ${list}` : list;
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

const SkillList: ({ title, skills, id, bare }: Props) => JSX.Element = ({
  title,
  skills,
  id,
  bare,
}) => {
  const isSection = skills[0] instanceof SkillSection;

  const renderContent = () => {
    if (!isSection) {
      const list = skills.filter((skill): skill is Skill => skill instanceof Skill);
      return (
        <div className={bare ? 'mt-3 first:mt-0 print:mt-1' : undefined}>
          {bare && (
            <h3 className='mb-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase print:mb-0 print:text-[11px]'>
              {title}
            </h3>
          )}
          <SkillChips skills={list} />
          <PrintLine line={printLine(list, bare ? title : undefined)} />
        </div>
      );
    }

    return (
      <>
        {(skills as SkillSection[]).map((section) => (
          <div key={section.title} className='mt-2 first:mt-0 print:mt-1'>
            <p className='text-sm font-medium text-slate-800 print:hidden'>{section.title}</p>
            <PrintLine line={printLine(section.skills, section.title, false)} />
          </div>
        ))}
      </>
    );
  };

  if (bare) return renderContent();

  return (
    <Card title={title} id={id} dense>
      {renderContent()}
    </Card>
  );
};
export default SkillList;
