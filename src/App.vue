<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import '@css/topBar.scss';
@import '@css/global.scss';

body{
  padding:0;
  margin:0;
  overflow: hidden;
}
#app {
  font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
</style>
