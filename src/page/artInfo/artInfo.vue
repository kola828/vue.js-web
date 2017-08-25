<template>
  <div>
    <header id='nav-top'>

      <div class="head-left" onclick="window.history.go(-1)">
        <i class="iconfont">&#xe615;</i>
        <span>返回</span>
      </div>

    </header>


    <div class="container">
      <div class="con-header">
        <div class="title">{{oneArtInfo.artTitle}}</div>
        <div class="author-info">作者 <img :src="oneArtAuthor.avatar_url"> {{oneArtAuthor.loginname}} 发布于
          {{oneArtInfo.createTime}}
        </div>
      </div>
      <div class="info" v-html="oneArtInfo.article"></div>

      <div class="reply-area">评论区</div>
      <button class="reply-btn">评论</button>
      <div class="reply-block" v-for="(key,index) in oneArtRep">
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

      <div class="fabu-reply" v-if="token!==''">
        <x-textarea :max="200" placeholder="评论..." v-model="replyContent"></x-textarea>
      </div>
      <button class="release-btn" v-if="token!==''" @click="submit">发 布</button>

    </div>


  </div>
</template>

<script type="text/ecmascript-6">

  import {token} from '../../service/getData'
  import {getStore} from '../../config/mUtils.js'
  import {XTextarea, Alert} from 'vux'
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        token: token,
        replyContent: '',
        replyId: '',
      }
    },
    computed: {
      ...mapState([
        'oneArtInfo',
        'oneArtRep',
        'oneArtAuthor',
        'oneArtId',
        'params'
      ]),
    },
    mounted() {
      this.getOneArtInfo()
    },
    methods: {
      ...mapActions([
        'getOneArtInfo',
        'addNewReplies'
      ]),
      ...mapMutations([
        'REPLIY_PARAMS'
      ]),
      /**
       *  methods submit
       *  describe 提交回复
       */
      submit() {
        let self = this;
        if (self.token === '') {
          self.$vux.alert.show({
            title: '提示',
            content: '请先登录',
            onHide() {
            }
          })
        } else if (self.replyContent === '') {
          self.$vux.alert.show({
            title: '提示',
            content: '评论不能为空',
          })
        } else {
          let params = {
            accesstoken: self.token,
            content: self.replyContent,
          };
          if (self.replyId.length > 0) {
            params.replyId = self.replyId;
          }

          self.REPLIY_PARAMS({
            params: params,
            id: getStore('artId')
          });

          self.addNewReplies()
              .then((response) => {
                self.getOneArtInfo();
                self.replyContent = '';
              })
              .catch((error) => {
                console.log('111', error)
              })
        }


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
      Alert
    },
  }
</script>

<style lang="scss">

  @import '../../style/artInfo';


</style>