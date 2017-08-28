//获取数据
import axios from 'axios';

//编译环境使用真实数据
if (process.env.NODE_ENV == 'development') {

  // var token = 'caf05f06-5069-4192-9a6c-2a30c39af01f';

  // 用户详情
  var getUser = (name) =>axios({
    method: 'GET',
    url: '/v1/user/' + name
  });

  //匹配token
  var checkToken = (data) => axios({
    method: 'POST',
    url: '/v1/accesstoken',
    data: data
  });

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

  /**
   * 获取未读消息的条数
   * @param params
   */
  var getMsgCount=(params)=>axios({
    method: 'GET',
    url: '/v1/message/count',
    params:params
  });

  // 获取已读和未读消息
  var getMessages = (params) =>axios({
    method: 'GET',
    url: '/v1/messages',
    params:params
  })


  // 收藏主题
  var collectArt = (data) =>axios({
    method: 'POST',
    url: '/v1/topic/collect',
    data: data
    //     {
    //   accesstoken:token,
    //   topic_id:'5987f2d4924ce0e86b968686'
    // }
  });



} else {

}


export {articleInfo, oneArtInfo, addNewReplies,addNewArt,getUser,checkToken,getMsgCount,getMessages,collectArt}
