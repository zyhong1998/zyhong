<template>
  <div class="productlist">
    <Paner>
      <h3 slot="title">商品列表</h3>
      <div slot="content">
        <!-- 分类查询 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formInline.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="formInline.category" placeholder="请选择商品分类">
              <el-option
                v-for="v in categories"
                :key="v.cateName"
                label
                :value="v.cateName"
              >{{v.cateName}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
            <el-button size="small" type="success" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 商品列表 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <!-- 这里是展开的内容 -->
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ '￥'+ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <span>
                    <img width="50" height="50" :src="imgBaseUrl + props.row.imgUrl" alt />
                  </span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>

          <el-table-column label="所属分类" prop="category"></el-table-column>

          <el-table-column label="商品价格">
            <template slot-scope="props">{{'￥'+ props.row.price}}</template>
          </el-table-column>

          <el-table-column label="商品图片">
            <template slot-scope="props">
              <img width="50" height="50" :src="imgBaseUrl + props.row.imgUrl" alt />
            </template>
          </el-table-column>

          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" size="small" @click="UpdateProduct(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="deleteProduct(scope.row)">删除</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!-- 模态框 -->
        <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" autocomplete="off" style="width:340px"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="category">
              <el-select v-model="form.category" placeholder="请选择商品分类">
                <el-option
                  v-for="v in categories"
                  :key="v.cateName"
                  label
                  :value="v.cateName"
                >{{v.cateName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="form.price" autocomplete="off" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" required>
              <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
              >
                <img v-if="form.imgUrl" :src="imgBaseUrl + form.imgUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品描述" prop="goodsDesc">
              <el-input
                v-model="form.goodsDesc"
                :autosize="{ minRows: 4, maxRows: 8 }"
                autocomplete="off"
                style="width:200px"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGoods">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </Paner>
  </div>
</template>
<script>
import Paner from "@/components/Paner.vue";
import moment from "moment";
// 引入发送请求获取商品列表信息函数
import {
  getGoodsList,
  getAllCategories,
  editGoods,
  deleteGoods
} from "@/api/product";
export default {
  components: {
    Paner
  },
  data() {
    return {
      total: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      tableData: [],
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      dialogFormVisible: false, //模态框,
      form: { imgUrl: "" },
      categories: [],
      rules: {
        name: {
          required: true,
          message: "请输入商品名",
          trigger: "blur"
        },
        category: {
          required: true,
          message: "请选择类别",
          trigger: "change"
        },
        price: {
          required: true,
          message: "请输入商品价格",
          trigger: "blur"
        },
        goodsDesc: {
          required: true,
          message: "请输入商品描述",
          trigger: "blur"
        }
      },
      formInline: { name: "", category: "" }
    };
  },
  methods: {
    // 获取商品列表函数
    async fetchProductList() {
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.formInline.name,
        category: this.formInline.category
      });
      // 处理ctime时间格式
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 边界判断 当前页码是否还有数据，没有时就将当前页码减一，且当前页码不为1
      if (!data.length && this.currentPage !== 1) {
        // console.log(data.length, this.currentPage);
        // 当前页码减一
        this.currentPage -= 1;
        // 再次调用
        this.fetchProductList();
      }
      this.total = total;
      this.tableData = data;
    },
    // 每页条数改变，调用一次刷新账号列表
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchProductList();
    },
    // 当前页码改变,调用一次刷新账号列表
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchProductList();
    }, // 上传成功返回的
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        //上传成功
        this.$message({ type: "success", message: res.msg });
        // 将图片铺盖当前显示框
        this.form.imgUrl = res.imgUrl;
      } else {
        this.message.error("请稍后再试");
      }
    },
    // 检测上传格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击编辑
    UpdateProduct(row) {
      this.dialogFormVisible = true;
      // 获取并分类渲染
      // let { categories } = await getAllCategories();
      // this.categories = categories;
      // 数据回填
      this.form = { ...row };
    },
    // 保存编辑后的商品信息
    async addGoods() {
      // 发送修改商品的ajax
      let { code } = await editGoods({
        name: this.form.name,
        category: this.form.category,
        price: this.form.price,
        imgUrl: this.form.imgUrl,
        goodsDesc: this.form.goodsDesc,
        id: this.form.id
      });
      if (code == 0) {
        this.dialogFormVisible = false;
        this.fetchProductList();
      }
    },
    // 删除
    deleteProduct(row) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送ajax
          let { code } = await deleteGoods({
            id: row.id
          });
          if (code == 0) {
            this.fetchProductList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // // 按分类查询
    onSubmit() {
      this.currentPage = 1;
      this.fetchProductList();
    },
    //重置
    reset() {
      this.formInline.name = "";
      this.formInline.category = "";
      this.fetchProductList();
    }
  },
  async created() {
    this.fetchProductList(); //进入页面调用一次，获取商品信息
    // 获取并分类渲染
    let { categories } = await getAllCategories();
    this.categories = categories;
  }
};
</script>

<style lang="less" scoped>
.productlist {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table {
    margin-bottom: 20px;
  }
}
// 上传图片
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 0 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
/deep/.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>