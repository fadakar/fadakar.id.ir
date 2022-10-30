import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from "./home-routing.module";
import {HomeIndexComponent} from "./index/index.component";
import {ThemeModule} from "../theme/theme.module";
import {HomeComponent} from "./home.component";
import {SkillComponent} from "./elements/skill/skill.component";
import {SkillProgressComponent} from './elements/skill/skill.progress.component';
import {Theme2Module} from '../theme2/theme2.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomeIndexComponent,
    SkillComponent,
    SkillProgressComponent,
  ],
    imports: [
        HomeRoutingModule,
        CommonModule,
        ThemeModule,
        Theme2Module,
    ]
})
export class HomeModule {
}
