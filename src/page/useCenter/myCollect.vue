<template>

      <div>
            <header id='nav-top'>
                  <div class="head-left" onclick="window.history.go(-1)">
                        <i class="iconfont">&#xe615;</i>
                        <span>返回</span>
                  </div>
            </header>

            <div class="main-list">
                  <ul>
                        <li v-for="key in collect_topics" @click="jumpInfo(key)">{{key.title}}</li>
                  </ul>
            </div>

      </div>

</template>

<script>

  import {mapState, mapActions} from 'vuex'
  import {setStore} from '../../config/mUtils.js'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'collect_topics',
      ]),

    },
    mounted() {
      this.getUser();
    },

    methods: {
      ...mapActions([
        'getUser',
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