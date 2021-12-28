<template>
  <div class="wrap">
      <topPanel></topPanel>

  </div>
</template>

<script>
  import topPanel from './components/topPanel'
  export default {
    components:{
      topPanel
    },
    data() {
      return {

      };
    }
  };
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
  }
</style>
