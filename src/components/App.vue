<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  import * as types from '../store/types';
  export default {

    beforeCreate() {
      this.$store.dispatch(types.AUTO_LOGIN)
    },
  }

</script>

<style lang="scss">

</style>
