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
    return this.cookieExisits(cookieName);
  }

  public storeCookie(cookieName: string, expiration?: number): void {
    return this.setCookie(cookieName, expiration);
  }

  private cookieExisits(name: string): boolean {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = name + '=';
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, '');
      if (c.indexOf(cookieName) !== -1) {
        return true;
      }
    }

    return false;
  }

  private setCookie(name: string, expiration?: number): void {
    const date = new Date();
    let expires;

    date.setTime(date.getTime() + expiration * 86400000);
    expires = '; expires=' + date.toUTCString();

    document.cookie = encodeURIComponent(name) + '=true; path=/' + expires;
  }

}
