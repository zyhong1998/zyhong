<template>
  <div class="productlist">
    <Paner>
      <h3 slot="title">商品分类</h3>
      <el-button type="primary" slot="button" @click="isModel">添加分类</el-button>
      <div slot="content">
        <el-table :data="tableData" style="width: 100%">
          <!-- 序号 -->
          <el-table-column type="index" label="序号" width="160"></el-table-column>
          <!-- 分类 -->
          <el-table-column label="分类名称" width="160">
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">{{scope.row.cateName}}</span>
              <el-input v-else v-model="scope.row.cateName" size="mini"></el-input>
            </template>
          </el-table-column>
          <!-- 开关启用 -->
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-switch
                :disabled="scope.row.isEdit ? false : true"
                v-model="scope.row.state"
                active-color="#13ce66"
              ></el-switch>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handelClass(scope.row)"
                :disabled="scope.row.isDisabled ? true :false "
              >{{scope.row.isEdit ? '完成':'编辑'}}</el-button>
              <el-button
                size="small"
                type="danger"
                @click="removeClass(scope.row)"
                :disabled="scope.row.isDisabled ? true :false "
              >{{scope.row.isEdit ? '取消':'删除'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 模态框添加分类 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="添加分类">
              <el-input v-model="updateFrom.class" autocomplete="off" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="是否开启">
              <template>
                <el-switch v-model="updateFrom.state" active-color="#13ce66" @change="isSwitch"></el-switch>
              </template>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGoods">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="pageSize"
          layout="total,  prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </Paner>
  </div>
</template>

<script>
import Paner from "@/components/Paner.vue";

import {
  getProductClass,
  editProductClass,
  removeProductClass,
  addProductClass
} from "@/api/product";

import { REG_ACC } from "@/utils/REG";
import LoginVue from "../Login.vue";
export default {
  components: {
    Paner
  },
  data() {
    return {
      value: true,
      tableData: [],
      total: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      form: { name: "" },
      dialogFormVisible: false, //模态框,
      updateFrom: { class: "", state: true }
    };
  },
  methods: {
    // 封装获取账户列表的函数
    async fetchData() {
      // 发送ajax获取数据
      let { total, data } = await getProductClass({
        currentPage: this.currentPage, //当前页
        pageSize: this.pageSize //每页条数
      });
      // 增加一个属性

      data.forEach(v => {
        v.state = v.state == 1 ? true : false; //转换成布尔值，对开关的数据进行转换处理
        v.isEdit = false; //最开始默认都不可编辑
        v.isDisabled = false;
      });
      // 边界判断 当前页码是否还有数据，没有时就将当前页码减一，且当前页码不为1
      if (!data.length && this.currentPage !== 1) {
        // console.log(data.length, this.currentPage);
        // 当前页码减一
        this.currentPage -= 1;
        // 再次调用
        this.fetchData();
      }
      // 赋值渲染
      this.tableData = data;
      // 数据总条数
      this.total = total;
    },
    // 当前页码改变,调用一次刷新账号列表
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    // 点击编辑按钮
    async handelClass(row) {
      // 提前将未改动的值保存起来
      this.twoCateName = row.cateName;
      // 默认不可编辑进行取反，当取反后再取反进行发送ajax进行修改分类
      row.isEdit = !row.isEdit;
      // 点击编辑按钮时，将除开当前按钮意外的按钮都 禁用按钮
      this.tableData.filter(v => {
        if (v.isEdit == false) {
          v.isDisabled = true;
        }
      });

      if (!row.isEdit) {
        // 发送编辑的ajax，先获取输入值进行正则验证
        if (REG_ACC.test(row.cateName)) {
          // 发送ajax修改分类
          let { code } = await editProductClass({
            id: row.id,
            cateName: row.cateName,
            state: row.state
          });
          if (code == 0) {
            this.$message.success("编辑成功");
            this.tableData.isDisabled = true;
            // 取消按钮禁用
            this.tableData.forEach(v => {
              v.isDisabled = false;
            });
          }
        } else {
          this.$message.error("请输入3-12位");
          row.isEdit = !row.isEdit;
          // 取消按钮禁用
          this.tableData.forEach(v => {
            v.isDisabled = false;
          });
          return false;
        }
      }
    },
    //点击取消按钮
    removeClass(row) {
      if (row.isEdit) {
        //取消当前的编辑
        row.cateName = this.twoCateName;
        row.isEdit = !row.isEdit;
        this.$message("已取消编辑");
        // 取消按钮禁用
        this.tableData.forEach(v => {
          v.isDisabled = false;
        });
        return false;
      } else {
        //删除这个分类
        this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 发送删除的ajax
            let { code } = await removeProductClass({
              id: row.id
            });
            if (code == 0) {
              this.fetchData(); //删除成功调用一次，刷新页面
              // 取消按钮禁用
              this.tableData.forEach(v => {
                v.isDisabled = false;
              });
            } else {
              this.$message.error("删除失败,请稍后再试");
              // 取消按钮禁用
              this.tableData.forEach(v => {
                v.isDisabled = false;
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            // 取消按钮禁用
            this.tableData.forEach(v => {
              v.isDisabled = false;
            });
          });
      }
    },
    // 判断开关
    isSwitch() {
      this.updateFrom.state = this.updateFrom.state;
    },
    // 弹出模态框
    isModel() {
      this.dialogFormVisible = true;
    },
    // 添加分类
    async addGoods() {
      // 发送添加分类ajax
      if (REG_ACC.test(this.updateFrom.class)) {
        //正则验证成功 发送添加分类ajax
        let { code, msg } = await addProductClass({
          cateName: this.updateFrom.class,
          state: this.updateFrom.state
        });
        if (code == 0) {
          //添加成功,再次获取商品分类
          this.fetchData();
          // 关闭模态框
          this.dialogFormVisible = false;
        } else {
          //添加失败
          this.$message.error(msg);
        }
      } else {
        this.$message.error("请输入3-12位");
        return;
      }
    }
  },
  created() {
    this.fetchData();
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