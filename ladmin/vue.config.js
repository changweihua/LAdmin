const path = require("path")
const vConsolePlugin = require('vconsole-webpack-plugin') // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // Webpack包文件分析器
const debug = process.env.NODE_ENV !== 'production'
// const VueConf = require('./src/assets/js/libs/vue_config_class')
// const vueConf = new VueConf(process.argv)
// 注意：只有 VUE_APP_* 定义的变量才能在客户端代码中使用 

console.log('')
console.log('本地启动或构建的文件信息 | 开始--------------------------------------------------------------')
// console.log(vueConf.pages)
console.log('本地启动或构建的文件信息 | 结束--------------------------------------------------------------')
console.log('')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
    publicPath: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: 'public', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    pages: {
        //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: {
            //除了 entry 之外都是可选的
            entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
        }
        // subpage: {
        //   entry: "src/pages/subpage/main.js",
        //   template: "public/subpage.html",
        //   filename: "subpage/index.html"
        // }
    },
    lintOnSave: true, // 是否在保存的时候检查
    productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps
        loaderOptions: {}, // css预设器配置项
        modules: false // 启用 CSS modules for all css / pre-processor files.
    },
    //反向代理
    devServer: {
      // 环境配置
      host: 'localhost',
      port: 8090,
      https: false,
      hotOnly: false,
      open: true, //配置自动启动浏览器
      proxy: {
        // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
        "/api": {
          // target: 'http://localhost:56491',
          // target: 'http://localhost:9080',
          target: process.env.VUE_APP_API_ROOT,
          pathRewrite: {
            '^/api': '/api'
          }
        },
        "/message": {
          // target: 'http://localhost:56491',
          // target: 'http://localhost:9080',
          target: process.env.VUE_APP_API_ROOT,
          pathRewrite: {
            '^/message': '/'
          }
        }
      }
    },
    pluginOptions: {
        // 第三方插件配置
        // ...
    },
    // chainWebpack: config => {
    //   // TODO: Remove this workaround once https://github.com/vuejs/vue-cli/issues/2463 is fixed
    //   // Remove preload plugins for multi-page build to prevent infinite recursion
    //   Object.keys(pagesObject).forEach(page => {
    //     config.plugins.delete(`preload-${page}`)
    //     config.plugins.delete(`prefetch-${page}`)
    //   })
    // }
    chainWebpack: config => {
      if (debug) {
        // 本地开发配置
      } else {
        // 生产开发配置
      }

      // 测试生产环境, 不压缩js代码
      if (process.env.VUE_APP_TITLE === 'alpha') {
        config.optimization.minimize(false)
      }

      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      config.resolve.alias
        .set("@", resolve("src"))
        .set("scss", resolve("src/scss"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"));

      const oneOfsMap = config.module.rule('scss').oneOfs.store
      oneOfsMap.forEach(item => {
        item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            // Provide path to the file with resources
            resources: './src/assets/scss/color.scss'
            // Or array of paths
            // resources: ['./src/assets/scss/color.scss', './src/element-variables.scss']
          })
          .end()
      })
    },
    configureWebpack: config => {
      //生产and测试环境
      let pluginsPro = [
        // new DefinePlugin({
        //   'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
        // }),
        new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
          threshold: 8192,
          minRatio: 0.8,
        }),
        //  Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
        new BundleAnalyzerPlugin(),
      ]
      //开发环境
      let pluginsDev = [
        // new DefinePlugin({
        //   'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
        // })
        //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
        // new vConsolePlugin({
        //   filter: [], // 需要过滤的入口文件
        //   enable: true // 发布代码前记得改回 false
        // }),
      ]
      if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
        config.plugins = [...config.plugins, ...pluginsPro]
      } else {
        // 为开发环境修改配置...
        config.plugins = [...config.plugins, ...pluginsDev]
      }
    }
}
