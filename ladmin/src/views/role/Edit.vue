<template>
  <el-card>
    <el-form ref="roleForm" :model="roleModel" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="roleModel.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleModel.roleDescription"></el-input>
      </el-form-item>
      <el-form-item>
        <tree-select
          v-model="roleModel.parentId"
          :options="roleTree.options"
          :defaults="roleTree.defaults"
          :value="roleModel.parentId"
          :props="roleTree.treeProps" />
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          ref="tree"
          show-checkbox
          node-key="name"
          :check-strictly="true"
          :data="systemModules"
          :default-checked-keys="roleModel.checkedObjects"
          :props="defaultProps"
          @check-change="treeCheckChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchAllRole, putRole, fetchRole } from '@/apis/role'

export default {
  name: 'role-edit',
  data() {
    return {
      roleModel: {
        roleName: '',
        roleDescription: '',
        roleId: this.$route.params.id,
        parentId: null,
        checkedObjects: []
      },
      roleTree: {
        // 数据默认字段
        treeProps: {
          parent: 'parentId',   // 父级唯一标识
          value: 'id',          // 唯一标识
          label: 'label',       // 标签显示
          children: 'children', // 子级
        },
        // 数据列表
        options: [],
        defaults: []
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters(['systemModules']),
    selectedObjects() {
      console.log(this.$refs.tree.getCheckedNodes())
      return this.$refs.tree.getCheckedNodes()
    }
  },
  mounted() {
    var that = this
    var id = this.$route.params.id
    fetchRole({ id: id }).then(res => {
      console.log(res)
      this.roleModel = Object.assign(this.roleModel, res.entity)
      this.roleTree.defaults = [res.entity.parentId]
      this.roleTree.value = [res.entity.parentId]
      that.roleModel.checkedObjects = res.entity.roleBehaviorObjects.map(behv => behv['objectName'])
    })
    fetchAllRole().then(res => {
      that.roleTree.options = [...res.entity]
    })
  },
  methods: {
    onSubmit() {
      var that = this
      var checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
      console.log(checkedNodes)
      var roleObjects = checkedNodes.map(node => {
        return {
          roleId: this.roleModel.roleId,
          objectName: node.name
        }
      })
      console.log(roleObjects)
      putRole(Object.assign({}, this.roleModel, { objects: checkedNodes.map(node => node['name']) })).then(res => {
        console.log(res)
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
    },
    treeCheckChange(data, isChecked, children) {
      console.log(data)
      console.log(isChecked)
      console.log(children)
      console.log(this.$refs.tree.getNode(data))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
