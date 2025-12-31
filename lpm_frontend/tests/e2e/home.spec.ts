import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('shows the hero and count', async ({ page }) => {
    await page.route('**/api/loads/current', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ code: 0, data: null })
      });
    });

    await page.route('**/api/upload/count', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ code: 0, data: { count: 12 } })
      });
    });

    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Create Your AI self' })).toBeVisible();
    await expect(page.getByText('12 Second Me in network')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create my Second Me' })).toBeVisible();
  });
});
