<template>
  <div id="login">
    <h2>病历管理员系统</h2>
    <LoginInput />
  </div>
</template>

<script>

import LoginInput from '../components/LoginInput'
export default {
  name: 'Login',
  components: {
    LoginInput
  }
}
</script>
<style scoped>
#login {
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/loginBGI.jpg");
}
h2 {
  margin-top: 120px;
  margin-bottom: 40px;
}
</style>
