<template>
  <div class="productadd">
    <h3>商品添加</h3>
    <hr />
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <Upload />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
          style="width:400px"
        ></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: { name: "", regin: "" },
      textarea: "",
      num: 1
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.productadd {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  h3 {
    margin-bottom: 20px;
  }
  .el-form {
    margin-top: 20px;
  }
}
</style>