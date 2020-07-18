<template>
  <div class="productadd">
    <Paner>
      <h3 slot="title">商品添加</h3>
      <div slot="content">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name" style="width:400px"></el-input>
          </el-form-item>
          <!-- 商品分类 -->
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
          <!-- 商品价格 -->
          <el-form-item label="商品价格" prop="price">
            <el-input-number
              v-model="form.price"
              @change="handleChange"
              :min="1"
              :max="1000"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片" prop="imgUrl">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
            >
              <img v-if="form.imgUrl" :src="imgUrlBase + form.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" prop="goodsDesc">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.goodsDesc"
              style="width:400px"
            ></el-input>
          </el-form-item>
          <!-- 添加商品 -->
          <el-form-item label>
            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Paner>
  </div>
</template>

<script>
import Paner from "@/components/Paner.vue";
import { getAllCategories, addProduct } from "@/api/product";
// import { REG_NAME } from "@/utils/REG";
export default {
  components: {
    Paner
  },
  data() {
    // 自定义验证规则
    // const checkName = (rule, val, callback) => {
    //   if (REG_NAME.test(this.form.name)) {
    //     // console.log("正则通过");
    //     callback();
    //   } else {
    //     callback(new Error("请输入3-12位"));
    //   }
    // };
    return {
      form: { name: "", category: "", price: "", goodsDesc: "", imgUrl: "" },
      // 商品分类
      categories: [],

      imgUrlBase: "http://127.0.0.1:5000/upload/imgs/goods_img/",
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
      }
    };
  },
  methods: {
    handleChange() {},
    // 上传成功返回的
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        //上传成功
        this.$message({ type: "success", message: res.msg });
        // 将图片覆盖当前显示框
        this.form.imgUrl = res.imgUrl;
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
    // 添加商品
    addGoods() {
      this.$refs.form.validate(async valid => {
        let { code } = await addProduct(this.form);
        console.log(code);
        if (code == 0) {
          this.$router.push("/product/product-list");
        } else {
          this.$message.error("请稍后再试");
        }
      });
    }
  },
  async created() {
    // 获取并分类渲染
    let { categories } = await getAllCategories();
    this.categories = categories;
  }
};
</script>

<style lang="less" scoped>
.productadd {
  .el-form {
    margin-top: 20px;
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
</style>