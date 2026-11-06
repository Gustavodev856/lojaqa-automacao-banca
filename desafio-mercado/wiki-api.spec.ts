
import { test, expect } from '@playwright/test';

test.describe('Desafio de Mercado - Wikipedia API', () => {
  test('CT-02 - Pesquisar artigo Brasil pela API REST', async ({ request }) => {
    console.log('\n========== CT-02 - TESTE DE API ==========');

    const response = await request.get(
      'https://pt.wikipedia.org/w/rest.php/v1/search/page',
      {
        params: {
          q: 'Brasil',
          limit: 5,
        },
        headers: {
          'Api-User-Agent': 'DesafioMercadoPlaywright/1.0 (teste educacional)',
        },
      },
    );

    const body = await response.json();

    console.log('Status HTTP:', response.status());
    console.log('Quantidade de resultados:', body.pages?.length);

    expect(response.status()).toBe(200);
    expect(Array.isArray(body.pages)).toBeTruthy();

    const artigoBrasil = body.pages.find(
      (pagina: { title: string }) => pagina.title === 'Brasil',
    );

    expect(artigoBrasil).toBeTruthy();

    console.log('Artigo encontrado:', artigoBrasil.title);
    console.log('Resultado: pesquisa realizada com sucesso!');
  });
});
