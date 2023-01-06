<template>
  <div class="pos_header">
    <div class="d-flex justify-content-between align-items-center">
      <div class="w-50">
        <el-autocomplete class="w-100" popper-class="custom-select" v-model="textSearch" :fetch-suggestions="querySearch" placeholder="Please input">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
          <template slot-scope="{ item }">
            <div class="product_item h-100 d-flex px-2 py-2 align-items-center" @click.stop="() => selectProduct(item)">
              <el-image class="product_item_image me-2" :src="item.image" lazy></el-image>
              <div>
                <div class="h5">{{ item.title }}</div>
                <b>$ {{ item.price }}</b>
              </div>
            </div>
          </template>
        </el-autocomplete>
      </div>
      <div>
        <el-dropdown>
          <span class="el-dropdown-link text-white">User<i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">Action 1</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      textSearch: "",
    };
  },
  methods: {
    selectProduct(item) {
      console.log(item);
      this.$toast.success("Đã thêm vào giỏ hàng!");
    },
    querySearch(queryString, cb) {
      var productsData = this.get_products;
      var results = queryString ? productsData.filter(this.createFilter(queryString)) : productsData;
      cb(results);
    },
    createFilter(queryString) {
      return (product) => {
        return product.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
  },
  computed: {
    ...mapGetters("pos", ["get_products"]),
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
.custom-select {
  .el-autocomplete-suggestion__list li {
    padding: 0 !important;
    margin: 0 !important;
    &:active {
      background-color: rgb(222, 222, 128);
    }
  }
  .product_item {
    
  }
  .product_item_image {
    height: 60px;
    width: 60px;
    min-width: 60px;
    object-fit: cover;
  }
  .el-scrollbar__wrap {
    max-height: 700px;
  }
}
</style>
