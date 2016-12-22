/**
 * angular2-cookie-law
 *
 * Copyright 2016, @andreasonny83, All rights reserved.
 *
 * Author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { Component, OnInit }      from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CookieLawService }       from './cookie-law.service';
import { closeIcon }              from './icons';

@Component({
  selector: 'cookie-law',
  template: `
    <div *ngIf="!cookieLawSeen" class="cookie-law-wrapper">
      <span class="dismiss" [innerHTML]="closeSvg" (click)="dismiss()"></span>

      <p class="copy">
        <b>COOKIE POLICY:</b>
        We use cookies to store relevant information on your computer and ensure we give you the best website experience.
      </p>
    </div>
  `,
  styles: [`
    .cookie-law-wrapper {
      overflow: auto;
      background: rgba(3, 169, 244, .92);
    }

    .cookie-law-wrapper .dismiss {
      box-sizing: border-box;
      padding: 5px 12px;
      float: right;
      fill: #fff;
    }

    .cookie-law-wrapper .copy {
      margin: 10px 0;
      font-size: 14px;
      text-align: center;
      padding-right: 36px;
      padding-left: 10px;
    }

    @media (max-width: 480px) {
      /* For smaller devices only: */
      .cookie-law-wrapper .copy {
        font-size: 12px;
      }
    }
  `]
})
export class CookieLawComponent implements OnInit {
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

  dismiss(): void {
    this.cookieLawSeen = !this.cookieLawSeen;
    this._service.storeCookie();
  }
}
