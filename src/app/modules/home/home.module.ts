import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {HomeIndexComponent} from "./index/index.component";
import {ThemeModule} from "../theme/theme.module";
import {HomeComponent} from "./home.component";



@NgModule({
  declarations: [
    HomeComponent,
    HomeIndexComponent
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    ThemeModule,
  ]
})
export class HomeModule { }