import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex);

const state = {
  userInfo:{},//个人信息详情
  user:{},//头像，积分姓名等
  recent_replies:[],//最近回复
  recent_topics:[],//发布
  collect_topics:[],//收藏
  oneArtInfo:{},//单篇文章详情
  oneArtRep:[],//单篇文章的回复
  oneArtAuthor:[],//单篇文章的作者
  oneArtId:'',//回复时提交的id
  params:[],//回复时提交的内容
  newArtParam:[],//新增文章的内容
  allArtList:[],//所有的文章数据
  listParam:{}
};


export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})