<template>
  <div>
    <el-card>
      <x-form :label-position="labelPosition" :label-width="labelWidth" :form-items="formItems" :form-model="formModel" />
    </el-card>
    <el-card>
      <el-row>
        <el-button @click="handleSaveClick">暂存</el-button>
      </el-row>
    </el-card>
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
  },
  data() {
    return {
      labelPosition: 'right',
      labelWidth: '120px',
      formItems: [],
      formModel: {}
    }
  },
  methods: {
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
