<template>
  <div class="scroll">
    <ul id="scrollDiv" ref="rollul" :class="{ anim: animate == true }">
      <li :key="item" v-for="item in items">
        <span>{{ item.time }}</span>
        <span class="s-2">{{ randomPhoneNumber() }}用户诊断了</span>
        <span>{{ item.company }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'x-screen',
  props: {
    items: {
      type: Array,
      required: true
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    setInterval(this.scroll, 2000)
  },
  methods:{
    // 根据字典生成随机序列
    randomCode: function (len, dict) {
      for (var i = 0,rs = ''; i < len; i++) {
        rs += dict.charAt(Math.floor(Math.random() * 100000000) % dict.length)
      }
      return rs
    },
    // 生成随机手机号码
    randomPhoneNumber: function() {
      // 第1位是1 第2,3位是3458 第4-7位是* 最后四位随机 this.$options.methods使用上一个函数的返回值
      return [1, this.randomCode(2, '3458'), '****', this.randomCode(4, '0123456789')].join('')
    },
    scroll() { 
      var that = this
      setTimeout(function() {
        that.items.push(that.items[0])
        that.items.shift()
      }, 1500)
    }
  }
}
</script>

<style scoped lang="scss">
.scroll-screen {
  height: 400px;
  overflow: hidden;
}
</style>
