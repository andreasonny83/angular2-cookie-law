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
  animations: [
    trigger('state', [
      state('in', style({ transform: 'translateY(0)' })),
      state('void', style({ transform: 'translateY(100%)' })),
      transition('* => *', animate('1000ms ease-in-out'))
    ])
  ],
  styleUrls: [ './cookie-law.css' ],
  templateUrl: './cookie-law.html',
})
export class CookieLawComponent implements OnInit {
  @Input() learnMore: string = null;
  @Input() target: string = '_blank';

  cookieLawSeen: boolean = true;

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
