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


  clientSideSkill: Skill[] =  [
    new Skill('Html', Level.expert),
    new Skill('CSS', Level.expert),
    new Skill('Javascript', Level.expert),
    new Skill('Typescript', Level.expert),
    new Skill('Angular', Level.expert),
    new Skill('Rxjs', Level.expert),
    new Skill('Vuejs/Vuex', Level.advance),
    new Skill('Tailwindcss', Level.expert),
    new Skill('Bootstrap', Level.expert),

  ];


  serverSideSkill: Skill[] = [
    new Skill('PHP', Level.expert),
    new Skill('Laravel', Level.expert),
    new Skill('SQL', Level.expert),
    new Skill('Mysql', Level.expert),
    new Skill('Rest/Restful', Level.expert),
    new Skill('Nginx', Level.advance),
    new Skill('Apache', Level.advance),
    new Skill('Redis', Level.advance),
    new Skill('RabbitMQ', Level.advance),
    new Skill('Design Patterns', Level.expert),
    new Skill('ElasticSearch', Level.advance),
  ];


  developmentAndOperationsSkill: Skill[] =  [
    new Skill('Linux OS', Level.advance),
    new Skill('Bash', Level.advance),
    new Skill('Git', Level.expert),
    new Skill('Github/GitLab', Level.expert),
    new Skill('Docker', Level.expert),
    new Skill('Docker Swarm', Level.advance),
    new Skill('Agile/Scrum/Kanban', Level.expert),
    new Skill('Kubernetes', Level.medium),
    new Skill('CI/CD', Level.medium),
    new Skill('Jenkins', Level.medium),
    new Skill('Ansible', Level.medium),

    new Skill('Analysis & Design', Level.expert),
    new Skill('Creativity', Level.expert),
    new Skill('Team work', Level.expert),
    new Skill('Problem solving ability', Level.expert),

  ];


  familiarSkills: Skill[] = [
    new Skill('C#', Level.expert),
    new Skill('C#/WindowsForm', Level.expert),
    new Skill('JavaSE', Level.expert),
    new Skill('JavaEE', Level.expert),

    new Skill('Symfony', Level.advance),
    new Skill('Python', Level.advance),

    new Skill('C++', Level.medium),
    new Skill('Node.js', Level.medium),
    new Skill('Express.js', Level.medium),
    new Skill('Nest.js', Level.medium),
    new Skill('ASP.NET', Level.medium),
    new Skill('CodeIgniter', Level.medium),
    new Skill('Arduino', Level.medium),
    new Skill('Spring', Level.medium),
    new Skill('JPA', Level.medium),
    new Skill('C#/Wpf', Level.medium),
    new Skill('CakePhp', Level.beginner),

  ];


  @ViewChild('menuBtn') menuBtn: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;

  constructor() {
  }

  get Level(): any{
    return Level;
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
