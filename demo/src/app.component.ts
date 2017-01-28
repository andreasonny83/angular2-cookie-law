import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  template: `
    <h1>Angular2-Cookie-Law</h1>
    <span>Demo page</span>

    <div>
      <a class="link"
         href="https://github.com/andreasonny83/angular2-cookie-law">
       Fork me on GitHub
      </a>
    </div>

    <cookie-law></cookie-law>
  `,
  styles: [`
    a.link {
      color: blue;
    }
    a.link:hover {
      color: blue;
    }
  `]
})
export class AppComponent  {
  constructor() { }
}
