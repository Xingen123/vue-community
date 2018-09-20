<template>
  <div class="hello" >
      <header>
            <img :src="list.fileService + '/orig/' +list.weedfis" alt="">
            <div>
                <span>{{list.followAmount}}</span>
                <div>关注</div>
            </div>
            <div>
                <span>{{list.fansAmount}}</span>
                <div>粉丝</div>
            </div>
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
                    <component :is="currentTab" @child="childlist" :dataid="dataid" ></component>
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
import photo from "@/components/module/list"
//最热
import experience from "@/components/module/experience"

export default {
    components:{
      goApp,
      photo,
      experience
    },
    data(){
      return{
        borderStyle:"barone",
        currentTab:"photo",
        list:[],
        dataid:{
            url:"http://101.200.156.70:9090/share/queryShareUserDate",
            userid:window.location.href.match(/userId=(\S*)/)[1],
            id:window.location.href.match(/id=(\S*)&/)[1],
            separate:"images",
            separatetwo:"recommends"
        },
        tab:[
            {
              tab:"photo",      
              name:'相册'
            },
            {
              tab:"experience",    
              name:'体验'
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
          if (val === 'photo') {
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
  height:180px;
  text-align: center;
  display: flex;
  flex-direction:row;
  align-items: center;
}
header>img{
  width: 140px;
  height: 140px;
  border-radius: 70px;
  margin-top: 10px;
  margin-left: 30px;
}
header>div{
  margin-top: 10px;
  text-align: center;
  font-size: 30px;
  margin-left: 150px;
}
header>div>span{
    color: rgb(72,72,72);
    font-size: 36px;
}
header>div>div{
    margin-top: 20px;
    color: rgb(118,118,118);
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
