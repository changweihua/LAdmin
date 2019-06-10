import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'

Vue.use(Element)

// 在引入 Element 时，可以传入一个全局配置对象。
// 该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。
// Vue.use(Element, { size: 'small', zIndex: 3000 })
