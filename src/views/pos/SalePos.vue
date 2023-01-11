<template>
  <div v-loading="loading">
    <HeaderNav :cartsData="cartsData"></HeaderNav>
    <div class="container">
      <div class="row mt-3 pos-wrap">
        <div class="col-8 h-100">
          <el-card class="h-100 scroll-y">
            <div slot="header">
              <span>Đơn {{ get_cartId + 1 }}</span>
            </div>
            <ListProduct :cartsData="cartsData"></ListProduct>
          </el-card>
        </div>
        <div class="col-4 h-100">
          <el-card class="h-100 scroll-y">
            <div class="d-flex justify-content-between" slot="header">
              <span>Thanh Toán</span>
            </div>
            <PaymentPos :cartsData="cartsData"></PaymentPos>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/HeaderNav.vue";
import PaymentPos from "./components/PaymentPos.vue";
import ListProduct from "./components/ListProduct.vue";

import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
import productCode from "../../utils/mixin/product.js";
import utils from "./utils";
import { saveLocalStore, getLocalStore } from "@/utils/function";

export default {
  components: { HeaderNav, PaymentPos, ListProduct },
  mixins: [productCode, utils],
  data() {
    return {
      loading: false,
      cartsData: [],
    };
  },
  created() {
    this.getAllProductMixin();
    this.initData();
  },
  methods: {
    initData() {
      console.log("init data");
      const carts = getLocalStore("carts") || [];
      if (carts.length == 0) {
        const newCart = _.cloneDeep(this.newCartRaw);
        carts.push(newCart);
      }
      this.cartsData = carts;
    },
  },
  watch: {
    cartsData: {
      handler(data) {
        console.log("save carts");
        saveLocalStore("carts", data);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters("pos", ["get_cartId"]),
  },
};
</script>

<style lang="scss" scoped>
.pos-wrap {
  height: calc(100vh - 175px);
}
</style>
