# Maintainers Wanted

This project was originally intended to be only consumed by my NG applications. 
I'm now working full-time on React related project only and it's been a while since I did look into Angular related code.

However, since there are now several people relying on this small and simple package, I'm looking for volunteers to actiely look after this project.
If anyone is interested, please reply into [this ticket](https://github.com/andreasonny83/angular2-cookie-law/issues/63).

[![Build Status](https://travis-ci.org/andreasonny83/angular2-cookie-law.svg?branch=master)](https://travis-ci.org/andreasonny83/angular2-cookie-law)
[![npm version](https://badge.fury.io/js/angular2-cookie-law.svg)](https://badge.fury.io/js/angular2-cookie-law)
[![npm](https://img.shields.io/npm/dt/angular2-cookie-law.svg)](https://www.npmjs.com/package/angular2-cookie-law)
[![Coverage Status](https://coveralls.io/repos/github/andreasonny83/angular2-cookie-law/badge.svg)](https://coveralls.io/github/andreasonny83/angular2-cookie-law)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Angular2 Cookie Law

> Angular2+ component that provides a banner to inform users about the cookie law now with Angular Universal support

Angular2 Cookie Law is an HTML `<cookie-law>` tag enhanced with styling and animation.

**This documentation is for the latest version of `angular2-cookie-law` (>=6.x.x).**

**angular2-cookie-law@7 supports bot Angular v6 and v7**

If you're using an older version of Angular (<6), please install `angular2-cookie-law`
in version 1 with
`npm i --save angular2-cookie-law@1`
and check out the documentation available [here](https://github.com/andreasonny83/angular2-cookie-law/tree/v1.4.0).

**Live DEMO:**

*   [Angular2 Cookie Law with Angular 6](https://stackblitz.com/edit/angular2-cookie-law)
*   [Angular2 Cookie Law with Angular 7](https://stackblitz.com/edit/angular2-cookie-law-ng7)

## Table of contents

* [Installation](#installation)
* [Setup](#setup)
* [Usage](#usage)
* [Example](#example)
* [Demo App](#demo-app)
* [Options](#options)
  * [Attributes](#attributes)
  * [Properties](#properties)
  * [Events](#events)
  * [Methods](#methods)
* [Custom template](#custom-template)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [License](#license)

## Installation

1.  Install the component using `npm`
1.  angular2-cookie-law depends on the Angular animations module in order to be able to do more advanced transitions. If you want these animations to work in your app, you have to install the `@angular/animations` module and include the `BrowserAnimationsModule` in your app.

  ```bash
  # To get the latest stable version and update package.json file:
  $ npm install angular2-cookie-law@6 @angular/animations --save
  ```

  or `yarn` with:

  ```bash
  $ yarn add angular2-cookie-law @angular/animations
  ```

## Setup

angular2-cookie-law class is an Angular module therefore,
it needs to be registered in the modules array (encouraged way):

```js
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // BrowserAnimationsModule is required
    CookieLawModule // import Angular's CookieLaw modules
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Usage

Use the component anywhere around your application:

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <cookie-law></cookie-law>
  `
})
export class AppComponent  { }
```

## Example

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1>
      Hello World!
    </h1>

    <cookie-law></cookie-law>
  `
})
export class AppComponent  { }
```

###### Output

![cookie-law example](http://i.imgur.com/W9LUdwy.png)

# Demo App

Have a look at the demo app available in this repository for a real Angular application using the `angular2-Cookie-Law` library.
Clone this repo on you machine with

```sh
$ git clone git@github.com:andreasonny83/angular2-cookie-law.git
```

Then install all the Node dependencies (Node v8 or later is required).

```sh
$ npm install
```

And run the project with:

```bash
$ npm start
```

Open your browser to [http://localhost:4200/](http://localhost:4200/)
to see the application running.

## Options

## Attributes

### learnMore

| Type | Default value |
| --- | --- |
| string | null |

If set to a valid absolute or relative URL, it will render an extra 'learn more' link pointing to the link.

###### Example

```html
<cookie-law learnMore="/learn-more"></cookie-law>
```

![output with link](http://i.imgur.com/0nvb6sP.png)

### awsomeCloseIcon

Font Awsome is required in your header for this feature to work.

```html
<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
```

| Type | Default value |
| --- | --- |
| string | null |

If set to a Font awsome Icon e.g. "fa-window-close" it will replace the standard SVG with the Font awsome Icon.

###### Example

```html
<cookie-law awsomeCloseIcon="fa-window-close"></cookie-law>
```

### target

| Type | Default value |
| --- | --- |
| string | _blank |

Set to `_self` if you want the external link not to be opened in a new tab.

###### Example

```html
<cookie-law learnMore="/learn-more" target="_self"></cookie-law>
```

### position

| Type | Default value |
| --- | --- |
| string | "bottom" |

Allows you to decide where in the page, the banner will be rendered.
Possible values are: `"bottom"` and `"top"`.

###### Example

```html
<cookie-law position="top" learnMore="/learn-more" target="_self"></cookie-law>
```

### name

| Type | Default value |
| --- | --- |
| string | "cookieLawSeen" |

Allows you to decide which name will be used for storing the cookie in the client's browser.

###### Example

```html
<cookie-law name="myShinyCookieLaw"></cookie-law>
```

The previous example will generate a `myShinyCookieLaw=true` as soon as the user dismiss the banner.

### expiration

| Type | Default value | Description |
| --- | --- | --- |
| number | - | Set a the cookie expiration time (in days) |

###### Example

```html
<cookie-law name="myShinyCookieLaw" expiration="7">I'm gonna expire in 1 week!</cookie-law>
```

## Properties

| Name | Type | Description |
| --- | --- | --- |
| cookieLawSeen | boolean | true if the user has already dismissed the banner |

###### Example

```js
@Component({
  selector: 'demo-app',
  template: `
    <h3 *ngIf="cookieLawSeen">Cookie law has been dismissed</h3>

    <cookie-law #cookieLaw></cookie-law>

  `,
})
export class AppComponent implements OnInit {
  @ViewChild('cookieLaw')
  private cookieLawEl: any;

  private cookieLawSeen: boolean;

  ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
  }
}
```

## Events

| Name | Type | Description |
| --- | --- | --- |
| isSeen | boolean | Triggered when the user dismiss the banner |

###### Example

```js
@Component({
  selector: 'demo-app',
  template: `
    <h3 *ngIf="cookieLawSeen">Cookie law has been dismissed</h3>

    <cookie-law (isSeen)="seen($event)"></cookie-law>
  `,
})
export class AppComponent {
  private cookieLawSeen: boolean;

  public seen(evt: any) {
    this.cookieLawSeen = evt;
  }
}
```

## Methods

| Name | Description |
| --- | --- |
| dismiss | Dismiss a banner |

###### Example

```js
@Component({
  selector: 'demo-app',
  template: `
  <button type="button" (click)="dismiss()">Dismiss Modal</button>
  <cookie-law #cookieLaw></cookie-law>

  `,
})
export class AppComponent implements OnInit {
  @ViewChild('cookieLaw')
  private cookieLawEl: any;

  public dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
```

## Custom template

It is possible to overwrite our default cookie policy law text with a
custom template.
Just put your favorite html content between the component like in the
following example:
```html
<cookie-law position="top">
  This website contains cookie.
  <a href="#/cookie-policy">Read more</a>
</cookie-law>
```

## Contributing

This package is using the AngularJS commit messages as default way to contribute
with Commitizen node package integrated in this repository.

1.  Fork it!
1.  Create your feature branch: `git checkout -b my-new-feature`
1.  Add your changes: `git add .`
1.  Commit your changes: `npm run commit`
1.  Push to the branch: `git push origin my-new-feature`
1.  Submit a pull request :sunglasses:

## Changelog

Changelog available [here](https://github.com/andreasonny83/angular2-cookie-law/releases)

## License

[MIT License](https://github.com/andreasonny83/angular2-cookie-law/blob/master/LICENSE) © Andrea SonnY
