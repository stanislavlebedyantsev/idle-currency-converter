import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = process.env.SLOWMO ? 30000 : 10000;

describe('visual reg. test', () => {
  let browser, page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });

    page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.click('[data-testid=email]');
    await page.keyboard.type('sstom.r@gmail.com');
    await page.click('[data-testid=password]');
    await page.keyboard.type('123123');
    await page.click('[data-testid=signIn]');
    await page.waitForNavigation();
  }, timeout);

  afterAll(async () => {
    await browser.close();
  });
  test(
    'testing chart page',
    async () => {
      await page.click('[data-testid=chartsBtn]');
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    },
    timeout
  );
});
