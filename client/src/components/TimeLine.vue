<template>
  <div>
    <!--时间线-->
    <div v-if="hasData" style="overflow: hidden;">
      <ul class="cbp_tmtimeline" id="timeLine">
        <li>
          <div v-for="(item, index) in caseData" :key="index" :class="{'cbp_div': index === (caseData.length - 1)}"
               @click="goDisplay(item)" @touchstart="showDelete(item._id)" @touchend="clearLoop">
            <div class="cbp_left">
              <span>{{ parseInt(item.createTime) | formatDate}}</span>
            </div>
            <div class="cbp_tmlabel">
              <div class="cbp_tmicon"></div>
              <div>
                <p><span style="color: black;font-size: 16px;">诊断：</span><span v-text="item.diagnosis=== ''? '暂无':item.diagnosis"></span></p>
                <p><span style="color: black;font-size: 16px;">医生姓名：</span><span v-text="item.doctorName=== ''? '暂无':item.doctorName"></span></p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--没数据时，显示没有记录-->
    <div class="noData" v-else>
      <img src="../assets/disease.png" alt="disease">
      <p>暂无病历记录</p>
    </div>

    <!--长按显示 提示删除 的div-->
    <div class="myBox" v-if="isDeleting">
      <div class="boxText">
        <p>你确定要删除吗？</p>
      </div>
      <div class="boxBottom">
        <p class="bd-r" @click="del">确定</p>
        <p @click="cancel">取消</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    caseData: {
      type: Array,
      default () {
        return []
      }
    },
    hasData: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      isDeleting: false, // 判断是否显示 长按的div
      Loop: '', // 定时器，判断长按一个div几秒后显示
      deleteId: ''
    }
  },
  methods: {
    // 显示 长按div
    showDelete (id) {
      const that = this
      that.deleteId = id
      that.clearLoop()
      that.Loop = setInterval(function () {
        that.isDeleting = true
      }, 1000)
    },
    // 清除 长按显示删除提示的定时器
    clearLoop () {
      clearInterval(this.Loop)
    },
    // /delete_EMR
    del () {
      const that = this
      that.isDeleting = false
      that.$emit('deleteHandle', that.deleteId)
    },
    // 长按提示框的 取消事件
    cancel () {
      this.isDeleting = false
    },
    // 跳转到 展示页面
    goDisplay (item) {
      let beforePath = this.$route.fullPath
      this.$store.commit('setValue', item)
      this.$router.push({name: 'Display', query: { beforeRouter: beforePath }})
    }
  },
  beforeDestroy () {
    this.clearLoop()
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      // let s = date.getSeconds()
      // s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
    }
  }
}
</script>

<style scoped>
  .noData{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -4rem;
    margin-top: -5rem;
    width: 8rem;
    height: 10rem;
  }
  .cbp_left{
    width: 100px;
    color: black;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    margin-bottom: -4rem;
  }
  .cbp_tmtimeline{
    width: 90%;
    margin: 4rem auto;
    padding: 0;
    list-style: none;
    position: relative;
  }

  /* The line */
  .cbp_tmtimeline:before{
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #b8cad6;
    left: 34%;
    margin-left: 3px;
  }

  .cbp_tmtimeline > li{
    position: relative;
  }
  .cbp_tmtimeline > li .cbp_tmlabel{
    margin: 6% 0 8% 47%;
    color: black;
    padding: 0 2rem;
    font-size: 1.2em;
    position: relative;
    border-radius: 5px;
  }
  .cbp_tmtimeline > li .cbp_tmicon {
    width: 1rem;
    height: 1rem;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    position: absolute;
    color: #fff;
    border-radius: 50%;
    left: 26%;
    top: 0;
    margin: 0 0 0 -52.5%;
    background-color: #46a4da;
    box-shadow: 0 0 0 3px #afdcf8;
  }
  .cbp_tmlabel p{
    text-align: left;
    text-indent: -3em;
    width: 110px;
  }
  .myBox{
    width: 13rem;
    height: 6rem;
    position: fixed;
    left: 50%;
    margin-left: -6.5rem;
    top: 50%;
    margin-top: -3rem;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
  }
  .boxText{
    display: flex;
    margin-bottom: 1.8rem;
    justify-content: center;
  }
  .boxText >  p{
    flex: 1;
    font-size: 16px;
    margin-bottom: 0;
  }

  .boxBottom{
    width: 100%;
    display: flex;
    text-align: center;
  }
  .boxBottom > p{
    width: 50%;
    color: #007aff;
    font-size: 18px;
    margin-bottom: 0;
  }
  .boxBottom > p:last-child{
    font-weight: 700;
  }
</style>
