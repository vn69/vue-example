<template>
  <div class="container">
    <h2>Todo 1</h2>
    <el-input @keypress.enter.native="addTodo" ref="refInput" class="w-25 me-2" placeholder="Please input" v-model="todoName"></el-input>
    <el-button @click="addTodo" type="primary" :disabled="todoName.trim().length == 0">Add</el-button>
    <div class="body my-2">
      <div v-for="(item, i) in filterTask" :key="i">
        <el-checkbox 
          :value="item.isDone"
          @change="() => checkTodolist(i)"
          ><div :class="{ checked: item.isDone }">{{ item.name }}</div></el-checkbox
        >
      </div>
    </div>
    <div v-if="getTodolist.length">
      <span v-if="unCompleteTask.length == 1">{{ unCompleteTask.length }} item left -</span>
      <span v-else>{{ unCompleteTask.length }} items left -</span>
      <el-radio-group class="mx-2" size="mini" v-model="typeTodo">
        <el-radio-button label="all"></el-radio-button>
        <el-radio-button label="uncomplete"></el-radio-button>
        <el-radio-button label="complete"></el-radio-button>
      </el-radio-group>
      <el-button :disabled="!completedTask.length" type="danger" plain size="mini" @click="clearDoneTask">Clear</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      todoName: "",
      typeTodo: "all",
    };
  },
  methods: {
    ...mapMutations("todo", ["addTask", "clearDoneTask", "checkTodolist"]),
    addTodo() {
      this.todoName = this.todoName.trim();
      if (this.todoName) {
        this.addTask(this.todoName);
        this.todoName = "";
        this.$refs.refInput.focus();
      }
    },
  },
  computed: {
    ...mapGetters("todo", ["completedTask", "unCompleteTask", "getTodolist"]),
    filterTask() {
      switch (this.typeTodo) {
        case "uncomplete":
          return this.unCompleteTask;
        case "complete":
          return this.completedTask;
        default:
          return this.getTodolist;
      }
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
