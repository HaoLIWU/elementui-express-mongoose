export default {
  data () {},
  mounted () {
  },
  methods: {
    goExit () {
      let beforePath = this.$route.fullPath
      this.$router.push({ name: 'Edit', query: { beforeRouter: beforePath } })
    }
  }
}
