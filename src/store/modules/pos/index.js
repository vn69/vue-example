export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    get_products(state) {
      return state.products
    }
  },
  mutations: {
    set_products(state, payload) {
      state.products = payload
    },
  },
  actions: {},
};
