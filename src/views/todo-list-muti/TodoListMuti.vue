<template>
  <div class="container">
    <div class="w-50 m-auto">
      <div class="mt-2">
        <el-button size="mini" @click="addMoreTodoList" icon="el-icon-plus" type="success">Add</el-button>
        <el-button size="mini" :disabled="get_undoStack.length == 0" @click="handleUndo">Undo</el-button>
        <el-button size="mini" :disabled="get_redoStack.length == 0" @click="handleRedo">Redo</el-button>
        <el-button size="mini" @click="resetData" icon="el-icon-refresh" type="primary">Refresh</el-button>
      </div>
      <div v-for="item in countItem" :key="item.id">
        <TodoList class="py-3 border-bottom" v-show="item.show"></TodoList>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";
import TodoList from "./components/TodoList.vue";

export default {
  components: { TodoList },
  data() {
    return {
      countItem: [],
    };
  },
  created() {
    this.resetData();
  },
  methods: {
    ...mapMutations("undo", ["set_undoStack", "set_redoStack", "set_isUndoRedo", "handleUndo", "handleRedo", "saveHandleUndo"]),
    getId() {
      return Date.now();
    },
    resetData() {
      this.set_isUndoRedo(true);
      this.countItem = [
        {
          show: true,
          id: this.getId(),
        },
      ];
      this.set_undoStack([]);
      this.set_redoStack([]);
      this.set_isUndoRedo(false);
    },
    addMoreTodoList() {
      const id = this.getId()
      const newItem = {
        show: true,
        id,
      }
      this.countItem.push(newItem);
      const command = {
        undo: () => {
          newItem.show = false;
        },
        redo: () => {
          newItem.show = true;
        },
      };
      this.saveHandleUndo(command);
    },
  },
  computed: {
    ...mapGetters("undo", ["get_undoStack", "get_redoStack",]),
  },
};
</script>
