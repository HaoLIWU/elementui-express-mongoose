export default {
  data () {
    return {
      beforeRoute: this.$route.query.beforeRouter, // 记载前一个路由
      isDiary: true
    }
  },
  mounted () {
    this.isDiary = !!(this.beforeRoute.indexOf('diary') >= 0)
  },
  methods: {
    goback () {
      this.$router.push({ path: this.beforeRoute })
    }
  }
}
