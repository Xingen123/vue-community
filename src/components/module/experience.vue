<template>
  <div class="listTab" ref="wrapper" :style="{ height: (wrapperHeight-10) + 'px' }">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @bottom-status-change="handleTopChange" >
        
          <div class="tabContent">
                <div v-for="(item,index) in createdList" :key="index" class="listbox">
                    <img :src="list.fileService + '/orig/' +item.weedfis" alt="">
                    <div class="boxbottom">
                      {{item.title}}
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
        nextText:"↑上拉加载更多。。。",
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
            this.nextText="↓释放刷新"
          }else{
            this.nextText="↑上拉加载更多。。。"
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
              url: _this.dataid.url, // 要获取的文件地址
              data: param
          })

          p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
            let aJOSN =JSON.parse(response.currentTarget.response);
              console.log(aJOSN);
              _this.list = aJOSN
              
              _this.$emit("child",_this.list)
              //最新

              if (aJOSN.recommendInfos) {
                  if (aJOSN.recommendInfos==0) {
                    _this.nextText="没有更多了"
                    _this.allLoaded = true;
                  }
                  if (_this.pageNo == 1) {
                    _this.createdList = aJOSN.recommendInfos
                  }
                  else{
                    _this.createdList=_this.createdList.concat(aJOSN.recommendInfos)
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
      this.wrapperHeight =
          document.documentElement.clientHeight -
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
  padding-bottom: 100px;
}
.listbox{
   width: 100%;
   height: 550px;
   border-radius: 10px;
   margin-top: 30px;
}

.listbox>img{
  width: 100%;
  height:460px;
  display: block;
  border-radius: 10px;
}
.boxbottom{
  width: 100%;
  height: 90px;
  font-size: 30px;
  margin-top: 30px;
  color: rgb(72,72,72);
  text-align: center;
}

</style>
