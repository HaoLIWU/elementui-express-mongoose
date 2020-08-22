export default {
  data () {
    return {
      isAdd: true,
      dialog: {
        centerDialogVisible: false,
        dialogContent: '你确定要离开吗',
        confirm: '',
        cancel: ''
      }
    }
  },
  methods: {
    formatDate: function (value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    goback () {
      this.dialog.centerDialogVisible = false
      this.$router.go(-1)
    },
    formCancelHandle () { // 父组件的取消
      const that = this
      console.log('11')
      that.showDialog('你确定要离开吗', that.goback, that.closeDialog)
    },
    showDialog (content, confirmFun, cancelFun) {
      const that = this
      that.dialog.centerDialogVisible = true
      that.dialog.dialogContent = content
      that.dialog.confirm = confirmFun
      that.dialog.cancel = cancelFun // 子组件对话框的取消
    },
    closeDialog () { // 子组件对话框的取消
      this.dialog.centerDialogVisible = false
    },
    handleAvatarSuccess (res, file) {
      this.form.fileName = URL.createObjectURL(file.raw)
      this.hasImage = false
      if (file.response.code === 1) {
        this.successImageUrl = file.response.path
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
