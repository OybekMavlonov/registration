<template>
  <div class="home">
    <div class="user-info">
      <h2 class="text-center">User Info</h2>
      <ul v-if="userInfo">
        <li class="id">"id": {{ userInfo.id }}</li>
        <li class="fullName">"fullName": {{ userInfo.fullName }}</li>
        <li class="nickname">"nickname": {{ userInfo.nickname }}</li>
        <li class="phone">"phone": {{ userInfo.phone }}</li>
        <li class="gender">"gender": {{ userInfo.gender }}</li>
        <li class="country">"country": {{ userInfo.country }}</li>
        <li class="city">"city": {{ userInfo.city }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  components: {},
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss">
ul {
  width: 400px;
  margin: 0 auto;
  li {
    list-style-type: none;
    padding: 8px;
    margin: 5px 0;
    color: #111;
    border: 1px solid salmon;
    font-size: 16px;
    background: pink;
    font-weight: bold;
    border-radius: 10px;
  }
}
</style>
