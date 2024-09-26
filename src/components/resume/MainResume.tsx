import {AsideResume, SkillList} from "../index.ts";
import {
    CERTIFICATIONS,
    CLIENT_SIDE_SKILLS,
    DEVOPS_SKILLS, EDUCATIONS, EXPERIENCE,
    FAMILIAR_SKILLS,
    LANGUAGE_SKILLS,
    SERVER_SIDE_SKILLS, SUMMERY
} from "../../settings.ts";
import {Card} from "../index.ts";
import {ULList} from "../index.ts";

const MainResume = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 print:grid-cols-1" style={{fontFamily: "Open Sans"}}>
            <div className="col-span-1">
                <AsideResume/>
            </div>

            <div className="col-span-2 flex flex-col gap-4 mt-4 lg:mt-0">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 px-2 print:text-lg">
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


                <div className="text-center print:hidden">
                    <a className="text-gray-400 text-sm" target="_blank"
                       href="https://github.com/fadakar/fadakar.id.ir">
                        Fork Template On Github
                    </a>
                </div>
                <div className="mt-2 lg:mt-0 print:hidden"></div>
            </div>
        </div>
    )
}

export default MainResume;