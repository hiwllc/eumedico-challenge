import { test, expect } from '@playwright/test'

test('should search for characters', async ({ page }) => {
  await page.goto('/')

  const input = page.getByPlaceholder('Buscar...')
  const search = page.getByRole('button', { name: 'Buscar' })

  await input.fill('sanchez')
  await search.click()

  await expect(page).toHaveURL(/name=sanchez/i)
  await expect(page.getByText(/rick sanchez/i).first()).toBeVisible()

  await page.getByRole('button', { name: /limpar/i }).click()
  await expect(page).not.toHaveURL(/name=sanchez/i)
})
