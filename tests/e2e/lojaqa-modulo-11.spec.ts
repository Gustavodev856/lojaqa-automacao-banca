
import { test, expect } from '../../fixtures/auth.fixture';
import { SellerOrdersPage } from '../../pages/SellerOrdersPage';

test.describe('Módulo 11 - Gestão de Entregas e Status', () => {

  test('E2E-01 - Lojista deve atualizar pedido para Entregue', async ({
    sellerPage,
    request,
    sellerToken,
  }) => {
    const ordersPage = new SellerOrdersPage(sellerPage);

    console.log('\n========== E2E-01 - CAMINHO FELIZ ==========');

    // 1. Busca os pedidos do lojista pela API.
    const listResponse = await request.get('seller/orders', {
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
    });

    expect(listResponse.status()).toBe(200);

    const orders = await listResponse.json();

    expect(orders.length).toBeGreaterThan(0);

    // 2. Seleciona dinamicamente o primeiro pedido.
    const orderId = orders[0]._id;

    console.log('ID do pedido selecionado:', orderId);
    console.log('Status anterior:', orders[0].status);

    // 3. Prepara o cenário pela API.
    const preparationResponse = await request.put(
      `seller/orders/${orderId}/status`,
      {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
        data: {
          status: 'shipped',
        },
      },
    );

    console.log(
      'HTTP da preparação:',
      preparationResponse.status(),
    );

    expect(preparationResponse.status()).toBe(200);

    // 4. Atualiza a interface para refletir o cenário preparado.
    await sellerPage.reload();

    const selectedOrder = ordersPage.getOrderStatus(orderId);

    await expect(selectedOrder).toBeVisible();
    await expect(selectedOrder).toHaveValue('shipped');

    console.log('Status preparado:', await selectedOrder.inputValue());

    // 5. Aguarda a chamada PUT realizada pela interface.
    const updateResponsePromise = sellerPage.waitForResponse((response) => {
      return (
        response.url().includes(
          `/seller/orders/${orderId}/status`,
        ) &&
        response.request().method() === 'PUT'
      );
    });

    // 6. Realiza a atualização pelo navegador.
    await ordersPage.updateStatus(orderId, 'delivered');

    const updateResponse = await updateResponsePromise;

    console.log('HTTP da atualização pela interface:', updateResponse.status());

    expect(updateResponse.status()).toBe(200);

    await expect(selectedOrder).toHaveValue('delivered');

    console.log('Novo status:', await selectedOrder.inputValue());

    // 7. Confirma a persistência após recarregar.
    await sellerPage.reload();

    const persistedOrder = ordersPage.getOrderStatus(orderId);

    await expect(persistedOrder).toHaveValue('delivered');

    console.log('Resultado: pedido atualizado e persistido com sucesso.');
  });

  test('E2E-02 - Interface não deve oferecer status inválido', async ({
    sellerPage,
  }) => {
    const ordersPage = new SellerOrdersPage(sellerPage);

    console.log('\n========== E2E-02 - CAMINHO TRISTE ==========');

    const firstOrder = ordersPage.orderStatuses.first();

    await expect(firstOrder).toBeVisible();

    const invalidOption = firstOrder.locator(
      'option[value="invalid"]',
    );

    await expect(invalidOption).toHaveCount(0);

    await expect(firstOrder.locator('option')).toHaveCount(5);

    console.log('Status inválido não está disponível na interface.');
    console.log('Resultado: interface oferece somente as cinco opções previstas.');
  });

});
