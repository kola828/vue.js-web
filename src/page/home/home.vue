<template>
  <div>
    hahahaha...
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
    data(){
      return {}
    },

    mounted(){
      this.getInfo();
    },
    methods: {
      getInfo() {
        axios({
          method: 'GET',
          url: '/v1/topics '
        })
                .then(function (response) {
                  console.log(response)
                })
                .catch(function (error) {
                  console.log(error);
                });
      },
    },
    components: {},

    computed: {}

  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';


</style>
