import Vue from 'vue';
import Vuex from 'vuex';
import Explorer from './modules/Explorer';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        explorer: Explorer
    },
});
