<template>
  <el-form :label-position="labelPosition" :label-width="labelWidth">
    <el-form-item v-for="item in formItems" :key="item.prop" :label="$t(item.label)" :prop="item.prop">
      <template v-if="item.type==='text'">
        <el-input v-model="formModel[item.prop]" :form-type="item.type"/>
      </template>
      <template v-if="item.type==='date'">
        <el-date-picker v-model="formModel[item.prop]" :form-type="item.type" type="date" value-format="yyyy-MM-dd" />
      </template>
      <template v-if="item.type==='daterange'">
        <date-range-selector v-model="formModel[item.prop]" />
      </template>
      <template v-if="item.type==='select'">
        <el-select v-model="formModel[item.prop]" :form-type="item.type" :value="item.dafaultValue">
          <el-option v-for="x in item.dafaultValue" :label="x.label" :value="x.value" :key="x.index" />
        </el-select>
      </template>
      <template v-if="item.type==='checkbox'">
        <el-checkbox-group v-model="formModel[item.prop]" :form-type="item.type" :value="item.dafaultValue">
          <el-checkbox v-for="y in item.dafaultValue" :label="y.value" :name="y.value" :key="y.index" />
        </el-checkbox-group>
      </template>
      <template v-if="item.type==='radiobox'">
        <el-radio-group v-model="formModel[item.prop]" :form-type="item.type" :value="item.dafaultValue">
          <el-radio v-for="z in item.dafaultValue" :label="z.value" :key="z.value">{{ z.label }}</el-radio>
        </el-radio-group>
      </template>
      <template v-if="item.type==='textarea'">
        <el-input v-model="formModel[item.prop]" :form-type="item.type"/>
      </template>
      <template v-if="item.type==='switch'">
        <el-switch v-model="formModel[item.prop]" :form-type="item.type" />
      </template>
      <template v-if="item.type==='fixed-time'">
        <el-time-picker v-model="formModel[item.prop]" :form-type="item.type" />
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'x-form',
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
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
