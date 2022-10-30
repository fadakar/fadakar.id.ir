import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {Theme2HeaderComponent} from './header/theme2.header.component';
import {Theme2LayoutComponent} from './layout/theme2.layout.component';
import {Theme2FooterComponent} from './footer/theme2.footer.component';
import {Theme2NavbarComponent} from './navbar/theme2.navbar.component';



@NgModule({
  declarations: [
    Theme2HeaderComponent,
    Theme2LayoutComponent,
    Theme2FooterComponent,
    Theme2NavbarComponent

  ],
  exports: [
    Theme2LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class Theme2Module { }
