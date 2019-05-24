<template>
  <div class="about">
    <h1>This is an about pagesss</h1>
    <el-form ref="AccountForm" :model="account" label-position="left" label-width="0px" class="login-container">
      <el-form-item prop="userName">
        <el-input type="text" v-model="account.userName" auto-complete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="handleLoginClick" >查询</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <el-form :model="question" label-position="left" label-width="0px" class="login-container">
      <el-form-item prop="title">
        <el-input type="text" v-model="question.title" auto-complete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item prop="answer">
        <el-input type="text" v-model="question.answer" auto-complete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="handleCreateClick" >新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { query, create } from '@/apis/values'

export default {
  data() {
    return {
      account: {
        userName: ''
      },
      question: {
        title: '',
        answer: ''
      }
    }
  },
  methods: {
    handleLoginClick() {
      console.log(this.account.userName)
      query({ key: this.account.userName }).then(res => {
        console.log(res)
      })
    },
    handleCreateClick() {
      create(this.question).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

