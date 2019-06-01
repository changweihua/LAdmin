<template>
  <div>
    <el-card>
      <x-form :label-position="labelPosition" :label-width="labelWidth" :form-actions="formActions" :form-rules="formRules" :form-items="formItems" :form-model="formModel" @form-submit="handleFormSubmit" @form-save="handleFormSave" />
    </el-card>
  </div>
</template>

<script>

import { fetchAllRole } from '@/apis/role'
import { fetchUser, putUser } from '@/apis/user'
import { mapState } from 'vuex'

export default {
  name: 'user-edit',
  computed: {
    ...mapState(['FORM_MODELS'])
  },
  mounted() {
    var form = (this.FORM_MODELS || []).find(fm => fm.formName === 'RoleCreation')
    if (form) {
      this.formItems = form.formItems.filter(item => !item.hidden)
      this.formRules = Object.assign({}, form.formRules, this.formRules)
    }
    fetchAllRole().then(res => {
      this.formItems.find(item => item['prop'] === 'roleId').options = [...res.entity]
    })
    var id = this.$route.params.id
    fetchUser({ id: id }).then(res => {
      this.formModel = Object.assign({ userId: id }, res.entity)
      this.formItems.find(item => item['prop'] === 'roleId').defaults = [...res.entity.roles.map(ur => ur['roleId'])]
      this.formItems.find(item => item['prop'] === 'roleId').value = [...res.entity.roles.map(ur => ur['roleId'])][0]
    })
  },
  data() {
    return {
      allRoles: [],
      labelPosition: 'right',
      labelWidth: '120px',
      formItems: [{
        label: 'loginName',
        prop: 'loginName',
        type: 'text'
      }, {
        label: 'userName',
        prop: 'userName',
        type: 'text'
      }, {
        label: 'parentRole',
        prop: 'roleId',
        type: 'select-tree',
        // 数据默认字段
        treeProps: {
          parent: 'parentId',   // 父级唯一标识
          value: 'id',          // 唯一标识
          label: 'label',       // 标签显示
          children: 'children', // 子级
        },
        // 数据列表
        options: [],
        defaults: [],
        value: null
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
      putUser(Object.assign({}, this.formModel, { roles: [this.formModel.roleId] })).then(res => {
        if (res.code === 0) {
          that.$message({
            dangerouslyUseHTMLString: true,
            message: '保存成功',
            onClose() {
              that.$router.push({
                name: 'userList'
              })
            }
          })
        }
      })
    }
  }
}
</script>
