<template>
  <div class="productlist">
    <Paner>
      <h3 slot="title">商品分类</h3>
      <el-button type="primary" slot="button">添加分类</el-button>
      <div slot="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.switch1"
                active-color="#13ce66"
                inactive-color="#DCDFE6"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <el-row>
              <el-button>编辑</el-button>
              <el-button type="danger">删除</el-button>
            </el-row>
          </el-table-column>
        </el-table>
        <Pager></Pager>
      </div>
    </Paner>
  </div>
</template>

<script>
import Pager from "@/components/Pager.vue";
import Paner from "@/components/Paner.vue";
export default {
  components: {
    Pager,
    Paner
  },
  data() {
    return {
      value: true,
      tableData: [
        {
          date: "1",
          name: "热销榜",
          switch1: 1
        },
        {
          date: "2",
          name: "单人精彩套餐",
          switch1: 1
        },
        {
          date: "3",
          name: "冰爽饮品限时特惠",
          switch1: 1
        },
        {
          date: "4",
          name: "王小虎",
          switch1: 1
        }
      ],
      form: { name: "" }
    };
  }
};
</script>

<style lang="less" scoped>
.productlist {
  /deep/.block {
    margin-top: 20px;
  }
}
</style>