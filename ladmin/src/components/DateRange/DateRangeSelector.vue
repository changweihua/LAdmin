<template>
  <el-form>
    <el-row>
      <el-col :span="11">
        <el-date-picker :picker-options="startDatePickerOption" v-model="startDate" type="date" size="medium" value-format="yyyy-MM-dd" @change="handleStartDateChange" />
      </el-col>
      <el-col :span="2">
        <span class="date_gutter">-</span>
      </el-col>
      <el-col :span="11">
        <el-date-picker :picker-options="endDatePickerOption" v-model="endDate" type="date" size="medium" value-format="yyyy-MM-dd" @change="handleEndDateChange" />
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'DateRangeSelector',
  props: {
    start: {
      type: Date,
      default: null
    },
    end: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      startDatePickerOption: this.setStartDatePickerOption(),
      endDatePickerOption: this.setEndDatePickerOption()
    }
  },
  methods: {
    setStartDatePickerOption() {
      var vm = this
      return {
        disabledDate(time) {
          return vm.endDate ? time.getTime() > new Date(vm.endDate).getTime() : false
        }
      }
    },
    setEndDatePickerOption() {
      var vm = this
      return {
        disabledDate(time) {
          const oneDay = 86400000
          return vm.startDate ? time.getTime() < (new Date(vm.startDate).getTime() - oneDay) : false
        }
      }
    },
    handleStartDateChange(val) {
      this.$emit('date-start-change', val)
    },
    handleEndDateChange(val) {
      this.$emit('date-end-change', val)
    }
  }
}
</script>
<style scoped>
.date_gutter{
  /*弹性盒模型*/
  display: flex;
  /*主轴居中对齐*/
  justify-content: center;
  /*侧轴居中对齐*/
  align-items: center;
  height: 36px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
