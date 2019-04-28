import numbers from './numbers'

const install = function(Vue) {
  Vue.directive('numbers', numbers)
}

if (window.Vue) {
  window.numbers = numbers
  Vue.use(install); // eslint-disable-line
}

numbers.install = install
export default numbers
