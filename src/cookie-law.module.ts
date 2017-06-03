/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieLawComponent } from './cookie-law.component';
import { CookieLawElementComponent } from './cookie-law-element.component';
import { CookieLawService } from './cookie-law.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CookieLawComponent,
    CookieLawElementComponent,
  ],
  providers: [
    CookieLawService,
  ],
  exports: [
    CookieLawComponent,
  ],
})
export class CookieLawModule { }

export {
  CookieLawComponent,
  CookieLawElementComponent,
  CookieLawService,
};
