<template>
  <div>
    <el-form class="custom-form-99" label-position="right" label-width="130px" :model="cartNow.payment">
      <el-form-item label="Tổng tiền ($):">
        <div>{{ totalOderUs | formatMoneyUs }}</div>
      </el-form-item>
      <el-form-item label="tỉ giá ngoại tệ:">
        <number class="px-2 w-100" @keydown.native="skipDotAndMinusOnly" v-model="cartNow.payment.exchange" v-bind="moneyConfig"></number>
      </el-form-item>
      <el-form-item label="Tổng tiền (đ):">
        <div>{{ totalOder | formatMoney }}</div>
      </el-form-item>
      <el-form-item label="Chiết khấu:">
        <div class="input-money-wrap">
          <number
            v-if="cartNow.payment.discount.type == 'đ'"
            class="px-2 w-100 input-money-wrap_input"
            @keydown.native="skipDotAndMinusOnly"
            @change="checkMaxValue"
            v-model="cartNow.payment.discount['đ']"
            v-bind="moneyConfig"
          ></number>
          <input
            type="number"
            step="1"
            v-if="cartNow.payment.discount.type == '%'"
            class="px-2 w-100 input-money-wrap_input"
            @keydown="skipDotAndMinusOnly"
            @input="() => checkPercentMixin(cartNow.payment.discount, '%')"
            v-model="cartNow.payment.discount['%']"
            :max="100"
            :min="0"
          />
          <el-radio-group class="input-money-wrap_type" v-model="cartNow.payment.discount.type">
            <el-radio-button label="đ"></el-radio-button>
            <el-radio-button label="%"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="text-danger">
          - {{ totalDiscount | formatMoney }}
          <span v-if="cartNow.payment.discount.type == '%'"> (-{{ +cartNow.payment.discount["%"] }}%) </span>
        </div>
      </el-form-item>
      <el-form-item label="Thuế:">
        <div class="input-money-wrap">
          <number
            v-if="cartNow.payment.tax.type == 'đ'"
            class="px-2 w-100 input-money-wrap_input"
            @keydown.native="skipDotAndMinusOnly"
            v-model="cartNow.payment.tax['đ']"
            v-bind="moneyConfig"
          ></number>
          <input
            type="number"
            step="1"
            v-if="cartNow.payment.tax.type == '%'"
            class="px-2 w-100 input-money-wrap_input"
            @keydown="skipDotAndMinusOnly"
            @input="() => checkPercentMixin(cartNow.payment.tax, '%')"
            v-model="cartNow.payment.tax['%']"
            :max="100"
            :min="0"
          />
          <el-radio-group class="input-money-wrap_type" v-model="cartNow.payment.tax.type">
            <el-radio-button label="đ"></el-radio-button>
            <el-radio-button label="%"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="text-danger">
          + {{ totalTax | formatMoney }}
          <span v-if="cartNow.payment.tax.type == '%'"> (+{{ +cartNow.payment.tax["%"] }}%) </span>
        </div>
      </el-form-item>
      <el-form-item label="Tổng thanh toán:">
        <b> {{ totalOderFinal | formatMoney }} </b>
      </el-form-item>
      <el-form-item label="Tiền khách đưa:">
        <number class="px-2 w-100" @keydown.native="skipDotAndMinusOnly" v-model="cartNow.payment.customerPay" v-bind="moneyConfig"></number>
      </el-form-item>
      <div>
        <el-button size="mini" @click="cartNow.payment.customerPay = item" class="mb-2 custom-btn-price" v-for="(item, i) in suggestMoneyList" :key="i">{{
          item | formatMoney
        }}</el-button>
      </div>
      <el-form-item class="mb-0" label="Tiền thừa:">
        <div>{{ getReturnMoney > 0 ? getReturnMoney : 0 | formatMoney }}</div>
      </el-form-item>
    </el-form>
    <div class="mt-3 d-flex justify-content-center">
      <el-button type="primary" :disabled="getReturnMoney < 0" @click="paymentMoney">Thanh toán</el-button>
      <el-button type="primary" disabled>Thanh toán đa phương thức</el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { getListSuggestMoney } from "../../../utils/function.js";
import utils from "../utils";
import productCode from "../../../utils/mixin/product";
import { mapGetters } from "vuex";

export default {
  props: ["cartsData"],
  mixins: [utils, productCode],
  data() {
    return {
      suggestMoneyList: [],
    };
  },
  methods: {
    paymentMoney() {
      const emptyCart = this.cartNow.cart.filter(e => e.quantity == 0)
      if(emptyCart.length) {
        this.cartNow.cart = this.cartNow.cart.filter(e => e.quantity)
        this.$toast.error("Đơn chứa sản phẩm đã hết hàng, Vui lòng thanh toán lại!");
        return
      }
      if (this.cartNow.cart.length && this.totalOderUs) {
        if (this.checkWareHouse(this.cartNow.cart)) {
          console.log('ok')
          const products = _.cloneDeep(this.get_products)
          const productsMap =  _.cloneDeep(this.get_productsMap)
          this.cartNow.cart.forEach(item => {
            productsMap[item.productId].maxQuantity -= item.quantity
          });
          products.forEach(item => {
            item.maxQuantity = productsMap[item.id].maxQuantity
          });
          this.setProductsDataMixin(products)
          console.log(this.cartNow.cart);
          //add new Cart
          const newCart = _.cloneDeep(this.newCartRaw);
          this.cartsData.splice(this.get_cartId, 1, newCart);
          this.$toast.success("Đã thanh toán thành công!");
        } else {
          this.$toast.error("Đơn chứa sản phẩm đã hết hàng!");
        }

      } else {
        this.$toast.error("Đơn hàng không có sản phẩm nào!");
      }
    },
    checkWareHouse(cart) {
      let result = true
      cart.forEach((product) => {
        if (product.quantity > this.getProductById(product.productId).maxQuantity) return false;
      });
      return result;
    },
  },
  computed: {
    ...mapGetters("pos", ["get_cartId", "get_products"]),
    totalOderUs() {
      let total = 0;
      this.cartNow.cart.length &&
        this.cartNow.cart.map((e) => {
          const product = this.getProductById(e.productId);
          total += product ? product.price * e.quantity : 0;
        });
      return +total;
    },
    totalOder() {
      return this.totalOderUs * +this.cartNow.payment.exchange;
    },
    totalDiscount() {
      const discount = this.getFinalValueMixin(this.totalOder, this.cartNow.payment.discount);
      return +discount;
    },
    totalTax() {
      const tax = this.getFinalValueMixin(this.totalOder - this.totalDiscount, this.cartNow.payment.tax);
      return +tax;
    },
    totalOderFinal() {
      return this.totalOder - this.totalDiscount + this.totalTax;
    },
    cartNow() {
      return this.cartsData[this.get_cartId];
    },
    getReturnMoney() {
      return this.cartNow.payment.customerPay - this.totalOderFinal;
    },
  },
  watch: {
    totalOderFinal: {
      handler(val) {
        this.suggestMoneyList = getListSuggestMoney(val);
        if (val) this.cartNow.payment.customerPay = 0;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-btn-price {
  margin: 0px 6px 0 6px;
}
.el-form-item {
  margin-bottom: 6px;
}
</style>

<style lang="scss">
.custom-form-99 {
  .el-form-item__label {
    font-weight: bold;
    color: #909399;
  }
}
</style>
