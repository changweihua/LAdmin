<template>
  <div>
    <el-container class="main">
      <el-aside :class="{ asideCollapse: isCollapse }">
        <div>
          <div class="isClossTab">
            <fa-icon :icon="['fab', 'amilia']" />
          </div>
          <sidebar :is-collapse="isCollapse" />
        </div>
        </el-aside>
        <el-container>
          <el-header class="main-header">
            <div id="topbar-wrap">
              <el-row type="flex" justify="space-between">
                <el-col :span="1">
                  <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="isClossTabFun" ></i>
                </el-col>
                <el-col :span="15">
                  <el-row type="flex" class="row-right" justify="end">
                    <el-col :span="5">
                      <a class="animated fadeIn"></a>
                    </el-col>
                    <el-col :span="2">
                      <a><fa-icon icon="language"></fa-icon></a>
                    </el-col>
                    <el-col :span="4">
                      <a class="animated fadeIn">{{currentUser.username}}</a>
                    </el-col>
                    <el-col :span="2">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                          <img src="avator.png" alt="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="logout"><fa-icon icon="language"></fa-icon> {{$t("logout")}}</el-dropdown-item>
                          <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
                          <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">English</el-dropdown-item>
                          <el-dropdown-item command="send">Send</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-header>
          <el-main class="main-body">
            <el-row v-if="showCrumb">
              <el-col col="24">
                <el-card shadow="never">
                  <breadcrumb />
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col col="24">
                <router-view />
              </el-col>
            </el-row>
          </el-main>
        <el-footer class="main-footer" height="50px">
          <p>&copy; 2018-2019</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

@import '../../assets/main.css'
</style>

<style scoped lang="scss">
$header-height: 60px;
$background-color: #545c64;
$color: #fff;

.el-aside {
  width: 200px !important;
  transition: all 0.5s;
}

.asideCollapse {
  width: 64px !important;
  transition: all 0.5s;
}

#topbar-wrap {
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  color: #353d47;
  z-index: 4;
  box-sizing: border-box;
  height: $header-height;
  a {
    line-height: $header-height;
    color: #fff !important;
  }
  i {
    color: #fff !important;
    font-size: 20px;
    line-height: $header-height;
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
    }
  }
  .fa-language:hover {
    transform: rotateY(180deg);
  }
  .logout {
    text-decoration: none;
    &:hover {
      color: #1dc4e9;
    }
  }
}
.row-right > div {
  text-align: center;
  padding-right: 10px;
}

.main {
  height: 100vh;
  min-width: 800px;
  min-height: 600px;
  overflow: hidden;
  aside {
    overflow: visible;
    height: 100%;
    background-color: $background-color;
    color: $color;
    .isClossTab {
      width: 100%;
      height: $header-height;
      cursor: pointer;
      font-size: 25px;
      text-align: center;
      line-height: $header-height;
      font-weight: bold;
      border-right: 1px solid #807c7c;
      box-sizing: border-box;
    }
    .menu {
      width: 100%;
      border-right: 0 !important;
    }
  }
  .main-header {
    background-color: $background-color;
    padding: 0;
    color: $color;
    .el-dropdown {
      cursor: pointer;
      float: right;
    }
    .el-dropdown-link {
      img {
        $imgMargin: (($header-height - 50)/2);
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: #fff;
        margin-top: $imgMargin;
      }
    }
  }
  .crumbs {
    margin-bottom: 20px;
  }
  .main-footer {
    text-align: center;
    background-color: $background-color;
    color: $color;
    line-height: 50px;
  }

  .main-body .el-card {
    margin-top: 5px;
    margin-bottom: 5px;
    &:first-child {
      margin-top: 0;
    }
  }
}


</style>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminLayout',
  data() {
    return {
      showCrumb: true,
      isCollapse: false,
      tabWidth: 200,
      test1: 1,
      intelval: null,
      connection: null
    }
  },
  created() {
    console.log('Admin created')
  },
  watch: {
    "$route": {
      handler: function(newVal, oldVal) {
        console.log('$route')
        // 获取当前路径
        let routeName = this.$route.name
        this.showCrumb = routeName !== 'dashboardIndex'
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState(['CURRENT_USER', 'CRUMB_VISIBILITY']),
    ...mapGetters(['userProfile', 'currentUser'])
  },
  mounted() {
    console.log('Admin mounted')
    this.loadForms()
    this.loadModules()
  },
  methods: {
    ...mapActions({
      loadForms: 'LOAD_FORM_MODELS',
      loadModules: 'LOAD_SYSTEM_MODULES'
    }),
    handleCommand(command) {
      let that = this
      if (command === 'logout') {
        that.$store.commit('SET_CURRENT_USER', null)
        that.$store.commit('SET_JWT_TOKEN', null)
        that.$router.replace({
          name: 'login'
        })
      } else if (command === 'send') {
      } else if (command === 'lock') {
      }
    },
    isClossTabFun() {
      this.isCollapse = !this.isCollapse
    },
    toggleLang(lang) {
      if (lang === 'zh') {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
      } else if (lang === 'en') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      }
    }
  }
}
</script>
