<template>
  <div class="login" id="login">
    <div style="position: relative;height: 100%;">
      <div class="logo"><img src="../assets/logo.png" alt="logo"></div>
      <ReFeform :isLogin="isLogin"
                @to="goIndex"/>
      <div class="loadmore loading myload" v-if="myload">登录中</div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {myAxios} from '../../static/js/myAxios'
import ReFeform from '../components/ReFeform'
export default {
  name: 'Login',
  components: {
    ReFeform
  },
  data () {
    return {
      myload: false,
      isLogin: true
    }
  },
  methods: {
    goIndex (name, password) {
      const that = this
      that.myload = true
      let param = {}
      param.name = name
      param.password = password
      myAxios('/user/login', param)
        .then((data) => {
          let getData = data.data
          that.myload = false
          if (getData.code === 1) {
            localStorage.setItem('name', name)
            that.$router.push({ name: 'CaseHistory' })
          } else {
            Toast(getData.msg)
            that.input1 = ''
            that.input2 = ''
          }
        })
    }
  }
}
</script>
<style scoped>
.login{
  padding: 40px 0 20px;
  height: 100%;
}
.logo{
  width: 100%;
  padding-bottom: 20px;
}
.logo > img{
  width: 160px;
  height: 160px;
}
.myload{
  width: 40%;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -20%;
  margin-top: -25px;
  background-color: rgba(0,0,0,0.7);
  border-radius: 10px;
}
</style>
