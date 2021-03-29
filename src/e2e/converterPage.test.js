import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = 50000;

describe('Converter page', () => {
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
    await page.goto('http://localhost:3000/converter', {
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
    'should find initial converter field',
    async () => {
      const converterField = await page.$(
        'div[data-testid=inputFieldCurrencyChoice]'
      );
      expect(converterField).not.toBeNull();
    },
    timeout
  );
  test(
    'should find choice converter currency field',
    async () => {
      const converterField = await page.$('[data-testid=currencyChoice]');
      expect(converterField).not.toBeNull();
    },
    timeout
  );
  test(
    'should add new currency',
    async () => {
      await page.click('[data-testid=currencyChoice]');
      await page.keyboard.type('USD');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.click('input[type=number]');
      const converterFields = await page.$$(
        'div[data-testid=inputFieldCurrencyChoice]'
      );
      expect(converterFields.length).toBe(2);
    },
    timeout
  );
  test('should convert currency after input new value', async () => {
    await page.keyboard.type('2');
    await page.click('[data-testid=currencyChoice]');
    const converterFieldsValue = await page.$eval(
      'input[name=USD]',
      (element) => element.value
    );
    expect(converterFieldsValue).toBe('4.57');
  });
  test('should delete field', async () => {
    await page.click('button[name=USD]');
    const converterFields = await page.$$(
      'div[data-testid=inputFieldCurrencyChoice]'
    );
    expect(converterFields.length).toBe(1);
  });
});
 