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
          :data="systemModules"
          :props="defaultProps" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { assignRole } from '@/apis/role'

export default {
  name: 'role-assign',
  data() {
    return {
      assignModel: {
        name: ''
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
    var id = this.$route.params.id
    console.log(id)
  },
  methods: {
    onSubmit() {
      var checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
      var roleObjects = checkedNodes.map(node => {
        return {
          roleId: 1,
          objectName: node.name
        }
      })
      console.log(roleObjects)
      assignRole(roleObjects).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
