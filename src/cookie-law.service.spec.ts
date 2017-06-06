import { CookieLawService } from './cookie-law.service';

describe('CookieLawService', () => {
  let service: CookieLawService;

  beforeEach(() => {
    document.cookie = 'cookieLawSeen=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    service = new CookieLawService();
  });

  it('#seen should return a value', () => {
    expect(service.seen()).toBe(false);
  });

  it('#seen should now have a cookie stored', () => {
    service.storeCookie('cookieLawSeen');

    expect(service.seen()).toBe(true);
    expect(service.seen('cookieLawSeen')).toBe(true);
  });

  it('set an expiration time', () => {
    service.storeCookie('cookieLawSeen', 1);

    expect(service.seen()).toBe(true);
    expect(service.seen('cookieLawSeen')).toBe(true);
    expect(document.cookie.match('cookieLawSeen').indexOf('cookieLawSeen')).not.toBe(-1);
  });

  it('should stored different cookie names', () => {
    service.storeCookie('testCookie');

    expect(service.seen('fakeCookie')).toBe(false);
    expect(service.seen()).toBe(false);

    expect(service.seen('testCookie')).toBe(true);
  });
});
