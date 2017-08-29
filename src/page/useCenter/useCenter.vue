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
        <!--<router-link to="myCollect" class="my-list">-->
        <!--<cell title="我的收藏" is-link>-->
        <!--<div class="badge-value" slot="value">-->
        <!--</div>-->
        <!--</cell>-->
        <!--</router-link>-->
        <router-link to="myNew" class="my-list">
          <cell title="我的消息" is-link>
            <div class="badge-value" slot="value">
              <badge :text="msg" v-if="msg>0"></badge>
            </div>
          </cell>
        </router-link>
      </group>

      <div class="logout-btn" @click="show=true">注 销</div>
    </div>


    <div>
      <confirm v-model="show"
               title="提示"
               @on-confirm="logout"
      >
        <p style="text-align:center;">您确认要退出吗？</p>
      </confirm>
    </div>

    <foot-nav></foot-nav>
  </div>

</template>

<script>
  import footNav from '../../components/footer/foot.vue'
  import {Badge, Group, Cell, Confirm, Alert} from 'vux'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getStore, removeStore} from '../../config/mUtils'
  import {getMsgCount} from '../../service/getData'

  export default {
    data() {
      return {
        msg: '',
        show: false
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'user',
        'token'
      ]),
    },
    mounted() {

      let self=this;
      if (getStore('token') === '' || getStore('token') === undefined || getStore('token') === null) {
        this.$vux.alert.show({
          title: '提示',
          content: '您还没有登录，请先登录',
          onHide() {
            self.$router.push({path: '/login'})
          }
        })
      } else {
        this.NAME({
          name: getStore('name')
        });
        this.TOKEN({
          token: getStore('token')
        });
        this.getUser();
        this.getLength();
      }
    },

    methods: {
      ...mapActions([
        'getUser',
      ]),
      ...mapMutations([
        'NAME',
        'TOKEN'
      ]),
      getLength() {
        let self = this;
        getMsgCount({accesstoken: getStore('token')})
            .then(function (response) {
              self.msg = response.data.data
            });
      },
      logout() {
        let self = this;
        self.show = false;
        self.$router.push({path: '/login'});
        removeStore('name');
        removeStore('token');
      }
    },
    components: {
      footNav, Badge, Group, Cell, Confirm, Alert
    },
  }
</script>
<style lang="scss">

  @import '../../style/useCenter';


</style>