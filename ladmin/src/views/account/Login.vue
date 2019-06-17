<template>
  <!--背景图-->
  <div ref="noteContainer" class="note" :style="note" v-wresize="windowResize">
    <!--login框，表单+tab标签页的组合-->
    <div class="loginFrame">
      <el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px" class="login-container">
        <el-form-item prop="userName">
          <el-input type="text" prefix-icon="el-icon-user" v-model="account.userName" auto-complete="off" placeholder="请输入您的账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-key" v-model="account.password" auto-complete="off" placeholder="请输入密码" />
        </el-form-item>
        <div class="formButton">
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click="handleLoginClick" >登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, auth } from '@/apis/account'
import { mapActions } from 'vuex'

export default {
  name: 'AccountLogin',
  data() {
    return {
      logining: false,
      note: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100% !important',
        backgroundImage: 'url(' + require('@/assets/login-bg.jpg') + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      },
      account: {
        userName: '',
        password: '',
        client_id: 'ancdkfsdfds',
        client_secret: 'dsadsfdsfds',
        grant_type: 'password'
      },
      rules: {
        userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // Victor("app", "abc"); // 登陆背景函数调用
    })
    this.windowResize(this.$refs.AccountForm.offsetWidth, this.$refs.AccountForm.offsetHeight) 
  },
  methods: {
    ...mapActions({
      fetchProfile: 'fetchProfile',
      loadForms: 'LOAD_FORM_MODELS'
    }),
    windowResize(_w, _h) {
      console.log(window)
      console.log(document.documentElement.offsetHeight)
      this.note = Object.assign({}, this.note, {
        height: _h + 'px'
      })
    },
    handleLoginClick() {
      let that = this
      that.$store.commit('RESET_ROUTERLOADDONE', false)
      auth(this.account)
        .then((res) => {
          console.log(res)
          window.localStorage.JWT_TOKEN = res.access_token
          window.localStorage.REFRESH_TOKEN = res.refresh_token
          that.$store.commit('SET_CURRENT_USER', res.user || {})
          that.$store.commit('SET_JWT_TOKEN', res.access_token)
          that.$message({
            dangerouslyUseHTMLString: true,
            message: '登录成功！',
            onClose() {
              // that.fetchProfile()
              // that.loadForms()
              that.$router.push('/')
            }
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  width: 100%;
  // height: 100%;
  background-image: 'url(' + require('@/assets/login-bg.jpg') + ')';
  background-size: 100%;
  background-repeat: no-repeat;
}

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 8px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
