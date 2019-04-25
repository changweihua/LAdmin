<template>
  <!-- <el-menu
    :unique-opened='true'
    mode="vertical"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b" >
    <template v-for="issue in routers">
      <template v-for="(item, index) in issue.children">
        <el-submenu v-if="!item.leaf" :key="item.name" :index="index+''">
          <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.children}}</span></template>
          <el-menu-item
            v-for="term in item.children"
            :key="term.path"
            :index="term.path"
            :class="$route.path==term.path?'is-active':''">
            <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else-if="item.leaf"
          :key="item.name"
          :index="item.path"
          :class="$route.path==item.path?'is-active':''">
          <i :class="item.iconCls"></i><span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu> -->
  <el-menu 
    :unique-opened='true'
    mode="vertical"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <template v-for="item in sideRouters">
      <el-submenu :key="item.name" :index="item.name" v-if="!item.leaf">
        <template slot="title">
          <fa-icon icon="language"></fa-icon> {{item.name}}
        </template>
        <router-link v-for="child in item.children" :key="child.path" class="title-link" :to="{ name: child.name }">
          <el-menu-item :index="item.path+'/'+child.path">
            {{child.name}}
          </el-menu-item>
        </router-link>
      </el-submenu>
      <router-link :key="item.name" v-if="item.leaf&&item.children&&item.children.length>0" :to="'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <fa-icon icon="language"></fa-icon> {{item.name}}
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters([
      'sideRouters'
    ])
  },
  watch: {}
}
</script>
