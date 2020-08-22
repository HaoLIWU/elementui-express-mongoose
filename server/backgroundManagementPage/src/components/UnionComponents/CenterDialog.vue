<template>
  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center top="30vh">
    <span>{{dialogContent}}</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancelHandle">取 消</el-button>
        <el-button type="primary" @click="dialogComfirmHandle">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CenterDialog',
  props: {
    dialogContent: {
      type: String,
      default () {
        return ''
      }
    },
    centerDialogVisible: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    dialogCancelHandle () {
      this.$emit('cancel')
    },
    dialogComfirmHandle () {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped>

</style>
