import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MainpartComponent } from './mainpart/mainpart.component';
import { EdgepartComponent} from './edgepart/edgepart.component';

const routes: Routes = [
  {path: '', redirectTo:'intro', pathMatch: 'full'},
  {path: 'intro', component: IntroComponent},
  {path: 'mainpart', component: MainpartComponent},
  {path: 'edgepart', component: EdgepartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
