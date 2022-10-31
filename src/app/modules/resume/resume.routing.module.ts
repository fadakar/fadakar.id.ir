import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeIndexComponent} from "./index/index.component";
import {ThemeLayoutComponent} from "../theme/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: ThemeLayoutComponent ,
    children: [
      { path: '', component: HomeIndexComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule {
}
