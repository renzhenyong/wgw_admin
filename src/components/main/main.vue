<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
      <side-menu class="menu" >
        <!-- :menu-list="menuList" -->
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con" style="margin-bottom:15px">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
              <div @click="intro()" v-if="type==1 || type==3 || access=='bgs_admin'"><i class="ivu-icon ivu-icon-ios-book"></i><span>学校简介</span></div>
      </side-menu >
         <side-menu class="menu">
            <div @click="xyxw()" ><i class="ivu-icon ivu-icon-ios-book"></i><span>校园新闻</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='dyc_admin'">
            <div @click="dyzc()"><i class="ivu-icon ivu-icon-ios-book"></i><span>德育之窗</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='bgs_admin'">
            <div @click="djzc()"><i class="ivu-icon ivu-icon-ios-book"></i><span>党建之窗</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='jwc_admin' || access=='jyc_admin'">
            <div @click="jsfz()"><i class="ivu-icon ivu-icon-ios-book"></i><span>教师发展</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='jwc_admin' || access=='dyc_admin'">
            <div @click="xsyd()"><i class="ivu-icon ivu-icon-ios-book"></i><span>学生园地</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='jyc_admin'">
            <div @click="jyky()"><i class="ivu-icon ivu-icon-ios-book"></i><span>教育科研</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='aqb_admin'">
            <div @click="paxy()"><i class="ivu-icon ivu-icon-ios-book"></i><span>平安校园</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='bgs_admin' || access=='dyc_admin'">
            <div @click="jxhd()"><i class="ivu-icon ivu-icon-ios-book"></i><span>家校互动</span></div>
      </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='bgs_admin'">
            <div @click="tzgg()"><i class="ivu-icon ivu-icon-md-notifications"></i><span>通知公告</span></div>
      </side-menu>
          </side-menu>
             <side-menu class="menu" v-if="type==1 || type==3 || access=='bgs_admin'">
            <div @click="sylb()"><i class="ivu-icon ivu-icon-ios-book"></i><span>首页轮播图</span></div>
      </side-menu>
          </side-menu>
             <side-menu class="menu" v-if="type!=3">
            <div @click="yhgl()"><i class="ivu-icon ivu-icon-md-grid"></i><span>用户管理</span></div>
      </side-menu>
    </Sider>
    <Layout>
   
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>

          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
            <div style="margin-right:60px;"><Button type="primary" class="add_btn" @click="modifypwd()">修改密码</Button></div>
        </header-bar>
      
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>

          <Modal
        v-model="modalpwd"
        title="修改密码"
        @on-ok="ok"
        @on-cancel="cancel">
           <Form :model="formItem" :label-width="60">
        <FormItem label="账号">
            <Input  v-model="formItem.user_name" disabled></Input>
        </FormItem>
            <FormItem label="真实姓名">
            <Input  v-model="formItem.phone" disabled></Input>
        </FormItem>
            <FormItem label="旧密码">
            <Input  v-model="formItem.oldpwd" placeholder="请输入旧密码"></Input>
        </FormItem>
           <FormItem label="新密码">
            <Input  v-model="formItem.newpwd" placeholder="请输入新密码"></Input>
        </FormItem>
        </Form>
    </Modal>
    </Layout>
  </Layout>
</template>
<script>
  import jquery from 'jquery'
  import $ from 'jquery'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.png'
import { modfypwd} from "@/api/user";
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      formItem:{
               id:0,
               user_name:"",
               phone:"",
               oldpwd:"",
               newpwd:"",
      },
      modalpwd:false,
      type:1,
      access:"admin",
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      console.log(this.$store.getters.menuList);
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount',
      'getUserInfo'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
     intro(){
          this.$router.push({name: "intro"})
    },
        xyxw(){
          this.$router.push({name: "news"})
    },
        dyzc(){
          this.$router.push({name: "deyu"})
    },
        djzc(){
          this.$router.push({name: "dangjian"})
    },
        jsfz(){
          this.$router.push({name: "jiaoshi"})
    },
        xsyd(){
          this.$router.push({name: "huodong"})
    },
        jyky(){
          this.$router.push({name: "jiaoyu"})
    },
        paxy(){
          this.$router.push({name: "pingan"})
    },
        jxhd(){
          this.$router.push({name: "jiaxiao"})
    },
        tzgg(){
          this.$router.push({name: "tongzi"})
    },
        sylb(){
          this.$router.push({name: "lunbo"})
    },
        yhgl(){
          this.$router.push({name: "zhanghao"})
    },
    modifypwd(){
      this.modalpwd=true;
    },
    ok(){
              modfypwd(this.formItem.id,this.formItem.oldpwd,this.formItem.newpwd).then((res)=>{
                        var code = res.data.code;
                        if (code == 200) {
                           this.$Message.success("密码修改成功");
                           this.modalpwd=false;
                        }else{
                             this.$Message.error(res.data.msg);
                              this.modalpwd=true;
                        }
  })
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
     this.getUserInfo().then(res => {
               this.type=res.type;
               this.access=res.access;
               this.formItem.id=res.id;
               this.formItem.user_name=res.userName;
               this.formItem.phone=res.phone;
     })
$(".menu").click(function() {
  $(this).css("color","#2d8cf0");
  $(this).siblings().css("color","")
    });
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    this.getUnreadMessageCount()
  }

}
</script>
<style scoped>
.menu{margin-left:20px;font-size:14px;color:hsla(0,0%,100%,.7);    padding: 14px 24px;cursor:pointer}
.menu:hover{color:#fff}
.menu i{margin-right: 12px!important;}
</style>
