<template>
  <div class="details" >
     <!-- :style="{ height: (wrapperHeight-10) + 'px' }" -->
     <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">  
      <div class="goapp">
        <!-- 图片 -->
         <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in listSwiper">
                  <img   style="width:100%;display:block;" v-if='item.showType == "IMAGE"' :src="item.weedfis" alt="">
                  <video style="width:100%;" v-if='item.showType == "VIDEO"' controls :src="item.videoId" autoplay="autoplay"></video>

                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div v-show="listSwiper.length!=1" class="swiper-pagination"></div>
        </div>
       
        <section>
           <!--标题 -->
            <div class="title">
              <img :src="list.fileServer + '/orig/' +list.userWeedfis" alt="">
              <div>
                 <span>{{list.nickName}}</span>
                 <div>{{list.followRecord}}人已关注</div>
              </div>
            </div>
            <!-- 内容 -->
            <div class="text">{{list.content}}</div>
            <!-- 评论 -->
            <div class="speakbox">
                <div class="speak">{{speak}}</div>
                <!-- 开始巴拉巴拉了 -->
                <ul>
                  <li v-for="(item,index) in list.wbCommentList" :key="index" >
                    <div class="peopel">
                        <img :src="list.fileServer + '/orig/' +item.image" alt="">
                        <div>
                            <span>{{item.nickName}}</span>
                            <div>{{item.created}}</div>
                        </div>
                    </div>

                    <div class="peopelContent">
                      {{item.content}}
                    </div>
                    <div v-for="(text,index) in item.replyRecord" :key="index" class="peopelTxet">
                      <span>{{text.replyedNickName}}</span>回复<span>{{text.beReplyedNickName}}：</span><span style="color:rgb(72,72,72);">{{text.replyComment}}</span>
                    </div>
                  </li>

                  <li class="Liapp" @click="app">
                    {{goapp}}
                  </li>

                </ul>
            </div>
        </section>

        <footer>
          <footerList :recommendWbs="list.recommendWbs" :fileServer="list.fileServer" @childid="linkfather"></footerList>
        </footer>
      </div>
    </mt-loadmore>
  </div>  
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import { Loadmore } from 'mint-ui';
import footerList from "@/components/module/footerList"
export default {
    components:{
        footerList,
        "mt-loadmore":Loadmore  
    },
    data(){
      return{
        dataid:{
          url:"http://101.200.156.70:9090/share/queryShareWbDetail",
          pageNum:1,
          pageLimit:5,
          id:this.dataidId()
        },
        list:[],
        listSwiper:[],
        wrapperHeight:0,
        speak:"最新评论",
        goapp:"查看更多评论...",
        topStatus:"",
        allLoaded:false,
      }
    },
    watch:{
    },
    methods:{
      app(){
        window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.aqlk.uclick"
      },
      dataidId(){
        let meta = sessionStorage.getItem('meta')
        if(meta){
          return meta;
        }else{
          let id = window.location.href.match(/wbId=(\S*)/)[1]
          return id;
        }
      },
      linkfather(data){
        this.dataid.id = data
        this.getParams()
        window.scrollTo(0, 0);
      },
      //下拉
      loadTop() {
        this.getParams()
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {
        this.getParams()
        this.$refs.loadmore.onBottomLoaded();
      },
      getParams() {
          // 取到路由带过来的参数 
          let _this = this
          // 调用示例
         
          let param = new FormData();
          param.append("id",this.dataid.id)
          param.append("pageNum",this.dataid.pageNum)
          param.append("pageLimit",this.dataid.pageLimit)
          let p1 = this.AjaxPromise({  // 启动第一个任务
              url: _this.dataid.url, // 要获取的文件地址
              data: param
          })

          p1.then(function(response){  // 处理第一个异步任务的结果(每次调用then都会返回一个新创建的Promise对象)
            let aJOSN =JSON.parse(response.currentTarget.response);
              console.log(aJOSN,1);
              _this.list = aJOSN
              _this.listSwiper = aJOSN.images
              
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
     this.getParams()
     let mySwiper = new Swiper ('.swiper-container', {
      // 如果需要分页器
         pagination: '.swiper-pagination',
         paginationType: 'bullets',
         observer:true,
         observeParents:true
      })  
    },
    destroyed () {}     
}
</script>
<style scoped>
  .swiper-container{
    width: 100%;
  }
  section{
    width: 95%;
    margin:0 auto;
    padding-top: 30px;
  }
  .details{
    width: 100%;
    /*overflow: scroll;*/
  }

  .text{
    padding:40px 0;
    font-size: 30px;
    color: rgb(72,72,72);
    white-space: pre-wrap;
    text-align: justify;
    border-bottom: 1px solid rgb(234,234,234);/*no*/
  }
  .speakbox{
    padding-top: 40px;
  }
  .peopel{
    display: flex;
    flex-direction:row;
    align-items: center;
    margin-top: 20px;
  }
  .peopel>img{
      width: 72px;
      height: 72px;
      border-radius: 36px;
  }
  .peopel>div{
    margin-left: 10px;
  }
  .peopel>div>span{
    font-size: 26px;
    color: rgb(72,72,72);
  }
  .peopel>div>div{
    font-size: 22px;
    color: rgb(118,118,118);
  }
  .peopelContent{
    font-size: 26px;
    color: rgb(72,72,72);
    padding-left: 82px;
    text-align: justify;
    margin-top: 20px;
  }
  .speak{
    font-weight: bold;
    font-size: 30px;
    color: rgb(72,72,72);
  }
  .peopelTxet{
    color: rgb(72,72,72);
    margin-left: 82px;
    margin-top: 20px;
    padding: 10px;
    background: rgb(242,242,242);
  }
  .peopelTxet>span{
    color: rgb(118,118,118);
    padding:0 10px;
  }
  .title{
    width: 100%;
    border-bottom: 1px solid rgb(234,234,234);/*no*/
    padding-bottom: 30px;
    display: flex;
    flex-direction:row;
    align-items: center;
  }
  .title>div{
    margin-left: 20px;
  }
  .title>img{
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
  li{
    list-style: none;
  }
  .title>div>span{
    font-size: 30px;
    color: rgb(72,72,72);
  }
  .title>div>div{
    font-size: 20px;
    color: rgb(118,118,118);
    margin-top: 16px;
  }
  .Liapp{
    text-align: center;
    padding: 20px;
    margin-top: 20px;
    font-size: 30px;
    color: rgb(57,126,181);
  }
</style>
