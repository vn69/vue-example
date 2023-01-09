import { saveLocalStore, getLocalStore } from "@/utils/function";

export default {
  namespaced: true,
  state: {
    products: getLocalStore("products") || [],
    productsMap: getLocalStore("productsMap") || [],
    carts: getLocalStore("carts") || [],
    cartId: 0,
  },
  getters: {
    get_products(state) {
      return state.products;
    },
    get_productsMap(state) {
      return state.productsMap;
    },
    get_carts(state) {
      return state.carts;
    },
    get_cartId(state) {
      return state.cartId;
    },
  },
  mutations: {
    set_products(state, payload) {
      state.products = payload;
      saveLocalStore("products", payload);
    },
    set_productsMap(state, payload) {
      state.productsMap = payload;
    },
    set_carts(state, payload) {
      state.carts = payload;
      saveLocalStore("carts", payload);
    },
    set_cartId(state, payload) {
      state.cartId = payload;
    },
  },
  actions: {
  },
};
