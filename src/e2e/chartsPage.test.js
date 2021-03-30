import { beforeAllTest, browser, page } from './';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = 50000;

describe('Charts page', () => {
  beforeAll(beforeAllTest, timeout);
  afterAll(async () => {
    await browser.close();
  });
  test(
    'should be rendered',
    async () => {
      await page.goto('http://localhost:3000/charts', {
        waitUntil: 'networkidle0',
      });
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
