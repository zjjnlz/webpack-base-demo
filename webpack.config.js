const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin') //导入，在内存中自动生成 index 页面的插件

// 穿件一个插件的实例
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), // 源文件
    filename: 'index.html' // 生成的呢村中的首页的名称
})

// 向外暴露一个打包的配置对象；因为webpack是基于node构建的；所以webpack支持所有node api和语法
module.exports = {
    mode: 'development', //'development' or 'production'
    plugins: [
        htmlPlugin
    ]
}