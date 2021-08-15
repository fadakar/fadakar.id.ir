import { Component, OnInit } from '@angular/core';
import {Skill} from "../_models/Skill";

@Component({
  selector: 'app-home-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class HomeIndexComponent implements OnInit {

  skills: Skill[] = [
    new Skill('PHP', 99),
    new Skill('طراحی', 70),
    new Skill('Laravel', 99),
    new Skill('MySql', 99),
    new Skill('Mongodb', 80),
    new Skill('Linux', 80),
    new Skill('Nginx', 80),
    new Skill('Rest Api', 99),
    new Skill('Html/Css', 99),
    new Skill('Bootstrap/Jquery', 90),
    new Skill('Javascript', 90),
    new Skill('TypeScript', 90),
    new Skill('Angular', 85),
    new Skill('Git', 90),
    new Skill('Scrum/jira', 70),
    new Skill('ElasticSearch', 50),
    new Skill('Nodejs', 60),
    new Skill('خلاقیت', 90),
    new Skill('روحیه تیمی', 90),
    new Skill('توانایی حل مسئله', 95),
  ];

  constructor() { }
  ngOnInit(): void {}

}
