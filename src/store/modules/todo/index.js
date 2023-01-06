export default {
  namespaced: true,
  state: {
    todolist: [
      {
        name: 1,
        isDone: false,
      },
      {
        name: 2,
        isDone: true,
      },
      {
        name: 3,
        isDone: false,
      },
    ],
  },
  getters: {
    getTodolist(state) {
      return state.todolist;
    },
    completedTask(state) {
      return state.todolist.filter((e) => e.isDone);
    },
    unCompleteTask(state) {
      return state.todolist.filter((e) => !e.isDone);
    },
  },
  mutations: {
    addTask(state, payload) {
      state.todolist.push({
        name: payload,
        isDone: false,
      });
    },
    clearDoneTask(state) {
      state.todolist = state.todolist.filter((e) => !e.isDone);
    },
    checkTodolist(state, id) {
      state.todolist[id].isDone = !state.todolist[id].isDone
    }
  },
  actions: {},
};
