<template>
  <div class="cc">
      <div v-for="(item, index) in cardList" :key="index" class="q-card" :class='{"q-cur-card" : activeName === index, "isBorderBotton": isBorderBotton}'  @click='changeCur(item,index)'>
        {{ item.label }}
      </div>
  </div>
</template>

<script>
export default {
  props: ["cardList",'isBorderBotton'],
  data() {
    return {
      activeName: 0,
    };
  },
  created() {
    const item = this.cardList.filter((item,index)=>index===this.activeName)
    this.$emit('changeCard', item[0])
  },
  methods:{
    changeCur(item, index){
      this.activeName = index
      this.$emit('changeCard', item)
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/assets/style";
.cc {
  width: fit-content;
  display: flex;
  background: @colorf8f8f8;
  .q-card {
    width: 130px;
    height: 40px;
    line-height: 40px;
    color: @color49505A;
    font-size: @font14;
    font-weight: bold;
    text-align: center;
    border-top: 4px solid transparent;
    cursor: pointer;
    &.isBorderBotton{
      border-top: 0px;
      border-bottom: 4px solid transparent;
    }
  }
  .q-cur-card{
    color: @colorDA235E;
    border-top: 4px solid @colorDA235E;
    &.isBorderBotton{
      border-top: 0px;
      border-bottom: 4px solid @colorDA235E;
    }
  }
}
</style>
