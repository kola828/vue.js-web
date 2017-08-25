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
  var addNewReplies = (id, data) => axios({
    method: 'POST',
    url: '/v1/topic/' + id + '/replies',
    data: data
  });
  /**
   * methods addNewArt
   * describe 新建文章
   */
  var addNewArt = (data) =>axios({
    method: 'POST',
    url: '/v1/topics',
    data: data
  });

  var getUser = (name) =>axios({
    method: 'GET',
    url: '/v1/user/' + name
  });


  // 收藏主题
  var test = () =>axios({
    method: 'POST',
    url: '/v1/topic/collect',
    data: {
      accesstoken:token,
      topic_id:'5987f2d4924ce0e86b968686'
    }
  });

  // post /topic/collect 收藏主题
  //
  // 接收 post 参数
  //
  // accesstoken String 用户的 accessToken
  // topic_id String 被收藏的主题id


} else {

}


export {articleInfo, oneArtInfo, token, addNewReplies,addNewArt,getUser,test}
