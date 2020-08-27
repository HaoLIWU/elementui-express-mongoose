<template>
    <!--注册、忘记密码内容组件-->
  <div>
    <header class="mui-bar mui-bar-nav" v-if="!isLogin">
      <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" :to="{name: 'Login'}"></router-link>
      <h1 class="mui-title">新用户注册</h1>
    </header>
    <div v-if="!isRegister">
      <div class="msgInput" :class="!isLogin ? 'padding1' : ''">
        <input type="tel" placeholder="手机号码" v-model="phoneNum" @input="checkPhone" maxlength="11" minlength="11" v-if="!isLogin">
        <input type="text" placeholder="姓名" v-model="name">
        <input type="password" placeholder="输入密码" v-model="password" minlength="8" maxlength="16">
        <input type="password" placeholder="确认密码" v-model="input4" minlength="8" maxlength="16" v-if="!isLogin">
      </div>
      <div class="registerLink" v-if="isLogin">
        <router-link :to="{name: 'Register'}" style="padding-left: 10px;">用户注册</router-link>
      </div>
      <div class="mui-btn mui-btn-primary" style="margin-top: 30px;" @click="toDo"><span v-if="isLogin">登录</span><span v-else>注册</span></div>
    </div>
    <div class="isRegistered" v-else>
      <div class="isRegisterdv">
        <img :src="'http://127.0.0.1/public/'+isRegisterPortrait" alt="portrait">
        <!--<img src='http://47.106.200.29:8080/upload/1591173011808.jpg' alt="portrait">-->
        <div>
          <p>{{isRegisterName}}</p>
          <p>{{isRegisterNum}}</p>
        </div>
      </div>
      <div class="btn">
        <div class="mui-btn" @click="gobackRes">返回注册</div>
        <div class="mui-btn mui-btn-primary" @click="goToLogin">登录</div>
      </div>
    </div>
    <div class="loadmore loading myload" v-if="myload">加载中</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'ReFeform',
  data () {
    return {
      name: localStorage.getItem('name'),
      password: '',
      phoneNum: '',
      input4: '',
      myload: false,
      isRegister: false,
      isRegisterPortrait: require('../assets/logo.png'),
      isRegisterNum: '',
      isRegisterName: ''
    }
  },
  props: {
    isLogin: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  methods: {
    checkPhone () {
      this.phoneNum = this.phoneNum.replace(/[^0-9]/g, '')
    },
    checkPassoword () {
      const that = this
      if (that.password.length < 8 || that.password.length > 16) {
        Toast('密码长度应大于8位，小于16位')
        that.password = ''
        return false
      }
      return true
    },
    comparePassword () {
      const that = this
      if (that.password !== that.input4) {
        Toast('密码与确认密码不一致')
        that.input4 = ''
        return false
      }
      return true
    },
    checkNull () {
      const that = this
      if (!that.name || !that.password) {
        Toast('不能为空')
        return false
      }
      if (!that.isLogin) {
        if (!that.phoneNum || !that.input4) {
          Toast('不能为空')
          return false
        }
      }
      return true
    },
    toDo () {
      let that = this
      if (!that.checkNull()) {
        return false
      }
      if (!that.checkPassoword()) {
        return false
      }
      if (that.isLogin) {
        that.$emit('to', that.name, that.password)
        return false
      }
      if (!that.comparePassword()) {
        return false
      }
      that.$emit('to', that.phoneNum, that.name, that.password)
    },
    gobackRes () {
      this.isRegister = false
    },
    goToLogin () {
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    document.getElementById('bar').style.display = 'none'
  }
}
</script>

<style scoped>
  .selectP {
    color: #53CCFF;
  }
  .padding1 {
    padding-top: 80px;
  }
  .msgInput{
    padding-left: 50px;
    padding-right: 50px;
  }
  .msgInput > input{
    text-align: center;
    margin-bottom: 16px;
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
  .userType {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
    padding-bottom: 16px;
  }
  .userType > div:nth-child(1) {
     margin-right: 3rem;
  }
  .userType > div > img {
    width: 84px;
  }
  .userType > div > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .userType > div > div > p {
    font-size: 18px;
    margin-bottom: 0;
  }
  .isRegisterdv{
    display: flex;
    border-top: 1px solid;
    border-bottom: 1px solid;
    align-items: center;
    justify-content: center;
    width: 70%;
    margin: 180px auto 50px;
    padding: 10px 0;
  }
  .isRegisterdv img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 20px;
  }
  .isRegisterdv > div{
    text-align: left;
  }
  .isRegisterdv p {
    margin-bottom: 0;
  }
  .registerLink {
    text-align: right;
    padding: 6px 40px 0 0;
  }
</style>
