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

export type CookieLawPosition = 'top' | 'bottom';
export type CookieLawAnimation = 'topIn' | 'bottomIn' | 'topOut' | 'bottomOut';
export type CookieLawTarget = '_blank' | '_self';

@Component({
  selector: 'cookie-law',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('state', [
      state('bottomOut', style({ transform: 'translateY(100%)' })),
      state('topOut', style({ transform: 'translateY(100%)' })),
      state('*', style({ transform: 'translateY(0)' })),

      transition('void => topIn', [
        style({ transform: 'translateY(-100%)' }),
        animate('1000ms ease-in-out'),
      ]),

      transition('void => bottomIn', [
        style({ transform: 'translateY(100%)' }),
        animate('1000ms ease-in-out'),
      ]),

      transition('* => *', animate('1000ms ease-out')),
    ])
  ],
  styleUrls: [ './cookie-law.css' ],
  templateUrl: './cookie-law.html',
})
export class CookieLawComponent implements OnInit {
  @Input('learnMore')
  get learnMore() { return this._learnMore; }
  set learnMore(value: string) {
    this._learnMore = (value !== null && `${value}` !== 'false') ? value : null;
  }

  @Input('target')
  get target() { return this._target; }
  set target(value: CookieLawTarget) {
    this._target = (value !== null && `${value}` !== 'false' &&
                      (`${value}` === '_blank' || `${value}` === '_self')
                     ) ? value : '_blank';
  }

  @Input('position')
  get position() { return this._position; }
  set position(value: CookieLawPosition) {
    this._position = (value !== null && `${value}` !== 'false' &&
                      (`${value}` === 'top' || `${value}` === 'bottom')
                     ) ? value : 'bottom';
  }

  cookieLawSeen: boolean = false;
  currentStyles: {};
  animation: CookieLawAnimation = 'topIn';

  private _learnMore: string;
  private _target: CookieLawTarget;
  private _position: CookieLawPosition = 'bottom';
  private closeSvg: SafeHtml;

  constructor(
    private _service: CookieLawService,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.animation = this.position === 'bottom' ? 'bottomIn' : 'topIn';
    this.closeSvg = this.domSanitizer.bypassSecurityTrustHtml(closeIcon);
    this.cookieLawSeen = this._service.seen();

    this.currentStyles = {
      'top': this.position === 'top' ? '0' : null,
      'bottom': this.position === 'top' ? 'initial' : null,
    };
  }

  dismiss(evt: any): void {
    evt.preventDefault();
    this._service.storeCookie();
    this.animation = this.position === 'top' ? 'topOut' : 'bottomOut';
  }

  afterDismissAnimation(evt: any) {
    if (evt.toState === 'topOut' ||
        evt.toState === 'bottomOut') {
      this.cookieLawSeen = false;
    }
  }
}
