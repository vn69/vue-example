<template>
  <div>
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
              size="medium"
              @keydown.native="skipDotAndMinusOnly"
              @change="(quantity) => changeQuantityProduct(quantity, scope.row)"
              v-model="scope.row.quantity"
              :min="0"
              :step="1"
            ></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100px" label="Thành tiền">
        <template slot-scope="scope"> $ {{ (scope.row.quantity * getProductById(scope.row.productId).price) | formatMoneyUs }} </template>
      </el-table-column>
      <el-table-column label="">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductItem from "./ProductItem.vue";
import utils from "../utils";

export default {
  components: {ProductItem },
  mixins: [utils],
  props: ["cartsData"],
  data() {
    return {};
  },
  methods: {
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
  },
  computed: {
    ...mapGetters("pos", ["get_cartId"]),
    cartNow() {
      return this.cartsData[this.get_cartId];
    },
  }
};
</script>

<style></style>
