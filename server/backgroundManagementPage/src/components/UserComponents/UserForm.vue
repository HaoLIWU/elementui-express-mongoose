<template>
  <div class="userForm">
    <h2 v-if="isAdd">添加用户</h2>
    <h2 v-else>修改用户信息</h2>
    <el-form ref="form" :model="form" label-width="80px" class="personFrom">
      <el-form-item label="姓名">
        <el-input v-model="form.name" maxlength="8" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" maxlength="10" show-password></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" maxlength="8" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phoneNum" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item class="submitButton">
        <el-button type="primary" @click="onSubmit"><span v-if="isAdd">立即创建</span><span v-else>立即更新</span></el-button>
        <el-button @click="formCancelHandle">取消</el-button>
      </el-form-item>
    </el-form>
    <CenterDialog :centerDialogVisible="dialog.centerDialogVisible"
                  :dialogContent="dialog.dialogContent"
                  @confirm="dialog.confirm()"
                  @cancel="dialog.cancel()"
                  v-if="dialog.centerDialogVisible"/>
  </div>
</template>

<script>
import { myPostAxios } from '../../assets/myAxios'
import FormMixin from '../Mixinjs/FormMixin'
export default {
  name: 'UserForm',
  mixins: [FormMixin],
  props: {
    obj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CenterDialog: () => import('../UnionComponents/CenterDialog')
  },
  data () {
    return {
      form: {
        name: '',
        username: '',
        phoneNum: '',
        birth: '',
        sex: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      const that = this
      if (!that.form.name || !that.form.password || !that.form.sex || !that.form.birth) {
        that.showDialog('请填完必填项', that.closeDialog, that.closeDialog)
        return false
      }
      if (!(/^1[0-9]{10}$/.test(that.form.phoneNum))) {
        that.showDialog('手机号码格式输入错误', that.closeDialog, that.closeDialog)
        that.form.phoneNum = ''
        return false
      }
      // 把中国标准时间转为 时间戳形式
      const date = new Date(that.form.birth).getTime()
      const param = {
        name: that.form.name,
        sex: that.form.sex,
        username: that.form.username,
        password: that.form.password,
        phoneNum: that.form.phoneNum,
        birth: date
      }
      if (Object.keys(that.obj).length === 0) {
        myPostAxios('/user/add', param)
          .then((response) => {
            const getData = response.data
            if (getData.code === 1) {
              that.$router.push({ name: 'Index' })
            } else {
              that.showDialog(getData.msg, that.closeDialog, that.closeDialog)
            }
          })
      } else {
        param.id = that.form._id
        myPostAxios('/user/update', param)
          .then((response) => {
            const getData = response.data
            if (getData.code === 1) {
              that.$router.push({ name: 'Index' })
            } else {
              that.showDialog(getData.msg, that.closeDialog, that.closeDialog)
            }
          })
      }
    }
  },
  mounted () {
    const that = this
    if (that.centerDialogVisible) {
      console.log(that.$refs.dialog)
    }
    if (Object.keys(that.obj).length === 0) {
      that.isAdd = true
    } else {
      that.form = that.obj
      that.form.birth = that.formatDate(parseInt(that.obj.birth))
      that.isAdd = false
    }
  }
}
</script>

<style scoped>
.userForm {
  overflow: hidden;
}

.personFrom {
  width: 780px;
  padding-top: 20px;
  margin: 0 auto;
  /*padding-left: 60px;*/
}
.avatar {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.submitButton {
  margin-top: 40px;
}
</style>
