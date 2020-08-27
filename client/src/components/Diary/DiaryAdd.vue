<template>
  <div class='diaryadd'>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
      <h1 class="mui-title">{{diaryTitle}}</h1>
      <div class="exit-img">
        <img src="../../assets/true.png" alt="save" @click="mySave">
      </div>
    </header>
    <div class="diaryNameDv">
      <div v-if="comeAdd">
        <label for="titleName" style="flex: 1;">标题</label>
        <input type="text" name="titleName" id="titleName" style="flex: 4;" v-model="title" >
      </div>
      <div v-else>
        <label for="titleName1" style="flex: 1;">标题</label>
        <input type="text" name="titleName1" id="titleName1" style="flex: 4;" v-model="title" disabled>
      </div>
      <p v-if="!comeAdd">标题不可以修改</p>
    </div>
    <div class="detailDiary">
      <!--<p>日记文本内容</p>-->
      <textarea name="" id="detail" cols="30" rows="5" placeholder="请输入日记内容" v-model="content"></textarea>
    </div>
    <div class="imgView">
      <img src="../../assets/addBig.png" alt="" @click="clickAdd" v-if="!isUpload">
      <div id="ImgArray" v-else :class="isClick===true?'':'isRes'">
        <img :src="imgUrl" alt="" @click="changeBig" :class="isClick===true?'hover':''" id="uploadImg1" v-if="imgUrl">
        <img :src="'http://127.0.0.1:3000/public/'+fileName" alt="" @click="changeBig" :class="isClick===true?'hover':''" id="uploadImg2" v-else>
        <img src="../../assets/delete.png"  @click="deleteImg" alt="" id="deleteImg">
      </div>
    </div>
    <!--点击图片显示的黑色遮挡框，头部没遮-->
    <div id="shelter" @click="closedv" v-show="isClick" ref="shelter"></div>
    <!--点击添加图片时，显示的选择项-->
    <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom mui-active" v-if="isClickAdd" style="left: 0;">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
            <a @click="openImage">拍照或选取</a>
            <input type="file" style="display: none;" accept="image/*" id="imgFile" @change="upload" name="imageFile" v-if="isShowFile">
        </li>
      </ul>
      <ul class="mui-table-view">
          <li class="mui-table-view-cell">
              <a @click="close"><b>取消</b></a>
          </li>
      </ul>
    </div>
    <!--提示框-->
    <div class="myBox" v-if="isShowBox">
      <div class="boxText">
        <p>你确定要提交吗？</p>
      </div>
      <div class="boxBottom">
        <p class="bd-r" @click="submit">确定</p>
        <p @click="cancel">取消</p>
      </div>
    </div>
     <!--mui自带的遮挡框，全部遮挡-->
    <div class="mui-backdrop mui-backdrop-action mui-active" v-if="isClickAdd"></div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { myFormAxios } from '../../../static/js/myAxios'
import ComponentMixin from '../Mixin/ComponentMixin'
import AddMixin from '../Mixin/AddMixin'
export default {
  name: 'DiaryAdd',
  mixins: [ComponentMixin, AddMixin],
  props: {
    diaryTitle: {
      type: String,
      default () {
        return '添加日记'
      }
    },
    fu_title: {
      type: String,
      default () {
        return ''
      }
    },
    fu_content: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      title: this.fu_title,
      content: this.fu_content,
      comeAdd: true
    }
  },
  mounted () {
    this.comeAdd = this.diaryTitle !== '修改日记'
  },
  methods: {
    mySave () {
      let that = this
      // let formData = new FormData()
      if (!that.title || !that.content) {
        Toast('标题或内容不能为空')
        return false
      }
      that.isShowBox = true
    },
    submit () {
      const that = this
      if (!that.createTime) {
        that.createTime = +new Date()
      }
      const param = {
        createTime: that.createTime,
        content: that.content,
        title: that.title,
        fileName: that.fileName
      }
      that.$emit('saveHandle', param)
      that.isShowBox = false
    },
    upload (e) {
      const that = this
      const formDate = new FormData()
      let imageFile = e.srcElement.files[0]
      let imgURL = window.URL.createObjectURL(imageFile)
      that.isShowFile = false // 点击上传时，避免input file 多次被点击失效
      that.isUpload = true // 点击上传时，将加号图片隐藏起来
      that.imgUrl = imgURL
      formDate.append('file', imageFile)
      myFormAxios('/upload', formDate)
        .then((response) => {
          const getData = response.data
          if (getData.code === 1) {
            that.fileName = getData.path
          } else {
            Toast(getData.msg)
          }
        })
      that.isShowBox = false
      this.isClickAdd = false
    }
  }
}
</script>
<style scoped>
img{
  width: 100%;
  height: 100%;
}
.diaryadd{
  padding: 44px 20px 20px;
}
.diaryNameDv{
  text-align: left;
  padding: 14px 0;
 /* border-bottom: 1px solid #ccc;*/
}
.diaryNameDv > div{
  display: flex;
  align-items: center;
}
.diaryNameDv > p{
  color: darkred;
  margin-bottom: 0;
  margin-top: 10px;
}
.detailDiary{
  padding-bottom: 2rem;
}
.detailDiary > p{
  color: #2c3e50;
  font-size: 16px;
  margin-bottom: 0;
  padding: 14px 0;
  text-align: left;
}
#ImgArray{
  position: relative;
}
.imgView {
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.8rem;
  margin-right: 1.3rem;
  float: left;
}
.imgView:nth-of-type(3n) {
  margin-right: 0;
}
.exit-img{
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 22px;
}
#shelter {
  z-index: 1000;
  background-color: black;
  width: 100%;
  position: fixed;
  top: 44px;
  left: 0;
  opacity: 0.6;
  bottom: 0;
}
#deleteImg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: -0.6rem;
  right: -1rem;
}
</style>
