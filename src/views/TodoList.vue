<template>
  <div class="container">
    <div class="mb-2">
      <el-button size="mini" :disabled="undoStack.length == 0" @click="handleUndo">Undo</el-button>
      <el-button size="mini" :disabled="redoStack.length == 0" @click="handleRedo">Redo</el-button>
      <el-button size="mini" @click="resetData">Refresh</el-button>
    </div>
    <el-input @keypress.enter.native="addTodo" ref="refInput" class="w-25 me-2" placeholder="Please input" v-model="todoName"></el-input>
    <el-button @click="addTodo" type="primary" :disabled="todoName.trim().length == 0">Add</el-button>
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
import _ from "lodash"

export default {
  data() {
    return {
      todolist: [
        {
          name: 1,
          isDone: true
        },
        {
          name: 2,
          isDone: false
        },
        {
          name: 3,
          isDone: false
        },
      ],
      todoName: "",
      typeTodo: "all",

      undoStack: [],
      redoStack: [],
      isUndoRedo: false
    }
  },
  methods: {
    addTodo() {
      this.todoName = this.todoName.trim()
      if (this.todoName) {
        this.todolist.push({
          name: this.todoName,
          isDone: false
        })
        this.todoName = ""
        this.$refs.refInput.focus()
      }
    },
    clearDoneItem() {
      this.todolist = this.todolist.filter(e => !e.isDone)
    },
    resetData() {
      this.todolist = []
      this.undoStack = []
      this.redoStack = []
    },
    handleUndo() {
      this.isUndoRedo = true
      const command = this.undoStack.pop()
      if(command){
        command.undo()
        this.redoStack.push(command)
      }
    },
    handleRedo() {
      this.isUndoRedo = true
      const command = this.redoStack.pop()
      if(command){
        command.redo()
        this.undoStack.push(command)
      }
    },
  },
  watch: {
    getTodoList: {
      handler(newValue, oldValue) {
        if(this.isUndoRedo) {
          this.isUndoRedo = false
          return
        }
        const command = {
          undo: () => {
            this.todolist = oldValue
          },
          redo: () => {
            this.todolist = newValue
          },
        }
        this.redoStack = []
        this.undoStack.push(command)
      },
      deep: true
    },
    typeTodo: {
      handler: function (newValue, oldValue) {
        if(this.isUndoRedo) {
          this.isUndoRedo = false
          return
        }
        const command = {
          undo: () => {
            this.typeTodo = oldValue
          },
          redo: () => {
            this.typeTodo = newValue
          },
        }
        this.redoStack = []
        this.undoStack.push(command)
      },
    }
  },
  computed: {
    filterTask() {
      switch (this.typeTodo) {
        case "uncomplete":
          return this.unCompleteTask
        case "complete":
          return this.completedTask
        default:
          return this.todolist
      }
    },
    completedTask() {
      return this.todolist.filter(e => e.isDone)
    },
    unCompleteTask() {
      return this.todolist.filter(e => !e.isDone)
    },
    getTodoList() {
      return _.cloneDeep(this.todolist)
    } 
  }
}
</script>

<style lang="scss" scoped>
.checked {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
