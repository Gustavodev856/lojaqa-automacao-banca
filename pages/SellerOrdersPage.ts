import { Page, Locator } from '@playwright/test';

export class SellerOrdersPage {
  readonly page: Page;
  readonly orderStatuses: Locator;

  constructor(page: Page) {
    this.page = page;

    // Localiza todos os controles de status dos pedidos.
    this.orderStatuses = page.locator(
      'select.order-status-select',
    );
  }

  // Localiza um pedido específico pelo ID.
  getOrderStatus(orderId: string): Locator {
    return this.page.locator(
      `select.order-status-select[onchange*="${orderId}"]`,
    );
  }

  // Consulta o status atual de um pedido.
  async getCurrentStatus(orderId: string): Promise<string> {
    return await this.getOrderStatus(orderId).inputValue();
  }

  // Atualiza o status de um pedido.
  async updateStatus(
    orderId: string,
    status: string,
  ): Promise<void> {
    await this.getOrderStatus(orderId).selectOption(status);
  }
}