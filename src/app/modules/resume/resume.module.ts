import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResumeRoutingModule} from "./resume.routing.module";
import {HomeIndexComponent} from "./index/index.component";
import {ThemeModule} from "../theme/theme.module";
import {ResumeComponent} from "./resume.component";
import {SkillComponent} from "./elements/skill/skill.component";
import {SkillProgressComponent} from './elements/skill/skill.progress.component';
import {Theme2Module} from '../theme2/theme2.module';


@NgModule({
  declarations: [
    ResumeComponent,
    HomeIndexComponent,
    SkillComponent,
    SkillProgressComponent,
  ],
    imports: [
        ResumeRoutingModule,
        CommonModule,
        ThemeModule,
        Theme2Module,
    ]
})
export class ResumeModule {
}
