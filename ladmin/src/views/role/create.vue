<template>
  <div>
    <el-card>
      <x-form :label-position="labelPosition" :label-width="labelWidth" :form-actions="formActions" :form-rules="formRules" :form-items="formItems" :form-model="formModel" @form-submit="handleFormSubmit" @form-save="handleFormSave" />
    </el-card>
  </div>
</template>

<script>

import { postRole } from '@/apis/role'
import { mapState } from 'vuex'

export default {
  name: 'role-create',
  computed: {
    ...mapState(['FORM_MODELS'])
  },
  mounted() {
    var form = this.FORM_MODELS.find(fm => fm.formName === 'RoleCreation')
    console.log(this.FORM_MODELS)
    console.log(form)
    if (form) {
      this.formItems = form.formItems.filter(item => !item.hidden)
      this.formRules = Object.assign({}, form.formRules, this.formRules)
    }
  },
  data() {
    return {
      labelPosition: 'right',
      labelWidth: '120px',
      formItems: [{
        label: 'roleName',
        prop: 'roleName',
        type: 'text'
      }, {
        label: 'roleDescription',
        prop: 'roleDescription',
        type: 'textarea'
      }, {
        label: 'parentRole',
        prop: 'parentId',
        type: 'select-tree',
        // 数据默认字段
        treeProps: {
          parent: 'parentId',   // 父级唯一标识
          value: 'id',          // 唯一标识
          label: 'label',       // 标签显示
          children: 'children', // 子级
        },
        // 数据列表
        options: [
          {
            parentId: '0',
            id: '1',
            label: 'label-A',
            children: [
              {
                parentId: '1',
                id: '2',
                label: 'label-A-1',
              },
            ],
          },
          {
            parentId: '0',
            id: '3',
            value: 'B',
            label: 'label-B',
            children: [],
          },
        ]
      }],
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
      postRole(Object.assign({}, this.formModel)).then(res => {
        if (res.code === 0) {
          that.$message({
            dangerouslyUseHTMLString: true,
            message: '保存成功',
            onClose() {
              that.$router.push({
                name: 'roleList'
              })
            }
          })
        }
      })
    }
  }
}
</script>
