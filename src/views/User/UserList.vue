<template>
  <div class="userlist">
    <p>添加账号</p>
    <hr />
    <div class="table">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="100"></el-table-column>
        <el-table-column label="账号" width="160">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户名组" width="160"></el-table-column>
        <el-table-column prop="name" label="创建时间" width="160"></el-table-column>
        <el-table-column label="操作" width="220">
          <el-row>
            <el-button>编辑</el-button>
            <el-button type="danger">删除</el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <Pager></Pager>
      <el-row class="footerBtn">
        <el-button type="danger" @click="toggleSelection()">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Pager from "@/components/Pager.vue";
export default {
  components: {
    Pager
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.userlist {
  margin: 20px;
  background: #fff;
  height: 560px;
  border-radius: 4px;
  padding: 10px;
  p {
    margin-bottom: 10px;
  }
  .block {
    margin-top: 20px;
  }
  .footerBtn {
    margin-top: 20px;
  }
}
</style>