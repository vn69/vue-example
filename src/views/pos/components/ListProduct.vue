<template>
  <div>
    <el-table height="calc(100vh - 320px)" :data="cartsData[get_cartId].cart" style="width: 100%">
      <el-table-column label="Sản phẩm" width="400px">
        <template slot-scope="scope">
          <ProductItem :product="getProductById(scope.row.productId)" @selectProduct=""></ProductItem>
        </template>
      </el-table-column>
      <el-table-column label="Số lượng" width="200px">
        <template slot-scope="scope">
          <div>
            <el-input-number
              style="width: 130px"
              size="medium"
              @keydown.native="skipDotAndMinusOnly"
              @change="(quantity) => changeQuantityProduct(quantity, scope.row)"
              v-model="scope.row.quantity"
              :min="0"
              :max="getProductById(scope.row.productId).maxQuantity"
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
    <div class="mt-2 d-flex justify-content-between align-items-center">
      <el-popover v-model="showAllProducts" placement="top-start" width="800" trigger="click">
        <el-button slot="reference">Show All</el-button>
        <!-- show -->
        <div class="all-prpduct">
          <div class="row">
            <div class="col-6 mb-2" v-for="item in productShow" :key="item.id">
              <ProductItem class="custom-product border" :product="getProductById(item.id)" @selectProduct="selectProductMixin"></ProductItem>
            </div>
          </div>
        </div>
        <el-pagination class="text-end" background :current-page.sync="currentPage" :page-size="sizePage" layout="prev, pager, next" :total="get_products.length"></el-pagination>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductItem from "./ProductItem.vue";
import utils from "../utils";

export default {
  components: { ProductItem },
  mixins: [utils],
  props: ["cartsData"],
  data() {
    return {
      showAllProducts: false,
      currentPage: 1,
      sizePage: 10,
    };
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
    ...mapGetters("pos", ["get_cartId", "get_products"]),
    cartNow() {
      return this.cartsData[this.get_cartId];
    },
    productShow() {
      const index = (this.currentPage - 1) * this.sizePage;
      const result = this.get_products.slice(index, index + this.sizePage);
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-product {
  border-radius: 6px;
  cursor: pointer;
}
.custom-product:hover {
  background-color: #aaa;
}
</style>
