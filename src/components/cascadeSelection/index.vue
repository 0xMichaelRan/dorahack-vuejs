<template>
  <div class="cascSelect">
    <div class="selectC">
      <el-select
        v-model="optionsLevelValue">

        <el-option
          v-for="i in optionsLevelList"
          :key="i.value"
          :label="i.label"
          :value="i.value">

        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      optionsLevelValue: '',
      optionsLevelList: [
        {
          label: "vCHF/vUSD",
          value: "vCHF/vUSD",
        },
      ]
    };
  },
  created() {
    // this.list[0].options = this.optionsLevelOne;
    // this.list[0].val = this.optionsLevelOne[0].value;
    // this.list[1].options = this.optionsLevelTwo;
    // this.list[1].val = this.optionsLevelTwo[0].value;
    // this.list.forEach((element) => {
    //   this.$emit("changeCas", element);
    // });
  },
  methods: {
    changeSelect(value, item, index) {
      this.list[index].prop = value;
      // 调用接口
      if (!this.list[index + 1]) return;
      this.list[index + 1].options = this.optionsLevelTwo;
      this.list[index + 1].prop = this.optionsLevelTwo[0].value;
      this.list.forEach((element) => {
        this.$emit("changeCas", element);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cascSelect {
  display: flex;
  .selectC {
    display: flex;
    .divider {
      width: 16px;
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>
