<template>
  <div>
    <Table :tableHead="tableHead"
           :tableData="tableData"
           :count="count"
           :pageSize="pageSize"
           :currentPage="currentPage"
           @edit="handleEdit"
           @delete="isDelete"
           @getCurrentPage="CurrentChange"/>
    <CenterDialog :centerDialogVisible="dialog.centerDialogVisible"
                  :dialogContent="dialog.dialogContent"
                  @confirm="dialog.confirm()"
                  @cancel="dialog.cancel()"
                  v-if="dialog.centerDialogVisible"/>
  </div>
</template>

<script>
import { myGetAxios, myPostAxios, myGetParamAxios } from '../../assets/myAxios'
import MainMixin from '../Mixinjs/MainMixin'
export default {
  name: 'MyMain',
  mixins: [MainMixin],
  data () {
    return {
      tableHead: [{
        label: 'id',
        width: '120',
        prop: '_id'
      }, {
        label: '姓名',
        width: '120',
        prop: 'name'
      }, {
        label: '用户名',
        width: '120',
        prop: 'username'
      }, {
        label: '性别',
        width: '120',
        prop: 'sex'
      }, {
        label: '电话号码',
        width: '120',
        prop: 'phoneNum'
      }, {
        label: '出生日期',
        width: '120',
        prop: 'formatTime',
        sortable: true
      }, {
        label: '密码',
        width: '120',
        prop: 'password'
      }]
    }
  },
  methods: {
    handleDelete () {
      const param = {}
      const that = this
      param.id = that.deleteRow._id
      that.closeDialog()
      myPostAxios('/user/delete', param)
        .then((response) => {
          console.log(response)
          const getData = response.data
          if (getData.code !== 1) {
            that.showDialog(getData.msg, that.closeDialog, that.closeDialog)
            return false
          }
          return that.init()
        })
    },
    init () {
      const that = this
      const param = {
        currentPage: that.currentPage,
        pageSize: that.pageSize
      }
      myGetAxios('/user/getlist')
        .then((response) => {
          const getData = response.data
          that.count = getData.data.length
          const totalY = Math.ceil(that.count / that.pageSize)
          if (that.currentPage > totalY && that.count % 8 === 0 && that.count > 0) {
            that.currentPage -= 1
            param.currentPage -= 1
          }
          return myGetParamAxios('/user/getlistByNum', { params: param })
        })
        .then((response) => {
          const getData = response.data
          console.log('init', getData)
          that.tableData = [...getData.data]
          for (let i = 0; i < that.tableData.length; i++) {
            that.tableData[i].formatTime = that.formatDate(parseInt(that.tableData[i].birth))
          }
        })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  }
}
</script>

<style scoped>

</style>
