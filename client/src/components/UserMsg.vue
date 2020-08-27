<template>
  <div class="exitmsg">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
      <h1 class="mui-title">个人信息</h1>
      <div class="exit-img">
        <img src="../assets/true.png" alt="save" @click="mySave">
      </div>
    </header>
    <div class="exitdv">
      <ul class="mui-table-view mui-table-view-chevron userMsg">
        <li class="mui-table-view-cell">
          <a>
            <p>
              <label for="name">姓名</label>
              <input type="text" v-model="name" id="name" disabled>
            </p>
            <p style="margin: 6px 0; color: red;">姓名不可修改</p>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a>
            <p>
              <label for="username">用户名</label>
              <input type="text" v-model="username" id="username">
            </p>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a>
            <p>
              <label for="phoneNum">电话号码</label>
              <input type="tel" placeholder="手机号码" v-model="phoneNum" @input="input" maxlength="11" id="phoneNum">
            </p>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a style="padding-bottom: 6px;padding-top: 6px;">
            <p class="mui-select">
              <label for="sexSelect">性别</label>
              <select name="sexSelect" id="sexSelect" v-model="sexId" @change="changeProduct(sexId,$event)">
                <option v-for="(item,index) in userSex" :value="item.id" :key="index">{{item.value}}</option>
              </select>
            </p>
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a>
            <p>
              <label for="birth">出生日期</label>
              <input type="date" id="birth" v-model="birth" :max="getNow()">
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import ComponentMixin from './Mixin/ComponentMixin'
export default {
  name: 'UserMsg',
  mixins: [ComponentMixin],
  props: {
    user_name: {
      type: String,
      default () {
        return ''
      }
    },
    fu_name: {
      type: String,
      default () {
        return ''
      }
    },
    phone_num: {
      type: String,
      default () {
        return ''
      }
    },
    fu_birth: {
      type: String,
      default () {
        return ''
      }
    },
    fu_sex: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      userSex: [{
        id: 0,
        value: '男'
      }, {
        id: 1,
        value: '女'
      }],
      sexId: 0,
      username: this.user_name,
      name: this.fu_name,
      birth: this.fu_birth,
      sex: this.fu_sex,
      phoneNum: this.phone_num
    }
  },
  mounted () {
    for (let i = 0; i < 2; i++) {
      if (this.sex === this.userSex[i].value) {
        this.sexId = this.userSex[i].id
      }
    }
  },
  methods: {
    input () {
      this.phoneNum = this.phoneNum.replace(/[^0-9]/g, '')
    },
    changeProduct (item, e) {
      this.sexId = item
    },
    getNow () {
      let date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      let now = date.getFullYear() + '-' + month + '-' + day
      return now.toString()
    },
    mySave () {
      const that = this
      if (!that.name) {
        Toast('姓名不能为空')
        return false
      }
      const param = {
        username: that.username,
        name: that.name,
        birth: +new Date(that.birth),
        phoneNum: that.phoneNum,
        sex: that.userSex[that.sexId].value
      }
      that.$emit('saveHandle', param)
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
    height: 100%;
  }
  select {
    border: 1px solid #ccc !important;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 10px !important;
    margin-top: 0;
  }
  .exitmsg{
    position: relative;
    /*height: 100%;*/
    overflow: hidden;
  }
  .exit-img{
    position: absolute;
    top: 12px;
    right: 10px;
    width: 24px;
    height: 24px;
  }
  .userMsg{
    margin-top: 44px;
  }
  .leftImportant{
    color: #000;
    float: left;
    font-size: 16px;
  }
  .tou{
    margin-top: 14px;
  }
  .textRight{
    width: 100%;
    display: block;
    text-align: right;
  }
  .exitdv li > a{
    padding-bottom: 0;
    padding-top: 0;
  }
  .exitdv li > a > p{
    display: flex;
    align-items: center;
  }
  .exitdv li > a > p > label{
    flex: 1;
    text-align: left;
    color: #000;
    font-size: 16px;
  }

  .exitdv li > a > p > input{
    flex: 2;
    text-align: right;
    border: 0;
    color: #000;
  }
  .exitdv li > a > p > select{
    flex: 1;
  }
  .exitmsg .hover{
    width: 24rem;
    height: 24rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -12rem;
    margin-top: -12rem;
    z-index: 1001;
    border-radius: 0;
    border: 0;
  }
  #shelter{
    z-index: 1000;
    background-color: black;
    width: 100%;
    position: fixed;
    top: 44px;
    left: 0;
    opacity: 0.6;
    display: none;
  }
  .gallery{
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;
    float: right;
  }
  .gallery > img{
    width: 100%;
    height: 100%;
  }
</style>
