<template>
  <div class="ipt-price">
    <span class="headerContent">{{ headerContent }}</span>
    <input class="" type="text" :placeholder="placeholderText" :readonly="readonly">
    <span class="lastContent">{{ footerContent }}</span>
  </div>
</template>

<script>
import common from '../../common'
export default {
  components: {

  },
  data() {
    return { }
  },
  props: {
    headerContent: {
      default: 'test'
    },
    footerContent: {
      default: 'test'
    },
    placeholderText: {
      default: ''
    },
    readonly: {
      default: false
    }
  },
  watch: { },
  methods: { },
  created() { },
  mounted() { },
  computed: { },
}
</script>
<style lang="less" scoped>
@import '../../assets/style.less';
@media screen and (max-width: 1440px) {

}

.ipt-price {
  display: flex;
  align-items: center;
  width: auto;
  height: 32px;
  padding: 0 10px;
  margin: 6px 0 8px;
  background: #FFFCF6;
  border-radius: 2px;
  border: 1px solid #DA235E;

  font-size: 12px;
  color: #AEB7C4;
}

.ipt-price input {
  width: 100%;
  height: 30px;
  padding: 0 8px;
  border: 0;
  background-color: transparent;

  color: #8A8A8A;
  font-size: 14px;
}

.headerContent {
  flex: none;
  font-size: 12px;
  color: #AEB7C4;
}
</style>