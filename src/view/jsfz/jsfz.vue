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
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
          <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
      </Table>
      <div style="margin:0 auto;text-align:center;margin-top:50px">
        <Page
          :total="page.total"
          :current="page.current"
          :page-size="page.pageSize"
          show-sizer
          show-total
        ></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import Cropper from '@/components/cropper'
import { uploadImg } from '@/api/data'

import Tables from "_c/tables"
import { getTableData } from "@/api/data"

export default {
    name: 'cropper_page',

  components: {


      Cropper
  },
name:"goods_setup",

  data() {
    return {

              exampleImageSrc: '',

     
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
          title: "描述",
          key: "age"
        },
        {
          title: "简介",
          key: "address"
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
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ]
    };
  },
  methods: {
      tz(){
            const route = {
        name: 'params',
     params: {
          id:111,
        },
      }
      this.$router.push(route);
      
     },

 
    addnews() {
      this.$router.push({name:'params'});
      // this.formItem = {
      //   id: "",
      //   title: "",
      //   img: "",
      //   imgName: "",
      //   summary: "",
      //   content: "",
      //   htmlContent: "",
      //   isTop: "1",
      //   url: "",
      //   publishDate: ""
      // };
      // this.text = "新建新闻";

      // this.modal_1 = true;
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  },

  mounted() {
  
  }
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
