<template>
  <div>
    <CaseAdd title="修改病历"
             @clickBack="goback"
             :create_time="illCreateTime"
             :doctor_name="doctorName"
             :fu_diagnosis="diagnosis"
             :file_name="fileName"
             :fu_remark="remark"
             @saveHandle="updateCase"
             v-if="isIll"/>
    <DiaryAdd diaryTitle="修改日记"
              :fu_title="title"
              :fu_content="content"
              :create_time="diaryCreateTime"
              :file_name="fileName"
              @clickBack="goback"
              @saveHandle="updateDiary"
              v-if="isDiary"/>
    <UserMsg :user_name="username"
             :fu_name="name"
             :phone_num="phoneNum"
             :fu_birth="birth"
             :fu_sex="sex"
              @clickBack="goback"
              @saveHandle="updateUser"
              v-if="isUser"/>
  </div>
</template>

<script>
import { myAxios } from '../../static/js/myAxios'
import { Toast } from 'mint-ui'
import MinorPageMixin from './Mixin/MinorPageMixin'
export default {
  name: 'Edit',
  mixins: [MinorPageMixin],
  components: {
    DiaryAdd: () => import('../components/Diary/DiaryAdd'),
    CaseAdd: () => import('../components/CaseHistory/CaseAdd'),
    UserMsg: () => import('../components/UserMsg')
  },
  data () {
    return {
      doctorName: this.$store.state.obj.doctorName,
      diagnosis: this.$store.state.obj.diagnosis,
      fileName: this.$store.state.obj.fileName,
      remark: this.$store.state.obj.remark,
      title: this.$store.state.obj.title,
      content: this.$store.state.obj.content,
      // const filter = this.$options.filters['formatDate'] filter(createTime)
      diaryCreateTime: this.$store.state.obj.createTime,
      illCreateTime: this.$options.filters['formatDate'](parseInt(this.$store.state.obj.createTime)),
      // 编辑用户时的数据
      username: this.$store.state.obj.username,
      name: this.$store.state.obj.name,
      phoneNum: this.$store.state.obj.phoneNum,
      birth: this.$options.filters['formatDate2'](parseInt(this.$store.state.obj.birth)),
      sex: this.$store.state.obj.sex,
      isUser: true,
      isIll: true
    }
  },
  mounted () {
    const that = this
    that.isIll = !!(that.beforeRoute.indexOf('casehistory') >= 0)
    that.isUser = !!(that.beforeRoute.indexOf('me') >= 0)
    // document.getElementById('bar').style.display = 'none'
  },
  methods: {
    updateCase (obj) {
      const that = this
      obj.name = localStorage.getItem('name')
      obj.id = that.$store.state.obj._id
      myAxios('/ill/update', obj)
        .then((response) => {
          const getData = response.data
          if (getData.code === 1) {
            that.$store.dispatch('showNewValue', getData.data)
            Toast('更新成功')
            that.$router.push({ name: 'CaseHistory' })
          } else {
            Toast(getData.msg)
          }
        })
    },
    updateDiary (obj) {
      const that = this
      obj.name = localStorage.getItem('name')
      obj.id = that.$store.state.obj._id
      myAxios('/diary/update', obj)
        .then((response) => {
          const getData = response.data
          if (getData.code === 1) {
            // that.$store.dispatch('showNewValue', getData.data)
            Toast('更新成功')
            that.$store.commit('setValue', getData.data)
            // that.$router.push({ path: that.beforeRoute })
            that.$router.push({ name: 'Diary' })
          } else {
            Toast(getData.msg)
          }
        })
    },
    updateUser (obj) {
      const that = this
      obj.name = localStorage.getItem('name')
      obj.id = that.$store.state.obj._id
      obj.password = that.$store.state.obj.password
      myAxios('/user/update', obj)
        .then((response) => {
          const getData = response.data
          if (getData.code === 1) {
            // that.$store.dispatch('showNewValue', getData.data)
            Toast('更新成功')
            that.$store.commit('setValue', getData.data)
            // that.$router.push({ path: that.beforeRoute })
            that.$router.push({ name: 'Me' })
          } else {
            Toast(getData.msg)
          }
        })
    }
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
      return y + '-' + MM + '-' + d + 'T' + h + ':' + m
    },
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

</style>
