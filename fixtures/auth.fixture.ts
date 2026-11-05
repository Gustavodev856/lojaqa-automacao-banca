
import { test as base, expect, Page } from '@playwright/test';

type AuthFixtures = {
  sellerToken: string;
  sellerPage: Page;
};

export const test = base.extend<AuthFixtures>({
  sellerToken: async ({ request }, use) => {
    const response = await request.post('login', {
      data: {
        email: process.env.SELLER_EMAIL || 'lojista@system.com',
        password: process.env.SELLER_PASSWORD || 'SellerPass123',
      },
    });

    const responseBody = await response.json();

    console.log('\n========== AUTENTICAÇÃO ==========');
    console.log('Status HTTP:', response.status());

    expect(
      response.status(),
      `Falha na autenticação: ${JSON.stringify(responseBody)}`,
    ).toBe(200);

    expect(responseBody.token).toBeTruthy();

    await use(responseBody.token);
  },

  sellerPage: async ({ page, sellerToken }, use) => {
    page.on('response', async (response) => {
  if (
    response.url().includes('/seller/orders') &&
    response.request().method() === 'GET'
  ) {
    console.log('\n========== RESPOSTA DA LISTAGEM DE PEDIDOS ==========');
    console.log('URL:', response.url());
    console.log('HTTP:', response.status());

    try {
      console.log('JSON:', await response.json());
    } catch {
      console.log('Não foi possível ler a resposta como JSON.');
    }
  }
});
    await page.addInitScript((token) => {
      localStorage.setItem('token', token);

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          email: 'lojista@system.com',
          name: 'LojaQA Oficial',
          role: 'seller',
        }),
      );

      localStorage.setItem('isAuthenticated', 'true');
    }, sellerToken);

    await page.goto(process.env.UI_URL!);

// Entra no painel do lojista.
await page.getByRole('link', { name: 'Minha Loja' }).click();

await page.waitForURL('**/painel.html');

await use(page);
  },
});

export { expect };
