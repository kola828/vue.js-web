<template>

  <div>
    <header id='nav-top'>
      <router-link to="home">
        <div class="head-left">
          <i class="iconfont">&#xe615;</i>
          <span>返回</span>
        </div>
      </router-link>
    </header>
    <div class="container">

      <group>
        <x-input placeholder="标题" :max="20"></x-input>
        <x-textarea :max="600" name="description" :height="400" placeholder="正文..."></x-textarea>
      </group>

    </div>
  </div>

</template>

<script>
  import { XTextarea, Group, XInput } from 'vux'
  export default {
    data() {
      return {}
    },
    mounted() {


    },
    methods: {

    },
    components: {
      XTextarea,
      Group,
      XInput
    },

  }
</script>
<style lang="scss">

  @import '../../style/editArt';


</style>