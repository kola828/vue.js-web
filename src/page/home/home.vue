<template>
  <div class="contain">
    <div class="top-head">
      <head-nav :select-value="title"></head-nav>
      <flexbox>
        <flexbox-item>
          <div class="flex-demo" @click="chooseTabs('all')">全部</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="chooseTabs('good')">精华</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="chooseTabs('weex')">weex</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="chooseTabs('share')">分享</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="chooseTabs('ask')">问答</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo" @click="chooseTabs('job')">招聘</div>
        </flexbox-item>
      </flexbox>
    </div>


    <div id="wrapper">
      <div class="iscroll" id="iscroll">

        <div class="content-info" v-for="key in articleList" @click="">
          <div class="one-article">
            <div class="author-time"><span>作者：{{key.author.loginname}} </span>
              <span class="time" v-if="key.day>0">{{key.day}}天前</span>
              <span class="time" v-if="key.day<=0 && key.hours>0">{{key.hours}}小时前</span>
              <span class="time" v-if="key.day<=0 && key.hours<=0 && key.minutes>0">{{key.minutes}}分钟前</span>
              <span class="time"
                    v-if="key.day<=0 && key.hours<=0 && key.minutes<=0 && key.seconds>0">{{key.seconds>0}}秒前</span>
            </div>
            <div class="article-title">
              <span class="top" v-if="key.top===true">置顶</span>
              <span class="test" v-if="key.tab==='share' && key.top===false && key.good===false">分享</span>
              <span class="test" v-if="key.good===true && key.top===false">精华</span>
              <span class="test" v-if="key.tab==='weex'&&key.top===false && key.good===false">weex</span>
              <span class="test" v-if="key.tab==='ask'&&key.top===false && key.good===false">问答</span>
              <span class="test" v-if="key.tab==='job'&&key.top===false && key.good===false">招聘</span>
              <span>{{key.title}}</span></div>
            <div class="comment-read"><span>评论数：{{key.reply_count}} 阅读数：{{key.visit_count}}</span></div>
          </div>
        </div>
      </div>
    </div>

    <foot-nav></foot-nav>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group, Cell, Flexbox, FlexboxItem} from 'vux'
  import HeadNav from '../../components/header/head.vue'
  import footNav from '../../components/footer/foot.vue'
  import {mapState, mapActions} from 'vuex'
  import {articleInfo} from '../../service/getData'
  import IScroll from 'iscroll'

  export default {
    data() {
      return {
        title: '',//子组件的
        tab: 'all', //tab 类型
        limit: 10, // 每页调数
        page: 1, //当前页数
        articleList: [],//文章列表
        myScroll: {},
      }
    },
    computed: {},
    mounted() {
      this.getArticleList('all');
      this.initIscroll();
      document.querySelector('#wrapper').addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
      this.computeHeight();

    },
    methods: {
      /**
       * methods initIscroll
       * describe 初始化iscroll
       */
      initIscroll() {
        var self = this;
        self.myScroll = new IScroll('#wrapper', {
          mouseWheel: true,  // 是否监听鼠标滚轮事件。
        });
      },
      /**
       * methods computeHeight
       * describe 计算iscroll高度
       */
      computeHeight() {
        var self = this;
        self.myScroll.on("scrollEnd", function () {
          var maxY = Math.abs(self.myScroll.maxScrollY);
          var posY = Math.abs(self.myScroll.y);

          if (posY >= maxY) {

            if (self.articleList.length >= self.limit) {
              self.limit = self.limit + 10;

              if (self.tab === 'all') {
                self.getArticleList('all');
              } else if (self.tab === 'good') {
                self.getArticleList('good');
              } else if (self.tab === 'weex') {
                self.getArticleList('weex');
              } else if (self.tab === 'share') {
                self.getArticleList('share');
              } else if (self.tab === 'ask') {
                self.getArticleList('ask');
              } else if (self.tab === 'job') {
                self.getArticleList('job');
              }


              setTimeout(function () {
                self.myScroll.refresh()
              }, 100);
            }
          }
        });
      },
      /**
       * methods getArticleList
       * describe 获取文章列表数据
       */
      getArticleList(name) {
        var self = this;
        console.log(name);
        if (name !== '') {
          self.tab = name;
        }
        articleInfo(
            {
              tab: self.tab,
              limit: self.limit,
              page: self.page
            }
        ).then(function (response) {


          response.data.data.map(function (item) {
            var nowTime = new Date().toISOString();
            var time = new Date(nowTime) - new Date(item.last_reply_at);
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
          });
          self.articleList = response.data.data;
        })
            .catch(function (error) {
              console.log(error);
            })

      },
      /**
       * methods chooseTabs
       * describe 选择按钮
       * @param name
       */
      chooseTabs(name) {
        var self = this;
        self.myScroll.scrollTo(0, 0);
        self.getArticleList(name)
      }
    },
    watch: {
      /**
       * methods articleList
       * describe 监听文章列表
       */
      articleList() {
        var self = this;
        setTimeout(function () {
          self.myScroll.refresh();
        }, 0);
      }
    },
    components: {
      Group,
      Cell,
      HeadNav,
      footNav,
      Flexbox,
      FlexboxItem
    },


  }

</script>

<style lang="scss" scoped>

  @import '../../style/home';


</style>
