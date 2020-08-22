<template>
  <div>
    <Table :tableHead="tableHead"
           :tableData="tableData"
           :count="count"
           :pageSize="pageSize"
           :currentPage="currentPage"
           @getCurrentPage="CurrentChange"
           @edit="handleEdit"
           @delete="isDelete"/>
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
  name: 'IllMain',
  mixins: [MainMixin],
  data () {
    return {
      tableHead: [{
        label: 'id',
        width: '170',
        prop: '_id'
      }, {
        label: '时间',
        width: '120',
        prop: 'formatTime',
        sortable: true
      }, {
        label: '姓名',
        width: '120',
        prop: 'name'
      }, {
        label: '诊断',
        width: '120',
        prop: 'diagnosis'
      }, {
        label: '医生姓名',
        width: '120',
        prop: 'doctorName'
      }, {
        label: '备注',
        width: '120',
        prop: 'remark'
      }, {
        label: '文件名称',
        width: '150',
        prop: 'fileName'
      }]
    }
  },
  methods: {
    handleDelete () {
      const that = this
      const deleteParam = {}
      deleteParam.id = this.deleteRow._id
      that.closeDialog()
      myPostAxios('/ill/delete', deleteParam)
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
      myGetAxios('/ill/getlist')
        .then((response) => {
          const getData = response.data
          that.count = getData.data.length
          // 9 -> 8  2 -> 1 总页数=Math.ceil(that.count/that.pageSize)
          // that.currentPage 大于总页数， 那应该减一，，否则不用
          const totalY = Math.ceil(that.count / that.pageSize)
          if (that.currentPage > totalY && that.count % 8 === 0 && that.count > 0) {
            that.currentPage -= 1
            param.currentPage -= 1
          }
          return myGetParamAxios('/ill/getlistByNum', { params: param })
        })
        .then((response) => {
          const getData = response.data
          that.tableData = [...getData.data]
          for (let i = 0; i < that.tableData.length; i++) {
            that.tableData[i].formatTime = that.formatDate(parseInt(that.tableData[i].createTime))
          }
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped>

</style>
