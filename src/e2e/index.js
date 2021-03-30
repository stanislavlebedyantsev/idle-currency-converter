import puppeteer from 'puppeteer';

export let browser, page;

export const beforeAllTest = async () => {
  browser = await puppeteer.launch({ headless: false });

  page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.click('[data-testid=email]');
  await page.keyboard.type('sstom.r@gmail.com');
  await page.click('[data-testid=password]');
  await page.keyboard.type('123123');
  await page.click('[data-testid=signIn]');
  await page.waitForNavigation();
  
};
