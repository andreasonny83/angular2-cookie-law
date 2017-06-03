/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEntryMetadata,
} from '@angular/core';

export const translateInOut: AnimationEntryMetadata =
  trigger('transition', [
    state('*', style({ transform: 'translateY(0)' })),
    state('void', style({ transform: 'translateY(0)' })),

    state('bottomOut', style({ transform: 'translateY(100%)' })),
    state('topOut', style({ transform: 'translateY(-100%)' })),

    transition('void => topIn', [
      style({ transform: 'translateY(-100%)' }),
      animate('1000ms ease-in-out'),
    ]),

    transition('void => bottomIn', [
      style({ transform: 'translateY(100%)' }),
      animate('1000ms ease-in-out'),
    ]),

    transition('* => *', animate('1000ms ease-out')),
  ]);
