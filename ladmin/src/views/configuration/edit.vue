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

import { fetchConfiguration, putConfiguration } from '@/apis/configuration'
import { mapState } from 'vuex'

export default {
  name: 'configuration-edit',
  computed: {
    ...mapState(['FORM_MODELS'])
    // ...mapGetters('formModels')
  },
  mounted() {
    // var form = this.FORM_MODELS.find(fm => fm.formName === 'ConfigurationEdition')
    // console.log(form)
    // this.formItems = form.formItems.filter(item => !item.hidden)
    var id = this.$route.params.id
    fetchConfiguration({ id: id }).then(res => {
      this.formModel = Object.assign({}, res.entity)
    })
  },
  data() {
    // var models = this.formModels
    // console.log(models)
    return {
      labelPosition: 'right',
      labelWidth: '120px',
      formItems: [],
      // formItems: models['ConfigurationEdition'] || [],
      formModel: {
        configurationName: 'ABCDEFG',
        a: '',
        b: ''
      }
    }
  },
  methods: {
    handleSaveClick() {
      console.log(this.formModel)
      var that = this
      putConfiguration(Object.assign({}, this.formModel)).then(res => {
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
