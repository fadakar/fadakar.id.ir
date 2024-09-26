import {useMemo} from "react";
import {Level} from "../types.ts";

const SkillProgress = ({level}) => {

    const width = useMemo(() => {
        switch (level) {
            case Level.beginner:
                return '25%';
            case Level.medium:
                return '50%';
            case Level.advance:
                return '75%';
            case Level.expert:
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