import {FC} from "react";
import {SkillProgress} from "./index";
import {SkillLevel} from "../types.ts";


interface Props {
  name: string,
  level: SkillLevel,
}

const Skill: FC<Props> = ({name, level}) => {

  const classList = [
    'flex',
    'flex-col',
    'p-4',
  ].filter(Boolean).join(' ');

  return (
    <div className={classList}>
      <div className="mb-2 px-2 flex justify-between font-bold text-gray-500 text-sm print:text-lg">
        {name}
      </div>
      <SkillProgress level={level}/>
    </div>
  )
}

export default Skill;
