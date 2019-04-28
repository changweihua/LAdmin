export default{
    bind(el, binding) {
    },
    inserted: function(el) {
      var inp = el.children[0]
      if (inp) {
        inp.addEventListener('keypress', function(e) {
          e = e || window.event
          // .querySelector('input')
          console.log(inp.value)
          if (isNaN(inp.value)) {
            inp.value = inp.value.substring(0, inp.value.length - 1)
            // if (e.preventDefault) {
            //   e.preventDefault()
            // } else {
            //   e.returnValue = false
            // }
          }
        })
      }
    }
  }
  