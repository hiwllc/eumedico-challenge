import { test, expect } from '@playwright/test'

test('should list characters and navigate to first character', async ({ page }) => {
  await page.goto('/')

  const card = page.getByRole('link', { name: /ver detalhes do personagem rick sanchez/i })
  await expect(card).toBeVisible()

  await card.click()

  await expect(page).toHaveURL(/\/1$/)
  await expect(page.getByRole('heading', { name: 'Rick Sanchez' })).toBeVisible()

  await page.getByRole('link', { name: 'Voltar Para Página Inicial' }).click()
  await expect(page).not.toHaveURL(/\/1$/)
})
