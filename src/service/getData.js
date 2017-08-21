//获取数据
import axios from 'axios';

//编译环境使用真实数据
if (process.env.NODE_ENV == 'development') {

  var token = 'caf05f06-5069-4192-9a6c-2a30c39af01f';

  /**
   * methods articleInfo
   * describe  获取文章列表
   * @param params
   */
  var articleInfo = (params) => axios({
    method: 'GET',
    url: '/v1/topics',
    params: params
  });
  /**
   * methods oneArtInfo
   * describe 获取某篇文章详情
   * @param id（文章id）
   */
  var oneArtInfo = (id) => axios({
    method: 'GET',
    url: '/v1/topic/' + id
  });
  /**
   * methods addNewReplies
   * describe 新建评论
   */
  var addNewReplies = (id,data) => axios({
    method: 'POST',
    url: '/v1/topic/59185fb54d2e582056ec6cda/replies',
    data: data
  })

} else {

}


export {articleInfo, oneArtInfo, token,addNewReplies}
