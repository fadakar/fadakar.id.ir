import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-elements-skill',
  templateUrl: './skill.component.html',
})
export class SkillComponent implements OnInit {

  @Input() name: string;
  @Input() percent: number;

  constructor() { }

  ngOnInit(): void {
  }

}
