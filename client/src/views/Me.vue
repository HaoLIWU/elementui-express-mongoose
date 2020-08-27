<template>
  <div class="me">
    <div class="mui-pages" style="text-align: left;overflow: hidden;margin-bottom: 50px" v-if="userMsg[0]">
      <!--用户名跟编辑资料-->
      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mui-media">
          <a class="mui-navigate-right">
            <img class="mui-media-object mui-pull-left head-img" id="head-img01" src="../assets/headPhoto.jpg" alt="headPhoto">
            <div class="mui-media-body head-body">
              <span style="font-size: 20px;margin-right: 10px;" v-text="userMsg[0].username? userMsg[0].username: '用户名'"></span>
              <a @click="goEditMsg">
                <span class="head-exit">编辑资料</span>
              </a>
            </div>
          </a>
        </li>
      </ul>
      <div class="diver"></div>

      <ul class="mui-table-view mui-table-view-chevron">
        <li class="mui-table-view-cell mylist">
          <a class="amiddle">
            <img src="../assets/bloodType.png" alt="bloodType" class="left-img">
            <p class="right-content">姓名：<span class="showContent" v-text="hasData(userMsg[0].name)"></span></p>
          </a>
        </li>
        <li class="mui-table-view-cell mylist">
          <a class="amiddle">
            <img src="../assets/illness.png" alt="illness" class="left-img">
            <p class="right-content">性别：<span class="showContent" v-text="hasData(userMsg[0].sex)"></span></p>
          </a>
        </li>
        <li class="mui-table-view-cell mylist">
          <a class="amiddle">
            <img src="../assets/allergy.png" alt="allergy" class="left-img">
            <p class="right-content">电话号码：<span class="showContent" v-text="hasData(userMsg[0].phoneNum)"></span></p>
          </a>
        </li>
        <li class="mui-table-view-cell mylist">
          <a class="amiddle">
            <img src="../assets/callingCard.png" alt="allergy" class="left-img">
            <p class="right-content">出生日期：
              <span class="showContent" v-text="userMsg[0].birth ? $options.filters['formatDate2'](parseInt(userMsg[0].birth)) : '暂无'"></span>
            </p>
          </a>
        </li>

      </ul>
      <div class="diver"></div>
       <!--退出登录-->
      <ul class="mui-table-view">
        <li class="mui-table-view-cell" style="text-align: center;">
          <p @click="outSign" style="color: black;">退出登录</p>
        </li>
      </ul>
      <div class="diver"></div>
      <div class="loadmore loading myload" v-if="myload">上传中</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import {myAxios} from '../../static/js/myAxios'
export default {
  name: 'Me',
  data () {
    return {
      userMsg: [],
      myload: false
    }
  },
  mounted () {
    document.getElementById('bar').style.display = 'block'
    this.init()
  },
  methods: {
    goEditMsg () {
      let that = this
      const beforePath = that.$route.fullPath
      that.$router.push({name: 'Edit', query: { beforeRouter: beforePath }})
    },
    outSign () {
      localStorage.removeItem('name')
      this.$router.push({name: 'Login'})
    },
    hasData (data) {
      return data === '' ? '暂无' : data === undefined ? '暂无' : data
    },
    init () {
      const that = this
      const param = {}
      param.name = localStorage.getItem('name')
      myAxios('/user/getlistByName', param)
        .then((response) => {
          let getData = response.data
          if (getData.code === 1) {
            that.userMsg = [...getData.data]
            that.$store.commit('setValue', that.userMsg[0])
          } else {
            Toast(getData.msg)
          }
        })
    }
  },
  filters: {
    formatDate2: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + MM + '-' + d
    }
  }
}
</script>
<style scoped>
.me{
  /*background-color: #eeeeee;*/
  height: 100%;
  position: relative;
}
#head-img00,
#head-img01{
  border: 1px solid #ccc;
  border-radius: 50%;
  max-width: 60px;
  height: 60px;
  width: 60px;
}
.head-body{
  height: 60px;
  line-height: 60px;
}
.head-exit{
  position: absolute;
  right: 32px;
  font-size: 14px;
  color: #ccc;
}
.mylist{
  padding-top: 14px;
  padding-bottom: 14px;
}
.amiddle > .left-img{
  width: 24px;
  float: left;
  margin-right: 24px;
}
.right-content{
  color: #555;
  font-size: 18px;
}
.amiddle{
  line-height: 24px;
}
.allergy{
  width: 230px;
}
.allergy > p{
  margin-bottom: 10px;
}
.allergy > p:last-child{
  margin-bottom: 0;
}
.healthRisk > p:nth-child(1){
  margin-bottom: 0;
}
.myMeBox{
  width: 70%;
  height: 130px;
  position: fixed;
  left: 50%;
  margin-left: -35%;
  top: 50%;
  margin-top: -100px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
}
.myMeBox > .meText{
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
}
.myMeBox > .meText >  p{
  flex: 1;
  font-size: 16px;
  margin-bottom: 0;
}
.myMeBox > .meText > input{
  flex: 4;
}
.myMeBox > .meBottom{
  width: 100%;
  display: flex;
  text-align: center;
}
.myMeBox > .meBottom > p{
  width: 50%;
  color: #007aff;
  font-size: 20px;
  margin-bottom: 0;
}
.myMeBox > .meBottom > p:last-child{
  font-weight: 700;
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
.showContent {
  color: #ccc;
  font-size: 16px;
  margin-left: 10px;
}
</style>
