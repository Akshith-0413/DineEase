
import { api } from "../api/mock";

export const ordersStore = {
  orders: [],
  loading: false,
  async refresh() {
    this.loading = true;
    this.orders = await api.getOrders();
    this.loading = false;
  },
  async accept(id) {
    await api.acceptOrder(id);
    await this.refresh();
  },
  async ready(id) {
    await api.markReady(id);
    await this.refresh();
  },
  async reopen(id) {
    await api.reopen(id);
    await this.refresh();
  }
};