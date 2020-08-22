<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'formatTime', order: 'descending'}">
      <el-table-column v-for="(item, index) in tableHead"
                       :label="item.label"
                       show-overflow-tooltip
                       :width="item.width"
                       :prop="item.prop"
                       :key="index"
                       :sortable="sortable">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="tableEditHandle(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="tableDeleteHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableHead: {
      type: Array,
      default () {
        return []
      }
    },
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    currentPage: {
      type: Number,
      default () {
        return 1
      }
    },
    count: {
      type: Number,
      default () {
        return 0
      }
    },
    pageSize: {
      type: Number,
      default () {
        return 8
      }
    },
    sortable: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    tableEditHandle (row) {
      this.$emit('edit', row)
    },
    tableDeleteHandle (row) {
      this.$emit('delete', row)
    },
    handleCurrentChange (val) {
      this.$emit('getCurrentPage', val)
    }
  }
}
</script>

<style scoped>

</style>
