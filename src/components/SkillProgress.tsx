import { JSX } from 'react';
import { useMemo } from 'react';
import { SkillLevel } from '../types';
interface Props {
  level: SkillLevel;
}
const SkillProgress: ({ level }: Props) => JSX.Element = ({ level }) => {
  const width = useMemo(() => {
    switch (level) {
      case SkillLevel.beginner:
        return '25%';
      case SkillLevel.medium:
        return '50%';
      case SkillLevel.advance:
        return '75%';
      case SkillLevel.expert:
        return '100%';
    }
  }, [level]);
  return (
    <div
      className='h-1.5 w-full rounded-full bg-slate-200 print:h-0.5'
      role='meter'
      aria-valuenow={level}
      aria-valuemin={1}
      aria-valuemax={4}
      aria-valuetext={String(level)}
    >
      <div className='h-1.5 rounded-full bg-blue-600 print:h-0.5' style={{ width: width }}></div>
    </div>
  );
};
export default SkillProgress;
