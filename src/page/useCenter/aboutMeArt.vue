<template>

  <div>
    <!--<header id='nav-top'>-->
      <!--<div class="head-left" onclick="window.history.go(-1)">-->
        <!--<i class="iconfont">&#xe615;</i>-->
        <!--<span>返回</span>-->
      <!--</div>-->
    <!--</header>-->
    <head-nav></head-nav>
    <group class="main-list">
      <cell @click.native='jumpInfo(key)' v-for="key in recent_topics" :title="key.title" is-link></cell>
    </group>
  </div>

</template>

<script>
  import {Group, Cell} from 'vux'
  import {mapState, mapActions,mapMutations} from 'vuex'
  import {setStore,getStore} from '../../config/mUtils.js'
  import headNav from "../../components/header/headNav.vue";
  export default {
    data() {
      return {}
    },
    components: {
      Group, Cell,headNav
    },
    computed: {
      ...mapState([
        'recent_topics',
      ]),

    },
    mounted() {
      this.NAME({
        name: getStore('name')
      });
      this.getUser();
    },

    methods: {
      ...mapActions([
        'getUser',
      ]),
      ...mapMutations([
        'NAME',
      ]),
      jumpInfo(info) {
        let self = this;
        setStore('artId', info.id);
        self.$router.push({path: '/artInfo'})
      }
    },

  }
</script>
<style lang="scss">

  @import '../../style/aboutMeArt';

</style>