<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App222222222222222222222222"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import { values } from "@/apis/account";
import { userList } from "@/apis/user";

export default {
  name: "home",
  components: {
    HelloWorld
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
