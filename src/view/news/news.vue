<template>
  <div>
    <Card>
      <div class="sear_con">
        <Input placeholder="请输入标题进行检索..." style="width: 250px" v-model="searchcontent"/>
        <Button type="primary" class="sear_btn" @click="search()">搜索</Button>
        <Button type="primary" class="add_btn" @click="addnews()">新建</Button>
      </div>
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="view(row.id)">详情</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)" v-if="mu_type==1 || mu_type==2||row.userid==uid">编辑</Button>
           <Button type="primary" size="small" style="margin-right: 5px" @click="verify(row.id)" v-show="shenhe">审核</Button>
          <Button type="error" size="small"  @click="remove(row.id)" v-if="mu_type==1 || mu_type==2||row.userid==uid">删除</Button>    
        </template>
        <template slot-scope="{row}"  slot="verifystatu">
          <Button type="warning" size="small" style="margin-right: 5px" v-if="row.verifystatu==0">待审核</Button>
          <Button type="success" size="small" style="margin-right: 5px" v-if="row.verifystatu==1">审核通过</Button>
          <Button type="error" size="small" style="margin-right: 5px" v-if="row.verifystatu==2">审核未通过</Button>
        </template>
      </Table>
      <div style="margin:0 auto;text-align:center;margin-top:50px">
        <Page
          @on-change="pageChange" @on-page-size-change="pageSizeChange"
          :total="page.total"
          :current="page.current"
          :page-size="page.pageSize"
          show-sizer
          show-total
        ></Page>
      </div>
    </Card>
    <Modal v-model="modal1" title="如果审核不通过，请说明原因" @on-ok="verifyok()" okText="提交" >
      <RadioGroup v-model="verfyradio">
        <Radio label="1">通过</Radio>
        <Radio label="2">不通过</Radio>
      </RadioGroup>
      <Input type="textarea" style="margin-top:10px" v-model="verfyreason"/>
    </Modal>

   <Modal v-model="modal_2" title="删除信息" @on-ok="delInfo">
        <p>确定删除这一条数据？</p>
    </Modal>
  

  </div>
</template>
<script>
import Cropper from "@/components/cropper";
import { uploadImg, add, del, update, selectByNameLike } from "@/api/data";
import Tables from "_c/tables";
import { getTableData, findall, deleteNew,verifyNew,selectNewById} from "@/api/data";
import { mapActions } from 'vuex'
export default {
  name: "cropper_page",
  components: {
    Cropper
  },
  name: "goods_setup",
  data() {
    return {
      mu_type:0,
      uid:0,
          modal_2:false,
        del_id:0,
      shenhe:false,
      verfyradio: "1",
      verfyreason:"",
      verifyid:0,
      modal1: false,
      modalVerify: true,
      menu_type: 0,
      exampleImageSrc: "",
      searchcontent: "",
      page: {
        total: 0,
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
          key: "addtime"
        },
        {
          title: "操作",
          slot: "action",
          width: 220,
          align: "center"
        },
        {
          title: "审核状态",
          slot: "verifystatu",
          width: 100,
          align: "center"
        }
      ],
      data6: []
    };
  },
  methods: {
        ...mapActions([
      'getUserInfo'
    ]),
    getParams() {
      let url = window.location.href;
      let index = url.lastIndexOf("/");
      let str = url.substring(index + 1, url.length);
      this.menu_type = str;
      findall(
        str,
        this.searchcontent,
        this.page.current,
        this.page.pageSize
      ).then(res => {
        if (res.data.code == 200) {
          this.data6 = res.data.info;
          this.page.total = res.data.count;
        }
      });
    },
    search() {
      findall(
        this.menu_type,
        this.searchcontent,
        this.page.current,
        this.page.pageSize
      ).then(res => {
        if (res.data.code == 200) {
          this.data6 = res.data.info;
          this.page.total = res.data.count;
        }
      });
    },
    addnews() {
      this.$router.push({ name: "forms1", params: { type: this.menu_type } });
    },
        view(newid) {
       this.$router.push({path:'/argu/forms2/'+this.menu_type+"/"+newid});
    },
    edit(newid) {
       this.$router.push({path:'/argu/forms/'+this.menu_type+"/"+newid});
  // this.$router.push({name:'forms',params:{newid:newid}})
      //  selectNewById(index).then(res => {
      //            if(res.data.code==200){
      //                 let data=res.data.info;
      //                this.$router.push({ name: "forms",   query: data});
      //            }
      //     })
    },
       remove (index) {
            this.del_id = index;
            this.modal_2 = true;
        },
            delInfo(){
            deleteNew(this.del_id).then((res) => {
              if (res.data.code == 200) {
          this.$Message.success("删除成功");
          this.getParams();
        } else {  this.$Message.info(res.data.msg);}
            
            }).catch((error)=>{
              console.log(error);
           });
        },  
    // 审核
    verify(verifyid){
        this.modal1=true;
        this.verifyid=verifyid;
    },
    verifyok(){
      verifyNew(this.verifyid,this.verfyradio,this.verfyreason).then(res => {
        if (res.data.code == 200) {
          this.$Message.success("审核成功");
          this.getParams();
        }
      });
    },
            pageChange(page){
            this.page.current = page;
            this.getParams();
        },
            pageSizeChange(pageSize){
            this.page.pageSize = pageSize;
            this.page.current = 1;
           this.getParams();
        },
  },
  mounted() {
      this.getUserInfo().then(res => {
        this.uid=res.id;
        this.mu_type=res.type;
      if(res.type==1 || res.type==2){
                this.shenhe=true;
      }else{
               this.shenhe=false;
      }
        })
    this.getParams();
  },
  //监听url地址发生变化
  watch: {
    $route: "getParams"
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
