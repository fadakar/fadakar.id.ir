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


  clientSideSkill: Skill[] = [
    new Skill('Html', Level.expert),
    new Skill('CSS', Level.expert),
    new Skill('Javascript', Level.expert),
    new Skill('Typescript', Level.expert),
    new Skill('Angular', Level.expert),
    new Skill('ReactJs', Level.advance),
    new Skill('Vuejs/Vuex', Level.advance),
    new Skill('Tailwindcss', Level.expert),
    new Skill('Bootstrap', Level.expert),
    new Skill('Material UI', Level.expert),
  ];


  serverSideSkill: Skill[] = [
    new Skill('PHP', Level.expert),
    new Skill('Laravel', Level.expert),
    new Skill('SQL', Level.expert),
    new Skill('Mysql', Level.expert),
    new Skill('Rest/Restful', Level.expert),
    new Skill('SOAP', Level.expert),
    new Skill('Nginx', Level.advance),
    new Skill('Apache', Level.advance),
    new Skill('Redis', Level.medium),
    new Skill('RabbitMQ', Level.medium),
    new Skill('ElasticSearch', Level.advance),
  ];


  developmentAndOperationsSkill: Skill[] = [
    new Skill('Linux OS', Level.advance),
    new Skill('Bash', Level.advance),
    new Skill('Git', Level.expert),
    new Skill('Postman', Level.expert),
    new Skill('Swagger', Level.medium),
    new Skill('SOLID', Level.expert),
    new Skill('Design Patterns', Level.expert),
    new Skill('Agile/Scrum/Kanban', Level.expert),
    new Skill('Docker', Level.expert),
    new Skill('Docker Swarm', Level.advance),

    new Skill('CI/CD', Level.medium),
    new Skill('GitLab/Github', Level.expert),

    new Skill('Prometheus', Level.advance),
    new Skill('Grafana', Level.advance),


    new Skill('Analysis & Design', Level.expert),
    new Skill('Problem solving ability', Level.expert),
    new Skill('Creativity and innovation', Level.expert),
    new Skill('Team work', Level.expert),
  ];


  familiarSkills: Skill[] = [
    new Skill('Symfony Framework', Level.advance),
    new Skill('CodeIgniter Framework', Level.medium),
    new Skill('CakePhp Framework', Level.beginner),

    new Skill('TDD', Level.beginner),
    new Skill('NoSql/Mongodb', Level.expert),

    new Skill('Kubernetes', Level.medium),
    new Skill('Jenkins', Level.medium),
    new Skill('Ansible', Level.medium),


    new Skill('Node.js', Level.medium),
    new Skill('Express.js', Level.medium),
  ];


  @ViewChild('menuBtn') menuBtn: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;

  constructor() {
  }

  get Level(): any {
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
