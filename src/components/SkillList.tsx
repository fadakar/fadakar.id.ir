import {JSX} from "react";
import {Card, Skill as SkillComponent} from "./index";
import {Skill, SkillSection} from "../types";


interface Props {
  title: string,
  skills: Skill[] | SkillSection[],
}

const SkillList: ({title, skills}: Props) => JSX.Element = ({title, skills}) => {

  const isSection = skills[0] instanceof SkillSection;

  const renderContent = () => {
    if (!isSection) {
      return (
        <div className="grid grid-cols-2 lg:grid-cols-3 px-2">
          {skills.map((skill, i) => {
            if (skill instanceof Skill) {
              return (
                <SkillComponent key={i} name={skill.name} level={skill.level}/>
              )
            }
          })}
        </div>
      )
    } else {
      return skills.map((skill, i) => {
        if (skill instanceof SkillSection) {
          return (
            <div key={i} className="flex flex-col gap-2 px-2 mt-4 w-full">
              <div className="font-bold text-gray-500">{skill.title}</div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                {skill.skills.map((subSkill: Skill, j: number) => {
                  return (
                    <SkillComponent key={j} name={subSkill.name} level={subSkill.level}/>
                  )
                })}
              </div>
            </div>
          )
        }
      });
    }
  }

  return (
    <Card title={title}>
      {renderContent()}
    </Card>
  )
}

export default SkillList;
