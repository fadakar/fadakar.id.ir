export enum SkillLevel {
  beginner = 1,
  medium = 2,
  advance = 3,
  expert = 4,
}


export class Skill {
  constructor(
    public name: string,
    public level: SkillLevel,
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

export type ULItem = string | ULListImage;

export class UlList {
  constructor(
    public title: string,
    public items: ULItem[],
  ) {
  }
}
