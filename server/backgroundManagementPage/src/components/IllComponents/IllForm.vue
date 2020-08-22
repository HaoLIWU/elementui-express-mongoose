<template>
    <div class="ill">
      <h2 v-if="isAdd">添加病例数据</h2>
      <h2 v-else>修改病例数据</h2>
      <el-form ref="form" :model="form" label-width="80px" class="IllFrom" label-position="left">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="form.createTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="诊断">
          <el-input v-model="form.diagnosis" type="textarea" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-row :gutter="40">
          <el-col :span="10">
            <el-form-item label="姓名">
              <el-input v-model="form.name" maxlength="8" show-word-limit></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="医生姓名">
              <el-input v-model="form.doctorName" maxlength="8" show-word-limit></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="form.remark" maxlength="20" show-word-limit></el-input>
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
  name: 'IllForm',
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
        diagnosis: '',
        remark: '',
        name: '',
        doctorName: '',
        createTime: '',
        fileName: '' // blob 格式的临时路径
      },
      // isAdd: true,
      successImageUrl: '',
      hasImage: false
      // centerDialogVisible: false
    }
  },
  methods: {
    onSubmit () {
      const that = this
      if (!that.form.name || !that.form.createTime || !that.form.doctorName || !that.form.diagnosis) {
        that.showDialog('请填完必填项', that.closeDialog, that.closeDialog)
        return false
      }
      // 将中国标准时间转为时间戳
      const date = new Date(that.form.createTime).getTime()
      const param = {
        name: that.form.name,
        doctorName: that.form.doctorName,
        diagnosis: that.form.diagnosis,
        remark: that.form.remark,
        createTime: date,
        fileName: that.successImageUrl.toString()
      }
      if (that.isAdd) {
        myPostAxios('/ill/add', param)
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
        myPostAxios('/ill/update', param)
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
      that.form.createTime = that.formatDate(parseInt(that.obj.createTime))
      console.log(that.obj)
      console.log(that.form.createTime)
    }
  }
}
</script>

<style scoped>
.ill{
  overflow: hidden;
}
.IllFrom {
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
