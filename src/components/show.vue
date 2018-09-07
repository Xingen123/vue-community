<template>
  <div class="hello" >
      <header>
            <img :src="list.weedfis" alt="">
            <div>{{list.name}}</div>
      </header>

      <!-- tab切換 -->
      <section>
        <div class="home-tabbox" >
              <div class="tab-title" >
                <div 
                  v-for="(item,index) in tab" 
                  v-text="item.name"
                  :key="index" 
                  @click="move(item.tab)" 
                  :class="{cur:currentTab === item.tab}">
                </div>
              </div>
              <div class="barbottom">
                <div class="bar" :class="borderStyle"></div>
              </div>
              <div class="tabs">
                  <keep-alive>    
                    <component :is="currentTab" @child="childlist" :dataid="dataid"></component>
                  </keep-alive>
              </div>
        </div>
      </section>
      
      <!-- 底部跳转 -->
      <footer>
        <goApp></goApp>
      </footer>
  </div>
</template>

<script>


import goApp from "@/components/module/goAPP"

//最新
import listTab from "@/components/module/list"
//最热
import listTabtwo from "@/components/module/listTwo"

export default {
    components:{
      goApp,
      listTab,
      listTabtwo
    },
    data(){
      return{
        borderStyle:"barone",
        currentTab:"listTab",
        list:[],
        dataid:{
            url:"http://101.200.156.70:9090/share/queryShareLabelDate",
            userid:this.GetQueryString('userId'),//"5E5494974FEE4B3AA1D017AF6E2B2133",
            id:this.GetQueryString('id'),
            separate:"created",
            separatetwo:"hot"
        },
        tab:[
            {
              tab:"listTab",      
              name:'最新'
            },
            {
              tab:"listTabtwo",    
              name:'最热'
            }
        ],
      }
    },
    watch:{
    },
    methods:{
      childlist(data){
        this.list = data
      },
      move(val){
          let _this = this
          this.currentTab=val
          if (val === 'listTab') {
            _this.borderStyle = 'barone';
          }else{
            _this.borderStyle = 'bartwo';
          }
      }
    },
    computed:{
      
    },
    created () {
      

    },
    mounted () {
   
    },
      destroyed () {}     
}
</script>
<style scoped>
.hello{
  padding-top: 30px;
}
header{
  width: 100%;
  height: 266px;
  text-align: center;
}
header>img{
  width: 140px;
  height: 140px;
  border-radius: 70px;
  margin-top: 40px;
}
header>div{
  margin-top: 20px;
  text-align: center;
  font-size: 30px;
}

.bar{
    width: 70px;
    height: 2px;
    float: left;
    background: rgb(0,128,186);
    transition: all 0.375s;
}
.tabs{
  width: 100%;
}
.barbottom{
  width: 100%;
  height: 1px;/*no*/
  border-bottom: 1px solid rgb(232,232,232);/*no*/
}
.barone{
  transform: translate3d(220%,0,0);
}
.bartwo{
   transform: translate3d(755%,0,0);
}
.tab-title{
  width: 100%;
  height: 80px;
  font-size: 30px;
  margin-top: 30px;
  color: rgb(72,72,72);
  display: flex;
  justify-content: space-between;
}
.tab-title>div{
  line-height: 80px;
  width: 50%;
  text-align: center;
}
.cur{
  color: rgb(0,128,186);
}
</style>
