[![Build Status](https://travis-ci.org/andreasonny83/angular2-cookie-law.svg?branch=master)](https://travis-ci.org/andreasonny83/angular2-cookie-law)
[![Build status](https://ci.appveyor.com/api/projects/status/gy65rk7l0nln23nj?svg=true)](https://ci.appveyor.com/project/andreasonny83/angular2-cookie-law)
[![npm version](https://badge.fury.io/js/angular2-cookie-law.svg)](https://badge.fury.io/js/angular2-cookie-law)
[![npm](https://img.shields.io/npm/dt/angular2-cookie-law.svg)](https://www.npmjs.com/package/angular2-cookie-law)
[![Coverage Status](https://coveralls.io/repos/github/andreasonny83/angular2-cookie-law/badge.svg)](https://coveralls.io/github/andreasonny83/angular2-cookie-law)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Angular2 Cookie Law

> Angular2+ component that provides a banner to inform users about the cookie law

Angular2 Cookie Law is an HTML `<cookie-law>` tag enhanced with styling and animation
now compatible with Angular4 too.

**Plunker DEMOs:**

*   [Angular2 Cookie Law with Angular2](https://embed.plnkr.co/QgrOeg/)
*   [Angular2 Cookie Law with Angular4](https://embed.plnkr.co/I2M9Ib/)

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
* [Angular 4](#angular-4)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [License](#license)

## Installation

1.  Install the component using `npm`:

  ```bash
  # To get the latest stable version and update package.json file:
  $ npm install angular2-cookie-law --save
  ```

  or `yarn` with:

  ```bash
  $ yarn add angular2-cookie-law
  ```

## Setup

If you are using System.js you may want to add this into `map` and `package` config:

```json
{
  "map": {
    "angular2-cookie-law": "node_modules/angular2-cookie-law/bundles/angular2-cookie-law.umd.js"
  }
}
```

If you are using Webpack you may want to add this into your `vendor.js` file:

```js
// vendor.ts
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';

// Third parties packages
import 'rxjs';
import 'angular2-cookie-law';
```

angular2-cookie-law class is an Angular2 module therefore,
it needs to be registered in the modules array (encouraged way):

```js
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieLawModule } from 'angular2-cookie-law';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
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

Have a look at the [demo](https://github.com/andreasonny83/angular2-cookie-law/tree/master/demo)
available in this repository for a real Angular2 application using the `Angular2-Cookie-Law` library.

```bash
$ npm run demo
```

Open your browser to [http://localhost:9007/](http://localhost:9007/)
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

## Angular 4

This module will work with Angular 4 projects but will require `@angular/animations`
to be included in your project as the Angular animations are not part of the `@angular/core`
library starting from the version >=4.

Make sure to include the `BrowserAnimationsModule` in your App module like in the following example:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Angular 4 Only
  ],
})
export class AppModule { }
```

Also have a look at this [Angular2 Cookie Law with Angular4](https://embed.plnkr.co/I2M9Ib/)
Plunker version for a live SystemJS example.

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
