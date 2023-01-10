<template>
  <div v-loading="loading">
    <HeaderNav :cartsData="cartsData"></HeaderNav>
    <div class="container">
      <div class="row mt-3">
        <div class="col-8">
          <el-card>
            <div slot="header">
              <span>Đơn {{ get_cartId + 1 }}</span>
            </div>
            <ListProduct :cartsData="cartsData"></ListProduct>
          </el-card>
        </div>
        <div class="col-4">
          <el-card>
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

export default {
  components: { HeaderNav, PaymentPos, ListProduct },
  mixins: [productCode],
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
    ...mapMutations("pos", ["set_carts"]),
    initData() {
      const carts = _.cloneDeep(this.get_carts);
      if (carts.length == 0) {
        const newCart = _.cloneDeep(this.newCartRaw);
        carts.push(newCart);
      }
      this.cartsData = carts;
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
  },
  computed: {
    ...mapGetters("pos", ["get_carts", "get_cartId"]),
  },
};
</script>

<style lang="scss" scoped></style>
