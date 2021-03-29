import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = 50000;

describe('Map page', () => {
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
    await page.goto('http://localhost:3000/map', { waitUntil: 'networkidle0' });
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
  test('should be rendered initial autocomplete list', async () => {
    const ulLength = await page.$eval(
      'ul',
      (element) => element.childElementCount
    );
    expect(ulLength).toBeGreaterThanOrEqual(250);
  });
  test('should render initial marker', async () => {
    const marker = await page.$('.leaflet-tooltip-pane');
    expect(marker).not.toBeNull();
  });
  test('should display information when hovering over marker', async () => {
    await page.hover('.leaflet-marker-icon');
    const tooltipInfo = await page.$eval(
      '.leaflet-tooltip',
      (element) => element.innerText
    );
    expect(tooltipInfo).not.toBeNull();
  });
  test('should type value in autocomplete input', async () => {
    await page.click('input[type=text]');
    await page.keyboard.type('Belarus');
    const inputValue = await page.$eval(
      'input[type=text]',
      (element) => element.value
    );
    expect(inputValue).toBe('Belarus');
  });
  test('should change number of child in autocomplete', async () => {
    const ulLength = await page.$eval(
      'ul',
      (element) => element.childElementCount
    );
    expect(ulLength).toBe(1);
  });
});
