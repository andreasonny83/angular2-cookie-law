/**
 * angular2-cookie-law
 *
 * Copyright 2016-2018, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookieLawComponent } from './angular2-cookie-law.component';
import { CookieLawContainerComponent } from './angular2-cookie-law-container.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CookieLawComponent,
    CookieLawContainerComponent,
  ],
  exports: [
    CookieLawContainerComponent,
  ],
})
export class CookieLawModule {
  constructor (@Optional() @SkipSelf() parentModule: CookieLawModule) {
    if (parentModule) {
      throw new Error(
        'CookieLawModule is already loaded. Import it in the AppModule only');
    }
  }
}
