<template>
  <el-container>
    <el-main class="main">
      <el-input class="firstInput" placeholder="请输入管理员用户名" v-model="userName" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password @keyup.enter.native="toLogin"></el-input>
      <el-button @click="toLogin">登录</el-button>
    </el-main>
    <CenterDialog :centerDialogVisible="dialog.centerDialogVisible"
                  :dialogContent="dialog.dialogContent"
                  @confirm="dialog.confirm()"
                  @cancel="dialog.cancel()"
                  v-if="dialog.centerDialogVisible"/>
  </el-container>
</template>

<script>
import FormMixin from './Mixinjs/FormMixin'
export default {
  name: 'LoginInput',
  mixins: [FormMixin],
  components: {
    CenterDialog: () => import('./UnionComponents/CenterDialog')
  },
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    toLogin () {
      const that = this
      if (that.userName === 'admin' && that.password === 'admin') {
        that.$store.commit('setKey', '1-1')
        localStorage.setItem('id', 'admin')
        that.$router.push({ name: 'Index' })
      } else {
        that.showDialog('对不起，你不是管理员', that.closeDialog, that.closeDialog)
      }
    }
  }
}
</script>
<style scoped>
.main {
  width: 600px;
  flex: unset;
  margin: 0 auto;
  padding: 40px 20px 20px 20px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 20px;
}

.main > div{
  margin-bottom: 20px;
}
</style>
