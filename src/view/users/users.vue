<template>
  <div>
    <Card>
      <div class="sear_con">
        <Input placeholder="Enter something..." style="width: 250px" v-model="searchcontent"/>
        <Button type="primary" class="sear_btn" @click="search()">搜索</Button>
        <Button type="primary" class="add_btn" @click="adduser()">新建</Button>
      </div>
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="userName">
          <strong>{{ row.userName }}</strong>
        </template>
        <template slot-scope="{ row}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">编辑</Button>
          <Button type="error" size="small"  style="margin-right: 5px" @click="remove(row.id)">删除</Button>    
         <Button type="error" size="small"  @click="resetpwd(row.id)">密码重置</Button> 
        </template>

      </Table>
      <div style="margin:0 auto;text-align:center;margin-top:50px">
        <Page
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
          :total="page.total"
          :current="page.current"
          :page-size="page.pageSize"
          show-sizer
          show-total
        ></Page>
      </div>
    </Card>
    <Modal v-model="modal_1" :title="用户管理" width="620">   
        <Form ref="formItem" :model="formItem" :label-width="80" style="margin-top:50px"> 
            <FormItem label="用户名" prop="userName">
                <Input v-model="formItem.userName" placeholder="真实姓名"/>
            </FormItem>
            <FormItem label="真实姓名" prop="phone">
                         <Input v-model="formItem.phone" placeholder="请输入真实姓名"/>
            </FormItem>    
                 <FormItem label="所属部门" prop="department" v-if="roletype==1">  
                <Select v-model="formItem.department" >
                    <Option v-for="item in departments" :key="item.id" :value="item.name">{{item.name}}</Option>
                </Select>
            </FormItem>
           <FormItem label="所属部门" prop="department" v-if="roletype==2">  
                <Select v-model="formItem.department"  disabled>
                    <Option v-for="item in departments" :key="item.id" :value="item.name">{{item.name}}</Option>
                </Select>
            </FormItem>
           
                <FormItem label="账号类型" prop="" v-if="roletype==1">  
                <Select v-model="formItem.type">
                    <Option v-for="item in types" :key="item.type" :value="item.type">{{item.name}}</Option>
                </Select>
            </FormItem>
                    <FormItem label="账号类型" prop="" v-if="roletype==2" >  
                <Select v-model="formItem.type" disabled>
                    <Option v-for="item in types" :key="item.type" :value="item.type">{{item.name}}</Option>
                </Select>
            </FormItem>
               <FormItem label="密码" prop="password">
                         <Input v-model="formItem.password" placeholder="请输入手机号"/>
            </FormItem>    
         <FormItem style="text-align:center;">
                <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
            </FormItem>

        </Form> 
        <div slot="footer"></div>   
    </Modal>
   <Modal v-model="modal_2" title="删除信息" @on-ok="delInfo">
        <p>确定删除这一条数据？</p>
    </Modal>
  </div>
