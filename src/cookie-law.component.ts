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
  ViewChild,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  CookieLawService,
} from './cookie-law.service';

import {
  CookieLawElementComponent,
  CookieLawTarget,
  CookieLawPosition,
} from './cookie-law-element.component';

@Component({
  selector: 'cookie-law',
  template: `
    <cookie-law-el *ngIf="!seen"
                   [learnMore]="learnMore"
                   [target]="target"
                   [position]="position"
                   (isSeen)="hasBeenDismissed()"><ng-content></ng-content></cookie-law-el>
  `,
})
export class CookieLawComponent implements OnInit {
  @HostBinding('attr.seen')
  seen: boolean = true;

  @ViewChild(CookieLawElementComponent)
  cookieLawComponent: CookieLawElementComponent;

  @Input() name: string;
  @Input() learnMore: string;
  @Input() target: CookieLawTarget;
  @Input() position: CookieLawPosition;

  @Output() isSeen = new EventEmitter<boolean>();

  constructor (private _service: CookieLawService) { }

  ngOnInit() {
    this.seen = this._service.seen(this.name);
  }

  hasBeenDismissed(): void {
    this.seen = true;
    this.isSeen.emit(true);
  }

  cookieLawSeen(): boolean {
    return this._service.seen(this.name);
  }

  dismiss(): void {
    this._service.storeCookie(this.name);
    this.cookieLawComponent.dismiss();
  }
}
