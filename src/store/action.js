//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。
import {
  getUser,
  oneArtInfo,
  addNewReplies,
  addNewArt,
  articleInfo,
  checkToken,
  getMessages
} from '../service/getData'

import {
  USER_INFO,
  ONE_ART_INFO,
  ART_LIST,
  MSG_LIST
} from './mutation-types.js'

import {getStore, getDate} from '../config/mUtils'

export default {
  /**
   * 获取个人信息
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async getUser({commit, state}) {
    await getUser(state.name)
        .then((response) => {
          commit(USER_INFO, response);//commit的时候执行ARTICLE_INFO
        });
  },
  /**
   * 验证token
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async checkToken({commit, state}) {
    await checkToken(state.token)
        .then((response) => {
          console.log(response)
          // commit(USER_INFO, response);//commit的时候执行ARTICLE_INFO
        });
  },

  /**
   * 获取单篇文章详情
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async getOneArtInfo({commit, state}) {
    await oneArtInfo(getStore('artId'))
        .then((response) => {
          commit(ONE_ART_INFO, response);//commit的时候执行ARTICLE_INFO
        });
  },
  /**
   * 新增回复
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async addNewReplies({commit, state}) {
    let id = state.oneArtId;
    let params = state.params;
    await addNewReplies(id, params)
  },
  /**
   * 新增文章
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async addNewArt({commit, state}) {
    let params = state.newArtParam;
    await addNewArt(params)
  },

  /**
   * 获取文章列表
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async articleInfo({commit, state}) {
    let params = state.listParam;
    await articleInfo(params)
        .then((response) => {
          commit(ART_LIST, response);
        })
        .catch((error) => {
          console.log(error)
        });
  },
  /**
   * 获取消息列表
   * @param commit
   * @param state
   * @returns {Promise.<void>}
   */
  async getMessages({commit, state}) {
    await getMessages({accesstoken:state.token})
        .then((response) => {
          commit(MSG_LIST, response);
        })
        .catch((error) => {
          console.log(error)
        });
  },

}