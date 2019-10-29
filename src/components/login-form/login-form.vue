<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
  <FormItem prop="schools" >
     <Icon :size="16" type="ios-person" style=" padding: 4px 7px;
    font-weight: normal;
    line-height: 22px;
    text-align: center;
    background-color: #f8f8f9;
    border: 1px solid #dcdee2;
    border-radius: 4px;"></Icon>
     <Select v-model="form.id" style="width:230px;">
              <Option v-for="item in schools" :value="item.id" :key="item.id"> {{item.schoolname}}</Option>  
    </Select>
 </FormItem>
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
  import {getschools} from  "@/api/data"
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
       idRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '请选择学校', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        id:0,
        userName: '',
        password: ''
      },
      schools:[],
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        id:this.idRules
      }
    }
  },
  methods: {
    getSchools(){
       getschools().then((res)=>{
         if(res.status==200){
              this.schools=res.data.info;
         }
       })
    },
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            id:this.form.id
          })
        }
      })
    }
  },
mounted(){
this.getSchools();
  },
}
</script>
