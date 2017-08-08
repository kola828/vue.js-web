//这个配置文件是命令npm run build 的入口配置文件，主要用于生产环境
// 此文件是在node环境中运行的，使用webpack的nodejsAPI实现自定义构建和开发流程的



// https://github.com/shelljs/shelljs

//require('./check-versions')(); // 检查 Node 和 npm 版本
require('shelljs/global'); // gzip模式下需要引入compression插件进行压缩
env.NODE_ENV = 'production';

var path = require('path');// node.js路径模块
var config = require('../config'); //加载config
var ora = require('ora'); // 一个很好看的 loading 插件
var webpack = require('webpack'); //加载webpack
var webpackConfig = require('./webpack.prod.conf'); // 加载 webpack.prod.conf

var spinner = ora('building for production...');//使用ora打印loading
spinner.start();//开始动画

/* 拼接编译输出文件路径 */
//每次编译都先删除再创建
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
rm('-rf', assetsPath); /* 删除这个文件夹 （递归删除） */
mkdir('-p', assetsPath);/* 创建此文件夹 */
cp('-R', 'static/*', assetsPath);/* 复制 static 文件夹到我们的编译输出目录 */

webpack(webpackConfig, function(err, stats) {   //  开始 webpack 的编译
    // 编译成功的回调函数
    spinner.stop();
    // 如果删除的过程中出现错误，就抛出这个错误，同时程序终止
    if (err) throw err
    process.stdout.write(stats.toString({
       // stats对象中保存着编译过程中的各种消息
        colors: true,      // 增加控制台颜色开关
        modules: false,    // 不增加内置模块信息
        children: false,   // 不增加子级信息
        chunks: false,     // 允许较少的输出
        chunkModules: false// 不将内置模块的信息加到包信息
    }) + '\n')
});