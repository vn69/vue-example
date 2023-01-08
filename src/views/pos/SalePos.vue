<template>
  <div>
    <HeaderNav></HeaderNav>
    <!-- <div v-loading="loading" class="row"> -->
    <div v-loading="" class="row m-3">
      <div class="col-8">
        <el-card>
          <div slot="header">
            <span>Đơn {{ this.get_cartId + 1 }}</span>
          </div>
          <el-table  height="600" :data="get_carts[get_cartId]" style="width: 100%">
            <el-table-column label="Sản phẩm" width="400px">
              <template slot-scope="scope">
                <ProductItem :product="scope.row" @selectProduct=""></ProductItem>
              </template>
            </el-table-column>
            <el-table-column label="Số lượng" width="200px">
              <template slot-scope="scope">
                <div class="d-flex align-items-center">
                  <el-button size="mini" @click="() => changeItem(scope.row, 'minus')" icon="el-icon-minus"></el-button>
                  <input
                    @keydown="skipDotAndMinusOnly"
                    @change="(e) => changeQuantity(scope.row, e)"
                    type="number"
                    min="1"
                    step="1"
                    class="input-number-custom"
                    :value="scope.row.quantity"
                  />
                  <el-button size="mini" @click="() => changeItem(scope.row, 'plus')" icon="el-icon-plus"></el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Thành tiền">
              <template slot-scope="scope"> $ {{ (scope.row.quantity * scope.row.price) | formatMoneyUs }} </template>
            </el-table-column>
            <el-table-column label="Operations">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="deleteItem(scope.row)" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div class="col-4">
        <el-card>
          <div slot="header">
            <span>Thanh Toán</span>
          </div>
          <el-form label-position="right" label-width="100px" :model="paymentForm">
            <el-form-item label="tỉ giá ngoại tệ:">
              <number class="px-2" @keydown.native="skipDotAndMinusOnly" v-model="paymentForm.exchange" v-bind="moneyConfig"></number>
            </el-form-item>
            <el-form-item label="Chiết khấu:">
              <number class="px-2" @keydown.native="skipDotAndMinusOnly" v-model="paymentForm.discount" v-bind="moneyConfig"></number>
            </el-form-item>
            <el-form-item label="Thuế:">
              <number class="px-2" @keydown.native="skipDotAndMinusOnly" v-model="paymentForm.tax" v-bind="moneyConfig"></number>
            </el-form-item>
            <el-form-item label="Tổng tiền:">
              {{totalOder | formatMoney}} đ
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="paymentMoney">Thanh toán</el-button>
        </el-card>
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

export default {
  components: { HeaderNav, ProductItem },
  mixins: [productCode, utils],
  data() {
    return {
      test: 0,
      loading: false,
      paymentForm: {
        exchange: 23000,
        tax: 0,
        discount: 0,
      },
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    ...mapMutations("pos", ["set_carts"]),
    changeQuantity(product, e) {
      let quantity = e.target.value;
      if (!quantity || quantity == 0) quantity = 1;
      this.changeQuantityItemMixin(product, +quantity);
    },
    changeItem(product, type = "plus") {
      if (type == "minus" && product.quantity == 1) {
        this.deleteItem(product);
        return;
      }
      this.changeQuantityItemWithTypeMixin(product, type);
    },

    confirmDeteleItem() {},
    deleteItem(product) {
      this.$alert("Bạn có muốn xóa sản phẩm", "Cảnh báo", {
        confirmButtonText: "Xóa",
        callback: (action) => {
          if (action == "confirm") {
            this.deleteItemInCartMixin(product);
            this.$toast.success("Đã xóa sản phẩm!");
          }
        },
      });
    },
    paymentMoney() {
      if(this.cart.length) {
        console.log(this.cart)
        this.resetCartMixin()
        this.$toast.success("Đã thanh toán thành công!");
      } else {
        this.$toast.error("Đơn hàng không có sản phẩm nào!");
      }
    }
  },
  computed: {
    ...mapGetters("pos", ["get_products", "get_carts", "get_cartId"]),
    totalOder() {
      let total = 0
      this.cart.length && this.cart.map(e => {
        total+=(e.price * e.quantity)
      })
      return total*this.paymentForm.exchange
    },
    cart() {
      return this.get_carts[this.get_cartId]
    }
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
</style>
