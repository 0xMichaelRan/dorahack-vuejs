<template>
  <div class="main">
    <top-nav></top-nav>
    <div class="_body">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import topNav from '../components/nav'
import bottomFooter from '../components/footer'
import common from '../common'
export default {
  components: {
    topNav,
    bottomFooter
  },
  data() {
    return {

    }
  },
  watch: { },
  methods: { },
  created() { },
  mounted() { },
  computed: { },
}
</script>
<style lang="less">
@import '../assets/style.less';
@media screen and (max-width: 1280px) {  }

input{outline:none}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main ._body {
  background: #FBFDFF;
  height: auto;
  flex: 1;
}
</style>
