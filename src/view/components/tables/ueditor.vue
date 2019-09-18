<template>
<div>
     <script id="content" type="text/plain"></script>
</div>
</template>

<script>
import Tables from "_c/tables";
 import "../../../../static/UE/xiumi-ue-dialog-v5.js"
import "../../../../static/UE/xiumi-ue-v5.css"
import "../../../../static/UE/themes/default/css/ueditor.css";
import "../../../../static/UE/ueditor.config.js";
import "../../../../static/UE/ueditor.all.js";
// import "../../../../static/UE/lang/zh-cn/zh-cn.js";

export default {
    name: 'Ueditor',
        props:{
       id:{
         type:String
       },
       config:{
         type:Object,
       }
    },
  data () {
    return {
            content:null,
    }
  },
  methods: {
        getUEContent(){

      return this.ueditor.getContent();
    },
        getContentTxt(){
      return this.ueditor.getContentTxt();
    },
        setUEContent(){
      return this.ueditor.setContent(txt);
    },
  },

  mounted () {
      //初始化UE
const _this=this;
const config={};
//this.ueditor=window.UE.delEditor("editor");
this.ueditor=window.UE.getEditor("content",this.config);
  //  var ue = UE.getEditor('editor');

  }
}
</script>

<style>

</style>
