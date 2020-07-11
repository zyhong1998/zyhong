<template>
  <div class="userlist">
    <Paner>
      <h3 slot="title">账号列表</h3>
      <div slot="content">
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="100"></el-table-column>
            <el-table-column prop="account" label="账号" width="160"></el-table-column>
            <el-table-column prop="userGroup" label="用户组" width="160"></el-table-column>
            <el-table-column prop="ctime" label="创建时间" width="160"></el-table-column>
            <el-table-column label="操作" width="220">
              <template slot-scope="scope">
                <el-button size="small" @click="handelEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="handelUser(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <Pager></Pager> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <!-- 批量删除 -->
          <el-row class="footerBtn">
            <el-button type="danger" @click="betchDel">批量删除</el-button>
            <el-button type="primary" @click="toggleSelection">取消选择</el-button>
          </el-row>
          <!-- 编辑模态框 -->
          <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="editForm" label-width="100px" style="width:275px">
              <el-form-item label="账号">
                <el-input v-model="editForm.account"></el-input>
              </el-form-item>
              <el-form-item label="用户组">
                <el-select v-model="editForm.userGroup">
                  <el-option value="超级管理员">超级管理员</el-option>
                  <el-option value="普通管理员">普通管理员</el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="savaEdit">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </Paner>
  </div>
</template>

<script>
// import Pager from "@/components/Pager.vue";
import Paner from "@/components/Paner.vue";

// 引入封装的发送获取账户列表账户
import {
  getUserList,
  delUser,
  betchDelUser,
  savaEditUser
} from "@/api/account.js";

// 引入moment处理时间
import moment from "moment";

// 引入正则验证
import { REG_ACC } from "@/utils/REG";
export default {
  components: {
    // Pager,
    Paner
  },
  data() {
    return {
      tableData: [],
      total: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      // 模态框
      dialogFormVisible: false,

      editForm: {
        account: "",
        userGroup: ""
      }
    };
  },
  methods: {
    // 封装获取账户列表的函数
    async fetchData() {
      // 发送ajax获取数据
      let { total, data } = await getUserList({
        currentPage: this.currentPage, //当前页
        pageSize: this.pageSize //每页条数
      });
      // 处理时间 遍历拿出所有列表的时间，进行格式处理
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    // 每页条数改变，调用一次刷新账号列表
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    // 删除账户
    handelUser(id) {
      // 发送删除请求
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delUser({ id });
          if (code === 0) {
            this.fetchData(); //重新获取账户列表
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //当选项发生改变时
    handleSelectionChange(rows) {
      // this.ids = 0;
      this.ids = rows.map(v => v.id); //拿取被选中的项的id
    },
    //批量删除
    betchDel() {
      // return;
      if (!this.ids) {
        this.$message.error("请选中再删除");
        return;
      } else if (!this.ids.length) {
        this.$message.error("请选中再删除");
        return;
      }
      this.$confirm("此操作将永久删除选中的所有用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }) //确定
        .then(async () => {
          let { code } = await betchDelUser({
            ids: JSON.stringify(this.ids) //传参数时，后台要求是字符串
          });
          if (code === 0) {
            this.fetchData(); //重新获取账户列表
          }
        }) //取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 编辑回填
    handelEdit(row) {
      this.dialogFormVisible = true;
      this.editForm = { ...row };
    },
    // 保存编辑后的信息
    async savaEdit() {
      // 正则验证
      if (REG_ACC.test(this.editForm.account)) {
        let { code } = await savaEditUser({
          //向后台传参
          id: this.editForm.id,
          account: this.editForm.account,
          userGroup: this.editForm.userGroup
        });
        if (code === 0) {
          this.fetchData(); //再次调取账户列表页面
          this.dialogFormVisible = false; //关闭模态框
        }
      } else {
        this.$message.error("请输入3到12位（字母、数字、下划线）");
      }
    }
  },
  // 创建后调用一次获取列表
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.userlist {
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