</template>
<script>
import { Modal ,Input,Select,Form,FormItem,Upload,DatePicker } from 'iview';
import Cropper from "@/components/cropper";
import Tables from "_c/tables";
import { getTableData, findusers,deleteUser,department,saveUserInfo,selectUserById,resetpwd} from "@/api/user";
import { mapActions } from 'vuex'
export default {
  name: "cropper_page",
  components: {
    Cropper
  },
  name: "goods_setup",
  data() {
    return {
          modal_2:false,
           del_id:0,
      roletype:1,
      acess:"",
      parent_acess:"",
      types:[{type:1,name:"总管理员"},{type:2,name:"处级管理员"},{type:3,name:"普通账号"}],
      departments:[],
      modal_1:false,
      exampleImageSrc: "",
      searchcontent: "",
      page: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      formItem:{
          userName:"",
          phone:"",
          department:"",
          type:1,
          password:"123456"
      },
      columns12: [
        {
          title: "用户名",
          slot: "userName"
        },
        {
          title: "真实姓名",
          key: "phone"
        },
        {
          title: "所属部门",
          key: "department"
        },
          {
          title:"账号类型",
          key: "type"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        },
  
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
      findusers(
        this.searchcontent,
        this.page.current,
        this.page.pageSize
      ).then(res => {
        if (res.data.code == 200) {
          let arr=res.data.info;
          for(var i in res.data.info){
             if(arr[i].type==1){
               arr[i].type="总管理员";
             }else if(arr[i].type==2){
               arr[i].type="处级管理员";
             }else{
               arr[i].type="普通管理员";
             }
          }
            if(this.acess=="dyc_admin"||this.parent_acess=="dyc_admin"){
          this.data6 = arr.filter(item => item.access=="dyc_admin"||item.parent_acess=="dyc_admin");
          }else if(this.acess=="zwc_admin"||this.parent_acess=="zwc_admin"){
          this.data6 = arr.filter(item => item.access=="zwc_admin"||item.parent_acess=="zwc_admin");
          }else if(this.acess=="aqb_admin"||this.parent_acess=="aqb_admin"){
          this.data6 = arr.filter(item => item.access=="aqb_admin"||item.parent_acess=="aqb_admin");
          }else if(this.acess=="jwc_admin"||this.parent_acess=="jwc_admin"){
          this.data6 = arr.filter(item => item.access=="jwc_admin"||item.parent_acess=="jwc_admin");
          }else if(this.acess=="jyc_admin"||this.parent_acess=="jyc_admin"){
          this.data6 = arr.filter(item => item.access=="jyc_admin"||item.parent_acess=="jyc_admin");
          }else if(this.acess=="bgs_admin"||this.parent_acess=="bgs_admin"){
          this.data6 = arr.filter(item => item.access=="bgs_admin"||item.parent_acess=="bgs_admin");
          }else {
            this.data6=arr;
          }
          this.page.total = res.data.count;
        }
      });
    },
    handleSubmit(){
          saveUserInfo(this.formItem).then((res)=>{
                        var code = res.data.code;
                        if (code == 200) {
                           this.$Message.success("提交成功");
                           this.modal_1=false;
                           this.getParams();
                        }
  })
    },
adduser(){
  this.modal_1=true;
  this.formItem.userName="";
  this.formItem.phone="";
  this.formItem.password="123456";
  if(this.acess=="dyc_admin"){
       this.formItem.department="德育处"
       this.formItem.type=3;
  }else if(this.acess=="jyc_admin"){
      this.formItem.department="教研处"
        this.formItem.type=3;
   }else if(this.acess=="jwc_admin"){
this.formItem.department="教务处"
   }else if(this.acess=="aqb_admin"){
    this.formItem.department="安全办"
     this.formItem.type=3;
   }else if(this.acess=="zwc_admin"){
    this.formItem.department="总务处"
     this.formItem.type=3;
   }else if(this.acess=="bgs_admin"){
    this.formItem.department="办公室"
     this.formItem.type=3;
   }else{
    this.formItem.department=""
     this.formItem.type=1;
   }
},
    edit(index) {
      this.modal_1=true;
             selectUserById(index).then(res => {
                 if(res.data.code==200){
                   this.formItem=res.data.info;
                 }
          })
    },
 
     remove (index) {
            this.del_id = index;
            this.modal_2 = true;
    },

      delInfo(){
            deleteUser(this.del_id).then((res) => {
              if (res.data.code == 200) {
          this.$Message.success("删除成功");
          this.getParams();
        } else {  this.$Message.info(res.data.msg);}
            
            }).catch((error)=>{
              console.log(error);
           });
        },  

 resetpwd(index){
  resetpwd(index).then(res => {
        if (res.data.code == 200) {
          this.$Message.success("密码重置成功");
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
     this.roletype=res.type;
     this.acess=res.access;
     this.parent_acess=res.parent_acess;
    //  if(res.access=="jyc_admin"){
    //    this.formItem.departments="教研处";
    //     this.formItem.type=3;
    //  }
   })
    this.getParams();
    department().then(res => {
            if (res.data.code == 200) {
              this.departments=res.data.info;
            }
    })
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
