import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = 50000;

describe('Charts page', () => {
  let browser, page;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false});

    page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.click('[data-testid=email]');
    await page.keyboard.type('sstom.r@gmail.com');
    await page.click('[data-testid=password]');
    await page.keyboard.type('123123');
    await page.click('[data-testid=signIn]');
    await page.waitForNavigation();
    await page.goto('http://localhost:3000/converter', {
      waitUntil: 'networkidle0',
    });
    await page.goto('http://localhost:3000/charts', {
      waitUntil: 'networkidle0',
    });
  }, timeout);
  afterAll(async () => {
    await browser.close();
  });
  test(
    'should be rendered',
    async () => {
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    },
    timeout
  );
  test(
    'should change value in autocomplete',
    async () => {
      await page.click('[data-testid=chartsCurrencies]');
      await page.keyboard.type('USD');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      const chartsChoisenCurrency = await page.$eval(
        'input[type=text]',
        (element) => element.value
      );
      expect(chartsChoisenCurrency).toBe('USD');
    },
    timeout
  );
  test(
    'should add line to chart',
    async () => {
      await page.click('[data-testid=currencyCheckbox]');
      const chartsChoisenCurrency = await page.$$('.recharts-line');
      expect(chartsChoisenCurrency.length).toBe(1);
    },
    timeout
  );
});
