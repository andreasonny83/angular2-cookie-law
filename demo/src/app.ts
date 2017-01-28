import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js';
// import 'ts-helpers';
// import 'rxjs';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
