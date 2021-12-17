import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MainpartComponent } from './mainpart/mainpart.component';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
//import { EdgeComponent } from './edge/edge.component';
import { EdgepartComponent } from './edgepart/edgepart.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    MainpartComponent,
    HeaderComponent,
    //EdgeComponent,
    EdgepartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
