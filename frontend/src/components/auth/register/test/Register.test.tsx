// ============================================
// TESTE E2E DO REGISTER - PUPPETEER
// ============================================

import puppeteer, { type Browser, type Page } from 'puppeteer';

const APP_URL = process.env.APP_URL || 'http://localhost:3001';

describe('RegisterComp - E2E com Puppeteer', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(`${APP_URL}/register`);
  });

  afterEach(async () => {
    await page.close();
  });

  it('should render register form', async () => {
    const form = await page.$('[data-testid="register-form"]');
    expect(form).toBeTruthy();
  });

  it('should render name input', async () => {
    const nameInput = await page.$('[data-testid="register-name"]');
    expect(nameInput).toBeTruthy();
  });

  it('should render email input', async () => {
    const emailInput = await page.$('[data-testid="register-email"]');
    expect(emailInput).toBeTruthy();
  });

  it('should render password input', async () => {
    const passwordInput = await page.$('[data-testid="register-password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('should render confirm password input', async () => {
    const confirmPasswordInput = await page.$('[data-testid="register-confirm-password"]');
    expect(confirmPasswordInput).toBeTruthy();
  });

  it('should render submit button', async () => {
    const submitButton = await page.$('[data-testid="register-submit"]');
    expect(submitButton).toBeTruthy();
  });

  it('should render login link', async () => {
    const loginLink = await page.$('[data-testid="register-login-link"]');
    expect(loginLink).toBeTruthy();
  });

  it('should type name, email and password', async () => {
    await page.type('[data-testid="register-name"]', 'Test User');
    await page.type('[data-testid="register-email"]', 'test@nexus.com');
    await page.type('[data-testid="register-password"]', 'password123');
    await page.type('[data-testid="register-confirm-password"]', 'password123');

    const nameValue = await page.$eval(
      '[data-testid="register-name"]',
      (el) => (el as HTMLInputElement).value
    );
    expect(nameValue).toBe('Test User');
  });

  it('should navigate to login page when clicking login link', async () => {
    await page.click('[data-testid="register-login-link"]');
    await page.waitForNavigation();
    expect(page.url()).toContain('/login');
  });
});