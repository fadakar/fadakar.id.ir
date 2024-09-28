import {FC} from "react";
import {useMemo} from "react";
import {SkillLevel} from "../types";


interface Props {
    level: SkillLevel,
}

const SkillProgress: FC<Props> = ({level}) => {

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
    }, [level])

    return (
        <div className="w-full bg-gray-200 rounded-full h-0.5">
            <div className="bg-blue-600 h-0.5 rounded-full" style={{width: width}}></div>
        </div>
    )
}

export default SkillProgress;
