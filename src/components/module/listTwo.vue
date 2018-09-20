<template>
  <div class="listTab" ref="wrapper" :style="{ height: (wrapperHeight-10) + 'px' }">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @bottom-status-change="handleTopChange" >
        
        <div class="tabContent">
            <div v-for="(item,index) in createdList" :key="index" class="listbox">
                <img :src="item.weedfis"  v-if="item.weedfis" alt="">
                <video :src="item.videoId"  v-if="item.videoId"></video>
                <div class="boxbottom">
                 <!--  <div class="one">
                      <img :src="list.fileService + '/80x80s/' +item.userWeedfis" alt="">
                      <span>{{item.name}}</span>
                  </div> -->
                  <div class="two">
                      <img src="../../../static/img/dianzan.png" alt="">
                      <span>{{item.favorAmount }}</span>
                      <img src="../../../static/img/pinglun.png" alt="">
                      <span>{{item.commentAmount}}</span>
                  </div>
                </div>
            </div>
        </div>

        <div slot="bottom" style="text-align:center;padding-bottom:80px;">
            <span v-show="topStatus !== 'loading'">{{nextText}}</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>

    </mt-loadmore>
  </div>

</template>

<script>
//上拉加载组件
import { Loadmore } from 'mint-ui'
export default {
    components:{
      "mt-loadmore":Loadmore  
    },
    data(){
      return{
        pageNo:1,
        pageSize:4,
        createdList:[],
        topStatus:"",
        allLoaded:false,
        nextText:"上拉加载更多。。。",
        list:[],
        wrapperHeight: 0,
      }
    },
    props:{
      dataid:{
      }
    },
    filters : {
        
    },
    watch:{
    },
    methods:{
      //上拉加载提示
      handleTopChange(status) {
          if (status=="drop") {
            this.nextText="释放刷新"
          }else{
            this.nextText="上拉加载更多。。。"
          }
          this.topStatus = status;
      },
      //上拉加载方法
      loadBottom(){
          this.$refs.loadmore.onBottomLoaded();
          this.pageNo = parseInt(this.pageNo) + 1;         
          this.ajaxpromise();
      },
      ajaxpromise(){
          let _this = this
          // 调用示例

          let param = new FormData();
          param.append("pageNum",this.pageNo)
          param.append("id",this.dataid.id)
          param.append("userId",this.dataid.userid)
          param.append("separate",this.dataid.separatetwo)
          param.append("pageLimit",this.pageSize)
          let p1 = this.AjaxPromise({  // 启动第一个任务
              url: this.dataid.url, // 要获取的文件地址
              data: param
          })

          p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
            let aJOSN =JSON.parse(response.currentTarget.response);
              _this.list = aJOSN
              //最新
              if (aJOSN.collectionCommunitys) {
                  if (aJOSN.collectionCommunitys==0) {
                    _this.nextText="没有更多了"
                    _this.allLoaded = true;
                  }
                  if (_this.pageNo == 1) {
                    _this.createdList = aJOSN.collectionCommunitys
                  }
                  else{
                    _this.createdList=_this.createdList.concat(aJOSN.collectionCommunitys)
                  }
              }
              _this.showLoading=false
              
          }).catch(function(err){
              console.log(err);
          });
        }

    },
    computed:{
      
    },
    created () {
      

    },
    mounted () {
      this.ajaxpromise()
      this.wrapperHeight =document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    },
    destroyed () {}     
}
</script>
<style scoped>
.listTab{
  width: 100%;
  overflow: scroll;
}
.tabContent{
  width: 690px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 100px;
}
.listbox{
   width: 330px;
   height: 520px;
   border:1px solid rgb(234,234,234);/*no*/
   border-radius: 10px;
   float: left;
   margin-top: 30px;
}
.listbox:nth-child(2n){
  margin-left: 30px;
}
.listbox>img,.listbox>video{
  width: 100%;
  height: 440px;
  display: block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
 object-fit: fill;
}
.boxbottom{
  width: 100%;
  height: 105px;

}

.one{
  height: 55px;
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.one>img{
  width: 44px;
  height: 44px;
  border-radius: 22px;
}
.one>img,.one>span{
  margin-left: 20px;
}
.two{
    height: 70px;
   display: flex;
  align-items: center;
}
.two>img{
  width: 20px;
  height: 20px;
  margin-left: 20px;
}
.two>span{
  display: inline-block;
  width: 50px;
  color: rgb(118,118,118);
  font-size: 22px;
  margin-left: 20px;
}
</style>
