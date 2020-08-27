<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">病历记录</h1>
    </header>
    <div>
      <TimeLine :caseData="caseData"
                :hasData="hasData"
                @deleteHandle="del"/>
    </div>
      <!--添加按钮-->
    <div class="add" @click="goAdd"><img src="../assets/add.png" alt="add"></div>
    <!--点击提示框的确定，提交删除事件时，显示 正在删除中的加载框-->
    <div class="loadmore loading myload" v-if="myload">删除中</div>
  </div>
</template>

<script>
import TimeLine from '../components/TimeLine'
import MainPageMixin from './Mixin/MainPageMixin'
import { myAxios } from '../../static/js/myAxios'
import { Toast } from 'mint-ui'
export default {
  name: 'CaseHistory',
  components: {TimeLine},
  mixins: [MainPageMixin],
  data () {
    return {
      caseData: []
    }
  },
  methods: {
    init () {
      const that = this
      let param = {}
      param.name = localStorage.getItem('name')
      myAxios('/ill/getlistByName', param)
        .then((data) => {
          let getData = data.data
          console.log(getData)
          if (getData.code === 1) {
            that.caseData = getData.data
            that.hasData = Object.keys(that.caseData).length !== 0
          } else {
            Toast(getData.msg)
          }
        })
    },
    del (id) {
      const that = this
      const param = {}
      param.id = id
      that.myload = true
      myAxios('/ill/delete', param)
        .then((data) => {
          let getData = data.data
          that.myload = false
          if (getData.code === 1) {
            Toast('删除成功')
            delete param.id
            // 删除成功，再次请求获取慢性病数据
            return that.init()
          } else {
            Toast(getData.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
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
.noData{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -4rem;
    margin-top: -5rem;
    width: 8rem;
    height: 8rem;
}
.myload{
  width: 40%;
  height: 3.2rem;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -20%;
  margin-top: -1.6rem;
  background-color: rgba(0,0,0,0.7);
  border-radius: 10px;
}
</style>
