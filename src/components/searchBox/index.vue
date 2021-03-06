<template>
  <div class="searchC">
    <div
      class="searchI"
      v-for="(item, index) in searchList"
      :key="index"
      :class="{ blockSpace: item.type === 'block' }"
    >

      <CascadeSelection
        v-if="item.type === 'cascadeSelection'"
        @changeCas="changeCas($event, item)"
        :list="item.list"
      ></CascadeSelection>

      <Cards
        v-if="item.type === 'cards'"
        @changeCard="changeCard($event, item)"
        :cardList="item.list"
      ></Cards>
      <el-select
        v-if="item.type === 'select'"
        v-model="item.val"
        placeholder=""
        @change="changeSelect($event, item)"
      >
        <el-option
          v-for="i in item.list"
          :key="i.value"
          :label="i.label"
          :value="i.value"
        >
        </el-option>
      </el-select>
      <el-input
        class="searchInput"
        prefix-icon="el-icon-search"
        v-if="item.type === 'searchInput'"
        v-model="item.val"
        placeholder="Search"
      >
      </el-input>
      <div class="button" v-if="item.type === 'buttonSearch'" @click="search">
        {{ item.content }}
      </div>
      <div class="download" v-if="item.type === 'buttonDownload'">
        <span class="icon"></span>{{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "@/components/cards";
import CascadeSelection from "@/components/cascadeSelection";
export default {
  components: {
    Cards,
    CascadeSelection,
  },
  props: ["searchList"],
  data() {
    return {
      query: {},
      vD: ''
    };
  },
  created() {
    this.searchList.filter(item=>item.type ==="select").forEach(element => {
      this.changeSelect(element.val,element)
    });
  },
  methods: {
    changeCard(data, item) {
      this.query[item.prop] = data.value;
      this.$emit('changeCardPiece',data)
    },
    changeCas(data){
      this.query[data.prop] = data.val;
    },
    changeSelect(e, item) {
      this.query[item.prop] = e;
    },
    search() {
      this.$emit("sendQuery", this.query);
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/assets/style.less";
.searchC {
  display: flex;
  align-items: center;
  .searchI {
    margin-right: 16px;
    /deep/ .el-select .el-input--suffix {
      .el-input__inner {
        width: 100px;
        height: 28px;
        padding: 7px 20px 7px 8px;
        font-size: @font12;
      }
      .el-input__suffix .el-input__suffix-inner .el-select__caret {
        line-height: 28px;
      }
    }
    &.blockSpace {
      width: 100%;
      flex-grow: 1;
    }
  }
  .button {
    width: 55px;
    height: 28px;
    line-height: 28px;
    background: @colorDA235E;
    color: #fff;
    border-radius: @borderR4;
    font-size: @font12;
    cursor: pointer;
  }
  .download {
    display: flex;
    align-items: center;
    width: 90px;
    height: 28px;
    line-height: 28px;
    font-size: @font12;
    background: rgba(218, 35, 94, 0.1);
    border-radius: @borderR4;
    color: @colorDA235E;
    cursor: pointer;
    .icon {
      display: flex;
      width: 12px;
      height: 12px;
      margin: 0px 9px;
      background: url(../../assets/images/download.png) no-repeat;
      background-size: contain;
    }
  }
  .searchInput {
    /deep/ .el-input__inner {
      width: 320px;
      height: 32px;
      background: rgba(255, 255, 255, 0.3);
    }
    /deep/ .el-input__prefix .el-input__icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
