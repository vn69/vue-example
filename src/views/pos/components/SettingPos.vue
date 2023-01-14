<template>
  <el-form class="custom-form-99" label-position="right" label-width="130px">
    <h5 class="mb-3">Cấu hình mặc định</h5>
    <el-form-item label="tỉ giá ngoại tệ:">
      <number class="px-2 w-100" @keydown.native="skipDotAndMinusOnly" v-model.number="exchangeDefaul" v-bind="moneyConfig"></number>
    </el-form-item>
    <el-form-item label="Thuế(%):">
      <input type="number" step="1" @keydown="skipDotAndMinusOnly" @input="() => checkPercentMixin(this, 'taxDefaul')" v-model.number="taxDefaul" :max="100" :min="0" />
    </el-form-item>
    <el-alert :closable="false" title="Lưu ý: Cấu hình sẽ được áp dụng vào đơn mới, Các đơn cũ sẽ không thay đổi giá trị hiện tại của đơn." type="warning"> </el-alert>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations("pos", ["set_paymentSetting"]),
  },
  computed: {
    ...mapGetters("pos", ["get_paymentSetting"]),
    exchangeDefaul: {
      get() {
        return this.get_paymentSetting.exchange;
      },
      set(val) {
        console.log(val);
        const paymentSetting = _.cloneDeep(this.get_paymentSetting);
        paymentSetting.exchange = val;
        this.set_paymentSetting(paymentSetting);
      },
    },
    taxDefaul: {
      get() {
        return this.get_paymentSetting.tax;
      },
      set(val) {
        console.log(val);
        const paymentSetting = _.cloneDeep(this.get_paymentSetting);
        paymentSetting.tax = val;
        this.set_paymentSetting(paymentSetting);
      },
    },
  },
};
</script>

<style></style>
