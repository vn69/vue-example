import { mapMutations, mapGetters } from "vuex";
import axios from "axios"

export default {
  methods: {
    ...mapMutations("pos",["set_products"]),
    async getAllProduct() {
      if (this.get_products.length) return;
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status == 200) {
          console.log(response);
          this.set_products(response.data);
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
}