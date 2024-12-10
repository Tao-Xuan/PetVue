<template>
  <div>
    <h1>欢迎来到我们的网站</h1>
    <button @click="goToLogin">登录</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
