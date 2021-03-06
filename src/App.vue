<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import path from './assets/constant'
export default {
  name: 'App',
  data: () => {
    return {}
  },
  created() {
  },
  mounted() {},
  methods: {

  },
}
</script>

<style>
#app {
  height: 100%;
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #FBFDFF;;
}
ul,
li {
  list-style: none;
}
html,
body,
p,
ul,
li {
  padding: 0;
  margin: 0;
}
html, body {
  height: 100%;
  width: 100%;
  background-color: #F8F8F8;
}
</style>
