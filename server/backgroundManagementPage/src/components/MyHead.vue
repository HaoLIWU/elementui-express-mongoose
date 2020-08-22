<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="2" :offset="20">
          <el-button plain @click="goAdd">Add</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'MyHead',
  data () {
    return {
      select: '',
      search: ''
    }
  },
  methods: {
    goAdd () {
      this.$router.push({ name: 'Edit' })
    }
  }
}
</script>

<style scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .prepend {
  width: 120px;
}
</style>
