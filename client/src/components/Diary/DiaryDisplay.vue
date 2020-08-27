<template>
  <div class="diaryText">
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="goback"></a>
      <h1 class="mui-title">日记正文</h1>
      <div class="exit-img">
        <img src="../../assets/estimate.png" alt="exit" @click="goExit">
      </div>
    </header>
     <div class="dText">
      <div class="title">{{getJson.title}}</div>
      <div class="content">
        <div class="contentText">{{getJson.content}}</div>
        <div class="gallery" v-if="getJson.fileName">
          <img :src="'http://127.0.0.1:3000/public/'+getJson.fileName" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentMixin from '../Mixin/ComponentMixin'
import DisplayMixin from '../Mixin/DisplayMixin'
export default {
  name: 'DiaryDisplay',
  mixins: [ComponentMixin, DisplayMixin],
  data () {
    return {
      getJson: this.$store.state.obj
    }
  }
}
</script>
<style scoped>
img{
  width: 100%;
  height: 100%;
}
.exit-img{
  position: absolute;
  top: 12px;
  right: 10px;
  width: 24px;
  height: 24px;
}
.diaryText {
  padding: 44px 10px 0;
}
.gallery {
  height: 19.2rem;
  margin: 18px auto;
  width: 18.8rem;
}
.contentText {
  text-align: left;
  word-wrap: break-word;
  word-break: normal;
  text-indent: 2rem;
}
</style>
