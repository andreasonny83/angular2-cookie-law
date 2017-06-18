import {
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  cookieLawSeen: boolean;

  @ViewChild('cookieLaw') private cookieLawEl: any;

  constructor() {
    this.title = 'Angular2-Cookie-Law';
  }

  ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
  }

  dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
