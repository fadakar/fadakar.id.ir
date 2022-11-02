import {Component} from '@angular/core';
import {filter} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';


declare let gtag: Function;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.setUpAnalytics();
  }

  setUpAnalytics() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        gtag('config', 'G-8V4FTZG54C',
          {
            page_path: event.urlAfterRedirects
          }
        );
      });
  }

}
