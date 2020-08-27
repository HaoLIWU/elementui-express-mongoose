<template>
  <div style="padding: 56px 6px 0px;">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-back mui-pull-left" @click="goback"></a>
      <h1 class="mui-title">{{title}}</h1>
      <div class="exit-img">
          <img src="../../assets/true.png" alt="exit" @click="mySave">
      </div>
    </header>
    <div>
      <!--时间、医生姓名、诊断-->
      <div class="content">
        <ul>
            <li>
                <label for="time">时间</label>
                <input type="datetime-local" id="time" v-model="createTime">
            </li>
            <li>
                <label for="doctor">医生姓名</label>
                <input type="text" id="doctor" v-model="doctorName">
            </li>
            <li>
                <label for="diagnosis">诊断(Imp)</label>
                <textarea name="diagnosis" id="diagnosis" rows="3" v-model="diagnosis"></textarea>
            </li>
            <li>
              <label for="remark">备注</label>
              <input type="text" id="remark" v-model="remark">
            </li>
        </ul>
      </div>
      <!--添加图片-->
      <div class="imgView">
        <img src="../../assets/addBig.png" alt="" @click="clickAdd" v-if="!isUpload">
        <div id="ImgArray" v-else :class="isClick===true?'':'isRes'">
          <img :src="imgUrl" alt="" @click="changeBig" :class="isClick===true?'hover':''" id="uploadImg1" v-if="imgUrl">
          <img :src="'http://127.0.0.1:3000/public/'+fileName" alt="" @click="changeBig" :class="isClick===true?'hover':''" id="uploadImg2" v-else>
          <img src="../../assets/delete.png"  @click="deleteImg" alt="" id="deleteImg">
        </div>
      </div>
    </div>
    <!--点击图片显示的黑色遮挡框，头部没遮-->
    <div id="shelter" @click="closedv" v-show="isClick" ref="shelter"></div>
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
    <!--点击添加图片时，显示的选择项-->
    <div id="picture" v-if="isClickAdd" class="mui-popover mui-popover-action mui-popover-bottom mui-active" style="left: 0;">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
            <a @click="openImage">拍照或选取</a>
            <input type="file" style="display: none;" accept="image/*" id="imgFile" @change="upload" name="file" v-if="isShowFile" capture="camera">
        </li>
      </ul>
      <ul class="mui-table-view">
          <li class="mui-table-view-cell">
              <a @click="close"><b>取消</b></a>
          </li>
      </ul>
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
  name: 'CaseAdd',
  mixins: [ComponentMixin, AddMixin],
  props: {
    title: {
      type: String,
      default () {
        return '添加病历'
      }
    },
    doctor_name: {
      type: String,
      default () {
        return ''
      }
    },
    fu_diagnosis: {
      type: String,
      default () {
        return ''
      }
    },
    fu_remark: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      doctorName: this.doctor_name,
      diagnosis: this.fu_diagnosis,
      remark: this.fu_remark
    }
  },
  methods: {
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
      that.isClickAdd = false
    },
    mySave () {
      let that = this
      let time = +new Date(that.createTime) // 将时间转为时间戳
      if (isNaN(time) || that.diagnosis === '' || that.doctorName === '') {
        Toast('对不起，前三项不能有空项')
        return false
      }
      that.isShowBox = true
    },
    submit () {
      const that = this
      const param = {
        createTime: +new Date(that.createTime),
        doctorName: that.doctorName,
        diagnosis: that.diagnosis,
        remark: that.remark,
        fileName: that.fileName
      }
      that.$emit('saveHandle', param)
      that.isShowBox = false
    }
  }
}
</script>
<style scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

img{
  width: 100%;
  height: 100%;
}

.exit-img{
  position: absolute;
  top: 12px;
  right: 10px;
  width: 26px;
}
.content {
  padding: 0 1rem 1rem;
}

.content ul {
}

.content ul > li {
  display: flex;
  margin-top: 3%;
  align-items: center;
}

.content ul > li > label {
  letter-spacing: 1px;
  width: 50px;
  margin-right: 10px;
  color: #127aa6;
}

.content ul > li > textarea {
  flex: 5;
}

.content ul > li > input {
  flex: 5;
}

.gallery {
  height: 19.2rem;
  margin: 0 auto;
  width: 18.8rem;
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

.hover {
  width: 24rem;
  height: 24rem;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -12rem;
  margin-top: -12rem;
  z-index: 1001;
}

</style>
