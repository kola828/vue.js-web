//mutation 必须是同步函数

// 需要注意的是只能通过mutations改变store的state的状态，
// 不能直接更改（其实可以更改，不建议这么做，不通过mutations改变state，状态不会被同步）。
import {
  USER_INFO,
  ONE_ART_INFO,
  REPLIY_PARAMS,
  ADD_ART_PARAM,
  ART_LIST,
  ART_LIST_PARAM,
  NAME,
  TOKEN,
  MSG_LIST
} from './mutation-types.js'

import {
  getDate,
} from '../config/mUtils'

export default {

  [NAME](state, info){
    state.name=info.name
  },
  [TOKEN](state, info){
    state.token=info.token
  },
  //个人信息页面数据的整理
  [USER_INFO](state, info) {
    state.userInfo = info.data.data;
    state.user = {
      headImg: info.data.data.avatar_url,
      userName: info.data.data.loginname,
      score: info.data.data.score,
    };
    state.recent_replies = info.data.data.recent_replies;
    state.recent_topics = info.data.data.recent_topics;
    state.collect_topics = info.data.data.collect_topics
  },
  //单篇文章详情页面数据的整理
  [ONE_ART_INFO](state, info) {
    state.oneArtInfo = {
      article: info.data.data.content,
      artTitle: info.data.data.title,
      createTime: getDate(Date.parse(info.data.data.create_at)),
    };
    state.oneArtAuthor = info.data.data.author;
    //可整理成公共方法
    state.oneArtRep = info.data.data.replies.map(function (item) {
      let nowTime = new Date().toISOString();
      let time = new Date(nowTime) - new Date(item.create_at);
      //计算出相差天数
      let days = Math.floor(time / (24 * 3600 * 1000));
      //计算出小时数
      let leave1 = time % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      let leave3 = leave2 % (60 * 1000);    //计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000);
      item.day = days;
      item.hours = hours;
      item.minutes = minutes;
      item.seconds = seconds;
      return item;
    });


  },
  //回复评论
  [REPLIY_PARAMS](state, data) {
    state.oneArtId = data.id;
    state.params = data.params
  },
  //新增文章
  [ADD_ART_PARAM](state, data) {
    state.newArtParam = data.params
  },
  //获取文章列表的params
  [ART_LIST_PARAM](state, data) {
    state.listParam = data
  },
  //首页
  [ART_LIST](state, data) {
    data.data.data.map((item) => {
      let nowTime = new Date().toISOString();
      let time = new Date(nowTime) - new Date(item.last_reply_at);
      //计算出相差天数
      let days = Math.floor(time / (24 * 3600 * 1000));
      //计算出小时数
      let leave1 = time % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      let leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000));
      //计算相差秒数
      let leave3 = leave2 % (60 * 1000);    //计算分钟数后剩余的毫秒数
      let seconds = Math.round(leave3 / 1000);
      item.day = days;
      item.hours = hours;
      item.minutes = minutes;
      item.seconds = seconds;
      return item;
    });
    state.allArtList = data.data.data;
  },
  //消息列表
  [MSG_LIST](state,data){
    state.msgList=data.data.data;
    // console.log(data.data.data)
  }
}
