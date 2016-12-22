/**
 * angular2-cookie-law
 *
 * Copyright 2016, @andreasonny83, All rights reserved.
 *
 * Author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { ComponentFixture,
         TestBed, async }        from '@angular/core/testing';
import { By }                    from '@angular/platform-browser';
import { DebugElement }          from '@angular/core';

import { CookieLawComponent }    from './cookie-law.component';
import { CookieLawService }      from './cookie-law.service';

describe('CookieLawComponent', () => {
  let comp:    CookieLawComponent;
  let fixture: ComponentFixture<CookieLawComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

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
      declarations: [CookieLawComponent], // declare the test component
      providers:    [{
        provide: CookieLawService,
        useValue: CookieLawServiceStub
      }]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(CookieLawComponent);
    comp = fixture.componentInstance; // CookieLawComponent test instance

    // CookieLawService from the root injector
    cookiesPolicyService = TestBed.get(CookieLawService);

    // query for the element by CSS element selector
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should render the cookie policy notification', () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);
    expect(el.textContent).toContain('COOKIE POLICY');
  });

  it('dismiss the notification', () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);
    de.query(By.css('.dismiss')).nativeElement.click();

    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(true);
    expect(el.textContent).not.toContain('COOKIE POLICY');
  });

  it('should hide the cookie policy notification', () => {
    cookiesPolicyService._seen = true;

    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(true);
    expect(el.textContent).not.toContain('COOKIE POLICY');
  });
});
