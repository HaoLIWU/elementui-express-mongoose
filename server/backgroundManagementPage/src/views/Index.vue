<template>
  <div>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-avatar class="avatar" shape="square" :src="url"></el-avatar>
        <p>admin</p>
        <el-menu @select="selectHandle" :default-active="selectedKey" background-color=" #fafafa">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-reading"></i>数据管理</template>
            <el-menu-item index="1-1">个人信息</el-menu-item>
            <el-menu-item index="1-2">日记</el-menu-item>
            <el-menu-item index="1-3">病历</el-menu-item>
          </el-submenu>
          <el-menu-item @click="signOut">
            <i class="el-icon-menu"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <my-head />
        </el-header>
        <el-main>
          <UserMain v-if="this.selectedKey === '1-1'"/>
          <DiaryMain v-else-if="this.selectedKey === '1-2'"/>
          <IllMain v-else />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyHead from '../components/MyHead'
export default {
  name: 'Index',
  components: {
    UserMain: () => import('../components/UserComponents/UserMain'),
    DiaryMain: () => import('../components/DiaryComponents/DiaryMain'),
    IllMain: () => import('../components/IllComponents/IllMain'),
    MyHead
  },
  data () {
    return {
      url: require('../assets/logo.jpg'),
      selectedKey: this.$store.state.selectKey
    }
  },
  methods: {
    selectHandle (index, keyPath) {
      this.selectedKey = index
      this.$store.commit('setKey', this.selectedKey)
      console.log(this.selectedKey)
    },
    signOut () {
      localStorage.removeItem('id')
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    if (!localStorage.getItem('id')) {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #eee;
  color: #333;
  line-height: 60px;
}

.aside {
  /*color: #333;*/
  /*width: 160px;*/
  padding-top: 40px;
  background-color: #fafafa;
}

.avatar {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
</style>
