import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      newCartRaw: {
        id: _.uniqueId(),
        cart: [],
        payment: {
          exchange: 23000,
          discount: {
            type: "đ",
            đ: 0,
            "%": 0,
          },
          tax: {
            type: "đ",
            đ: 0,
            "%": 0,
          },
        },
      },
    };
  },
  methods: {
    getProductById(id){
      return this.get_productsMap[id]
    },
    checkPercentMixin(parent, key) {
      if (parent[key] > 100) parent[key] = 100;
      if (parent[key] < 0) parent[key] = 0;
    },
    getFinalValueMixin(value, parent) {
      if (parent.type == "đ") return +parent["đ"];
      if (parent.type == "%") return Math.floor(+value * (+parent["%"] / 100));
    },
    checkMaxValue(item) {
      console.log(item);
    }
  },
  computed: {
    ...mapGetters("pos", ["get_productsMap"])
  }
};
