<template>
  <div>
    <Card>
      <!-- form表单 -->
      <Form ref="formItem" :model="formItem" :label-width="80">
        <FormItem label="标题" prop="name">
          <Input v-model="formItem.name" placeholder="请输入标题"/>
        </FormItem>
        <FormItem label="简介" prop="des" v-if="formItem.type!=10">
          <Input v-model="formItem.des"  placeholder="请输入简介"/>
        </FormItem>
        <!-- <FormItem label="是否置顶" prop="des">
          <Input v-model="formItem.title" placeholder="请输入简介"/>
        </FormItem> -->
        <!-- <FormItem label="图片">
          <Button icon="ios-cloud-upload-outline" @click="handleUploadFile()">上传图片</Button>
      </FormItem> -->
             <FormItem label="图片">
                <Upload   ref="upload"
                    :show-upload-list="false"
                    :on-success="uploadSuccess"
                     :max-size="2000"
                    :format="['bmp','gif','jpeg','jpg','pic','png','tif','3gp','aac','ac3','aif']"
                    name='file'
                     action="https://wgw.chxgk.com:9443/upload">                
          <Button icon="ios-cloud-upload-outline" >上传图片</Button>
                </Upload>
                <div><img :src="formItem.url" style="width:150px;height:100px;border:none"></div>                
        </FormItem>
                  <FormItem label="内容"  v-if="formItem.content!=''">
           <UE :defaultMsg="formItem.content" :config=config :id=ue1 ref="ue" ></UE>
        </FormItem>

      </Form>
      <div slot="footer"></div>
    </Card>
  </div>
</template>
<script>
 import UE from '@/components/ue/ue.vue'
import "../../../public/xiumi-ue-v5.css"
import "../../../public/xiumi-ue-dialog-v5.js"
import Cropper from "@/components/cropper"
import { uploadImg,saveNewsinfo,selectNewById } from "@/api/data"
export default {
  name: "cropper_page",
  components: {
    UE,
    Cropper
  },
  data() {
    return {
      defaultMsg:"",
      newid:0,
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1", // 不同编辑器必须不同的id
      modal_2: false,
      exampleImageSrc: "",
      formItem: {
        id: 0,
        name: "",
        des:"",
        url: "",
        content: "",
        type:0,
        verifystatu:0,
      }
    };
  },
      methods: {
       getUEContent() {
        let content = this.$refs.ue.getUEContent(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      getUEContentTxt() {
        let content = this.$refs.ue.getUEContentTxt(); // 调用子组件方法
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
    handleUploadFile() {
      this.modal_2 = true;
    },
    handleCroped(blob) {
      const formData = new FormData();
      formData.append("file", blob);
      console.log(formData);
      uploadImg(formData).then(() => {
        this.$Message.success("Upload success~");
      });
    },
    handleUploadVideo(){

    },
    handleSubmit(){
      this.formItem.content = this.$refs.ue.getContent();
      saveNewsinfo(this.formItem).then((res)=>{
                // console.log(res.status==200);
            if(res.status==200){
              this.$Message.success('提交成功');
              this.$router.go(-1)
            // this.$router.push({ name: "join", params: { type: this.formItem.type } });
            }
      })
    },
     uploadSuccess (res, file) {
          window.console.log(res);
                if(res.errcode==0){
              this.formItem.url=res.data.url;
               this.$Message.success('上传成功');
              }
            },
            selectById(str){
                         selectNewById(str).then(res => {
               if(res.data.code==200){
                   this.formItem=res.data.info;                          
                }
          })
           }
  },
    watch:{
  $route(to,from){
     this.selectById(to.params.id);
    },    
},

mounted(){
     let str=window.location.href;
    var index = str .lastIndexOf("\/"); 
    str  = str .substring(index + 1, str.length);
          let typeid=this.$route.params.type;
       this.formItem.type=typeid; 
   this.selectById(str);
}
  }
</script>
<style>
.cropper-example {
  height: 400px;
}
</style>


