import { test, expect } from '@playwright/test'

test('should filter for status', async ({ page }) => {
  await page.goto('/')

  const status = page.getByRole('complementary').getByText('Alive')
  await status.click()

  await expect(page.getByRole('checkbox', { name: /alive/i })).toBeChecked()
  await expect(page).toHaveURL(/status=alive/i)

  await expect(page.getByText(/status:\s*dead/i)).toHaveCount(0)

  await status.click()
  await expect(page.getByRole('checkbox', { name: /alive/i })).not.toBeChecked()
  await expect(page).not.toHaveURL(/status=alive/i)
})

test('should filter for gender', async ({ page }) => {
  await page.goto('/')

  const gender = page.getByRole('complementary').getByText('Female')
  await gender.click()

  await expect(page.getByRole('checkbox', { name: /female/i })).toBeChecked()
  await expect(page).toHaveURL(/gender=female/i)

  await expect(page.getByText(/status:\s*male/i)).toHaveCount(0)

  await gender.click()
  await expect(page.getByRole('checkbox', { name: /female/i })).not.toBeChecked()
  await expect(page).not.toHaveURL(/gender=female/i)
})

test('should filter for status and gender', async ({ page }) => {
  await page.goto('/')

  const status = page.getByRole('complementary').getByText('Dead')
  await status.click()
  await expect(page.getByRole('checkbox', { name: 'Dead' })).toBeChecked()

  const gender = page.getByText('Male', { exact: true })
  await gender.click()
  await expect(page.getByRole('checkbox', { name: 'Male', exact: true })).toBeChecked()

  await expect(page.getByText(/status:\s*female/i)).toHaveCount(0)
  await expect(page.getByText(/status:\s*alive/i)).toHaveCount(0)

  await expect(page).toHaveURL(/gender=male/i)
  await expect(page).toHaveURL(/status=dead/i)
})
