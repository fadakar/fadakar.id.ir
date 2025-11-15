import {SkillList} from "./index";
import {
  CERTIFICATIONS,
  CLIENT_SIDE_SKILLS,
  DEVOPS_SKILLS, EDUCATIONS, EXPERIENCE,
  FAMILIAR_SKILLS,
  LANGUAGE_SKILLS,
  SERVER_SIDE_SKILLS, SUMMERY
} from "../settings";
import {Card} from "./index";
import {ULList} from "./index";

const Resume = () => {
  return (
    <>
      <Card title={'Summary'}>
        <div className="text-gray-500 text-sm print:text-lg leading-7 px-2">
          {SUMMERY.split("\n").map((line, i) => <p key={i}>{line}</p>)}
        </div>
      </Card>


      <SkillList title={'Client Side'} skills={CLIENT_SIDE_SKILLS}/>
      <SkillList title={'Server Side'} skills={SERVER_SIDE_SKILLS}/>
      <SkillList title={'Development & Operations'} skills={DEVOPS_SKILLS}/>
      <SkillList title={'Familiar With'} skills={FAMILIAR_SKILLS}/>


      <Card title={'Education'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 px-2 print:text-lg">
          {EDUCATIONS.map((ulList, i) => {
            return (
              <ULList key={i} title={ulList.title} items={ulList.items}/>
            )
          })}
        </div>
      </Card>

      <Card title={'Experience'}>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mt-2 px-2 print:text-lg">
          {EXPERIENCE.map((ulList, i) => {
            return (
              <ULList key={i} title={ulList.title} items={ulList.items}/>
            )
          })}
        </div>
      </Card>

      <Card title={'Certification'}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 px-2 print:text-lg">
          {CERTIFICATIONS.map((ulList, i) => {
            return (
              <ULList key={i} title={ulList.title} items={ulList.items}/>
            )
          })}
        </div>
      </Card>

      <SkillList title={'Languages'} skills={LANGUAGE_SKILLS}/>
    </>

  )
}

export default Resume;
