// see http://vuejs-templates.github.io/webpack for documentation.

//配置文件   production/development

var path = require('path');

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, '../vue/index.html'), //指定到你的后台程序生成的文件
    assetsRoot: path.resolve(__dirname, '../vue'),   //指向包含应用程序的所有静态资产的根目录
    assetsSubDirectory: './',   //被webpack编译处理过的资源文件都会在这个build.assetsRoot目录下，所以它不可以混有其它可能在build.assetsRoot里面有的文件
    // assetsPublicPath: '../vue/',      //资源的根目录
    assetsPublicPath: './',      //资源的根目录
    productionSourceMap: true,   //在构建生产环境版本时是否开启source map
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,  //// 是否开启 gzip
    productionGzipExtensions: ['js', 'css'], // // 需要使用 gzip 压缩的文件扩展名
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8088,//运行页面测试端口
    assetsSubDirectory: 'static',//编译输出二级目录
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    //proxyTable: {}, // 需要 proxyTable 代理的接口（可跨域）
    context: [ //代理路径
      '/v1',
    ],
    proxypath: 'https://www.vue-js.com',
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false //是否开启 cssSourceMap
  }
}