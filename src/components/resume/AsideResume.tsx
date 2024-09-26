import {Card} from "../index.ts";
import {INFORMATION} from "../../settings.ts";

const AsideResume = () => {
    return (
        <div className="flex flex-col print:flex-row gap-4 lg:sticky lg:top-5 ">

            <div
                className="print:w-full print:min-h-[180px]  bg-white rounded-lg border border-gray-300 shadow-md overflow-hidden">
                <img className="print:hidden rounded-t-lg w-full select-none" draggable="false"
                     src="/assets/img/1.jpg"
                     alt="programmer"/>

                <div className="relative w-[7rem]">
                    <img
                        className="absolute top-[-70px] left-[35px] print:static print:ml-7 print:mt-7  rounded-xl ring-2 ring-white outline-2 outline-gray-400"
                        draggable="false" src="/assets/img/profile.jpeg" alt="غلامرضا فداکار"/>
                </div>

                <div className="p-4 pt-12 flex flex-col gap-2 px-8">
                    <h5 className=" text-xl tracking-tight text-gray-800 ">{INFORMATION.name}</h5>
                    <p className="pl-1 text-md text-gray-700">{INFORMATION.position}</p>
                </div>

                <div className="flex flex-col print:hidden">
                    <a target="_blank" href="/assets/pdf/gholamreza-fadakar-resume.pdf"
                       className="w-full text-center focus:outline-none text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-4  hover:cursor-pointer transition-all ease-in-out">
                        Download PDF
                    </a>
                </div>


            </div>

            {/*<!------------------------------------------------------------------->*/}
            {/*<!----------------------- section Information ----------------------->*/}
            {/*<!------------------------------------------------------------------->*/}

            <Card title={'Information'}>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="text-gray-500">Location</div>
                        <div className="text-gray-700">{INFORMATION.location}</div>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-gray-500">Experience</div>
                        <div className="text-gray-700">{INFORMATION.experienceTime}</div>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-gray-500">Birthday</div>
                        <div className="text-gray-700">{INFORMATION.birthday}</div>
                    </div>

                    <div className="hidden print:flex justify-between ">
                        <div className="text-gray-500"></div>
                        <div className="text-gray-700"><br/></div>
                    </div>

                    <div className="hidden print:flex justify-between ">
                        <div className="text-gray-500"></div>
                        <div className="text-gray-700"><br/></div>
                    </div>

                    <div className="hidden print:flex justify-between ">
                        <div className="text-gray-500"></div>
                        <div className="text-gray-700"><br/></div>
                    </div>
                </div>


            </Card>


            {/*<!------------------------------------------------------------------->*/}
            {/*<!----------------------- section Contact Me ------------------------>*/}
            {/*<!------------------------------------------------------------------->*/}
            <Card title={'Contact Me'}>
                <div className="flex flex-col gap-2">

                    <div className="flex justify-between">
                        <div className="text-gray-500">Phone</div>
                        <a className="text-gray-700" target="_blank"
                           href="tel:+989190074754">{INFORMATION.phone}</a>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-gray-500">Email</div>
                        <a className="text-gray-700" target="_blank"
                           href="mailto:fadakargholamreza@gmail.com">{INFORMATION.email}</a>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-gray-500">Personal Website</div>
                        <a className="text-gray-700" target="_blank"
                           href={INFORMATION.website}>{INFORMATION.website}</a>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-gray-500">Github</div>
                        <a className="text-gray-700" target="_blank" href={INFORMATION.github}>Visit
                            Github</a>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-gray-500">Linkedin</div>
                        <a className="text-gray-700" target="_blank"
                           href={INFORMATION.linkedin}>Visit
                            Linkedin</a>
                    </div>

                    <div className="hidden print:flex justify-between ">
                        <div className="text-gray-500"></div>
                        <div className="text-gray-700"><br/></div>
                    </div>
                </div>

            </Card>

        </div>
    )
}

export default AsideResume;