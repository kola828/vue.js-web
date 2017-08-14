//mutation 必须是同步函数
import {

	GET_USERINFO,
  ARTICLE_INFO
} from './mutation-types.js'

import {
	setStore,
	getStore,
} from '../config/mUtils'

export default {

  [ARTICLE_INFO](state, info){

    state.articleList=info.data;

  },


}
