import { test, expect } from '@playwright/test';

const storedIdentity = {
  id: 'seed-id',
  name: 'SeedUser',
  description: 'Seeded description',
  status: 'online',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  avatar_data: null,
  email: 'seed@example.com'
};

test.describe('identity page', () => {
  test('loads from localStorage and validates email', async ({ page }) => {
    await page.addInitScript((value) => {
      window.localStorage.setItem('upload', JSON.stringify(value));
    }, storedIdentity);

    await page.route('**/api/loads/current', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ code: 0, data: storedIdentity })
      });
    });

    await page.goto('/dashboard/train/identity');

    await expect(page.getByPlaceholder('e.g., Felix (no spaces allowed)')).toHaveValue('SeedUser');
    await expect(
      page.getByPlaceholder(
        "e.g., 'An adventurous, data-driven, and enjoy learning new technologies.'"
      )
    ).toHaveValue('Seeded description');
    await expect(page.getByPlaceholder('e.g., your.name@example.com')).toHaveValue(
      'seed@example.com'
    );

    await page.getByPlaceholder('e.g., your.name@example.com').fill('bad-email');
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });
});
