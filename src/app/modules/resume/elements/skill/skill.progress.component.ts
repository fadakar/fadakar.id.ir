


import {Component, OnInit, Input} from '@angular/core';
import {Level} from '../../_models/level';

@Component({
  selector: 'app-elements-skill-progress',
  templateUrl: './skill.progress.component.html',
  styleUrls: ['skill.progress.component.scss']
})
export class SkillProgressComponent implements OnInit {

  @Input() level: Level;

  constructor() {
  }

  get Level(): any {
    return Level;
  }

  ngOnInit(): void {
  }

  getLevelBudget(level: Level): string {
    switch (level) {
      case Level.beginner:
        return 'مبتدی';
      case Level.medium:
        return 'متوسط';
      case Level.advance:
        return 'پیشرفته';
      case Level.expert:
        return 'حرفه ای';
    }
  }
}
