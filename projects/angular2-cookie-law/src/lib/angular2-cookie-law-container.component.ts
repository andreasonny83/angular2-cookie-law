/**
 * angular2-cookie-law
 *
 * Copyright 2016-2018, @andreasonny83, All rights reserved.
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

import { Angular2CookieLawService } from './angular2-cookie-law.service';
import { CookieLawComponent } from './angular2-cookie-law.component';
import { CookieLawTarget, CookieLawPosition } from './definitions';

@Component({
  selector: 'cookie-law',
  template: `
    <cookie-law-component *ngIf="!seen"
                          [awsomeCloseIcon]="awsomeCloseIcon"
                          [learnMore]="learnMore"
                          [target]="target"
                          [position]="position"
                          (isSeen)="hasBeenDismissed()">
      <ng-content></ng-content>
    </cookie-law-component>
  `,
})
export class CookieLawContainerComponent implements OnInit {

  @HostBinding('attr.seen')
  public seen: boolean;

  @ViewChild(CookieLawComponent)
  public cookieLawComponent: CookieLawComponent;

  @Input()
  public name: string;

  @Input()
  public learnMore: string;

  @Input()
  public target: CookieLawTarget;

  @Input()
  public position: CookieLawPosition;

  @Input()
  public expiration: number;

  @Input()
  public awsomeCloseIcon: string;

  @Output()
  public isSeen = new EventEmitter<boolean>();

  public get cookieLawSeen(): boolean {
    return this.cookieLawService.seen(this.name);
  }

  constructor(private cookieLawService: Angular2CookieLawService) {
    this.name = 'cookieLawSeen'; // set a default cookie name if not provided
    this.seen = true;
  }

  public ngOnInit() {
    this.seen = this.cookieLawService.seen(this.name);
  }

  public hasBeenDismissed(): void {
    this.cookieLawService.storeCookie(this.name, this.expiration);
    this.seen = true;
    this.isSeen.emit(true);
  }

  public dismiss(): void {
    this.cookieLawComponent.dismiss();
  }

}
