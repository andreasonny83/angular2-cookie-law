import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieLawModule } from '../src/cookie-law.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    CookieLawModule,
  ]
})
export class AppModule { }
