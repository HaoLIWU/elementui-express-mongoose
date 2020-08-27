<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">我的日记</h1>
    </header>
    <div class="diaryText" v-if="hasData">
     <ul>  <!-- v-if="diaryData"-->
        <li v-for="(item,index) in diaryList" :key="index" @click="goDisplayComponent(item)" @touchstart="showDelete(item._id)" @touchend="clearLoop">
          <p class="ell diaryTitle">{{item.title}}</p>
          <span>{{ parseInt(item.createTime) | formatDate}}</span>
        </li>
      </ul>
    </div>
    <div class="noData" v-else>
      <img src="../assets/disease.png" alt="disease">
      <p>暂无日记记录</p>
    </div>
    <div class="add" @click="goAdd"><img src="../assets/add.png" alt="add"></div>
    <div class="myBox" v-if="isDeleting">
      <div class="boxText">
        <p>你确定要删除吗？</p>
      </div>
      <div class="boxBottom">
        <p class="bd-r" @click="del">确定</p>
        <p @click="cancel">取消</p>
      </div>
    </div>
    <div class="loadmore loading myload" v-if="myload">删除中</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import {myAxios} from '../../static/js/myAxios'
import MainPageMixin from './Mixin/MainPageMixin'
export default {
  name: 'Diary',
  data () {
    return {
      diaryList: [],
      Loop: '', // 定时器
      isDeleting: false,
      deleteId: ''
    }
  },
  mixins: [MainPageMixin],
  methods: {
    goDisplayComponent (json) {
      let beforePath = this.$route.fullPath
      this.$store.commit('setValue', json)
      this.$router.push({name: 'Display', query: { beforeRouter: beforePath }})
    },
    init () {
      const that = this
      const param = {}
      param.name = localStorage.getItem('name')
      // /get_diary
      myAxios('/diary/getlistByName', param)
        .then((data) => {
          let getData = data.data
          if (getData.code === 1) {
            that.diaryList = [].concat(getData.data)
            that.hasData = Object.keys(that.diaryList).length !== 0
          } else {
            Toast(getData.msg)
          }
        })
    },
    showDelete (id) {
      let that = this
      that.deleteId = id
      clearInterval(that.Loop)
      that.Loop = setTimeout(() => {
        that.isDeleting = true
      }, 1000)
    },
    clearLoop () {
      clearInterval(this.Loop)
    },
    cancel () {
      this.isDeleting = false
    },
    del () {
      const that = this
      const param = {}
      param.id = that.deleteId
      myAxios('/diary/delete', param)
        .then((data) => {
          let getData = data.data
          if (getData.code === 1) {
            Toast('删除成功')
            that.isDeleting = false
            delete param.id
            // param.name = localStorage.getItem('name')
            return this.init()
          } else {
            Toast(getData.msg)
          }
        })
    }
  },
  beforeDestroy () {
    clearInterval(this.Loop)
  },
  filters: {
    formatDate: function (value) {
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
ul{
  padding: 60px 14px 50px;
  margin: 0;
}
li{
  list-style: none;
}
p{
  margin: 0;
}
.diary{
  /*height: 100%;*/
  position: relative;
  overflow: hidden;
}
.add{
  position: fixed;
  right: 20px;
  bottom: 100px;
  width: 40px;
  height: 40px;
  background-color: #127aa6;
  border-radius: 50%;
  line-height: 62px;
  cursor: pointer;
  z-index: 100;
}
.add > img{
  width: 77%;
  height: 77%;
}
.diaryText > ul > li{
  display: flex;
  align-items: center;
  font-size: 14px;
  border: 1px solid #efeff4;
  border-radius: 10px;
  padding: 12px 20px;
  margin-bottom: 14px;
  cursor: pointer;
  box-shadow: 1px 2px 2px #efeff4;
}
.diaryTitle{
  /*width: 208px;*/
  flex: 1;
  text-align: left;
}
.noData{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -64px;
  margin-top: -82px;
}
>>>.mint-search{
  position: absolute;
  width: 100%;
}
>>>.mint-searchbar-core{
  font-size: 14px;
}
>>>.mint-searchbar{
  padding: 2px 4px;
}
>>>.mint-searchbar-inner{
  height: 34px;
}
>>>.mint-searchbar-inner .mintui-search{
  font-size: 16px;
  color: #127aa6;
}
</style>
