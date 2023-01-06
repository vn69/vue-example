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
      state.undoStack = payload
    },
    set_redoStack(state, payload) {
      state.redoStack = payload
    },
    set_isUndoRedo(state, payload) {
      state.isUndoRedo = payload
    },
  },
  actions: {},
};
