<template>
  <div>
    <HeaderNav></HeaderNav>
    <div v-loading="loading" class="row">
      <div class="col-8">

      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeaderNav from './components/HeaderNav.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: { HeaderNav },
  data() {
    return {
      test: "",
      loading: false,
    };
  },
  created() {
    this.getAllProduct();
  },
  methods: {
    ...mapMutations("pos", ["set_products"]),
    async getAllProduct() {
      if(this.get_products.length) return
      this.loading = true;
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if(response.status == 200) {
          console.log(response)
          this.set_products(response.data)
        } else {
          this.$toast.error("Cannot get all product");
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("Cannot get all product");
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters("pos",["get_products"])
  }
};
</script>

<style></style>
