
import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Módulo 11 - Gestão de Entregas e Status', () => {

  test('API-01 - Lojista deve listar seus pedidos', async ({
    request,
    sellerToken,
  }) => {
    const response = await request.get('seller/orders', {
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
    });

    const body = await response.json();

    console.log('\n========== API-01 ==========');
    console.log('Status HTTP:', response.status());
    console.log('Content-Type:', response.headers()['content-type']);
    console.log('Pedidos encontrados:', body.length);
    console.log('JSON:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(Array.isArray(body)).toBeTruthy();

    if (body.length > 0) {
      expect(body[0]).toHaveProperty('_id');
      expect(body[0]).toHaveProperty('status');
      expect(body[0]).toHaveProperty('items');
    }
  });

  test('API-02 - Atualizar pedido para enviado (shipped)', async ({
    request,
    sellerToken,
  }) => {
    const ordersResponse = await request.get('seller/orders', {
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
    });

    const orders = await ordersResponse.json();

    test.skip(orders.length === 0, 'Não existem pedidos para atualizar.');

    const orderId = orders[0]._id;

    const response = await request.put(
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

    const body = await response.json();

    console.log('\n========== API-02 ==========');
    console.log('Status HTTP:', response.status());
    console.log('Content-Type:', response.headers()['content-type']);
    console.log('JSON:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(body.message).toBe('Status atualizado.');
    expect(body.order.status).toBe('shipped');
  });

  test('API-03 - Atualizar pedido para entregue (delivered)', async ({
    request,
    sellerToken,
  }) => {
    const ordersResponse = await request.get('seller/orders', {
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
    });

    const orders = await ordersResponse.json();

    test.skip(orders.length === 0, 'Não existem pedidos para atualizar.');

    const orderId = orders[0]._id;

    const response = await request.put(
      `seller/orders/${orderId}/status`,
      {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
        data: {
          status: 'delivered',
        },
      },
    );

    const body = await response.json();

    console.log('\n========== API-03 ==========');
    console.log('Status HTTP:', response.status());
    console.log('JSON:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
    expect(body.order.status).toBe('delivered');
  });

  test('API-04 - Rejeitar status inválido', async ({
    request,
    sellerToken,
  }) => {
    const ordersResponse = await request.get('seller/orders', {
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
    });

    const orders = await ordersResponse.json();

    test.skip(orders.length === 0, 'Não existem pedidos para testar.');

    const orderId = orders[0]._id;

    const response = await request.put(
      `seller/orders/${orderId}/status`,
      {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
        data: {
          status: 'em_transporte',
        },
      },
    );

    const body = await response.json();

    console.log('\n========== API-04 ==========');
    console.log('Status HTTP:', response.status());
    console.log('Erro:', body.error);

    expect(response.status()).toBe(400);
    expect(body.error).toBe('Status de pedido inválido.');
  });

  test('API-05 - Bloquear consulta sem token', async ({ request }) => {
    const response = await request.get('seller/orders');

    const body = await response.json();

    console.log('\n========== API-05 ==========');
    console.log('Status HTTP:', response.status());
    console.log('Erro:', body.error);

    expect(response.status()).toBe(403);
    expect(body.error).toBe('Token não fornecido.');
  });

  test('API-06 - Retornar 404 para pedido inexistente', async ({
    request,
    sellerToken,
  }) => {
    const response = await request.put(
      'seller/orders/000000000000000000000000/status',
      {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
        data: {
          status: 'shipped',
        },
      },
    );

    const body = await response.json();

    console.log('\n========== API-06 ==========');
    console.log('Status HTTP:', response.status());
    console.log('Erro:', body.error);

    expect(response.status()).toBe(404);
    expect(body.error).toBe(
      'Pedido não encontrado ou sem permissão.',
    );
  });

});
