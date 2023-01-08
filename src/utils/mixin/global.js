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
  },
  filters: {
    formatMoneyUs(value) {
      return value.toFixed(2);
    },
    formatMoney(value) {
      let val = (value/1).toFixed().replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
};
