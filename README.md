# angular2-cookie-law

> Angular2 component that provides a banner to inform users about the cookie law

angular2-cookie-law is an HTML `<cookie-law>` tag enhanced with styling and animation

## Installation

1. Install npm module:

  ```bash
  # To get the latest stable version and update package.json file:
  npm install angular2-cookie-law --save
  ```

2. If you are using system.js you may want to add this into `map` and `package` config:

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

3. If you are using Webpack you may want to add this into your `vendor.js` file:

  ```js
  // Angular 2
  import '@angular/platform-browser';
  import '@angular/platform-browser-dynamic';
  import '@angular/core';
  import '@angular/common';
  import '@angular/forms';
  import '@angular/http';
  import '@angular/router';

  // RxJS
  import 'rxjs';
  import 'angular2-cookie-law';
  ```

angular2-cookie-law class is an Angular2 module therefore, it needs to be registered in the modules array (encouraged way):

```js
import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';

import { CookieLawModule }     from 'angular2-cookie-law';

import { AppComponent }        from './app.component';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ // import Angular's modules
    BrowserModule,
    CookieLawModule
  ],
  providers: [
    // expose our Services and Providers into Angular's dependency injection
  ]
})
export class AppModule { }
```

## Usage

Use the component anywhere around your application:

```js
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
