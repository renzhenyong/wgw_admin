<template>
  <div>
    <Card>
      <div class="sear_con">
        <Input placeholder="Enter something..." style="width: 250px"/>
        <Button type="primary" class="sear_btn">搜索</Button>
        <Button type="primary" class="add_btn" @click="addnews()">新建</Button>
      </div>
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
      <div style="margin:0 auto;text-align:center;margin-top:50px"></div>
    </Card>
  </div>
</template>
<script>
import Cropper from "@/components/cropper";
import { uploadImg } from "@/api/data";
import Tables from "_c/tables";
import { getTableData } from "@/api/data";
export default {
  name: "cropper_page",
  components: {
    Cropper
  },
  name: "goods_setup",
  data() {
    return {
      exampleImageSrc: "",
      page: {
        total: 30,
        current: 1,
        pageSize: 10
      },
      columns12: [
        {
          title: "标题",
          slot: "name"
        },
        {
          title: "简介",
          key: "des"
        },
        {
          title: "时间",
          key: "time"
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data6: [
        {
          name: "学校简介",
          des:
            "烟台开发区实验小学始建于1988年，原名“烟台经济技术开发区第二小学”，1997年更为现名",
          time: "2018-09-15"
        },
        {
          name: "走进实小",
          des: "师生小剧场，师生大舞台",
          time: "2018-09-15"
        }
      ]
    };
  },
  methods: {
    addnews() {
      this.$router.push({ name: "forms" });
    },
    show(index) {
      this.$router.push({ name: "forms", params: { id: "1"} });
      // this.$Modal.info({
      //   title: "User Info",
      //   content: `标题：${this.data6[index].name}<br>简介：${
      //     this.data6[index].des
      //   }<br>时间：${this.data6[index].time}`
      // });
    },
    edit() {},
    remove(index) {
      this.data6.splice(index, 1);
    }
  },
  mounted() {}
};
</script>
<style>
.sear_con {
  padding: 10px 0;
}
.sear_btn {
  margin-left: 2px;
}
.add_btn {
  float: right;
  margin-right: 30px;
}
</style>
