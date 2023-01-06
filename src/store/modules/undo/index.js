export default {
  namespaced: true,
  state: {
    undoStack: [],
    redoStack: [],
    isUndoRedo: false,
  },
  getters: {
    get_undoStack(state) {
      return state.undoStack;
    },
    get_redoStack(state) {
      return state.redoStack;
    },
    get_isUndoRedo(state) {
      return state.isUndoRedo;
    },
  },
  mutations: {
    set_undoStack(state, payload) {
      state.undoStack = payload;
    },
    set_redoStack(state, payload) {
      state.redoStack = payload;
    },
    set_isUndoRedo(state, payload) {
      state.isUndoRedo = payload;
    },
    handleUndo(state) {
      state.isUndoRedo = true;
      const command = state.undoStack.pop();
      if (command) {
        command.undo();
        state.redoStack.push(command);
      }
    },
    handleRedo(state) {
      state.isUndoRedo = true;
      const command = state.redoStack.pop();
      if (command) {
        command.redo();
        state.undoStack.push(command);
      }
    },
    saveHandleUndo(state, command) {
      state.undoStack.push(command);
      state.redoStack = [];
    }
  },
  actions: {},
};
