<template>
    <header id='head-top'>
        <div class="head-logo">
            <img src="../../images/vue.png">
        </div>
        <span class="logo-span">Vue.js</span>
        <div class="head-select">
            <input v-model="selectValue">
            <i class="iconfont select">&#xe66f;</i>
        </div>
    </header>
</template>

<script>
  import { Search, Group, Cell, XButton } from 'vux'
    export default {
      components: {
        Search,
      },
    	data(){
            return{
              select:'',
            }
        },
        mounted(){
            //获取用户信息


        },
        props: ['selectValue'],

        methods: {

        },

    }
</script>

<style lang="scss">
    /*@import '../../style/common';*/
</style>
