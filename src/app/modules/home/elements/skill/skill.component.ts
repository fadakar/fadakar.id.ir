import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-elements-skill',
  templateUrl: './skill.component.html',
})
export class SkillComponent implements OnInit {

  @Input() name: string;
  @Input() percent: number;
  @Input() color: 'bg-success' | 'bg-info' | 'bg-danger' | 'bg-warning' | 'bg-light' | 'bg-dark' = 'bg-success'
  @Input() hexColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
