<template>
  <div class="shop">
    <!-- 上方 -->

    <Paner>
      <h3 slot="title">店铺管理</h3>
      <el-button type="primary" slot="button">保存</el-button>
      <div slot="content">
        <!-- 下方 -->
        <el-form ref="form" label-width="80px" size="small">
          <el-form-item label="店铺名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告">
            <el-input type="textarea" placeholder="请输入内容" v-model="textarea2"></el-input>
          </el-form-item>
          <!-- 店铺头像 -->
          <div>
            <el-form-item label="店铺头像">
              <div class="demo-image">
                <div class="block" v-for="fit in fits" :key="fit">
                  <span class="demonstration"></span>
                  <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
                </div>
              </div>
            </el-form-item>
          </div>
          <!-- 店铺图片 -->
          <div>
            <el-form-item label="店铺图片">
              <div class="demo-image">
                <div class="block" v-for="fit in fits" :key="fit">
                  <span class="demonstration"></span>
                  <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
                  <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
                </div>
                <Upload />
              </div>
            </el-form-item>
          </div>
          <el-form-item label="配送费">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="配送时间">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="配送描述">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动">
            <el-checkbox>在线支付满28元-5元</el-checkbox>
            <el-checkbox>VC无限橙果汁全场8折</el-checkbox>
            <el-checkbox>单人精彩套餐</el-checkbox>
            <el-checkbox>特价饮品8折抢购</el-checkbox>
            <el-checkbox>单人特色套餐</el-checkbox>
          </el-form-item>
          <el-form-item label="营业时间">
            <div class="serch">
              <Serch />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </Paner>
  </div>
</template>

<script>
import Serch from "@/components/Serch.vue";
import Upload from "@/components/Upload.vue";
import Paner from "@/components/Paner.vue";
export default {
  components: {
    Serch,
    Upload,
    Paner
  },
  data() {
    return {
      form: {
        name: ""
      },
      textarea2: "",
      model: "",
      fits: ["cover"],
      url: require("@/assets/imgs/1.jpg")
    };
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
/deep/.el-textarea__inner {
  height: 140px;
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