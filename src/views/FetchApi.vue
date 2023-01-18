<template>
  <div>
    <VueSelecto
      :container="document.body"
      :dragContainer="window"
      :selectableTargets="['.target']"
      :selectByClick="true"
      :selectFromInside="true"
      :continueSelect="false"
      :toggleContinueSelect="'shift'"
      :keyContainer="window"
      :hitRate="100"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { VueSelecto } from "vue-selecto";

export default {
  components: {
    VueSelecto,
  },
  data() {
    return {
      document: document,
      window: window,
    };
  },
  methods: {
    onSelect(e) {
      console.log(e);
      e.added.forEach((el) => {
        el.classList.add("selected");
      });
      e.removed.forEach((el) => {
        el.classList.remove("selected");
      });
    },
  },
};
</script>
