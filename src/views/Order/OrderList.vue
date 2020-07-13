<template>
  <div class="orderlist">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="订单号">
        <el-input v-model="formInline.user" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.user" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.user" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="form.region" placeholder="订单状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="serch">
      <span class="demonstration">时间范围</span>
      <Serch />
      <el-button type="primary" class="serchBtn">查询</el-button>
    </div>
    <el-table :data="tableData" border :style="{width:width}">
      <el-table-column fixed label="订单号" width="150"></el-table-column>
      <el-table-column prop="date" label="下单时间" width="150"></el-table-column>
      <el-table-column prop="name" label="手机号" width="120"></el-table-column>
      <el-table-column prop="province" label="收货人" width="120"></el-table-column>
      <el-table-column prop="city" label="配送地址" width="120"></el-table-column>
      <el-table-column prop="address" label="送达时间" width="300"></el-table-column>
      <el-table-column prop="zip" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="zip" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="zip" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <Pager />
  </div>
</template>

<script>
import Serch from "@/components/Serch.vue";
import Pager from "@/components/Pager.vue";
export default {
  components: {
    Serch,
    Pager
  },
  data() {
    return {
      width: document.body.clientWidth - 400 + "px",
      formInline: {
        user: "",
        region: ""
      },
      form: { regin: "" },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="less" scoped>
.orderlist {
  padding: 20px;
  background: #fff;
  border-radius: 6px;
}
form {
  /deep/.el-input__inner {
    width: 160px;
  }
}
.el-table {
  margin: 30px 0;
}
.serch {
  display: flex;
  align-items: center;
  /deep/.block,
  button {
    margin-left: 10px;
  }
}
</style>