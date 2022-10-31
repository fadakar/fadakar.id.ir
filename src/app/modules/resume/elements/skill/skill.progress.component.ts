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

  getWidth(): string {
    switch (this.level) {
      case Level.beginner:
        return '25%';
      case Level.medium:
        return '50%';
      case Level.advance:
        return '75%';
      case Level.expert:
        return '100%';
    }
  }
}
