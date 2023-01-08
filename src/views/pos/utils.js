import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations("pos", ["set_carts"]),
    changeQuantityItemWithTypeMixin(product, type = "plus") {
      let carts = _.cloneDeep(this.get_carts);
      let cart = carts[this.get_cartId];
      if (cart.length == 0) {
        // chưa có sp
        if (type == "plus") addNewItem(cart, product);
        this.set_carts(carts);
      } else {
        // đã có sp
        const findedProduct = cart.find((e) => e.id == product.id);
        if (findedProduct) {
          if (type == "plus") findedProduct.quantity++;
          if (type == "minus") findedProduct.quantity--;
          this.set_carts(carts);
        } else {
          if (type == "plus") addNewItem(cart, product);
          this.set_carts(carts);
        }
      }
    },
    changeQuantityItemMixin(product, quantity) {
      let carts = _.cloneDeep(this.get_carts);
      let cart = carts[this.get_cartId];
      const findedProduct = cart.find((e) => e.id == product.id);
      if (findedProduct) {
        findedProduct.quantity = quantity;
        this.set_carts(carts);
      } else {
        this.set_carts(carts);
      }
    },
    deleteItemInCartMixin(product) {
      let carts = _.cloneDeep(this.get_carts);
      let cart = carts[this.get_cartId].filter((e) => e.id != product.id);
      carts[this.get_cartId] = cart
      this.set_carts(carts);
    },

    resetCartMixin() {
      let carts = _.cloneDeep(this.get_carts);
      carts[this.get_cartId] = [];
      this.set_carts(carts);
    },

    doRemoveTabMixin(index) {
      let carts = _.cloneDeep(this.get_carts);
      carts.splice(index, 1);
      this.set_carts(carts);
      this.set_cartId(0)
    },
  },
  computed: {
    ...mapGetters("pos", ["get_products", "get_carts", "get_cartId"]),
  },
};

function addNewItem(cart, product) {
  cart.push({
    ...product,
    quantity: 1,
  });
  return cart;
}
