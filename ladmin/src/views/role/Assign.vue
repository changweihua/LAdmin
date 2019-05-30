<template>
  <el-card>
    <el-form ref="assignForm" :model="assignModel" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="assignModel.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-tree
          ref="tree"
          show-checkbox
          node-key="name"
          :check-strictly="true"
          :data="systemModules"
          :default-checked-keys="assignModel.checkedObjects"
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
import { assignRole, fetchRole } from '@/apis/role'

export default {
  name: 'role-assign',
  data() {
    return {
      assignModel: {
        name: '',
        roleId: this.$route.params.id,
        checkedObjects: []
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
      // this.assignModel = Object.assign({}, res.entity)
      that.assignModel.checkedObjects = res.entity.roleBehaviorObjects.map(behv => behv['objectName'])
    })
  },
  methods: {
    onSubmit() {
      var checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
      console.log(checkedNodes)
      var roleObjects = checkedNodes.map(node => {
        return {
          roleId: this.assignModel.roleId,
          objectName: node.name
        }
      })
      console.log(roleObjects)
      assignRole(roleObjects).then(res => {
        console.log(res)
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
