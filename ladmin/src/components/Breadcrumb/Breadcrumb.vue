<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <template v-if="!item.redirect||Object.prototype.toString.call(item.redirect) === '[object String]'">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ $t(item.meta.title||item.name) }}</span>
          <router-link v-else :to="{ to: item.redirect||item.name }">{{ $t(item.meta.title||item.name) }}</router-link>
        </template>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      
      const first = matched[0]
      // if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
      // }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  // line-height: 50px;
  // margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
