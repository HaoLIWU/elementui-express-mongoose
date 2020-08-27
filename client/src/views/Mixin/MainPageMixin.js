export default {
  data () {
    return {
      hasData: true, // 判断是否有数据，默认为没有
      myload: false
    }
  },
  mounted () {
    document.getElementById('bar').style.display = 'block'
    this.init()
  },
  methods: {
    goAdd () {
      let beforePath = this.$route.fullPath
      this.$router.push({name: 'Add', query: { beforeRouter: beforePath }})
    }
  }
}
