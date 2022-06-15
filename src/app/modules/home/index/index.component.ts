import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
    new Skill('Laravel', 99),
    new Skill('Lumen', 99),
    new Skill('MySql', 99),
    new Skill('Mongodb', 80),
    new Skill('LPIC1', 80),
    new Skill('Nginx', 80),
    new Skill('Rest', 99),
    new Skill('Html/Css', 99),
    new Skill('Tailwind', 90),
    new Skill('Bootstrap/Jquery', 90),
    new Skill('SEO', 90),
    new Skill('Javascript', 90),
    new Skill('TypeScript', 90),
    new Skill('Angular', 85),
    new Skill('Webpack', 90),
    new Skill('Git', 90),
    new Skill('Scrum', 70),
    new Skill('ElasticSearch', 50),
    new Skill('Nodejs', 60),
    new Skill('تحلیل و طراحی نرم افزاری', 99),
    new Skill('خلاقیت', 99),
    new Skill('روحیه تیمی', 99),
    new Skill('توانایی حل مسئله', 99),
  ];

  familiarSkills: Skill[] = [
    new Skill('++C', 40),
    new Skill('SASS', 70),
    new Skill('Express.js', 40),
    new Skill('ASP.NET', 70),
    new Skill('CodeIgniter', 70),
    new Skill('Symfony', 70),
    new Skill('Arduino', 40),
    new Skill('Python', 40),
    new Skill('JavaSE', 90),
    new Skill('JavaEE', 80),
    new Skill('Spring', 70),
    new Skill('JPA', 70),
    new Skill('C#', 90),
    new Skill('C#/Wpf', 70),
    new Skill('C#/WindowsForm', 90),
    new Skill('Docker', 40),
    new Skill('jenkins', 40),
    new Skill('ansible', 40),
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
