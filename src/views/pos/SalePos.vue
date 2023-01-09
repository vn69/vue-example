<template>
  <div>
    <HeaderNav :cartsData="cartsData"></HeaderNav>
    <div class="container">
      <div v-loading="loading" class="row m-3">
        <div class="col-8">
          <el-card>
            <div slot="header">
              <span>Đơn {{ get_cartId + 1 }}</span>
            </div>
            <el-table height="600" :data="cartsData[get_cartId].cart" style="width: 100%">
              <el-table-column label="Sản phẩm" width="400px">
                <template slot-scope="scope">
                  <ProductItem :product="getProductById(scope.row.productId)" @selectProduct=""></ProductItem>
                </template>
              </el-table-column>
              <el-table-column label="Số lượng" width="200px">
                <template slot-scope="scope">
                  <div class="d-flex align-items-center">
                    <el-input-number
                      style="width: 130px"
                      @keydown.native="skipDotAndMinusOnly"
                      @change="(quantity) => changeQuantityProduct(quantity, scope.row)"
                      v-model="scope.row.quantity"
                      :min="0"
                      :step="1"
                    ></el-input-number>
                  </div>
                </template>
              </el-table-column>
              <el-table-column  width="100px" label="Thành tiền">
                <template slot-scope="scope"> $ {{ (scope.row.quantity * getProductById(scope.row.productId).price) | formatMoneyUs }} </template>
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteItem(scope.row)" icon="el-icon-delete"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
        <div class="col-4">
          <el-card>
            <div class="d-flex justify-content-between" slot="header">
              <span>Thanh Toán</span>
            </div>
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
                <el-button @click="cartNow.payment.customerPay = item" class="mb-2 custom-btn-price" v-for="(item, i) in suggestMoneyList" :key="i">{{ item | formatMoney }}</el-button>
              </div>
              <el-form-item class="mb-0" label="Tiền thừa:">
                <div>{{ getReturnMoney > 0 ? getReturnMoney : 0 | formatMoney }}</div>
              </el-form-item>
            </el-form>
            <div class="mt-3 d-flex justify-content-center">
              <el-button type="primary" :disabled="getReturnMoney < 0" @click="paymentMoney">Thanh toán</el-button>
              <el-button type="primary" disabled>Thanh toán đa phương thức</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import productCode from "../../utils/mixin/product.js";
import { mapGetters, mapMutations } from "vuex";
import ProductItem from "./components/ProductItem.vue";
import utils from "./utils";
import _ from "lodash";
import { getListSuggestMoney } from "../../utils/function.js";

export default {
  components: { HeaderNav, ProductItem },
  mixins: [productCode, utils],
  data() {
    return {
      loading: false,
      cartsData: [],
      suggestMoneyList: [],
    };
  },
  created() {
    this.getAllProductMixin();
    this.initData();
  },
  methods: {
    ...mapMutations("pos", ["set_carts"]),
    initData() {
      const carts = _.cloneDeep(this.get_carts);
      if (carts.length == 0) {
        const newCart = _.cloneDeep(this.newCartRaw);
        carts.push(newCart);
      }
      this.cartsData = carts;
    },
    deleteItem(product) {
      this.$alert("Bạn có muốn xóa sản phẩm", "Cảnh báo", {
        confirmButtonText: "Xóa",
        callback: (action) => {
          if (action == "confirm") {
            const index = this.cartNow.cart.findIndex((e) => e.productId == product.productId);
            console.log(index, this.cartNow.cart);
            if (index > -1) {
              this.cartNow.cart.splice(index, 1);
              this.$toast.success("Đã xóa sản phẩm!");
            }
          } else {
            if (product.quantity == 0) {
              product.quantity = 1;
            }
          }
        },
      });
    },
    changeQuantityProduct(quantity, product) {
      if (quantity == 0) this.deleteItem(product);
    },
    paymentMoney() {
      if (this.cartNow.cart.length) {
        const newCart = _.cloneDeep(this.newCartRaw);
        this.cartsData.splice(this.get_cartId, 1, newCart);
        this.$toast.success("Đã thanh toán thành công!");
      } else {
        this.$toast.error("Đơn hàng không có sản phẩm nào!");
      }
    },
  },
  watch: {
    cartsData: {
      handler(val) {
        const data = _.cloneDeep(val);
        console.log("save carts");
        this.set_carts(data);
      },
      deep: true,
    },
    get_cartId: {
      handler() {
        console.log("init data");
        this.initData();
      },
      immediate: true,
    },
    totalOderFinal: {
      handler(val) {
        this.suggestMoneyList = getListSuggestMoney(val);
        if (val) this.cartNow.payment.customerPay = 0;
      },
    },
  },
  computed: {
    ...mapGetters("pos", ["get_products", "get_productsMap", "get_carts", "get_cartId"]),
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
};
</script>

<style lang="scss" scoped>
.input-number-custom {
  text-align: center;
  width: 50px;
  margin: 0 10px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
.oder-info {
  height: 700px;
  overflow-y: auto;
}
.custom-btn-price {
  margin: 0 4px 12px 2px;
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
