<template>
  <div class="input-money-wrap">
    <number
      v-if="value.type == 'đ'"
      class="px-2 w-100 input-money-wrap_input"
      @keydown.native="skipDotAndMinusOnly"
      v-model.number="value['đ']"
      v-bind="moneyConfig"
      @change="() => checkMinMaxValueNumber(value, 'đ', min, max)"
    ></number>
    <input
      type="number"
      step="1"
      v-if="value.type == '%'"
      class="px-2 w-100 input-money-wrap_input"
      @keydown="skipDotAndMinusOnly"
      @input="() => checkPercentMixin(value, '%')"
      v-model.number="value['%']"
      :max="100"
      :min="0"
    />
    <el-radio-group class="input-money-wrap_type" v-model="value.type">
      <el-radio-button label="đ"></el-radio-button>
      <el-radio-button label="%"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: ["value", "max", "min"],
}
</script>

<style></style>
