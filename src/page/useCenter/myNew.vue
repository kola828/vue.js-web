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
      <cell @click.native='jump(key)' v-if="msgList.hasnot_read_messages!==''"
            v-for="key in msgList.hasnot_read_messages"
            :title="key.topic.title" is-link>
        <badge></badge>
      </cell>
      <cell @click.native='jump(key)' v-for="key in msgList.has_read_messages" :title="key.topic.title" is-link></cell>
    </group>
  </div>
</template>

<script>
  import {Badge, Group, Cell} from 'vux'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getStore, setStore} from '../../config/mUtils'
  import headNav from "../../components/header/headNav.vue";


  export default {
    data() {
      return {
        title: 'fd'
      }
    },
    computed: {
      ...mapState([
        'msgList',
      ]),

    },
    mounted() {
      this.TOKEN({
        token: getStore('token')
      });
      this.getMessages();
    },

    methods: {
      ...mapActions([
        'getMessages'
      ]),
      ...mapMutations([
        'TOKEN'
      ]),

      jump(info) {
        let self = this;
        setStore('artId', info.topic.id);
        self.$router.push({path: '/artInfo'});
      }

    },
    components: {
      Badge, Group, Cell, headNav
    },
  }
</script>

<style lang="scss">

  @import '../../style/aboutMeArt';

</style>
