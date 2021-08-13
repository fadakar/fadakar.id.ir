import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeHeaderComponent } from './header/header.component';
import { ThemeFooterComponent } from './footer/footer.component';
import { ThemeLayoutComponent } from './layout/layout.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ThemeHeaderComponent,
    ThemeLayoutComponent,
    ThemeFooterComponent,

  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ThemeModule { }
