//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。
import {getUser,oneArtInfo} from '../service/getData'
import {USER_INFO,ONE_ART_INFO} from './mutation-types.js'

import {getStore, getDate} from '../config/mUtils'

export default {
  /**
   * describe 获取个人信息
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async getUser({commit, state}) {
    await getUser('kola828')
        .then((response) => {
          commit(USER_INFO, response);//commit的时候执行ARTICLE_INFO
        });
  },


  async getOneArtInfo({commit, state}) {
    await oneArtInfo(getStore('artId'))
        .then((response) => {
          commit(ONE_ART_INFO, response);//commit的时候执行ARTICLE_INFO
        });
  },

}