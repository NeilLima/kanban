// ============================================
// TESTE E2E DO LOGIN - PUPPETEER
// ============================================

import puppeteer from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

describe('LoginComp - E2E com Puppeteer', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${APP_URL}/login`);
  });

  afterEach(async () => {
    await page.close();
  });

  it('should render login form', async () => {
    const form = await page.$('[data-testid="login-form"]');
    expect(form).toBeTruthy();
  });

  it('should render email input', async () => {
    const emailInput = await page.$('[data-testid="login-email"]');
    expect(emailInput).toBeTruthy();
  });

  it('should render password input', async () => {
    const passwordInput = await page.$('[data-testid="login-password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('should render submit button', async () => {
    const submitButton = await page.$('[data-testid="login-submit"]');
    expect(submitButton).toBeTruthy();
  });

  it('should render register link', async () => {
    const registerLink = await page.$('[data-testid="login-register-link"]');
    expect(registerLink).toBeTruthy();
  });

  it('should type email and password', async () => {
    await page.type('[data-testid="login-email"]', 'test@nexus.com');
    await page.type('[data-testid="login-password"]', 'password123');

    const emailValue = await page.$eval(
      '[data-testid="login-email"]',
      (el: HTMLInputElement) => el.value
    );
    expect(emailValue).toBe('test@nexus.com');
  });

  it('should navigate to register page when clicking register link', async () => {
    await page.click('[data-testid="login-register-link"]');
    await page.waitForNavigation();
    expect(page.url()).toContain('/register');
  });
});