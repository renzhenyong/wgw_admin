<template>
    <!-- <div ref="dom"></div> -->
         <ul class="newul">
                  <li v-for="(item,index) in newsList" v-if="item.verifystatu==0&&item.userid!=36">
                    <span style="width:700px;display:inline-block;cursor:pointer" @click="detail(item.type)">{{item.name}}</span>
                    <span style="margin-left:50px;width:100px">{{item.addtime}}</span>
                 <Button type="warning" size="small" style="margin-left:150px;width:50px">待审核</Button>
                  </li>
                </ul>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import { findall} from "@/api/data";
import { mapActions } from 'vuex'
export default {
  name: 'serviceRequests',
  data () {
    return {
      access:"",
      menu_type:[],
      dom: null,
        newsList:[],
    }
  },
  methods: {
            ...mapActions([
      'getUserInfo'
    ]),
    detail(type){
  this.$router.push({path:'/news/'+type});
    },
    resize () {
      this.dom.resize()
    },
          getNewList(){
               findall( 0, '',1,10).then((res) => {
                  if(res.data.code==200){
                    let arr=res.data.info;
                    if(this.access=="dyc_admin"){
                  this.newsList = arr.filter(item => item.type==3||item.type==4);
                  }else{
                    this.newsList=arr;
                  }
                  }
        })
}
  },
  mounted () {
    this.getNewList();
         this.getUserInfo().then(res => {
           this.access=res.access;
                    if(res.access=="dyc_admin"){
                             this.menu_type=[3,4];
                    }
         })
    const option = {
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //     label: {
      //       backgroundColor: '#6a7985'
      //     }
      //   }
      // },
      // grid: {
      //   top: '3%',
      //   left: '1.2%',
      //   right: '1%',
      //   bottom: '3%',
      //   containLabel: true
      // },
      // xAxis: [
      //   {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      //   }
      // ],
      // yAxis: [
      //   {
      //     type: 'value'
      //   }
      // ],
      // series: [
      //   {
      //     name: '运营商/网络服务',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: { normal: {
      //       color: '#2d8cf0'
      //     } },
      //     data: [120, 132, 101, 134, 90, 230, 210]
      //   },
      //   {
      //     name: '银行/证券',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: { normal: {
      //       color: '#10A6FF'
      //     } },
      //     data: [257, 358, 278, 234, 290, 330, 310]
      //   },
      //   {
      //     name: '游戏/视频',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: { normal: {
      //       color: '#0C17A6'
      //     } },
      //     data: [379, 268, 354, 269, 310, 478, 358]
      //   },
      //   {
      //     name: '餐饮/外卖',
      //     type: 'line',
      //     stack: '总量',
      //     areaStyle: { normal: {
      //       color: '#4608A6'
      //     } },
      //     data: [320, 332, 301, 334, 390, 330, 320]
      //   },
      //   {
      //     name: '快递/电商',
      //     type: 'line',
      //     stack: '总量',
      //     label: {
      //       normal: {
      //         show: true,
      //         position: 'top'
      //       }
      //     },
      //     areaStyle: { normal: {
      //       color: '#398DBF'
      //     } },
      //     data: [820, 645, 546, 745, 872, 624, 258]
      //   }
      // ]
    }
    // this.$nextTick(() => {
    //   this.dom = echarts.init(this.$refs.dom)
    //   this.dom.setOption(option)
    //   on(window, 'resize', this.resize)
    // })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style scoped>
.newul{margin-left:20px}
.newul li{
  height:40px;
  line-height:40px;
  font-weight:bold;
}
</style>
