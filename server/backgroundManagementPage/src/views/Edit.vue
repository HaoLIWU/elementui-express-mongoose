<template>
  <div>
    <UserForm v-if="key === '1-1'" :obj="obj"/>
    <DiaryForm v-else-if="key === '1-2'" :obj="obj"/>
    <IllForm v-else :obj="obj"/>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  components: {
    IllForm: () => import('../components/IllComponents/IllForm'),
    DiaryForm: () => import('../components/DiaryComponents/DiaryForm'),
    UserForm: () => import('../components/UserComponents/UserForm')
  },
  data () {
    return {
      key: this.$store.state.selectKey,
      obj: this.$route.query.obj
    }
  },
  mounted () {
    console.log('11')
    if (!localStorage.getItem('id')) {
      console.log('22')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>

</style>
