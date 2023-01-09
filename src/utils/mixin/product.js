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
          this.set_products(response.data);
          const productsMap = arrayToObject(response.data);
          console.log(productsMap);
          this.set_productsMap(productsMap);
        } else {
          this.$toast.error("Cannot get all product");
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("Cannot get all product");
      } finally {
      }
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
