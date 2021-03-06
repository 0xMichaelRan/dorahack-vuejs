<template>
  <div class="order">
    <div class="order-header">
      <span v-for="(item, index) in headerMap" :key="index"
            :class="item.cls"
            @click="viewChange(index)">
        {{ item.title }}</span>
    </div>

    <div class="order-view" v-if="headerMap[0].cls == 'hov'">
      <img src="../../assets/images/buysell-cur.png" alt="">
      <img src="../../assets/images/buy-un.png" alt="">
      <img src="../../assets/images/sell-un.png" alt="">
    </div>

    <div class="list" v-if="headerMap[0].cls == 'hov'">
      <div class="title">
        <div>Price</div><div>Amount</div><div>Total</div>
      </div>
      <ul class="content">
        <li><div class="c">7.40</div><div>578.70</div><div>2578.70</div></li>
        <li><div class="c">7.40</div><div>578.70</div><div>2578.70</div></li>
      </ul>

      <ul class="content gr">
        <li><div class="d">7.40</div><div>578.70</div><div>2578.70</div></li>
        <li><div class="d">7.40</div><div>578.70</div><div>2578.70</div></li>
      </ul>
    </div>

    <div class="list" v-if="headerMap[1].cls == 'hov'">
      <div class="title">
        <div>Price</div><div>Amount</div><div>Time</div>
      </div>

      <ul class="content">
        <li><div class="c">7.40</div><div>578.70</div><div>14-12-2020 21:00:00</div></li>
        <li><div class="d">7.40</div><div>578.70</div><div>14-12-2020 21:00:00</div></li>
        <li><div class="d">7.40</div><div>578.70</div><div>14-12-2020 21:00:00</div></li>
        <li><div class="d">7.40</div><div>578.70</div><div>14-12-2020 21:00:00</div></li>
        <li><div class="c">7.40</div><div>578.70</div><div>14-12-2020 21:00:00</div></li>
        <li><div class="d">7.40</div><div>578.70</div><div>14-12-2020 21:00:00</div></li>

      </ul>
    </div>
  </div>
</template>

<script>
import common from '../../common'
export default {
  components: {

  },
  data() {
    return {
      headerMap: [
        {
          title: 'Order Book',
          cls: 'hov'
        }, {
          title: 'Market Trades',
          cls: ''
        }
      ]
    }
  },
  watch: { },
  methods: {
    viewChange (idx) {
      this.headerMap.map((item, index) => {
        item.cls = ''

        if (index == idx) {
          item.cls = 'hov'
        }
      })
      // for (let i in this.headerMap) {
      //
      // }
    }
  },
  created() { },
  mounted() { },
  computed: { },
}
</script>
<style lang="less" scoped>
@import '../../assets/style.less';
@media screen and (max-width: 1440px) {

}

.order {
  width: 330px;
  height: 746px;
}

.order-header {
  height: 44px;
  text-align: center;
  overflow: hidden;
  background-color: #F8F8F8;
}

.order-header span {
  float: left;
  width: 33.3%;
  height: 42px;
  line-height: 42px;
  border-top: 2px solid #F8F8F8;

  font-size: 14px;
  color: #49505A;
}

.order-header span.hov {
  color: #DA235E;
  border-top: 2px solid #DA235E;
  background-color: #fff;
}

.order-view {
  height: 36px;
  display: flex;
  padding: 0 10px;
}

.order-view > img {
  display: block;
  width: 22px;
  height: 22px;
  line-height: 24px;
  margin: 6px;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid rgba(214, 220, 222, .2);
}

.order-view div.black {
  background: #49505A;
  border: 1px solid #49505A;

  color: #fff;
}

.order .list {

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
.order .list .content.gr { margin-top: 30px }
.order .list .content li > div:first-of-type { text-align: left }

.order .list .content .c { color: #F84E58; }
.order .list .content .d { color: #2DB86C; }


</style>