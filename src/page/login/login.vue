<template>

  <div class="login">
    <div class="logo-block">
      <img src="../../images/vue.png">
    </div>
    <p>VUE.js</p>
    <div class="from-block">
      <div class="from-one">
        <label>用户名：</label><input placeholder="" v-model.trim="myName">
      </div>
      <div class="clear"></div>
      <div class="from-one">
        <label>accessToken：</label><input placeholder="" v-model.trim="myToken">
      </div>
    </div>
    <div class="login-btn" @click="login">登 录</div>

  </div>

</template>
<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import {getUser, checkToken} from '../../service/getData'
  import {setStore} from '../../config/mUtils.js'
  import {Alert} from 'vux'

  export default {
    data() {
      return {
        myName: '',
        myToken: ''
      }
    },
    mounted() {

    },
    methods: {
      ...mapActions([
        'checkToken',
        'getUser'
      ]),
      ...mapMutations([
        'NAME',
        'TOKEN'
      ]),
      async login() {
        let self = this;
        if (self.myName === '' || self.myName === undefined || self.myName === null) {
          self.$vux.alert.show({
            title: '提示',
            content: '请输入用户名',
          })
        } else if (self.myToken === '' || self.myToken === undefined || self.myToken === null) {
          self.$vux.alert.show({
            title: '提示',
            content: '请输入checkToken',
          })
        } else {

          let name1 = '';
          let name2 = '';
          self.NAME({
            name: self.myName
          });
          self.TOKEN({
            token: self.myToken
          });

          await getUser(self.myName)
              .then(function (response) {
                name1 = response.data.data.loginname
              })
              .catch(function (error) {
                name1 = null;
              });
          await checkToken({accesstoken: self.myToken})
              .then(function (response) {
                name2 = response.data.loginname;
              })
              .catch(function (error) {
                name2 = null;
              });

          if (name1 === null) {
            self.$vux.alert.show({
              title: '提示',
              content: '您输入的用户名不正确',
              onHide(){
                self.myName= '';
              }
            })
          } else if (name2 === null) {
            self.$vux.alert.show({
              title: '提示',
              content: '您输入的accessToken不正确',
              onHide(){
                self.myToken= '';
              }
            });
          } else {
            if (name1 === name2) {
              self.$router.push({path: '/home'});
              setStore('token', self.myToken);
              setStore('name', self.myName)
            } else {
              self.$vux.alert.show({
                title: '提示',
                content: '用户名与checkToken不匹配请重新输入',
              })
            }
          }

        }


      }
    },
    components: {
      Alert,
    },
  }
</script>
<style lang="scss">

  @import '../../style/login';


</style>
