/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { CookieLawService } from './cookie-law.service';

describe('CookieLawService', () => {
  let service: CookieLawServices;

  beforeEach(() => {
    service = new CookieLawService();
    document.cookie = 'cookieLawSeen=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  });

  it('#seen should return a value', () => {

    expect(service.seen()).toBe(false);
  });

  it('#seen should read a cookie', () => {
    let seenSpy = spyOn(service, 'cookieExisits');

    service.seen();
    expect(seenSpy).toHaveBeenCalled();
  });

  it('#storeCookie should store a cookie', () => {
    let setCookieSpy = spyOn(service, 'setCookie');

    service.storeCookie();

    expect(setCookieSpy).toHaveBeenCalled();
    expect(setCookieSpy.calls.mostRecent().args).toContain('cookieLawSeen');
  });

  it('#seen should now have a cookie stored', () => {
    service.storeCookie();

    expect(service.seen()).toBe(true);
  });
});
