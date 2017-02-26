/**
 * angular2-cookie-law
 *
 * Copyright 2016-2017, @andreasonny83, All rights reserved.
 *
 * @author: @andreasonny83 <andreasonny83@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class CookieLawService {


  seen(): boolean {
    return this.cookieExisits('cookieLawSeen');
  }

  storeCookie(): void {
    return this.setCookie('cookieLawSeen');
  }

  /**
   * try to read a saved cookie
   *
   * @param  {string} name [the cookie name]
   *
   * @return {string}      [the cookie's value]
   */
  private cookieExisits(name: string): boolean {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + '=';
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, '');
      if (c.indexOf(cookieName) !== -1) {
        return true;
      }
    }

    return false;
  }

  /**
   * store a new cookie in the browser
   *
   * @param {string} name [the name for the cookie]
   */
  private setCookie(name: string): void {
    document.cookie = encodeURIComponent(name) + '=true; path=/';
  }
}
