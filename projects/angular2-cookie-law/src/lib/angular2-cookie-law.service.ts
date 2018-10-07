/**
 * angular2-cookie-law
 *
 * Copyright 2016-2018, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Angular2CookieLawService {
  public seen(cookieName: string = 'cookieLawSeen'): boolean {
    const cookies: Array<string> = document.cookie.split(';');

    return this.cookieExisits(cookieName, cookies);
  }

  public storeCookie(cookieName: string, expiration?: number): void {
    return this.setCookie(cookieName, expiration);
  }

  private cookieExisits(name: string, cookies: Array<string>): boolean {
    const cookieName = `${name}=`;

    return cookies.reduce((prev, curr) =>
      prev || curr.trim().search(cookieName) > -1, false);
  }

  private setCookie(name: string, expiration?: number): void {
    const now: Date = new Date();
    const exp: Date = new Date(now.getTime() + expiration * 86400000);

    const cookieString = encodeURIComponent(name) +
      `=true;path=/;expires=${exp.toUTCString()};`;

    document.cookie = cookieString;
  }
}
