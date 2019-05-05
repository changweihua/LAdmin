<template>
  <div>
    <el-card>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>
      </el-form>
      <x-form :label-position="labelPosition" :label-width="labelWidth" :form-items="formItems" :form-model="formModel" />
    </el-card>
    <el-card>
      <el-row>
        <el-button>暂存</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'configuration-edit',
  data() {
    return {
      labelPosition: 'right',
      labelWidth: '80px',
      formLabelAlign: {
        configurationName: '',
        region: '',
        type: ''
      },
      formItems: [{
        label: '配置名称',
        prop: 'configurationName',
        type: 'text'
      }],
      formModel: {
        configurationName: 'ABCDEFG'
      }
    }
  }
}
</script>
