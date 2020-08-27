<template>
  <div>
    <CaseAdd  @clickBack="goback"
              @saveHandle="caseAddSubmit"
              v-if="!isDiary"/>
    <DiaryAdd @clickBack="goback"
              @saveHandle="diaryAddSubmit"
              v-else/>
    <div class="loadmore loading myload" v-if="myload">上传中</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { myAxios } from '../../static/js/myAxios'
import MinorPageMixin from './Mixin/MinorPageMixin'
export default {
  name: 'Add',
  mixins: [MinorPageMixin],
  components: {
    DiaryAdd: () => import('../components/Diary/DiaryAdd'),
    CaseAdd: () => import('../components/CaseHistory/CaseAdd')
  },
  data () {
    return {
      myload: false
    }
  },
  methods: {
    caseAddSubmit (obj) {
      const that = this
      obj.name = localStorage.getItem('name')
      that.myload = true
      console.log(obj)
      myAxios('/ill/add', obj)
        .then((response) => {
          const getData = response.data
          that.myload = false
          if (getData.code === 1) {
            Toast('上传成功')
            // that.$router.push({ path: localStorage.getItem('addFrom') })
            that.$router.push({ path: that.beforeRoute })
          } else {
            Toast(getData.msg)
          }
        })
    },
    diaryAddSubmit (obj) {
      const that = this
      obj.name = localStorage.getItem('name')
      that.myload = true
      myAxios('/diary/add', obj)
        .then((response) => {
          const getData = response.data
          that.myload = false
          if (getData.code === 1) {
            Toast('上传成功')
            // that.$router.push({ path: localStorage.getItem('addFrom') })
            this.$router.push({ path: this.beforeRoute })
          } else {
            Toast(getData.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
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
