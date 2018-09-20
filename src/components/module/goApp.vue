<template>
  <div class="goapp">
      <div @click="app"> 
        在app中打开
      </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        
      }
    },
    watch:{
    },
    methods:{
      app(){
        window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.aqlk.uclick"
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
.goapp>div{
  width: 260px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 36px;
  color: white;
  background: rgb(0,128,186);
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 40px;
}
</style>
