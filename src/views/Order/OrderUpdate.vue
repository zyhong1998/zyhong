<template>
  <div class="order-update">
    <h3 style="marginBottom:20px">订单修改</h3>
    <hr />
    <el-form :model="form" ref="form" :rules="rules" style="marginTop:20px">
      <el-form-item label="订单号" :label-width="formLabelWidth">
        <el-input v-model="form.orderNo" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="下单时间" :label-width="formLabelWidth">
        <el-input v-model="form.orderTime" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收货人" :label-width="formLabelWidth" prop="consignee">
        <el-input v-model="form.consignee" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="送货地址" :label-width="formLabelWidth" prop="deliverAddress">
        <el-input v-model="form.deliverAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="送达时间" :label-width="formLabelWidth" prop="deliveryTime">
        <div class="block">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="form.deliveryTime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remarks" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="订单金额" :label-width="formLabelWidth">
        <el-input v-model="form.orderAmount" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-input v-model="form.orderState" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="操作" :label-width="formLabelWidth">
        <el-button @click="back">返回订单列表</el-button>
        <el-button type="primary" @click="isUpdate">确 定</el-button>
        <el-button type="success" @click="reset">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import local from "@/utils/local";
import { getOrder, updateOrder } from "@/api/order";
import moment from "moment";
export default {
  data() {
    return {
      form: {},
      formLabelWidth: "160px",
      rules: {
        phone: {
          required: true,
          message: "请输入电话",
          trigger: "change"
        },
        consignee: {
          required: true,
          message: "请选择收货人",
          trigger: "change"
        },
        deliverAddress: {
          required: true,
          message: "请输入收货地址",
          trigger: "change"
        },
        deliveryTime: {
          required: true,
          message: "请选择送达时间",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    // 保存后修改订单
    isUpdate() {
      // 验证表单是否为空
      this.$refs.form.validate(async valid => {
        // 发送ajax
        let { code } = await updateOrder(this.form);
        if (code == 0) {
          this.$router.push("/order/order-list");
        }
      });
    },
    // 返回订单列表
    back() {
      this.$router.push("/order/order-list");
    },
    // 拿去本地对应数据渲染
    getData() {
      this.form = local.get("row");
    },
    // 重置
    reset() {
      this.getData();
    }
  },
  created() {
    // 从本地拿取数据
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.order-update {
  padding: 20px;
  background: #fff;
  border-radius: 6px;

  .el-input {
    width: 460px;
    margin-left: 10px;
  }
}
</style>