<template>
  <div>
    <header id='nav-top'>
      <router-link to="home">
        <div class="head-left">
          <i class="iconfont">&#xe615;</i>
          <span>返回</span>
        </div>
      </router-link>
      <!--<div class="head-right">-->
      <!--&lt;!&ndash;没有收藏 &ndash;&gt;-->
      <!--<i class="iconfont">&#xe60f;</i>-->
      <!--&lt;!&ndash;收藏&ndash;&gt;-->
      <!--&lt;!&ndash;<i class="iconfont">&#xe636;</i>&ndash;&gt;-->
      <!--</div>-->
    </header>


    <div class="container">
      <div class="con-header">
        <div class="title">{{artTitle}}</div>
        <div class="author-info">作者 <img :src="author.avatar_url"> {{author.loginname}} 发布于 {{createTime}}</div>
      </div>
      <div class="info" v-html="article"></div>

      <div class="reply-area">评论区</div>
      <button class="reply-btn">评论</button>
      <div class="reply-block" v-for="(key,index) in replies">
        <div class="reply-one">
          <div class="reply-left"><img :src="key.author.avatar_url"></div>
          <div class="reply-right">
            <div class="reply-time">
              <span> {{key.author.loginname}} </span>
              <span> {{index+1}}楼 </span>
              <span class="time" v-if="key.day>0">{{key.day}}天前</span>
              <span class="time" v-if="key.day<=0 && key.hours>0">{{key.hours}}小时前</span>
              <span class="time" v-if="key.day<=0 && key.hours<=0 && key.minutes>0">{{key.minutes}}分钟前</span>
              <span class="time"
                    v-if="key.day<=0 && key.hours<=0 && key.minutes<=0 && key.seconds>0">{{key.seconds}}秒前</span>

              <span class="answer" @click="answer(key)">回复</span>
            </div>
            <div v-html="key.content"></div>
          </div>
          <div class="clear"></div>
        </div>
      </div>

      <div class="fabu-reply">
        <x-textarea :max="200" placeholder="评论..." v-model="replyContent"></x-textarea>
      </div>
      <button class="release-btn" @click="submit">发 布</button>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">

  import {oneArtInfo, token, addNewReplies} from '../../service/getData'
  import {getStore, getDate} from '../../config/mUtils.js'
  import {XTextarea} from 'vux'

  export default {
    data() {
      return {
        article: '',
        artTitle: '',
        artId: getStore('artId'),
        author: '',
        createTime: '',
        replies: [],
        token: token,
        replyContent: '',
        replyId: '',
      }
    },
    mounted() {
      this.getArtInfo();
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
              self.author = response.data.data.author;
              self.createTime = getDate(Date.parse(response.data.data.create_at));
              //可整理成公共方法
              self.replies = response.data.data.replies.map(function (item) {
                var nowTime = new Date().toISOString();
                var time = new Date(nowTime) - new Date(item.create_at);
                //计算出相差天数
                var days = Math.floor(time / (24 * 3600 * 1000));
                //计算出小时数
                var leave1 = time % (24 * 3600 * 1000);  //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000));
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000));
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000);    //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000);
                item.day = days;
                item.hours = hours;
                item.minutes = minutes;
                item.seconds = seconds;
                return item;
              })


            })
            .catch(function (error) {
              console.log('111', error)
            })
      },
      /**
       *  methods submit
       *  describe 提交回复
       */
      submit() {
        let self = this;
        let params = {
          accesstoken: self.token,
          content: self.replyContent,
        };
        if (self.replyId.length > 0) {
          params.replyId = self.replyId;
        }
        addNewReplies(self.artId, params)
            .then(function (response) {
              self.getArtInfo();
              self.replyContent = '';
            })
            .catch(function (error) {
              console.log('111', error)
            })

      },
      /**
       *  methods answer
       *  describe 回复某人评论
       */
      answer(info) {
        let self = this;
        console.log(info);
        self.replyId = info.id;
        self.replyContent = '@' + info.author.loginname;
      },

    },
    components: {
      XTextarea,
    },
  }
</script>

<style lang="scss">

  @import '../../style/artInfo';


</style>