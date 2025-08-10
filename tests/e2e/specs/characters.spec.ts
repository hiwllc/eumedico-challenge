import { test, expect } from '@playwright/test'

test('should list characters and navigate to second page', async ({ page }) => {
  await page.goto('/')

  // first results
  await expect(page.getByRole('heading', { name: 'Rick Sanchez' })).toBeVisible()
  await expect(page.getByText('Status: Alive').first()).toBeVisible()
  await expect(page.getByText('Location: Citadel of Ricks').first()).toBeVisible()

  // pagination
  await page.getByRole('link', { name: '2' }).click()
  await expect(page).toHaveURL(/[\?&]page=2/)
  await page.getByRole('link', { name: 'Anterior' }).click()
  await expect(page).toHaveURL(/[\?&]page=1/)
})
