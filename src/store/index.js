import Vue from 'vue';
import Vuex from 'vuex';
import todo from './modules/todo';
import undo from './modules/undo';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    todo,
    undo
  }
});