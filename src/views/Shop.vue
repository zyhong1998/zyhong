<template>
  <div class="shop">
    <!-- 上方 -->
    <Paner>
      <h3 slot="title">店铺管理</h3>
      <el-button
        :disabled="isDisabled"
        v-if="!isEdit"
        type="primary"
        @click="reset"
        slot="button2"
        size="small"
      >重置</el-button>
      <el-button
        :type="isEdit ? 'primary':'success'"
        slot="button1"
        size="small"
        @click="savaBtn"
      >{{isEdit?'编辑':'保存'}}</el-button>

      <div slot="content">
        <!-- 下方 -->
        <el-form ref="form" label-width="80px" size="small" :disabled="isEdit">
          <!-- 店铺名称 -->
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <!-- 店铺公告 -->
          <el-form-item label="店铺公告">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.bulletin"
              :autosize="{ minRows: 6, maxRows:10}"
            ></el-input>
          </el-form-item>

          <!-- 店铺头像 -->
          <el-form-item label="店铺头像">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if=" form.avatar" :src="imgBaseUrl+ form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 店铺图片 -->
          <el-form-item label="店铺图片">
            <el-upload
              :file-list="form.pics"
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-success="handleImgSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <!-- 预览模态框 -->
              <img width="100%" :src=" dialogImg" alt />
            </el-dialog>
          </el-form-item>

          <!-- 配送费 -->
          <el-form-item label="配送费">
            <el-input v-model="form.deliveryPrice"></el-input>
          </el-form-item>

          <!-- 送达时间 -->
          <el-form-item label="配送时间">
            <el-input v-model="form.deliveryTime"></el-input>
          </el-form-item>

          <!-- 描述 -->
          <el-form-item label="描述">
            <el-input v-model="form.description"></el-input>
          </el-form-item>

          <!-- 店铺评分 -->
          <el-form-item label="店铺评分">
            <el-input v-model="form.score" disabled></el-input>
          </el-form-item>

          <!-- 销量 -->
          <el-form-item label="销量">
            <el-input v-model="form.sellCount" disabled></el-input>
          </el-form-item>

          <!-- 活动 -->
          <el-form-item label="活动">
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="在线支付满28元-5元"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 营业时间 -->
          <el-form-item label="营业时间">
            <el-time-picker
              is-range
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.date"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </el-form-item>

          <!-- 起送价格 -->
          <el-form-item label="起送价格">
            <el-input v-model="form.minPrice"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </Paner>
  </div>
</template>

<script>
// import Serch from "@/components/Serch.vue";
// import Upload from "@/components/Upload.vue";
import Paner from "@/components/Paner.vue";
import { getShopInfo, updateShop } from "@/api/shop";
import local from "@/utils/local";
export default {
  components: {
    // Serch,
    // Upload,
    Paner
  },
  data() {
    return {
      form: {
        id: 1,
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: [],
        pics: [],
        date: "",
        minPrice: ""
      },
      imgBaseUrl: "http://127.0.0.1:5000/upload/shop/",
      dialogVisible: false,
      dialogImg: "",
      isEdit: true,
      isDisabled: true
    };
  },
  methods: {
    // 获取店铺参数
    async getShop() {
      let { data } = await getShopInfo();
      data.pics = data.pics.map(v => ({
        url: this.imgBaseUrl + v
      }));
      this.form = data;
      local.set("shopData", data);
    },
    //店铺头像上传成功
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code == 0) {
        // 上传成功
        this.$message({ type: "success", message: "上传成功" });
        this.form.avatar = imgUrl;
      }
    },
    //店铺头像上传限制
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
    // 店铺图片上传成功
    handleImgSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code == 0) {
        // 上传成功
        this.$message({ type: "success", message: "上传成功" });
        this.form.pics.push({ url: this.imgBaseUrl + imgUrl });
      }
    },
    //店铺图片预览
    handlePictureCardPreview(file) {
      // 显示模态框
      this.dialogVisible = true;
      // 赋值给模态框的图片
      this.dialogImg = file.url;
    },
    // 删除店铺图片
    handleRemove(file) {
      this.form.pics.forEach((v, i) => {
        // console.log(v.uid, file.uid);
        if (v.uid == file.uid) {
          // 删一张
          this.form.pics.splice(i, 1);
        }
      });
    },
    // 保存编辑后的信息
    async savaBtn() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        // console.log("发送ajax");
        // 深拷贝this.form
        let form = JSON.parse(JSON.stringify(this.form));
        // 处理活动的数组参数
        form.supports = JSON.stringify(form.supports);
        // 处理商品图片的数组
        form.pics = JSON.stringify(
          form.pics.map(v => v.url.substr(this.imgBaseUrl.length))
        );
        // 处理日期
        form.date = JSON.stringify(form.date);

        // 发送ajax
        await updateShop(form);
        // 切换重置按钮的状态
        this.isDisabled = true;
        // 刷新页面
        this.getShop();
      }
    },
    // 重置
    reset() {
      this.form = local.get("shopData");
    }
  },
  created() {
    this.getShop();
  },
  watch: {
    form: {
      //监听表单的变化
      handler(newVal, oldVal) {
        // 判断是否为可编辑状态
        if (!this.isEdit) {
          this.isDisabled = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.el-form-item {
  width: 50%;
}
/deep/.el-image {
  margin-right: 10px;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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