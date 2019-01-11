<template>
  <div id="abc" class="outer-container">
    <div class="inner-container">
      <router-view />
    </div>
  </div>
</template>


<script>
export default {
  name: "BlankLayout"
};
</script>

<style scoped>

html,
body {
  height: 100%;
}

.outer-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.inner-container {
  position: absolute; left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}

 /* for Chrome */
.inner-container::-webkit-scrollbar {
  display: none;
}
</style>

