import {Component, OnInit, Input} from '@angular/core';
import {Level} from '../../_models/level';

@Component({
  selector: 'app-elements-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() name: string;
  @Input() level: Level;
  @Input() color: 'bg-success' | 'bg-info' | 'bg-danger' | 'bg-warning' | 'bg-light' | 'bg-dark' = 'bg-success'
  @Input() hexColor: string;

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
