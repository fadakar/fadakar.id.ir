import { JSX } from 'react';
import { SkillProgress } from './index';
import { SkillLevel, SkillLevelLabel } from '../types.ts';
interface Props {
  name: string;
  level: SkillLevel;
}
const Skill: ({ name, level }: Props) => JSX.Element = ({ name, level }) => {
  const classList = ['flex', 'flex-col', 'p-4', 'print:p-1'].filter(Boolean).join(' ');
  return (
    <div className={classList}>
      <div className='mb-2 px-2 flex justify-between font-bold text-gray-500 text-sm print:text-xs print:mb-0'>
        <span>{name}</span>
        <span className='hidden print:inline text-gray-400 font-normal'>
          {SkillLevelLabel[level]}
        </span>
      </div>
      <div className='print:hidden'>
        <SkillProgress level={level} />
      </div>
    </div>
  );
};
export default Skill;
