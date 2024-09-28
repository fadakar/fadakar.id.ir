import {SkillProgress} from "./index";

const Skill = ({name, level, hasSection = false}) => {

    const classList = [
        'flex',
        'flex-col',
        'p-4',
        // !hasSection && 'w-1/3'
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