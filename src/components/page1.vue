<template>
  <div id="app">
    <h1>我是page1</h1>
    <img src="../assets/logo.png">
    <nav><a href='page2.html'>page2 >></a></nav>
    <div class="icon"></div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
@import '../styles/sprite/sprite_def.scss';
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
