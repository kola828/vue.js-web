//获取数据
import axios from 'axios';

//编译环境使用真实数据
if (process.env.NODE_ENV == 'development') {

  var articleInfo = () => axios({
    method: 'GET',
    url: '/v1/topics',
    params:{
      tab:'all',
      limit:10,
      page:1
    }
  });


} else {

}


export {articleInfo}
