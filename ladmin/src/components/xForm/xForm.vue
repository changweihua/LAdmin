<template>
  <el-form ref="form" :model="formModel" :label-position="labelPosition" :label-width="labelWidth" :rules="formRules" >
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
    <el-form-item>
      <el-button v-for="action in formActions" :key="action.name" :icon="action.icon" :type="action.type||'primary'" @click="handleActionClick('form', action.handlerName, action.requireValid)">{{ action.name }}</el-button>
      <!-- <el-button v-for="action in formActions" :key="action.name" :icon="action.icon" :type="action.type||'primary'" @click="action.handler">{{ action.name }}</el-button> -->
      <!-- <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      <el-button @click="resetForm('form')">重置</el-button> -->
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
    },
    formRules: {
      type: Object,
      required: true,
      default: () => {}
    },
    formActions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    handleActionClick(formName, handlerName, requireValid) {
      if (requireValid) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit(handlerName, '哈哈，通过校验啦')
            alert('submit!');
          } else {
            console.log('error submit!!')
            this.$emit(handlerName, '哈哈，怎么会没有通过校验呢')
            return false;
          }
        });
      } else {
        this.$emit(handlerName, '哈哈，跳过校验')
      }
    }
  }
}
</script>
