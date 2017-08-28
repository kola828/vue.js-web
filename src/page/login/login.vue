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
  import {getUser,checkToken} from '../../service/getData'
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
      login() {
        let self = this;
        let name1='';
        let name2='';
        self.NAME({
          name: self.myName
        });
        self.TOKEN({
          token: self.myToken
        });
        getUser(self.myName).then(function (response) {
          name1=response.data.data.loginname
        });
        checkToken({accesstoken:self.myToken}).then(function (response) {
          name2=response.data.loginname;
        });
        if(name1===name2){
          self.$router.push({path: '/home'});
          setStore('token',self.myToken);
          setStore('name',self.myName)

        }else {
          console.log('dasda');
          self.$vux.alert.show({
            title: '提示',
            content: '用户名与checkToken不匹配请重新输入',
          })
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
