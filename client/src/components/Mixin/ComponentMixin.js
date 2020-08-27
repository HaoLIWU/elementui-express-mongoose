export default {
  data () {},
  mounted () {
    document.getElementById('bar').style.display = 'none'
  },
  methods: {
    goback () {
      this.$emit('clickBack')
    }
  }
}
