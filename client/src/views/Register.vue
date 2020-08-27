<template>
  <div>
    <ReFeform :isLogin="isLogin"
              @to="toRegister"/>
    <div class="loadmore loading myload" v-if="myload">登录中</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { myAxios } from '../../static/js/myAxios'
export default {
  name: 'Register',
  components: {
    ReFeform: () => import('../components/ReFeform')
  },
  data () {
    return {
      isLogin: false,
      myload: false
    }
  },
  methods: {
    toRegister (phoneNum, name, password) {
      const that = this
      that.myload = true
      let obj = {}
      obj.phoneNum = phoneNum
      obj.name = name
      obj.password = password
      obj.createTime = +new Date()
      myAxios('/user/add', obj)
        .then((response) => {
          const getData = response.data
          that.myload = false
          console.log(getData)
          if (getData.code === 1) {
            localStorage.setItem('name', name)
            that.$router.push({ name: 'Login' })
          } else {
            Toast(getData.msg)
            that.phoneNum = ''
            that.name = ''
            that.password = ''
          }
        })
    }
  }
}
</script>
<style scoped>
</style>
