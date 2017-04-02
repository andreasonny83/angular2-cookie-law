import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  AnimationTransitionEvent,
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/core';

import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser';

import {
  closeIcon,
} from './icons';

export type CookieLawPosition = 'top' | 'bottom';
export type CookieLawAnimation = 'topIn' | 'bottomIn' | 'topOut' | 'bottomOut';
export type CookieLawTarget = '_blank' | '_self';

@Component({
  selector: 'cookie-law-el',
  animations: [
    trigger('state', [
      state('bottomOut', style({ transform: 'translateY(100%)' })),
      state('topOut', style({ transform: 'translateY(-100%)' })),
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
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.cookie-law]': 'true'
  }
})
export class CookieLawElementComponent implements OnInit {
  animation: CookieLawAnimation;
  closeSvg: SafeHtml;
  currentStyles: any;

  @Input()
  get learnMore() { return this._learnMore; }
  set learnMore(value: string) {
    this._learnMore = (value !== null && `${value}` !== 'false') ? value : null;
  }

  @Input()
  get target() { return this._target; }
  set target(value: CookieLawTarget) {
    this._target = (value !== null && `${value}` !== 'false' &&
                      (`${value}` === '_blank' || `${value}` === '_self')
                     ) ? value : '_blank';
  }

  @Input()
  get position() { return this._position; }
  set position(value: CookieLawPosition) {
    this._position = (value !== null && `${value}` !== 'false' &&
                      (`${value}` === 'top' || `${value}` === 'bottom')
                     ) ? value : 'bottom';
  }

  @Output() isSeen = new EventEmitter<boolean>();

  private _learnMore: string;
  private _target: CookieLawTarget;
  private _position: CookieLawPosition;

  constructor(
    private domSanitizer: DomSanitizer,
  ) {
    this.animation = 'bottomIn';
    this._position = 'bottom';
  }

  ngOnInit(): void {
    this.animation = this.position === 'bottom' ? 'bottomIn' : 'topIn';

    this.closeSvg = this.domSanitizer.bypassSecurityTrustHtml(closeIcon);

    this.currentStyles = {
      'top': this.position === 'top' ? '0' : null,
      'bottom': this.position === 'top' ? 'initial' : null,
    };
  }

  afterDismissAnimation(evt: AnimationTransitionEvent): void {
    if (evt.toState === 'topOut' ||
        evt.toState === 'bottomOut') {
      this.isSeen.emit(true);
    }
  }

  dismiss(evt?: MouseEvent): void {
    if (evt) {
      evt.preventDefault();
    }

    this.animation = this.position === 'top' ? 'topOut' : 'bottomOut';
  }
}
