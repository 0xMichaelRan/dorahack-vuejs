<template>
  <div class='titleBox'>
    <div class="titleBlock" v-for="(item, index) in blockData" @click="go" :key="index">
      <div class="top">
        <span class='icon'></span>
        <span class='name'>{{ item.title }}</span>
        <span class='change'>{{ item.change }}%</span>
      </div>
      <p class="price" :class='item.price > 0 ? "colorMainPink": "colorMainGreen"'>{{ item.price }}</p>
      <p class="content">{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blockData"],
  data() {
    return {};
  },

  methods: {
    go () {

      go('trade')
    }
  }
};
</script>

<style lang='less' scoped>
@import '../../assets/style';
.titleBox{
  width: 100%;
  display: flex;
  margin-top: 40px;
  .titleBlock{
    width: 250px;
    height: 106px;
    margin-left: 16px;
    background: #fff;
    border-radius: @borderR4;
    padding: 16px 12px; 
    box-sizing: border-box;
    .top{
      display: flex;
      .icon{
        width: 24px;
        height: 24px;
        background: blue;
        margin-right: 6px;
      }
      .name{
        font-size: @font16;
        flex-grow: 1;
        line-height: 24px;
        text-align: left;
      }
      .change{
        width: 70px;
        height: 24px;
        line-height: 24px;
        background: @colorfeeeef;
        color: @colorF84E58;
        font-family: @fontArial;
        font-size: @font12;
        border-radius: @borderR4;
      }
    }
    .price{
      height: 28px;
      line-height: 28px;
      margin: 8px 0px 4px;
      text-align: left;
      font-size: @font14;
    }
    .content{
      height: 14px;
      line-height: 14px;
      font-size: @font12;
      color: @colorAEB7C4;
      text-align: left;
    }
  }
  .titleBlock:nth-of-type(1){
    margin-left: 0px;
  }
}
</style>
