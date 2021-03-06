<template>
  <div class="tbl">
    <el-table
      :data="list"
      class="table"
      id="table"
      v-loading="loading"
    >
      <el-table-column
        v-for="item in tableColumn"
        v-if="item.title !== 'Action' && item.title !== 'Cancel All'"
        :key="item.prop"
        :prop="item.prop"
        :label="item.title"
        :width="item.width"
        :sortable="item.sortable"
      >
      <template slot-scope="scope">
        <span  v-if='item.prop ==="change"' :class='[scope.row.change > 0 ? "colorMainGreen" : "colorMainPink"]'>{{scope.row.change}}%</span>
        <span v-else>{{scope.row[item.prop]}}</span>
      </template>
      </el-table-column>
      
      <el-table-column
        v-if ='!!tableColumn.find(item=>item.title === "Action")'
        label="Action"
        width="150"
        align="center"
      >
      
        <template slot-scope="scope">
          <slot
            name="operation"
            :scope="scope"
            :topage="topage"
            :toLinkPage="toLinkPage"
            :cancel="cancel"
          />
        </template>
      </el-table-column>

      <el-table-column
        v-if ='!!tableColumn.find(item=>item.title === "Cancel All")'
        label="Cancel All"
        width="150"
        align="center"
      >

        <template slot-scope="scope">
          <slot
            name="operation"
            :scope="scope"
            :topage="topage"
            :toLinkPage="toLinkPage"
            :cancel="cancel"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      
    };
  },
  props:['tableColumn', 'list'],
  created(){
  },
  methods: {
    cancel({ row }) {
      alert('删除成功')
    },
    topage(){
      this.$router.push({name:'trade'})
    },
    toLinkPage(){
      alert('跳转到every页面')
    }
  },
};
</script>

<style lang="less" scoped>
@import '@/assets/style.less';
/deep/ .el-table .cell{
  font-size: @font12;
}
.changeColumn{

}
</style>
