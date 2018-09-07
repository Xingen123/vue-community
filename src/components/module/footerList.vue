<template>
  <div class="footerList">
      <div class="boxborder">
          <div>{{boxbottom}}</div>
      </div>
      <div class="tabContent">
                <div v-for="(item,index) in recommendWbs" :key="index" class="listbox" @click="linkdetails(item.communityId)">
                    <img v-if="item.images[0].weedfis" :src="item.images[0].weedfis" alt="">

                    <video  controls="controls" v-if="item.images[0].videoId"   autoplay >
                        <source :src="item.images[0].videoId">
                    </video>

                      <div id="output"></div>
                    <div v-if="item.images[0].videoId" class="videoId"></div>
                    <div class="boxbottom">
                      <div class="one">
                          <img :src="fileServer  + '/orig/' + item.userWeedfis" alt="">
                          <span>{{item.nickName}}</span>
                      </div>
                      <div class="two">
                          <img src="../../../static/img/dianzan.png" alt="">
                          <span>{{item.collectionAmount}}</span>
                          <img src="../../../static/img/pinglun.png" alt="">
                          <span>{{item.commentAmount}}</span>
                      </div>
                    </div>
                </div>
      </div>
  </div>
</template>

<script>

export default {
    data(){
      return{
        boxbottom:"为你推荐"
      }
    },
    watch:{
    },
    props:{
      fileServer:{

      },
      recommendWbs:{
      }
    },
    methods:{
      linkdetails(data){
        this.$emit("childid",data)
        document.title = data;
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
.tabContent{
        width: 98%;
        display: -webkit-box;
        overflow: auto;
        margin-bottom: 50px;
}
.boxborder{
  width: 95%;
  margin: 0 auto;
  margin-top: 40px;
  border-top: 1px solid rgb(234,234,234);
  padding-top: 40px;
}
.boxborder>div{
  font-size: 30px;
  color: rgb(72,72,72);
  font-weight: bold;
}
.tabContent::-webkit-scrollbar {display:none}
.listbox{
   width: 330px;
   height: 555px;
   border:1px solid rgb(234,234,234);/*no*/
   border-radius: 10px;
   margin-top: 30px;
   margin-left: 20px;
   position: relative;
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
.videoId{
  width: 40px;
  height: 40px;
  background: url(../../../static/img/bf.png) no-repeat;
  background-size:100% 100%;
  position: absolute;  
  top: 10px;
  right: 10px;
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
    height: 50px;
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
