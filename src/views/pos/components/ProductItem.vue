<template>
  <div
    @mouseleave="(e) => mouseToProduct(e, 'leave')"
    @mouseenter="(e) => mouseToProduct(e, 'enter')"
    class="product_item h-100 d-flex px-2 py-2 align-items-center"
    :class="{ 'disable-item': product.maxQuantity == 0 }"
    @click.stop="() => $emit('selectProduct', product)"
  >
    <el-image fit="fill" class="product_item_image me-2" :src="product.image"></el-image>
    <div class="product_item_wrap">
      <b class="product_item_title">{{ product.title }}</b>
      <b class="w-100">$ {{ product.price }}</b>
    </div>
    <div class="mr-2">(SL: {{ product.maxQuantity }})</div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
    mouseToProduct(event, mouseEvent) {
      const e = event.target.getElementsByClassName("product_item_title")[0];
      const parentW = event.target.offsetWidth - 82;
      const childW = e.offsetWidth;
      // console.log(parentW,childW)
      if (childW > parentW) {
        if (mouseEvent == "enter") e.classList.add("do-animation");
        else if (mouseEvent == "leave") e.classList.remove("do-animation");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.product_item {
  padding: 2px 10px;
  .product_item_wrap {
    flex: 1;
    display: flex;
    height: 60px;
    position: relative;
    overflow: hidden;
    align-items: end;
    width: 100%;
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
    white-space: nowrap;
  }
  .do-animation {
    animation: urmove 5s linear infinite;
  }
}
.disable-item {
  opacity: 0.5;
}
</style>
