
import { test, expect } from '@playwright/test';

test.describe('Desafio de Mercado - Wikipedia', () => {
  test('CT-01 - Pesquisar artigo Brasil na Wikipedia', async ({ page }) => {
    console.log('\n========== CT-01 - TESTE E2E ==========');

    await page.goto('https://pt.wikipedia.org/');

    const campoPesquisa = page.locator('#searchInput');

    await expect(campoPesquisa).toBeVisible();

    await campoPesquisa.fill('Brasil');
    await campoPesquisa.press('Enter');

    await expect(page).toHaveURL(/\/wiki\/Brasil/);
    await expect(page.locator('#firstHeading')).toHaveText('Brasil');

    console.log('Pesquisa realizada com sucesso!');
    console.log('Artigo encontrado: Brasil');
  });
});
