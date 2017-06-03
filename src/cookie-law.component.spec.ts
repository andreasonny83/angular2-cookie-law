import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DebugElement,
  Component,
} from '@angular/core';

import {
  CookieLawModule,
  CookieLawComponent,
  CookieLawElementComponent,
  CookieLawService,
} from './cookie-law.module';

describe('CookieLawComponent', () => {
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
      declarations: [
        SimpleCookieLawComponent,
        AttributesCookieLawComponent,
        TwoCookieLawComponent,
      ],
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
  });

  it('should render the cookie policy notification', () => {
    let fixture: ComponentFixture<CookieLawComponent> = TestBed.createComponent(CookieLawComponent);
    let comp: CookieLawComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    expect(cookiesPolicyService.seen()).toBe(false);

    expect(comp).toBeTruthy();
    expect(comp).not.toBeNull();

    expect(fixture.debugElement.nativeElement.textContent)
      .toContain('By continuing to browse the site, you\'re agreeing to our use of cookies.');
  });

  it('CookieLawComponent should have a `seen` attribute', () => {
    let fixture: ComponentFixture<SimpleCookieLawComponent> = TestBed.createComponent(SimpleCookieLawComponent);
    let element: DebugElement = fixture.debugElement.query(By.css('cookie-law'));

    fixture.detectChanges();
    expect(element.nativeElement.getAttribute('seen')).toBe('false');
  });

  it('CookieLawComponent should be initially visible', () => {
    let fixture: ComponentFixture<CookieLawComponent> = TestBed.createComponent(CookieLawComponent);
    let comp: CookieLawComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(comp.seen).toBe(false);
    expect(comp.cookieLawSeen).toBe(false);
  });

  it('CookieLawComponent should be dismissible', () => {
    let fixture: ComponentFixture<CookieLawComponent> = TestBed.createComponent(CookieLawComponent);
    let comp: CookieLawComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(comp.seen).toBe(false);

    comp.hasBeenDismissed();
    fixture.detectChanges();

    expect(comp.seen).toBe(true);
    expect(comp.cookieLawSeen).toBe(true);
  });

  it('CookieLawElementComponent should have a bunch of attributes', () => {
    let fixture: ComponentFixture<CookieLawElementComponent> = TestBed.createComponent(CookieLawElementComponent);
    let comp: CookieLawElementComponent = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(comp.transition).toBe('bottomIn')
    expect(comp.position).toBe('bottom')
    expect(comp.learnMore).not.toBeDefined();
    expect(comp.target).not.toBeDefined();
  });

  it('CookieLawElementComponent should accept attributes', () => {
    let fixture: ComponentFixture<AttributesCookieLawComponent> = TestBed.createComponent(AttributesCookieLawComponent);
    let comp: DebugElement = fixture.debugElement.query(By.css('cookie-law'));

    fixture.detectChanges();

    let el: DebugElement = fixture.debugElement.query(By.css('cookie-law-el'));

    expect(el.nativeElement.textContent)
      .not.toContain(`Learn more in our privacy policy.`);

    expect(comp.nativeElement.getAttribute('seen')).toBe('false');
    expect(el.componentInstance.name).not.toBeDefined();
    expect(el.componentInstance.learnMore).not.toBeDefined();
    expect(el.componentInstance.target).toBe('_blank');
    expect(el.componentInstance.position).toBe('bottom');
    expect(el.componentInstance.transition).toBe('bottomIn');
  });

  it('CookieLawElementComponent should renders on the top', () => {
    let fixture: ComponentFixture<AttributesCookieLawComponent> = TestBed.createComponent(AttributesCookieLawComponent);
    let app: AttributesCookieLawComponent = fixture.debugElement.componentInstance;
    let comp: DebugElement = fixture.debugElement.query(By.css('cookie-law'));

    app.name = 'myCookie';
    app.position = 'top';

    fixture.detectChanges();
    let el: DebugElement = fixture.debugElement.query(By.css('cookie-law-el'));

    expect(comp.componentInstance.position).toBe('top');
    expect(el.componentInstance.position).toBe('top');
    expect(el.componentInstance.transition).toBe('topIn');
  });

  it('CookieLawElementComponent learnMore', () => {
    let fixture: ComponentFixture<AttributesCookieLawComponent> = TestBed.createComponent(AttributesCookieLawComponent);
    let app: AttributesCookieLawComponent = fixture.debugElement.componentInstance;

    app.learnMore = '/#cookies';
    app.target = '_self';

    fixture.detectChanges();

    let el: DebugElement = fixture.debugElement.query(By.css('cookie-law-el'));

    expect(el.componentInstance.target).toBe('_self');
    expect(el.nativeElement.textContent)
      .toContain(`Learn more in our privacy policy.`);

    app.learnMore = 'false';

    fixture.detectChanges();

    expect(el.componentInstance.learnMore).toBeNull();
  });

  it('CookieLawElementComponent should dismiss the banner on the bottom', () => {
    let fixture: ComponentFixture<AttributesCookieLawComponent> = TestBed.createComponent(AttributesCookieLawComponent);

    fixture.detectChanges();

    let el: DebugElement = fixture.debugElement.query(By.css('cookie-law-el'));
    let comp: CookieLawElementComponent = el.componentInstance;

    let spy = spyOn(comp, 'dismiss').and.callThrough();

    el.query(By.css('.dismiss')).nativeElement.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('CookieLawElementComponent should dismiss the banner on the top', () => {
    let fixture: ComponentFixture<AttributesCookieLawComponent> = TestBed.createComponent(AttributesCookieLawComponent);
    let app: AttributesCookieLawComponent = fixture.debugElement.componentInstance;

    app.position = 'top';

    fixture.detectChanges();

    let el: DebugElement = fixture.debugElement.query(By.css('cookie-law-el'));
    let comp: CookieLawElementComponent = el.componentInstance;

    let spy = spyOn(comp, 'dismiss').and.callThrough();

    el.query(By.css('.dismiss')).nativeElement.click();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('CookieLawComponent should dismiss the banner using a method', () => {
    let fixture: ComponentFixture<AttributesCookieLawComponent> = TestBed.createComponent(AttributesCookieLawComponent);
    let app: AttributesCookieLawComponent = fixture.debugElement.componentInstance;

    app.position = 'top';

    fixture.detectChanges();

    let parent: CookieLawComponent = fixture.debugElement.query(By.css('cookie-law')).componentInstance;
    let comp: CookieLawElementComponent = fixture.debugElement.query(By.css('cookie-law-el')).componentInstance;

    let spy = spyOn(comp, 'dismiss').and.callThrough();

    parent.dismiss();

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('CookieLawComponent with custom names', () => {
    let fixture: ComponentFixture<TwoCookieLawComponent> = TestBed.createComponent(TwoCookieLawComponent);

    fixture.detectChanges();

    let cookieB: CookieLawComponent = fixture.debugElement.query(By.css('cookie-law#second')).componentInstance;

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('cookie-law#first .cookie-law').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('cookie-law#second .cookie-law').length).toBe(1);

    cookieB.hasBeenDismissed();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('cookie-law#first .cookie-law').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('cookie-law#second .cookie-law').length).toBe(0);
  });
});

@Component({
  template: `
    <cookie-law></cookie-law>
  `
})
class SimpleCookieLawComponent { }

@Component({
  template: `
    <cookie-law id="first"></cookie-law>
    <cookie-law id="second" name="secondCookieLaw"></cookie-law>
  `
})
class TwoCookieLawComponent { }

@Component({
  template: `
    <cookie-law [name]="name"
                [learnMore]="learnMore"
                [target]="target"
                [position]="position"
                (isSeen)="seen($evt)"></cookie-law>
  `
})
class AttributesCookieLawComponent {
  name: string;
  learnMore: string;
  target: string;
  position: string;

  isSeen: boolean = false;

  seen(evt: any) {
    this.isSeen = evt;
  }
}
