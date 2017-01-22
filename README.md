[![Build Status](https://travis-ci.org/andreasonny83/angular2-cookie-law.svg?branch=master)](https://travis-ci.org/andreasonny83/angular2-cookie-law)
[![Build status](https://ci.appveyor.com/api/projects/status/gy65rk7l0nln23nj?svg=true)](https://ci.appveyor.com/project/andreasonny83/angular2-cookie-law)
[![Coverage Status](https://coveralls.io/repos/github/andreasonny83/angular2-cookie-law/badge.svg)](https://coveralls.io/github/andreasonny83/angular2-cookie-law)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# angular2-cookie-law

> Angular2 component that provides a banner to inform users about the cookie law

angular2-cookie-law is an HTML `<cookie-law>` tag enhanced with styling and animation

## Table of contents

*   [Installation](#installation)
*   [Setup](#setup)
*   [Usage](#usage)
*   [Example](#example)
*   [Options](#options)
*   [Contributing](#contributing)
*   [Changelog](#changelog)
*   [License](#license)

## Installation

1.  Install the component using `npm`:

  ```bash
  # To get the latest stable version and update package.json file:
  npm install angular2-cookie-law --save
  ```

  or `yarn` with:

  ```bash
  yarn add angular2-cookie-law
  ```

## Setup

If you are using System.js you may want to add this into `map` and `package` config:

```json
{
  "map": {
      "angular2-cookie-law": "node_modules/angular2-cookie-law"
  },
  "packages": {
      "angular2-cookie-law": {
        "main": "index.js",
        "defaultExtension": "js"
      }
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
import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { CookieLawModule }     from 'angular2-cookie-law';
import { AppComponent }        from './app.component';

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

#### Output

![cookie-law example](http://i.imgur.com/W9LUdwy.png)

## Options

### learnMore

| Type | Default value
| --- | --- |
| string | null |

If set to a valid absolute or relative URL, it will render an extra 'learn more' link pointing to the link.

eg.
```html
<cookie-law learnMore="/learn-more"></cookie-law>
```

#### Output

![output with link](http://i.imgur.com/0nvb6sP.png)

### target

| Type | Default value
| --- | --- |
| string | _blank |

Set to `_self` if you want the external link not to be opened in a new tab.

eg.
```html
<cookie-law learnMore="/learn-more" target="_self"></cookie-law>
```

## Contributing

This package is using the AngularJS commit messages as default way to contribute
with commitizen node package integrated in this repository.

1.  Fork it!
1.  Create your feature branch: `git checkout -b my-new-feature`
1.  Add your changes: `git add .`
1.  Commit your changes: `npm run commit`
1.  Push to the branch: `git push origin my-new-feature`
1.  Submit a pull request :sunglasses:

## Changelog

Changelog available [here](https://github.com/andreasonny83/angular2-cookie-law/blob/master/CHANGELOG.md)

## License

[MIT License](https://github.com/andreasonny83/angular2-cookie-law/blob/master/LICENSE) © Andrea SonnY
