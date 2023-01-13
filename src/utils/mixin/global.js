export default {
  data() {
    return {
      moneyConfig: {
        decimal: ".",
        separator: ",",
        prefix: "",
        suffix: "",
        precision: 0,
        nullValue: "",
        masked: false,
        reverseFill: false,
        min: 0,
      },
    };
  },
  methods: {
    skipDotAndMinusOnly(e) {
      if (e.key == "." || e.key == "-") e.preventDefault();
    },
    checkPercentMixin(parent, key) {
      if (parent[key] > 100) parent[key] = 100;
      if (parent[key] < 0) parent[key] = 0;
    },
    checkMinMaxValueNumber(item, key, minValue, maxValue) {
      if(maxValue || maxValue == 0) {
        if(item[key] > maxValue) item[key] = maxValue
      }
      if(minValue || minValue == 0) {
        if(item[key] < minValue) item[key] = minValue
      }
    },
  },
  filters: {
    formatMoneyUs(value) {
      return value.toFixed(2);
    },
    formatMoney(value) {
      let val = (value / 1).toFixed().replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
