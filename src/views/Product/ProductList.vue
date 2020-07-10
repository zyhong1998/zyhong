<template>
  <div class="productlist">
    <Paner>
      <h3 slot="title">商品列表</h3>
      <el-button type="primary" slot="button" @click="open">添加分类</el-button>
      <div slot="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="id"></el-table-column>
          <el-table-column label="所属分类" prop="name"></el-table-column>
          <el-table-column label="商品价格" prop="desc"></el-table-column>
          <el-table-column label="商品图片">
            <!-- <img v-for="(v,i) in tableData" :key="i" :src="v.imgsrc" alt /> -->
            <!-- {{v.imgsrc}} -->
          </el-table-column>
          <el-table-column label="商品描述" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <el-row>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </el-row>
          </el-table-column>
        </el-table>
        <Pager></Pager>
      </div>
    </Paner>
  </div>
</template>

<script>
import Pager from "@/components/Pager.vue";
import Paner from "@/components/Paner.vue";
export default {
  components: {
    Pager,
    Paner
  },
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶 ",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          imgsrc: require("@/assets/imgs/1.jpg")
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶 ",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
        // {
        //   id: "12987125",
        //   name: "好滋好味鸡蛋仔",
        //   category: "江浙小吃、小吃零食",
        //   desc: "荷兰优质淡奶 ",
        //   address: "上海市普陀区真北路",
        //   shop: "王小虎夫妻店",
        //   shopId: "10333"
        // },
        // {
        //   id: "12987126",
        //   name: "好滋好味鸡蛋仔",
        //   category: "江浙小吃、小吃零食",
        //   desc: "荷兰优质淡奶 ",
        //   address: "上海市普陀区真北路",
        //   shop: "王小虎夫妻店",
        //   shopId: "10333"
        // }
      ]
    };
  },
  methods: {
    open() {
      this.$prompt("分类名称", "添加分类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      });
    }
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
</style>