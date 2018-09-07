
import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible/flexible'
import  './assets/reset.css'
import 'mint-ui/lib/style.css'
import { Indicator } from 'mint-ui';
Vue.config.productionTip = false


Vue.prototype.AjaxPromise = function(param){
    return new Promise(function(resolve, reject ){
        let xhr = new XMLHttpRequest();
        Indicator.open('Loading...');
        xhr.open('post', param.url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                  xhr.onload = resolve;
                  setTimeout(function(){Indicator.close()},500);
                  
                } else {
                  xhr.onerror = reject;
                  setTimeout(function(){Indicator.close()},500);
                }
            }
        }
        xhr.send(param.data);
    })
}
Vue.prototype.GetQueryString= function(name){
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if(r!=null)return  unescape(r[2]); return null;
}


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
     document.title = to.meta.title;
  }else{
      let  meta = sessionStorage.getItem('meta');
      document.title = meta;
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

