<template>
  <div class="search">
    <div class="ipt-search">
      <i>Q</i>
      <input type="text" placeholder="Search" />
    </div>
    <div class="order">
      <div class="list">
        <div class="title">
          <div>Pairs</div><div>Last Price</div><div>Change</div>
        </div>
        <ul class="content">
          <li><div>vCHF/vUSD</div><div>11.70</div><div>-0.36%</div></li>
          <li><div>vCHF/vUSD</div><div>11.70</div><div>-0.36%</div></li>
        </ul>
      </div>
    </div>
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

.search {
  width: 300px;
  height: 746px;
}

.ipt-search {
  height: 44px;
}
.ipt-search i {
  display: block;
  float: left;
  width: 44px;
  height: 44px;
  line-height: 44px;

  text-align: center;
  color: #AEB7C4;
  font-size: 12px;
}
.ipt-search input {
  float: left;
  width: 236px;
  height: 44px;
  border: 0;

  font-size: 12px;
  color: #AEB7C4;

  -webkit-appearance: none;
}


.order .list .title {
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  color: #aeb7c4;
}

.order .list .title > div {
  width: 33.3%;
  float: left;
  font-size: 12px;

  text-align: right;
}

.order .list .title > div:first-of-type { text-align: left }
.order .list .title > div:last-of-type { text-align: right }

.order .list .content li {
  padding: 4px 16px;
  overflow: hidden;
}
.order .list .content li > div {
  float: left;
  width: 33.3%;

  font-size: 12px;
  text-align: right;
}
.order .list .content li > div:first-of-type { text-align: left }
.order .list .content li > div:last-of-type  { text-align: right; color: #F84E58; }
</style>