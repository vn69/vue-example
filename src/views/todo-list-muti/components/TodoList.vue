<template>
  <div>
    <div class="d-flex">
      <el-input @keypress.enter.native="addTodo" ref="refInput" class="me-2" placeholder="Please input" v-model="todoName"></el-input>
      <el-button @click="addTodo" type="primary" :disabled="todoName.trim().length == 0">Add</el-button>
    </div>
    <div class="body my-2">
      <div v-for="(item, i) in filterTask" :key="i">
        <el-checkbox v-model="item.isDone"
          ><div :class="{ checked: item.isDone }">{{ item.name }}</div></el-checkbox
        >
      </div>
    </div>
    <div v-if="todolist.length">
      <span v-if="unCompleteTask.length == 1">{{ unCompleteTask.length }} item left -</span>
      <span v-else>{{ unCompleteTask.length }} items left -</span>
      <el-radio-group class="mx-2" size="mini" v-model="typeTodo">
        <el-radio-button label="all"></el-radio-button>
        <el-radio-button label="uncomplete"></el-radio-button>
        <el-radio-button label="complete"></el-radio-button>
      </el-radio-group>
      <el-button :disabled="!completedTask.length" type="danger" plain size="mini" @click="clearDoneItem">Clear</el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      todolist: [
        {
          name: "Love yourself ?",
          isDone: false,
        },
      ],
      todoName: "",
      todoNameOld: "",
      typeTodo: "all",
    };
  },
  methods: {
    ...mapMutations("undo", ["set_isUndoRedo","saveHandleUndo"]),
    addTodo() {
      this.todoName = this.todoName.trim();
      if (this.todoName) {
        this.todolist.push({
          name: this.todoName,
          isDone: false,
        });
        this.todoName = "";
        this.$refs.refInput.focus();
      }
    },
    clearDoneItem() {
      this.todolist = this.todolist.filter((e) => !e.isDone);
    },
  },
  watch: {
    getTodoList: {
      handler(newValue, oldValue) {
        if (this.get_isUndoRedo) {
          this.set_isUndoRedo(false);
          return;
        }
        const command = {
          undo: () => {
            this.todolist = oldValue;
          },
          redo: () => {
            this.todolist = newValue;
          },
        };
        this.saveHandleUndo(command);
      },
      deep: true,
    },
    typeTodo: {
      handler: function (newValue, oldValue) {
        if (this.get_isUndoRedo) {
          this.set_isUndoRedo(false);
          return;
        }
        const command = {
          undo: () => {
            this.typeTodo = oldValue;
          },
          redo: () => {
            this.typeTodo = newValue;
          },
        };
        this.saveHandleUndo(command);
      },
    },
  },
  computed: {
    ...mapGetters("undo", ["get_isUndoRedo"]),
    filterTask() {
      switch (this.typeTodo) {
        case "uncomplete":
          return this.unCompleteTask;
        case "complete":
          return this.completedTask;
        default:
          return this.todolist;
      }
    },
    completedTask() {
      return this.todolist.filter((e) => e.isDone);
    },
    unCompleteTask() {
      return this.todolist.filter((e) => !e.isDone);
    },
    // watch bị ngu không trả về oldValue nên mới làm như này :(
    getTodoList() {
      return _.cloneDeep(this.todolist);
    },
  },
};
</script>

<style lang="scss" scoped>
.checked {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
