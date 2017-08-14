<template>
  <div class="contain">
    <head-nav :select-value="title"></head-nav>
    <div class="tie-zi">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo">全部</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">精华</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">weex</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">分享</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">问答</div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">招聘</div>
        </flexbox-item>
      </flexbox>

      <!--<div class="content-info">-->
        <!--<div class="one-article">-->
          <!--<div class="author-time"><span>作者：张三</span><span class="time">2天前</span></div>-->
          <!--<div class="article-title"><span class="top">置顶</span><span>这是一个测试的文章标题</span></div>-->
          <!--<div class="comment-read"><span>评论数：19 阅读数：1234</span></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content-info">-->
        <!--<div class="one-article">-->
          <!--<div class="author-time"><span>作者：张三</span><span class="time">2天前</span></div>-->
          <!--<div class="article-title"><span class="top">置顶</span><span>这是一个测试的文章标题</span></div>-->
          <!--<div class="comment-read"><span>评论数：19 阅读数：1234</span></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content-info">-->
        <!--<div class="one-article">-->
          <!--<div class="author-time"><span>作者：张三</span><span class="time">2天前</span></div>-->
          <!--<div class="article-title"><span class="top">置顶</span><span>这是一个测试的文章标题</span></div>-->
          <!--<div class="comment-read"><span>评论数：19 阅读数：1234</span></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content-info">-->
        <!--<div class="one-article">-->
          <!--<div class="author-time"><span>作者：张三</span><span class="time">2天前</span></div>-->
          <!--<div class="article-title"><span class="top">置顶</span><span>这是一个测试的文章标题</span></div>-->
          <!--<div class="comment-read"><span>评论数：19 阅读数：1234</span></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content-info">-->
        <!--<div class="one-article">-->
          <!--<div class="author-time"><span>作者：张三</span><span class="time">2天前</span></div>-->
          <!--<div class="article-title"><span class="top">置顶</span><span>这是一个测试的文章标题</span></div>-->
          <!--<div class="comment-read"><span>评论数：19 阅读数：1234</span></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content-info">-->
        <!--<div class="one-article">-->
          <!--<div class="author-time"><span>作者：张三</span><span class="time">2天前</span></div>-->
          <!--<div class="article-title"><span class="top">置顶</span><span>这是一个测试的文章标题</span></div>-->
          <!--<div class="comment-read"><span>评论数:19 阅读数:1234</span></div>-->
        <!--</div>-->
      <!--</div>-->


      <div class="content-info" v-for="key in articleList.data">
        <div class="one-article">
          <div class="author-time"><span>作者：{{key.author.loginname}} </span><span class="time">2天前</span></div>
          <div class="article-title"><span class="top" v-if="key.top===true">置顶</span><span>{{key.title}}</span></div>
          <div class="comment-read"><span>评论数：{{key.reply_count}} 阅读数：{{key.visit_count}}</span></div>
        </div>
      </div>


    </div>
    <div class="my-info"></div>

    <div class="bottom-nav"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Group, Cell, Flexbox, FlexboxItem} from 'vux'
  import HeadNav from '../../components/header/head.vue'
  import {mapState,mapActions } from 'vuex'

  export default {

    data() {
      return {
        title:'',//子组件的
      }
    },
    computed: mapState([
      'articleList', //文章列表
    ]),
    mounted() {

      this.getArticleList();
//      console.log(this.articleList)

    },
    methods: {
      ...mapActions([
        'getArticleList',
      ]),
    },
    components: {
      Group,
      Cell,
      HeadNav,
      Flexbox,
      FlexboxItem
    },



  }

</script>

<style lang="scss" scoped>

  @import '../../style/home';


</style>
