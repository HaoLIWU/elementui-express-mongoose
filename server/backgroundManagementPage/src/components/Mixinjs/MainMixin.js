export default {
  components: {
    Table: () => import('../UnionComponents/Table'),
    CenterDialog: () => import('../UnionComponents/CenterDialog')
  },
  data () {
    return {
      dialog: {
        centerDialogVisible: false,
        dialogContent: '你确定要离开吗',
        confirm: '',
        cancel: ''
      },
      deleteRow: '',
      tableData: [],
      currentPage: 1,
      count: 0,
      pageSize: 8
    }
  },
  methods: {
    formatDate (value) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + MM + '-' + d
    },
    handleEdit (row) {
      this.$router.push({ name: 'Edit', query: { obj: row } })
    },
    isDelete (row) {
      this.showDialog('你确定要删除吗', this.handleDelete, this.closeDialog)
      this.deleteRow = row
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
    CurrentChange (val) {
      this.currentPage = val
      this.init()
    }
  }
}
