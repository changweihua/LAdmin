<template>
  <div>
    <el-container class="main">
      <el-aside :class="{ asideCollapse: isCollapse }">
        <div>
          <div class="isClossTab">
            <fa-icon :icon="['fab', 'amilia']" />
          </div>
          <sidebar />
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
                      <a class="animated fadeIn">{{CURRENT_USER.userName}}</a>
                    </el-col>
                    <el-col :span="2">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                          <img src="avator.jpg" alt="">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="logout"><fa-icon icon="language"></fa-icon> {{$t("logout")}}</el-dropdown-item>
                          <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
                          <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">English</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-header>
          <el-main>
            <el-breadcrumb separator="/" class="crumbs">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div>
              <router-view />
            </div>
          </el-main>
        <el-footer class="main-footer" height="50px">
          <p>页脚</p>
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
  a {
    line-height: $header-height;
  }
  i {
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
      border-right: 0;
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
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminLayout",
  data() {
    return {
      isCollapse: false,
      tabWidth: 200,
      test1: 1,
      intelval: null
    };
  },
  computed: {
    ...mapState(["CURRENT_USER"])
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
      if (command === "logout") {
        localStorage.JWT_TOKEN = "";
        this.$router.replace({
          name: "login"
        });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isClossTabFun() {
      // clearInterval(this.intelval);
      // if (!this.isCollapse) {
      //   this.intelval = setInterval(() => {
      //     if (this.tabWidth <= 64) {
      //       clearInterval(this.intelval);
      //     }
      //     this.tabWidth -= 1;
      //   }, 1);
      // } else {
      //   this.tabWidth = 200;
      // }
      this.isCollapse = !this.isCollapse;
    },
    toggleLang(lang) {
      if (lang == "zh") {
        localStorage.setItem("locale", "zh");
        this.$i18n.locale = localStorage.getItem("locale");
        this.$message({
          message: "切换为中文！",
          type: "success"
        });
      } else if (lang == "en") {
        localStorage.setItem("locale", "en");
        this.$i18n.locale = localStorage.getItem("locale");
        this.$message({
          message: "Switch to English!",
          type: "success"
        });
      }
    }
  }
};
</script>
