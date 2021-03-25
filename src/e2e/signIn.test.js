import puppeteer from "puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { toMatchPdfSnapshot  } from 'jest-pdf-snapshot';

expect.extend({ toMatchImageSnapshot });
const timeout = process.env.SLOWMO ? 30000 : 10000;

describe('visual reg. test', () => {
  let browser;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
  });

  afterAll(async () => {
    await browser.close();
  });
  test(
    'testing homepage',
    async () => {
      const page = await browser.newPage();
      await page.goto('http://localhost:3000');

      const image = await page.screenshot();

      expect(image).toMatchSnapshot();
    },
    timeout 
  );
});
