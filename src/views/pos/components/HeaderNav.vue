<template>
  <div class="pos_header">
    <div class="d-flex justify-content-between align-items-center">
      <div class="w-50">
        <el-autocomplete class="w-100" popper-class="custom-select" v-model="textSearch" :fetch-suggestions="querySearch" placeholder="Searching...">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
          <template slot-scope="{ item }">
            <ProductItem :product="item" @selectProduct="selectProduct"></ProductItem>
          </template>
        </el-autocomplete>
      </div>
      <div class="w-50 d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <el-radio-group class="ms-2 custom-list-oder" v-model="tab">
            <el-radio-button v-for="(item, index) in cartsData" :key="index" :label="index">
              {{ "Đơn " + (+index + 1) }}
              <i @click.prevent="() => removeTab(index)" class="el-icon-close text-danger"></i>
            </el-radio-button>
          </el-radio-group>
          <el-button size="small" @click="addTab" icon="el-icon-plus"></el-button>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link text-white">User<i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Đăng xuất</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { convertToRawString } from "../../../utils/function.js";
import ProductItem from "./ProductItem.vue";
import utils from "../utils";

export default {
  components: { ProductItem },
  props: ["cartsData"],
  mixins: [utils],
  data() {
    return {
      textSearch: "",
      tab: 0,
    };
  },
  created() {
    this.tab = this.get_cartId;
  },
  methods: {
    ...mapMutations("pos", ["set_cartId"]),
    querySearch(queryString, cb) {
      const productsData = this.get_products;
      const search = convertToRawString(queryString.trim());
      const results = search ? productsData.filter((e) => convertToRawString(e.title).includes(search)) : productsData;
      cb(results);
    },
    selectProduct(product) {
      const findedProduct = this.cart.find((e) => e.productId == product.id);

      if (findedProduct) {
        findedProduct.quantity++;
      } else {
        this.cart.push({
          productId: product.id,
          quantity: 1,
        });
      }
      this.$toast.success("Đã thêm vào giỏ hàng!");
    },

    // tab
    addTab() {
      if (this.cart.length == 0) {
        this.$toast.error("Không thể tạo đơn hàng mới khi đơn hiện tại không có sản phẩm!");
        return;
      }
      const index = this.cartsData.length;
      const newCart = _.cloneDeep(this.newCartRaw);
      this.cartsData.push(newCart);
      this.set_cartId(index);
    },
    removeTab(index) {
      console.log(index);
      if (this.cartsData[index].cart.length == 0) {
        this.doRemoveTab(index);
        return;
      }
      this.$alert("Bạn có muốn xóa đơn hàng?", "Cảnh báo", {
        confirmButtonText: "Xóa",
        callback: (action) => {
          if (action == "confirm") {
            this.doRemoveTab(index)
          }
        },
      });
    },
    clearCart() {
      this.cartsData[0].cart = [];
      this.$toast.success("Đã xóa đơn hàng!");
    },
    doRemoveTab(index) {
      if (this.cartsData.length == 1) {
        this.clearCart();
        this.set_cartId(0);
        return;
      }
      this.cartsData.splice(index, 1);
      this.set_cartId(0);
      this.$toast.success("Đã xóa đơn hàng!");
    },
  },
  computed: {
    ...mapGetters("pos", ["get_products", "get_cartId"]),
    cart() {
      return this.cartsData[this.get_cartId].cart;
    },
  },
  watch: {
    tab(val) {
      this.set_cartId(val);
    },
    get_cartId(val) {
      this.tab = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.pos_header {
  padding: 10px;
  background-color: #3e69f6;
}
</style>

<style lang="scss">
.custom-list-oder {
  > .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs__content {
    display: none;
  }
}
.custom-select {
  .el-autocomplete-suggestion__list li {
    padding: 0 !important;
    margin: 0 !important;
    &:active {
      background-color: rgb(222, 222, 128);
    }
  }
  .el-scrollbar__wrap {
    max-height: 700px;
  }
}
</style>
