<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world msg="Welcome to Your Vue.js App222222222222222222222222"/>
    <loading />
    abc
  </div>
</template>

<script>
import { values } from "@/apis/account";
import { userList } from "@/apis/user";

export default {
  name: "home",
  components: {
  },
  mounted() {
    values().then(res => {
      console.log(res);
    });
    userList().then(res => {
      console.log(res);
    });
  }
};
</script>
