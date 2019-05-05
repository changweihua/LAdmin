<template>
  <el-form :label-position="labelPosition" :label-width="labelWidth">
    <el-form-item v-for="item in formItems" :key="item.prop" :label="item.label" :prop="item.prop">
      <template v-if="item.type==='text'">
        <el-input v-model="formModel[item.prop]" :form-type="item.type"/>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'x-form',
  props: {
    labelPosition: {
      type: 'string',
      default: 'right'
    },
    labelWidth: {
      type: 'string',
      default: '80px'
    },
    formItems: {
      type: Array,
      default: () => []
    },
    formModel: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
