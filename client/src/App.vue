<template>
  <div id="app">
    <router-view />
    <nav class="mui-bar mui-bar-tab" id="bar" v-show="hidshow">
      <router-link class="mui-tab-item" :to="{ name:'CaseHistory' }">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">病历</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{ name:'Diary' }">
        <span class="mui-icon mui-icon-chatboxes"></span>
        <span class="mui-tab-label">日记</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{ name:'Me' }">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      hidshow: true,
      screenHeight: document.body.clientHeight, // 这里是给到了一个默认值
      originHeight: document.body.clientHeight, // 默认高度在watch里拿来做比较
      isOnline: true
    }
  },
  mounted () {
    const that = this
    console.log(that.$route.fullPath)
    let ua = window.navigator.userAgent
    if (ua.indexOf('Android') > -1 || ua.indexOf('iPhone') > -1) {
      const docmHeight = document.body.clientHeight || document.documentElement.clientHeight // 默认屏幕高度
      window.onresize = () => {
        var nowHeight = document.body.clientHeight // 实时屏幕高度
        if (that.$route.fullPath === '/index' || that.$route.fullPath === '/diary' || that.$route.fullPath === '/me' || that.$route.fullPath === '/login') {
          that.hidshow = docmHeight === nowHeight
        } else {
          that.hidshow = false
        }
      }
    }
  }
}
</script>

<style>

html,
body {
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
#bar {
    z-index: 1002;
  }
#bar > .router-link-active {
color: #007aff;
}
</style>
