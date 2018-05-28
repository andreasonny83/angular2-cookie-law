import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CookieLawModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
