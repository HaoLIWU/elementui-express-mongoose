<template>
  <div>
    <Table :tableHead="tableHead"
           :tableData="tableData"
           :count="count"
           :pageSize="pageSize"
           :currentPage="currentPage"
           @getCurrentPage="CurrentChange"
           @edit="handleEdit"
           @delete="isDelete" />
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
  name: 'DiaryMain',
  mixins: [MainMixin],
  data () {
    return {
      tableHead: [{
        label: 'id',
        width: '150',
        prop: '_id'
      }, {
        label: '创建时间',
        width: '150',
        prop: 'formatTime',
        sortable: true
      }, {
        label: '标题',
        width: '150',
        prop: 'title'
      }, {
        label: '内容',
        width: '180',
        prop: 'content'
      }, {
        label: '姓名',
        width: '120',
        prop: 'name'
      }, {
        label: '文件名称',
        width: '150',
        prop: 'fileName'
      }]
    }
  },
  methods: {
    handleDelete () {
      const param = {}
      const that = this
      param.id = that.deleteRow._id
      that.closeDialog()
      myPostAxios('/diary/delete', param)
        .then((response) => {
          const getData = response.data
          if (getData.code !== 1) {
            that.showDialog(getData.msg, that.closeDialog, that.closeDialog)
            return false
          }
          that.$nextTick(() => {
            return that.init()
          })
        })
    },
    init () {
      const that = this
      const param = {
        pageSize: that.pageSize,
        currentPage: that.currentPage
      }
      myGetAxios('/diary/getlist')
        .then((response) => {
          const getData = response.data
          that.count = getData.data.length
          const totalY = Math.ceil(that.count / that.pageSize)
          if (that.currentPage > totalY && that.count % 8 === 0 && that.count > 0) {
            that.currentPage -= 1
            param.currentPage -= 1
          }
          return myGetParamAxios('/diary/getlistByNum', { params: param })
        })
        .then((response) => {
          const getData = response.data
          console.log('init', getData)
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
