import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  userInfo:{},
  user:{},
  recent_replies:[],
  recent_topics:[],
  collect_topics:[]
};


export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})