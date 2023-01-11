import { mapMutations, mapGetters } from "vuex";
import axios from "axios";

export default {
  methods: {
    ...mapMutations("pos", ["set_products", "set_productsMap"]),
    async getAllProductMixin() {
      if (this.get_products.length) {
        const productsMap = arrayToObject(this.get_products);
        this.set_productsMap(productsMap);
        return;
      }
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status == 200) {
          console.log(response);
          // fake data
          response.data.map((e) => (e.maxQuantity = randomIntFromInterval(0, 5)));
          
          this.setProductsDataMixin(response.data)
        } else {
          this.$toast.error("Cannot get all product");
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("Cannot get all product");
      } finally {
      }
    },
    setProductsDataMixin(data) {
      this.set_products(data);
      const productsMap = arrayToObject(data);
      this.set_productsMap(productsMap);
    },
  },
  computed: {
    ...mapGetters("pos", ["get_products"]),
  },
};

function arrayToObject(arr) {
  const map = {};
  if (arr.length) {
    arr.map((e) => {
      map[e.id] = e;
    });
  }
  return map;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
