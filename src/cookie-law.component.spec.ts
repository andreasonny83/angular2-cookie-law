/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  CookieLawModule,
  CookieLawComponent,
} from './cookie-law.module';
import { CookieLawService } from './cookie-law.service';

describe('CookieLawComponent', () => {
  let comp: CookieLawComponent;
  let fixture: ComponentFixture<CookieLawComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  let cookiesPolicyService: any;

  // async beforeEach
  beforeEach( async(() => {
    // stub CookieLawService for test purposes
    let CookieLawServiceStub = {
      _seen: false,

      seen() {
        return this._seen;
      },

      storeCookie() {
        this._seen = true;
      }
    };

    TestBed.configureTestingModule({
      providers: [{
        provide: CookieLawService,
        useValue: CookieLawServiceStub
      }],
      imports: [
        CookieLawModule,
      ]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    // CookieLawService from the root injector
    cookiesPolicyService = TestBed.get(CookieLawService);

    fixture = TestBed.createComponent(CookieLawComponent);
    comp = fixture.componentInstance; // CookieLawComponent test instance

    // query for the element by CSS element selector
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should render the cookie policy notification', () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);
    expect(el.textContent).toContain('By continuing to browse the site, you\'re agreeing to our use of cookies.');
  });

  it('dismiss the notification with mouse interaction', () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);
    de.query(By.css('.dismiss')).nativeElement.click();

    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(true);
    expect(el.textContent).not.toContain('COOKIE POLICY');
  });

  it('dismiss the notification invoking the `dismiss` method', () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);

    comp.dismiss();
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(true);
  });

  it('should hide the cookie policy notification', () => {
    cookiesPolicyService._seen = true;
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(true);

    expect(el.textContent).not.toContain('COOKIE POLICY');
  });

  it('cookieLawSeen should reflects cookiesPolicyService.seen', () => {
    expect(cookiesPolicyService.seen()).toBe(false);

    comp.dismiss();
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(true);
  });

  it('should render a learn more link', () => {
    comp.learnMore = 'http://www.google.com';

    fixture.detectChanges();
    expect(el.textContent).toContain('Learn more');
  });
});
