export default {
  props: {
    create_time: {
      type: String,
      default () {
        return ''
      }
    },
    file_name: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      createTime: this.create_time,
      fileName: this.file_name,
      isClick: false, // 判断上传后的照片是否被点击，如果点击，则放大图片
      isClickAdd: false,
      imgUrl: '', // 保存DOM生成的临时照片路径
      isUpload: false, // 判断是否已经上传图片，上传后改为true，隐藏掉 加号图片
      isShowFile: true, // 设置上传图片，避免多次几点上传后，上传失效，点不出来,
      isShowBox: false
    }
  },
  mounted () {
    let windowHeight = window.screen.height
    let elementHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight
    let orderHeight = windowHeight > elementHeight ? windowHeight : elementHeight
    this.$refs.shelter.style.height = (orderHeight - 44) + 'px'
    this.isUpload = !!this.fileName
  },
  methods: {
    cancel () {
      this.isShowBox = false
    },
    changeBig () {
      this.isClick = true
    },
    closedv () {
      this.isClick = false
    },
    deleteImg () {
      this.isShowFile = true
      this.isUpload = false
      this.imgUrl = ''
      this.fileName = ''
    },
    openImage () {
      document.getElementById('imgFile').click()
    },
    clickAdd () {
      this.isClickAdd = true
    },
    close () {
      this.isClickAdd = false
    }
  }
}
