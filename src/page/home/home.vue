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

        <div class="content-info" v-for="key in allArtList" @click="jumpInfo(key)">
          <div class="one-article">
            <div class="author-time"><span>作者：{{key.author.loginname}} </span>
              <span class="time" v-if="key.day>0">{{key.day}}天前</span>
              <span class="time" v-if="key.day<=0 && key.hours>0">{{key.hours}}小时前</span>
              <span class="time" v-if="key.day<=0 && key.hours<=0 && key.minutes>0">{{key.minutes}}分钟前</span>
              <span class="time"
                    v-if="key.day<=0 && key.hours<=0 && key.minutes<=0 && key.seconds>0">{{key.seconds}}秒前</span>
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
  import {mapState, mapActions, mapMutations} from 'vuex'

  //  import {articleInfo} from '../../service/getData'
  import {setStore} from '../../config/mUtils.js'
  import IScroll from 'iscroll'

  export default {
    data() {
      return {
        title: '',//子组件的
        tab: 'all', //tab 类型
        limit: 10, // 每页调数
        page: 1, //当前页数
//        articleList: [],//文章列表
        myScroll: {},
      }
    },
    computed: {
      ...mapState([
        'allArtList',
        'newArtParam',
      ]),
    },
    mounted() {
      this.getArticleList('all');

      this.initIscroll();
      document.querySelector('#wrapper').addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, false);
      this.computeHeight();

    },
    methods: {
      ...mapActions([
        'articleInfo',
      ]),
      ...mapMutations([
        'ART_LIST_PARAM'
      ]),

      /**
       * methods initIscroll
       * describe 初始化iscroll
       */
      initIscroll() {
        let self = this;
        self.myScroll = new IScroll('#wrapper', {
          mouseWheel: true,  // 是否监听鼠标滚轮事件。
        });
      },
      /**
       * methods computeHeight
       * describe 计算iscroll高度
       */
      computeHeight() {
        let self = this;
        self.myScroll.on("scrollEnd", () => {
          let maxY = Math.abs(self.myScroll.maxScrollY);
          let posY = Math.abs(self.myScroll.y);
          if (posY >= maxY) {
            if (self.allArtList.length >= self.limit) {
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
              setTimeout(() => {
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

        let self = this;
        if (name !== '' ) {
          self.tab = name;
        } else {
          self.tab = 'all'
        }

        self.ART_LIST_PARAM({
          tab: self.tab,
          limit: self.limit,
          page: self.page
        });

        self.articleInfo()
      },
      /**
       * methods chooseTabs
       * describe 选择按钮
       * @param name
       */
      chooseTabs(name) {
        let self = this;
        self.myScroll.scrollTo(0, 0);
        self.limit=10;
        self.getArticleList(name)
      },
      /**
       *
       */
      jumpInfo(info) {
        let self = this;
        setStore('artId', info.id);
        self.$router.push({path: '/artInfo'})
      }
    },
    watch: {
      /**
       * methods articleList
       * describe 监听文章列表
       */
      allArtList() {
        let self = this;
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
