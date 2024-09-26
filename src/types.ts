
export enum Level {
    beginner = 1,
    medium = 2,
    advance = 3,
    expert = 4,
}


export class Skill {
    constructor(
        public name: string,
        public level: Level,
    ) {
    }
}


export class SkillSection {
    constructor(
        public title: string,
        public skills: Skill[],
    ) {
    }
}

export class ULListImage {
    constructor(
        public src: string,
        public alt: string,
    ) {
    }
}

export class UlList {
    constructor(
        public title: string,
        public items: (string | ULListImage)[],
    ) {
    }
}