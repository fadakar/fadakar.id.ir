import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Theme2LayoutComponent} from './modules/theme2/layout/theme2.layout.component';

const routes: Routes = [
  {
    path: '',
    component: Theme2LayoutComponent,
    loadChildren: () => import('./modules/resume/resume.module').then(m => m.ResumeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
