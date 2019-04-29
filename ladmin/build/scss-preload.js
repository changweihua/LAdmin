// vue.config.js
module.exports = {
    chainWebpack: config => {
      const oneOfsMap = config.module.rule('scss').oneOfs.store
      oneOfsMap.forEach(item => {
        item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            // Provide path to the file with resources
            resources: './assets/scss/color.scss',
   
            // Or array of paths
            // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
          })
          .end()
      })
    }
  }