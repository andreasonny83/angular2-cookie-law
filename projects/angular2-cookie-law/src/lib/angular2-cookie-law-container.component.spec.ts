import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieLawContainerComponent } from './angular2-cookie-law-container.component';
import { Angular2CookieLawService } from './angular2-cookie-law.service';
import { CookieLawComponent } from './angular2-cookie-law.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CookieLawContainerComponent', () => {
  let component: CookieLawContainerComponent;
  let cookiesPolicyService: Angular2CookieLawService;
  let fixture: ComponentFixture<CookieLawContainerComponent>;

  // stub CookieLawService for test purposes
  const CookieLawServiceStub = {
    _seen: false,

    seen() {
      return this._seen;
    },

    storeCookie() {
      this._seen = true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
      ],
      declarations: [
        CookieLawContainerComponent,
        CookieLawComponent,
      ],
      providers: [{
        provide: Angular2CookieLawService,
        useValue: CookieLawServiceStub,
      }],
    })
    .compileComponents();

    cookiesPolicyService = TestBed.get(Angular2CookieLawService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieLawContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the cookie policy notification', () => {
    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);

    expect(component).not.toBeNull();

    expect(fixture.debugElement.nativeElement.textContent)
      .toContain('By continuing to browse the site, you\'re agreeing to our use of cookies.');
  });

  it('CookieLawComponent should have a `seen` attribute', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(element.getAttribute('seen')).toBe('false');
  });

  it('CookieLawComponent should be initially visible', () => {
    fixture.detectChanges();

    expect(component.seen).toBe(false);
    expect(component.cookieLawSeen).toBe(false);
  });

  it('CookieLawComponent should be dismissible', () => {
    fixture.detectChanges();

    expect(component.seen).toBe(false);

    component.hasBeenDismissed();
    fixture.detectChanges();

    expect(component.seen).toBe(true);
    expect(component.cookieLawSeen).toBe(true);
  });

  it('CookieLawElementComponent should accept attributes', () => {
    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(By.css('cookie-law-component'));

    expect(fixture.nativeElement.getAttribute('seen')).toBe('false');

    expect(el.nativeElement.textContent)
      .not.toContain(`Learn more in our privacy policy.`);
    expect(el.componentInstance.name).not.toBeDefined();
    expect(el.componentInstance.learnMore).not.toBeDefined();
    expect(el.componentInstance.target).toBe('_blank');
    expect(el.componentInstance.position).toBe('bottom');
    expect(el.componentInstance.transition).toBe('bottomIn');
  });

  it('CookieLawElementComponent should renders on the top', () => {
    component.name = 'myCookie';
    component.position = 'top';

    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(By.css('cookie-law-component'));

    expect(component.position).toBe('top');
    expect(el.componentInstance.position).toBe('top');
  });

  it('CookieLawElementComponent learnMore', () => {
    component.learnMore = '/#cookies';
    component.target = '_self';

    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(By.css('cookie-law-component'));

    expect(el.componentInstance.target).toBe('_self');
    expect(el.nativeElement.textContent)
      .toContain(`Learn more in our privacy policy.`);

    component.learnMore = 'false';

    fixture.detectChanges();

    expect(el.componentInstance.learnMore).toBeNull();
  });
});
