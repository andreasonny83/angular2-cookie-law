/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  animate,
  state,
  trigger,
  style,
  transition
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CookieLawService } from './cookie-law.service';
import { closeIcon } from './icons';

@Component({
  selector: 'cookie-law',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('state', [
      state('in', style({ transform: 'translateY(0)' })),
      state('void', style({ transform: 'translateY(100%)' })),
      transition('* => *', animate('1000ms ease-in-out'))
    ])
  ],
  template: `
    <div
         *ngIf="!cookieLawSeen"
         [@state]="cookieLawSeen"
         class="cookie-law-wrapper">
      <div class="copy">
        <strong>By continuing to browse the site, you're agreeing to our use of cookies.</strong>
        <span *ngIf="learnMore">
          Learn more in our <a [href]="learnMore" [target]="target">privacy policy</a>.
        </span>
      </div>

      <a href="#" role="button"
                  class="dismiss"
                  [innerHTML]="closeSvg"
                  (click)="dismiss($event)"></a>
    </div>
  `,
  styles: [`
    a {
      color: #bbb;
      -webkit-transition: color .2s;
      transition: color .2s;
    }
    a:hover {
      color: #fff;
    }
    a:hover svg {
      fill: #fff;
    }
    .cookie-law-wrapper {
      background: #333;
      color: #bbb;
      display: block;
      font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
      font-size: 15px;
      font-weight: 200;
      line-height: 20px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 999999999;
      font-smooth: always;
      -webkit-font-smoothing: antialiased;
    }
    .dismiss {
      display: block;
      box-sizing: border-box;
      padding: 10px;
      position: absolute;
      top: 0;
      right: 10px;
      text-decoration: none;
      line-height: 20px;
    }
    .dismiss svg {
      display: block;
      fill: #bbb;
      width: 20px;
      height: 20px;
      -webkit-transition: fill .2s;
      transition: fill .2s;
    }
    .copy {
      box-sizing: border-box;
      padding: 10px 60px 10px 10px;
    }
    .copy strong {
      color: #fff;
      font-weight: 400;
    }
    .copy a {
      text-decoration: underline;
    }
    .copy a:active, .copy a:hover {
        outline: 0;
    }

    @media (min-width: 600px) {
      /* For bigger devices: */
      .copy {
        padding: 20px 60px 20px 20px;
        font-size: 18px;
        line-height: 24px;
      }
      .dismiss {
        top: 10px;
        right: 15px;
      }
      .dismiss svg {
        width: 24px;
        height: 24px;
      }
    }
  `]
})
export class CookieLawComponent implements OnInit {
  @Input() learnMore: string = null;
  @Input() target: string = '_blank';

  private cookieLawSeen: boolean = true;
  private closeSvg: SafeHtml;

  constructor(
    private _service: CookieLawService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.closeSvg = this.domSanitizer.bypassSecurityTrustHtml(closeIcon);
    this.cookieLawSeen = this._service.seen();
  }

  dismiss(evt): void {
    evt.preventDefault();
    this._service.storeCookie();
    this.cookieLawSeen = true;
  }
}
