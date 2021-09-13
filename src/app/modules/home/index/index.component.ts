import { Component, OnInit } from '@angular/core';
import {Skill} from "../_models/Skill";
import * as $ from 'jquery';


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
    new Skill('Lumen', 99),
    new Skill('MySql', 99),
    new Skill('Mongodb', 80),
    new Skill('Linux', 80),
    new Skill('Nginx', 80),
    new Skill('Rest', 99),
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

  familiarSkills: Skill[] = [
    new Skill('++C', 40),
    new Skill('SASS', 40),
    new Skill('Tailwind', 40),
    new Skill('Express.js', 40),
    new Skill('ASP.NET', 40),
    new Skill('CodeIgniter', 40),
    new Skill('Symfony', 40),
    new Skill('Arduino', 40),
    new Skill('Python', 40),
    new Skill('JavaSE', 40),
    new Skill('C#', 40),
    new Skill('C#/Wpf', 40),
    new Skill('C#/WindowsForm', 40),
    new Skill('Docker', 40),
  ];

  constructor() { }
  ngOnInit(): void {

    $(window).on('load', function () {
      $('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
      $('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(333);
    });

  }

  scrollToElement($element: HTMLElement) {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
  }
}
