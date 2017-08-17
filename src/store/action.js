//Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。
import {
  articleInfo//文章详情
} from '../service/getData'
import {
  ARTICLE_INFO//文章详情
} from './mutation-types.js'



export default {
	// async getArticleList({commit,state}) {
  //
   //  let res = await articleInfo();
  //
   //  // commit(ARTICLE_INFO, res)  //commit的时候执行ARTICLE_INFO
	// },
}