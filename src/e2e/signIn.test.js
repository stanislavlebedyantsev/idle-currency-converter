import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = 50000;

describe('Sign-In page', () => {
  let browser, page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  }, timeout);

  test(
    'should be rendered',
    async () => {
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot();
    },
    timeout
  );
  test(
    'should find login and password fields',
    async () => {
      const loginField = await page.$('[data-testid=email]');
      const passwordField = await page.$('[data-testid=password]');

      expect(loginField && passwordField).not.toBeNull();
    },
    timeout
  );
  test(
    "can't sign in without login or password",
    async () => {
      const signInBtn = await page.$('[data-testid=signIn]');
      expect(signInBtn).not.toBeNull();
      await page.click('[data-testid=signIn]');
      const error = await page.$eval(
        '[data-testid=error]',
        (element) => element.innerText
      );
      expect(error).not.toBe('');
    },
    timeout
  );
  test(
    'has login validation',
    async () => {
      await page.click('input[type=email]');
      await page.keyboard.type('asd');
      const loginValidationError = await page.$$('p');
      expect(loginValidationError.length).toBe(1);
    },
    timeout
  );
  test(
    'can sign in with valid credentials',
    async () => {
      await page.click('input[type=email]', { clickCount: 3 });
      await page.keyboard.type('sstom.r@gmail.com');
      await page.click('[data-testid=password]');
      await page.keyboard.type('123123');
      await page.click('[data-testid=signIn]');
      await page.waitForNavigation();
      expect(page.url()).toBe('http://localhost:3000/converter');
    },
    timeout
  );
});
