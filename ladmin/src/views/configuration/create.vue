<template>
  <div>
    <el-card>
      <x-form :label-position="labelPosition" :label-width="labelWidth" :form-actions="formActions" :form-rules="formRules" :form-items="formItems" :form-model="formModel" @form-submit="handleFormSubmit" @form-save="handleFormSave" />
    </el-card>
    <!-- <el-card>
      <el-row>
        <el-button @click="handleSaveClick">暂存</el-button>
      </el-row>
    </el-card> -->
  </div>
</template>

<script>

import { postConfiguration } from '@/apis/configuration'
import { mapState } from 'vuex'

export default {
  name: 'configuration-create',
  computed: {
    ...mapState(['FORM_MODELS'])
  },
  mounted() {
    var form = this.FORM_MODELS.find(fm => fm.formName === 'ConfigurationCreation')
    this.formItems = form.formItems.filter(item => !item.hidden)
    this.formRules = Object.assign({}, form.formRules, this.formRules) 
  },
  data() {
    return {
      labelPosition: 'right',
      labelWidth: '120px',
      formItems: [],
      formModel: {},
      formRules: {},
      formActions: [
        {
          name: 'Edit',
          icon: 'el-icon-edit',
          handler: (row) => {
            console.log(this.formModel)
          },
          handlerName: 'form-submit',
          authorized: true,
          disabled: (row) => {
            return false
          },
          requireValid: true
        },
        {
          name: 'Draft',
          icon: 'el-icon-edit',
          handler: (row) => {
            console.log(this.formModel)
          },
          handlerName: 'form-save',
          authorized: true,
          disabled: (row) => {
            return false
          },
          requireValid: false
        }
      ]
    }
  },
  methods: {
    handleFormSubmit(result) {
      console.log(result)
      if (result.isValid) {
        console.log(result.model)
        this.handleSaveClick()
      }
    },
    handleFormSave(msg) {
      console.log(msg)
    },
    handleSaveClick() {
      console.log(this.formModel)
      var that = this
      postConfiguration(Object.assign({}, this.formModel)).then(res => {
        if (res.code === 0) {
          that.$message({
            dangerouslyUseHTMLString: true,
            message: '保存成功',
            onClose() {
              that.$router.push({
                name: 'configurationList'
              })
            }
          })
        }
      })
    }
  }
}
</script>
