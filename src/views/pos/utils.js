import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      newCartRaw: {
        id: _.uniqueId(),
        cart: [],
        payment: {
          exchange: 23000,
          customerPay: 0,
          discount: {
            type: "%",
            đ: 0,
            "%": 0,
          },
          tax: {
            type: "%",
            đ: 0,
            "%": 0,
          },
        },
      },
    };
  },
  methods: {
    getProductById(id) {
      return this.get_productsMap[id];
    },
    getFinalValueMixin(value, parent) {
      if (parent.type == "đ") return +parent["đ"];
      if (parent.type == "%") return Math.floor(+value * (+parent["%"] / 100));
    },
    selectProductMixin(product) {
      if (product.maxQuantity == 0) {
        this.$toast.error("Sản phẩm đã hết hàng!");
        return;
      }
      const findedProduct = this.cartsData[this.get_cartId].cart.find((e) => e.productId == product.id);

      if (findedProduct) {
        console.log(333, product, findedProduct);
        if (findedProduct.quantity >= product.maxQuantity) {
          this.$toast.error(`Sản phẩm có thể bán tối đa là:${product.maxQuantity} !`);
          return;
        }
        findedProduct.quantity++;
      } else {
        this.cartsData[this.get_cartId].cart.push({
          productId: product.id,
          quantity: 1,
        });
      }
      this.$toast.success("Đã thêm vào giỏ hàng!");
    },
    cloneNewCart() {
      const newCartRaw = _.cloneDeep(this.newCartRaw);
      newCartRaw.payment = {
        ...newCartRaw.payment,
        exchange: this.get_paymentSetting.exchange,
        tax: {
          type: "%",
          đ: 0,
          "%": this.get_paymentSetting.tax,
        },
      };
      return newCartRaw;
    },
  },
  computed: {
    ...mapGetters("pos", ["get_productsMap", "get_paymentSetting"]),
  },
};
