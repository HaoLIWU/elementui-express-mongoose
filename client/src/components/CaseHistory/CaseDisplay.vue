<template>
  <div class='display'>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-back mui-pull-left" @click="goback"></a>
      <h1 class="mui-title">病历详情</h1>
      <div class="exit-img">
        <img src="../../assets/estimate.png" alt="exit" @click="goExit">
      </div>
    </header>
    <div>
      <div class="timeDoc">
        <span>时间：{{ parseInt(caseData.createTime) | formatDate }}</span>
        <span class="ell">医生： {{ caseData.doctorName }}</span>
      </div>
      <div class="resultDoc">
        <p><span>诊断：</span>{{ caseData.diagnosis }}</p>
        <p><span>备注：</span>{{ caseData.remark }}</p>
      </div>
    </div>
    <div class="showImg" v-if="hasImg">
      <img :src="'http://127.0.0.1:3000/public/'+caseData.fileName" alt="">
    </div>
  </div>
</template>

<script>
import ComponentMixin from '../Mixin/ComponentMixin'
import DisplayMixin from '../Mixin/DisplayMixin'
export default {
  name: 'CaseDisplay',
  mixins: [ComponentMixin, DisplayMixin],
  data () {
    return {
      caseData: this.$store.state.obj,
      hasImg: false
    }
  },
  mounted () {
    let that = this
    that.hasImg = !!that.caseData.fileName
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      // let s = date.getSeconds()
      // s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
    }
  }
}
</script>
<style scoped>
img{
  width: 100%;
  height: 100%;
}
p {
  margin-bottom: 16px;
}
.exit-img{
  position: absolute;
  top: 12px;
  right: 10px;
  width: 24px;
  height: 24px;
}
.display{
  padding: 52px 10px 0;
}
.showImg{
  width: 66%;
  margin: 0 auto 10px;
}
.timeDoc {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}
.timeDoc > span:nth-child(1) {
  width: 175px;
}
.timeDoc > span:nth-child(2) {
  flex: 1;
  text-align: right;
}
.resultDoc {
  padding: 0 20px;
}
.resultDoc > p {
  font-size: 20px;
  text-align: left;
  word-break: break-all;
}
</style>
