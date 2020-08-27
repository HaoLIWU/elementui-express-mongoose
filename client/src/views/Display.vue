<template>
  <div>
    <CaseDisplay v-if="!isDiary"
                 @clickBack="goback"/>
    <DiaryDisplay v-else
                  @clickBack="goback"/>
  </div>
</template>

<script>
import MinorPageMixin from './Mixin/MinorPageMixin'
export default {
  name: 'Display',
  mixins: [MinorPageMixin],
  components: {
    CaseDisplay: () => import('../components/CaseHistory/CaseDisplay'),
    DiaryDisplay: () => import('../components/Diary/DiaryDisplay')
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
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
    }
  }
}
</script>
<style scoped>
img,
video{
    width: 100%;
    height: 100%;
}
p {
  margin-bottom: 0;
}
.display{
    padding: 52px 10px 0;
}
.showImg{
    width: 66%;
    margin: 0 auto 10px;
}
.showVideo {
    width: 66%;
    margin: 0 auto;
}
.timeDoc {
  padding: 0 20px 20px;
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
</style>
