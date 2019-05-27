<template>
  <div id="app">
    <transition name="el-zoom-in-center">
      <!-- <blankLayout v-if="isLogined" />
      <adminLayout v-else /> -->
      <router-view />
    </transition>
    <!-- <loading /> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLogined: false
    }
  },
  mounted() {
    // 动态设置背景图的高度为浏览器可视区域高度
    // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
    // this.clientHeight = `${document.documentElement.clientHeight}px`;
    // // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
    // const that = this;
    // window.onresize = function temp() {
    //     that.clientHeight = `${document.documentElement.clientHeight}px`;
    // };
  }
  // components: {
  //   adminLayout: () => import("@/layout/Admin.vue"),
  //   blankLayout: () => import("@/layout/Blank.vue")
  // }
}
</script>

<style lang="scss">
#app {
  font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $highlight-color;
}
</style>
