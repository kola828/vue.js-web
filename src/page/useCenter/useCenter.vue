<template>

  <div>
    <div class="container-big">
      <div class="user-info">
        <img class="bg-img" :src="user.headImg">
        <div class="head-img">
          <img :src="user.headImg">
        </div>
        <div class="name">
          <p>{{user.userName}}</p>
          <p class="score">积分：{{user.score}}</p>
        </div>
      </div>
      <group>
        <router-link to="aboutMeArt" class="my-list">
          <cell title="我的话题" is-link>
            <div class="badge-value" slot="value">
            </div>
          </cell>
        </router-link>
        <router-link to="joinArt" class="my-list">
          <cell title="最近参与" is-link>
            <div class="badge-value" slot="value">
            </div>
          </cell>
        </router-link>
        <router-link to="myCollect" class="my-list">
          <cell title="我的收藏" is-link>
            <div class="badge-value" slot="value">
            </div>
          </cell>
        </router-link>
        <router-link to="myNew" class="my-list">
          <cell title="我的消息" is-link>
            <div class="badge-value" slot="value">
              <badge text="10"></badge>
            </div>
          </cell>
        </router-link>
      </group>
    </div>

    <foot-nav></foot-nav>
  </div>

</template>

<script>
  import footNav from '../../components/footer/foot.vue'
  //  import {getUser} from '../../service/getData.js'
  import {Badge, Group, Cell} from 'vux'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'userInfo',
        'user'
      ]),

    },
    mounted() {
      this.getUser();
    },

    methods: {
      ...mapActions([
        'getUser',
      ]),
    },
    components: {
      footNav, Badge, Group, Cell
    },
  }
</script>
<style lang="scss">

  @import '../../style/useCenter';


</style>