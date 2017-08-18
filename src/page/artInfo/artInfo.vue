<template>
  <div>
    <header id='nav-top'>
      <router-link to="home">
        <div class="head-left">
          <i class="iconfont">&#xe615;</i>
          <span>返回</span>
        </div>
      </router-link>
    </header>


    <div class="container">
      <div class="con-header">
        <div class="title">{{artTitle}}</div>
        <div class="author-info">作者 <img :src="author.avatar_url"> {{author.loginname}} 发布于 {{createTime}}</div>
      </div>
      <div class="info" v-html="article"></div>
      <h4>评论区</h4><button>评论</button>
      <div class="reply-block" v-for="(key,index) in replies">
        <div class="reply-one">
          <div class="reply-left"><img :src="key.author.avatar_url"></div>
          <div class="reply-right">
            <div class="reply-time">{{key.author.loginname}} {{index+1}}楼 一天前</div>
            <div v-html="key.content"> </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">

  import {oneArtInfo} from '../../service/getData'
  import {getStore,getDate} from '../../config/mUtils.js'

  export default {
    data() {
      return {
        article: '',
        artTitle: '',
        artId: getStore('artId'),
        author:'',
        createTime:'',
        replies:[]

      }
    },
    mounted() {
      this.getArtInfo();
//      console.log();
    },
    methods: {
      /**
       *  methods getArtInfo
       *  describe 获取文章详情
       */
      getArtInfo() {
        var self = this;
        oneArtInfo(self.artId)
            .then(function (response) {
              self.article = response.data.data.content;
              self.artTitle = response.data.data.title;
              self.author=response.data.data.author;
              self.createTime=getDate(Date.parse(response.data.data.create_at));
              self.replies=response.data.data.replies
            })
            .catch(function (error) {

            })
      }
    },
    components: {
    },
  }
</script>

<style lang="scss">

  @import '../../style/artInfo';


</style>