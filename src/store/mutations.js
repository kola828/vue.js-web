//mutation 必须是同步函数

// 需要注意的是只能通过mutations改变store的state的状态，
// 不能直接更改（其实可以更改，不建议这么做，不通过mutations改变state，状态不会被同步）。
import {
  USER_INFO,
  ONE_ART_INFO,
} from './mutation-types.js'

import {
  setStore,
  getStore,
} from '../config/mUtils'

export default {


  [USER_INFO](state, info) {
    state.userInfo = info.data.data;
    state.user={
      headImg : info.data.data.avatar_url,
      userName : info.data.data.loginname,
      score : info.data.data.score,
  };
    state.recent_replies=info.data.data.recent_replies;
    state.recent_topics=info.data.data.recent_topics;
    state.collect_topics=info.data.data.collect_topics

  },

  [ONE_ART_INFO](state, info){

  }

}
