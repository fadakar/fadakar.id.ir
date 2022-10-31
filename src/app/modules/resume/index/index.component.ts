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
    new Skill('MySql', Level.expert),
    new Skill('Html/Css', Level.expert),
    new Skill('Rest/Restful', Level.expert),
    new Skill('TailwindCss', Level.expert),
    new Skill('Bootstrap', Level.expert),
    new Skill('TypeScript', Level.expert),
    new Skill('Angular', Level.expert),
    new Skill('Git', Level.expert),
    new Skill('Redis', Level.expert),
    new Skill('Design Patterns', Level.expert),
    new Skill('Scrum/Developer', Level.expert),
    new Skill('Docker', Level.expert),
    new Skill('تحلیل و طراحی نرم افزاری', Level.expert),
    new Skill('خلاقیت', Level.expert),
    new Skill('روحیه تیمی', Level.expert),
    new Skill('توانایی حل مسئله', Level.expert),

    new Skill('Lumen', Level.advance),
    new Skill('Mongodb', Level.advance),
    new Skill('LPIC1', Level.advance),
    new Skill('Nginx', Level.advance),
    new Skill('SEO', Level.advance),
    new Skill('Javascript', Level.advance),
    new Skill('Webpack', Level.advance),
    new Skill('ElasticSearch', Level.advance),
    new Skill('Docker Swarm', Level.advance),

    new Skill('Kubernetes', Level.beginner),
    new Skill('CI/CD', Level.beginner),

  ];

  familiarSkills: Skill[] = [
    new Skill('C#', Level.expert),
    new Skill('C#/WindowsForm', Level.expert),
    new Skill('JavaSE', Level.expert),
    new Skill('JavaEE', Level.expert),

    new Skill('Symfony', Level.advance),
    new Skill('Python', Level.advance),

    new Skill('++C', Level.medium),
    new Skill('Express.js', Level.medium),
    new Skill('ASP.NET', Level.medium),
    new Skill('CodeIgniter', Level.medium),
    new Skill('Arduino', Level.medium),
    new Skill('Spring', Level.medium),
    new Skill('JPA', Level.medium),
    new Skill('C#/Wpf', Level.medium),
    new Skill('jenkins', Level.medium),
    new Skill('ansible', Level.medium),
    new Skill('CakePhp', Level.beginner),

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