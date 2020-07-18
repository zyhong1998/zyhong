<template>
  <div class="orderlist">
    <!-- 范围查询 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="订单状态" v-model="formInline.orderState">
          <el-option value="已受理">已受理</el-option>
          <el-option value="已完成">已完成</el-option>
          <el-option value="在派送">在派送</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单时间">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="formInline.date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        ></el-date-picker>
        <el-button type="primary" class="serchBtn" @click="serchBtn" style="marginLeft:20px">查询</el-button>
        <el-button type="success" class="resetBtn" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="serch">
      <span class="demonstration">时间范围</span>
      <Serch />
      <el-button type="primary" class="serchBtn">查询</el-button>
    </div>-->

    <!-- 表格 -->
    <el-table :data="tableData" border :style="{width:width}">
      <el-table-column prop="orderNo" fixed label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="120"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="180"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="updateOrder(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="pageSize"
      layout="total,  prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 模态框 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <el-form :model="form" size="small" disabled>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="form.orderNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <el-input v-model="form.orderTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-input v-model="form.deliveryTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remarks" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input v-model="form.orderState" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import Serch from "@/components/Serch.vue";
// import Pager from "@/components/Pager.vue";
import { getOrderList } from "@/api/order";
import moment from "moment";
import local from "@/utils/local";
export default {
  components: {
    // Serch
    // Pager
  },
  data() {
    return {
      width: document.body.clientWidth - 400 + "px",
      // 查询条件数据
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: ""
      },
      tableData: [], //表格数据
      total: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 4, //每页条数
      dialogFormVisible: false, //模态框，
      form: {}, //模态框表单
      formLabelWidth: "80px"
    };
  },
  methods: {
    // 查看详情
    handleClick(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 编辑订单
    updateOrder(row) {
      // 将当前行数据存进本地
      local.set("row", row);
      // console.log(id);
      // 跳转页面
      this.$router.push("/order/order-update");
    },
    // 获取商品列表函数
    async fetchOrderList() {
      let { total, data } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formInline.orderNo,
        consignee: this.formInline.consignee,
        phone: this.formInline.phone,
        orderState: this.formInline.orderState,
        date:
          this.formInline.date == null
            ? JSON.stringify([])
            : JSON.stringify(this.formInline.date)
      });
      // 处理时间格式;
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
        v.orderAmount = "￥:" + v.orderAmount.toFixed(2);
      });
      // 渲染
      this.total = total;
      this.tableData = data;
    },
    // 当前页码改变,调用一次刷新账号列表
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchOrderList();
    },
    // 查询符号条件的订单
    serchBtn() {
      this.currentPage = 1;
      this.fetchOrderList();
    },
    //重置所有查询条件
    resetBtn() {
      this.formInline = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: ""
      };
      this.fetchOrderList();
    }
  },
  created() {
    this.fetchOrderList();
  }
};
</script>

<style lang="less" scoped>
.orderlist {
  padding: 20px;
  background: #fff;
  border-radius: 6px;
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