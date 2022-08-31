import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Skill} from "../_models/Skill";
import * as $ from 'jquery';
import {Level} from '../_models/level';


@Component({
  selector: 'app-home-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class HomeIndexComponent implements OnInit {

  skills: Skill[] = [
    new Skill('PHP', Level.expert),
    new Skill('Laravel', Level.expert),
    new Skill('Lumen', Level.advance),
    new Skill('MySql', Level.expert),
    new Skill('Mongodb', Level.advance),
    new Skill('LPIC1', Level.advance),
    new Skill('Nginx', Level.advance),
    new Skill('Rest/Restful', Level.expert),
    new Skill('Html/Css', Level.expert),
    new Skill('TailwindCss', Level.expert),
    new Skill('Bootstrap', Level.expert),
    new Skill('SEO', Level.advance),
    new Skill('Javascript', Level.advance),
    new Skill('TypeScript', Level.expert),
    new Skill('Angular', Level.expert),
    new Skill('Webpack', Level.advance),
    new Skill('Git', Level.expert),
    new Skill('Scrum/Developer', Level.advance),
    new Skill('ElasticSearch', Level.advance),
    new Skill('Docker', Level.expert),
    new Skill('Kubernetes', Level.beginner),
    new Skill('CI/CD', Level.beginner),
    new Skill('تحلیل و طراحی نرم افزاری', Level.expert),
    new Skill('خلاقیت', Level.expert),
    new Skill('روحیه تیمی', Level.expert),
    new Skill('توانایی حل مسئله', Level.expert),
  ];

  familiarSkills: Skill[] = [
    new Skill('++C', Level.medium),
    new Skill('SASS', Level.advance),
    new Skill('Express.js', Level.medium),
    new Skill('ASP.NET', Level.medium),
    new Skill('CodeIgniter', Level.medium),
    new Skill('Symfony', Level.advance),
    new Skill('Arduino', Level.medium),
    new Skill('Python', Level.advance),
    new Skill('JavaSE', Level.expert),
    new Skill('JavaEE', Level.expert),
    new Skill('Spring', Level.medium),
    new Skill('JPA', Level.medium),
    new Skill('C#', Level.expert),
    new Skill('C#/Wpf', Level.medium),
    new Skill('C#/WindowsForm', Level.expert),
    new Skill('jenkins', Level.medium),
    new Skill('ansible', Level.medium),
  ];


  @ViewChild('menuBtn') menuBtn: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

    $(window).on('load', function () {
      $('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
      $('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
      $('body').delay(333);
    });

  }

  scrollToElement($element: HTMLElement) {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    if (this.navMenu.nativeElement.classList.contains('show')) {
      this.menuBtn.nativeElement.click();
    }
  }
}
