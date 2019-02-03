/**
 * angular2-cookie-law
 *
 * Copyright 2016-2018, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Angular2CookieLawService {
  constructor(
    @Inject(DOCUMENT) private doc: any,
    @Inject(PLATFORM_ID) private platform: Object
  ) {}

  public seen(cookieName: string = 'cookieLawSeen'): boolean {
    let cookies: Array<string> = [];

    if (isPlatformBrowser(this.platform)) {
      cookies = this.doc.cookie.split(';');

      return this.cookieExisits(cookieName, cookies);
    }

    return true;
  }

  public storeCookie(cookieName: string, expiration?: number): void {
    return this.setCookie(cookieName, expiration);
  }

  private cookieExisits(name: string, cookies: Array<string>): boolean {
    const cookieName = `${name}=`;

    return cookies.reduce(
      (prev, curr) => prev || curr.trim().search(cookieName) > -1,
      false
    );
  }

  private setCookie(name: string, expiration?: number): void {
    const now: Date = new Date();
    const exp: Date = new Date(now.getTime() + expiration * 86400000);

    const cookieString =
      encodeURIComponent(name) + `=true;path=/;expires=${exp.toUTCString()};`;

    if (isPlatformBrowser(this.platform)) {
      this.doc.cookie = cookieString;
    }
  }
}
