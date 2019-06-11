<template>
  <div class="block">
    <x-screen :items="scroll_lists" :animate="true" />
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

export default {
  data() {
    return {
      scroll_lists: [
        { time:'2秒钟前', company:'海康威视（002415）' },  
        { time:'8秒钟前', company:'烽火通信（600498）' }, 
        { time:'3分钟前', company:'恒逸石化（000703）' },  
        { time:'5分钟前', company:'紫光国微（002049）' },
        { time:'9分钟前', company:'新天科技（300259）' },
        { time:'1小时前', company:'兴业银行（601166）' },
        { time:'3小时前', company:'中国核建（601611）' }
      ]
    }
  },
  methods: {}
}
</script>
