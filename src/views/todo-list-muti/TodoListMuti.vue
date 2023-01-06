<template>
  <div class="container">
    <div class="">
      <el-button size="mini" @click="addMoreTodoList" icon="el-icon-plus" type="success">Add</el-button>
      <el-button size="mini" :disabled="get_undoStack.length == 0" @click="handleUndo">Undo</el-button>
      <el-button size="mini" :disabled="get_redoStack.length == 0" @click="handleRedo">Redo</el-button>
      <el-button size="mini" @click="resetData" icon="el-icon-refresh" type="primary">Refresh</el-button>
    </div>
    <div v-for="item in countItem" :key="item.id">
      <TodoList class="w-50 py-3 border-bottom" v-show="item.show"></TodoList>
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
    ...mapMutations("undo", ["set_undoStack", "set_redoStack", "set_isUndoRedo"]),
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
    handleUndo() {
      this.set_isUndoRedo(true);
      const undoStack = _.cloneDeep(this.get_undoStack);
      const redoStack = _.cloneDeep(this.get_redoStack);
      const command = undoStack.pop();
      this.set_undoStack(undoStack);
      if (command) {
        command.undo();
        redoStack.push(command);
        this.set_redoStack(redoStack);
      }
    },
    handleRedo() {
      this.set_isUndoRedo(true);
      const undoStack = _.cloneDeep(this.get_undoStack);
      const redoStack = _.cloneDeep(this.get_redoStack);
      const command = redoStack.pop();
      this.set_redoStack(redoStack);
      if (command) {
        command.redo();
        undoStack.push(command);
        this.set_undoStack(undoStack);
      }
    },
    saveHandleUndo(command) {
      this.set_redoStack([]);
      const undoStack = _.cloneDeep(this.get_undoStack);
      undoStack.push(command);
      this.set_undoStack(undoStack);
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
    ...mapGetters("undo", ["get_undoStack", "get_redoStack", "get_isUndoRedo"]),
  },
};
</script>
