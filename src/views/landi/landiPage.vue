<template>
  <div>
    <div v-for="item in landiData.children" :key="item.id" :data-id="item.id">
      <vue-draggable-resizable
        class="landi-item"
        :x="item.data.x"
        :y="item.data.y"
        :w="item.data.w"
        :h="item.data.h"
        @dragging="(x, y) => onDrag(x, y, item)"
        @dragstop="(x, y) => onDragStop(x, y, item)"
        @resizing="(x, y, w, h) => onResize(x, y, w, h, item)"
        @resizestop="(x, y, w, h) => onResizeStop(x, y, w, h, item)"
      > 
        <div class="w-100 h-100 landi-content">
          <div>{{ item.id }}</div>
          <el-button v-show="selected.includes(item.id)" class="btn-move">move</el-button>
        </div>
      </vue-draggable-resizable>
    </div>
    <VueSelecto
      :container="document.body"
      :dragContainer="window"
      :selectableTargets="['.landi-item']"
      :selectByClick="true"
      :selectFromInside="false"
      :continueSelect="false"
      :toggleContinueSelect="'shift'"
      :keyContainer="window"
      :hitRate="1"
      @select="onSelect"
    />
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import { VueSelecto } from "vue-selecto";

import _ from "lodash";
import landiMixin from "./landiMixin";

export default {
  components: { VueDraggableResizable, VueSelecto },
  mixins: [landiMixin],
  data() {
    return {
      landiData: {
        children: [],
      },
      document: document,
      window: window,
      selected: [],
    };
  },
  created() {
    this.landiData.children.push(this.initData());
    this.landiData.children.push(this.initData());
    this.landiData.children.push(this.initData());
  },
  methods: {
    onResize(x, y, w, h, item) {},
    onResizeStop(x, y, w, h, item) {
      // console.log({ x, y, w, h, item });
      item.data.x = x;
      item.data.y = y;
      item.data.w = w;
      item.data.h = h;
    },
    onDrag(x, y, item) {},
    onDragStop(x, y, item) {
      item.data.x = x;
      item.data.y = y;
    },
    onSelect(e) {
      e.added.forEach((el) => {
        el.classList.add("landi-selected");
      });
      e.removed.forEach((el) => {
        el.classList.remove("landi-selected");
      });
      this.selected = [];
      if (e.selected.length > 1) {
        e.selected.forEach((element) => {
          this.selected.push(element.parentElement.getAttribute("data-id"));
        });
      }
      console.log(333, this.selected);
    },
  },
  computed: {},
};
</script>

<style>
.landi-item.landi-selected {
  border-color: blue;
}
.landi-content {
  position: relative;
}
.btn-move {
  position: absolute;
  top: -50px;
}
</style>
