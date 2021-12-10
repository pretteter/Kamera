import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MainpartComponent } from './mainpart/mainpart.component';

const routes: Routes = [
  {path: '', redirectTo:'intro', pathMatch: 'full'},
  {path: 'intro', component: IntroComponent},
  {path: 'mainpart', component: MainpartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
