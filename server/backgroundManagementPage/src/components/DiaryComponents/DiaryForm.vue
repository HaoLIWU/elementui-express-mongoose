<template>
   <div class="diary">
     <h2 v-if="isAdd">添加日记数据</h2>
     <h2 v-else>修改日记数据</h2>
     <el-form ref="form" :model="form" label-width="80px" class="DiaryFrom" label-position="left">
       <el-form-item label="日记标题">
         <el-input v-model="form.title" maxlength="12" show-word-limit></el-input>
       </el-form-item>
       <el-form-item label="日记内容">
         <el-input v-model="form.content" type="textarea" maxlength="300" show-word-limit></el-input>
       </el-form-item>
       <el-form-item label="姓名">
         <el-input v-model="form.name" maxlength="8" show-word-limit></el-input>
       </el-form-item>
       <el-form-item label="文件">
         <el-upload
           class="avatar-uploader"
           action="http://127.0.0.1:3000/upload"
           :show-file-list="false"
           :on-success="handleAvatarSuccess"
           :before-upload="beforeAvatarUpload">
           <div v-if="isAdd">
             <img v-if="form.fileName" :src="form.fileName" class="avatar">
             <i v-else class="el-icon-plus avatar-uploader-icon uploadIcon"></i>
           </div>
           <div v-else>
             <div v-if="hasImage">
               <img :src="'http://127.0.0.1:3000/public/' + form.fileName" class="avatar">
             </div>
             <div v-else>
               <img v-if="form.fileName" :src="form.fileName" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon uploadIcon"></i>
             </div>
           </div>
         </el-upload>
       </el-form-item>
       <el-form-item class="submitButton">
         <el-button type="primary" @click="onSubmit"><span v-if="isAdd">立即创建</span><span v-else>立即更新</span></el-button>
         <el-button @click="formCancelHandle">取消</el-button>
       </el-form-item>
     </el-form>
     <CenterDialog :centerDialogVisible="dialog.centerDialogVisible"
                   :dialogContent="dialog.dialogContent"
                   @confirm="dialog.confirm()"
                   @cancel="dialog.cancel()"
                   v-if="dialog.centerDialogVisible"/>
   </div>
</template>

<script>
import { myPostAxios } from '../../assets/myAxios'
import FormMixin from '../Mixinjs/FormMixin'
export default {
  name: 'DiaryForm',
  mixins: [FormMixin],
  props: {
    obj: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CenterDialog: () => import('../UnionComponents/CenterDialog')
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        name: '',
        fileName: '' // blob 格式的临时路径
      },
      fileList: [],
      successImageUrl: '', // 服务器返回的路径
      hasImage: false // 判断进来修改时，图片的状态
    }
  },
  methods: {
    onSubmit () {
      const that = this
      if (!that.form.name || !that.form.title || !that.form.content) {
        that.showDialog('请填完必填项', that.closeDialog, that.closeDialog)
        return false
      }
      const param = {
        name: that.form.name,
        title: that.form.title,
        content: that.form.content,
        fileName: that.successImageUrl.toString()
      }
      if (that.isAdd) {
        param.createTime = +new Date()
        myPostAxios('/diary/add', param)
          .then((response) => {
            const getData = response.data
            if (getData.code === 1) {
              that.$router.push({ name: 'Index' })
            } else {
              that.showDialog(getData.msg, that.closeDialog, that.closeDialog)
            }
          })
      } else {
        param.id = that.form._id
        param.createTime = that.form.createTime
        myPostAxios('/diary/update', param)
          .then((response) => {
            const getData = response.data
            if (getData.code === 1) {
              that.$router.push({ name: 'Index' })
            } else {
              that.showDialog(getData.msg, that.closeDialog, that.closeDialog)
            }
          })
      }
    }
  },
  mounted () {
    const that = this
    if (Object.keys(that.obj).length === 0) {
      that.isAdd = true
    } else {
      that.form = that.obj
      that.successImageUrl = that.obj.fileName
      that.isAdd = false
      that.hasImage = !!that.form.fileName // 有内容时为 true
    }
  }
}
</script>

<style scoped>
.diary {
  overflow: hidden;
}

.DiaryFrom {
  width: 780px;
  padding-top: 20px;
  margin: 0 auto;
}

.submitButton {
  margin-top: 40px;
  margin-left: 0;
}
.avatar-uploader .uploadIcon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .uploadIcon:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
