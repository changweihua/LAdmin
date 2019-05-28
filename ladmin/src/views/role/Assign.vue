<template>
<el-tree
   :data="systemModules" :props="defaultProps"
  show-checkbox>
</el-tree> 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'role-assign',
  data() {
      return {
          data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
  },
  computed: {
    ...mapGetters(['systemModules'])
  }
}
</script>

<style lang="scss" scoped>

</style>
