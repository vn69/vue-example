<template>
  <div class="pos_header">
    <div class="d-flex justify-content-between align-items-center">
      <div class="w-50">
        <el-autocomplete class="w-100" popper-class="custom-select" v-model="textSearch" :fetch-suggestions="querySearch" placeholder="Please input">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
          <template slot-scope="{ item }">
            <div @mouseleave="(e) => mouseToProduct(e, 'leave')" @mouseenter="(e) => mouseToProduct(e, 'enter')" class="product_item h-100 d-flex px-2 py-2 align-items-center" @click.stop="() => selectProduct(item)">
              <el-image class="product_item_image me-2" :src="item.image" lazy></el-image>
              <div class="product_item_wrap">
                <div class="h5 product_item_title">{{ item.title }}</div>
                <b class="">$ {{ item.price }}</b>
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
    mouseToProduct(event, mouseEvent) {
      const e = event.target.getElementsByClassName("product_item_title")[0]
      const parentW = event.target.offsetWidth - 70
      const childW = e.offsetWidth
      if(childW > parentW) {
        if(mouseEvent == "enter") e.classList.add("do-animation")
        else if (mouseEvent == "leave") e.classList.remove("do-animation")
      }
    }
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
@keyframes urmove {
  from {
    left: 0;
  }
  to {
    left: -100%;
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
  .product_item_wrap {
    flex: 1;
    display: flex;
    height: 60px;
    position: relative;
    overflow: hidden;
    align-items: end;
  }
  .product_item_image {
    height: 60px;
    width: 60px;
    min-width: 60px;
    object-fit: cover;
  }
  .product_item_title {
    position: absolute;
    top: 0;
    left: 0;
  }
  .do-animation {
    animation: urmove 6s linear infinite;
  }
  
  .el-scrollbar__wrap {
    max-height: 700px;
  }
}
</style>
