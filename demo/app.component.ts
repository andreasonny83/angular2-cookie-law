import {
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <h1>Angular2-Cookie-Law</h1>
    <span>Demo page</span>

    <div class="container">
      <button type="button"
              *ngIf="!cookieLawSeen"
              (click)="dismiss()">Dismiss Modal</button>

      <h3 *ngIf="cookieLawSeen">Cookie law dismissed</h3>
    </div>

    <div>
      <a class="link"
         href="https://github.com/andreasonny83/angular2-cookie-law">
       Fork me on GitHub
      </a>
    </div>

    <cookie-law position="top">
      Allo! This is my awesome cookie-law message.
      <a href="https://github.com/andreasonny83/angular2-cookie-law">
        Click here for more info
      </a>
    </cookie-law>

    <cookie-law #cookieLaw (isSeen)="cookieLawSeen = $event" learnMore="/false" target="_blank"></cookie-law>
  `,
  styles: [`
    a.link {
      color: blue;
    }
    a.link:hover {
      color: blue;
    }
    .container {
      margin: 10px 0;
    }
    .container button {
      padding: 10px;
      margin: 5px 0;
      font-size: 16px;
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('cookieLaw')
  private cookieLawEl: any;
  private cookieLawSeen: boolean;

  ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
  }

  public dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
