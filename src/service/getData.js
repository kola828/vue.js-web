//获取数据
import axios from 'axios';

//编译环境使用真实数据
if (process.env.NODE_ENV == 'development') {

  var articleInfo = (params) => axios({
        method: 'GET',
        url: '/v1/topics',
        params: params
      })

  ;


} else {

}


export {articleInfo}
