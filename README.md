# 创建基于webpack4.x项目

- 编辑器使用vscode
- 环境Mac OS

1. 先创建一个项目文件夹my-app:  `mkdir my-app`

2. `cd my-app` 运行 `npm init -y` 快速初始化项目

3. 创建文件夹`src`源代码目录和`dist`产品目录，在src目录下创建`index.html`和`index.js`

   - ```HTML
      <!--初始index.html代码-->
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <meta http-equiv="X-UA-Compatible" content="ie=edge">
         <title>Index 首页</title>
       	<script src="../dist/main.js"></script>
     </head>
     <body>
         <!-- 创建一个容器，将来渲染的虚拟DOM,会放到容器内显示 -->
         <div id="app"></div>
     </body>
     </html>
     ```

   - ```JavaScript
     // index.js
     console.log('ok');
     ```

     

4. 使用cnpm安装webpack，运行，运行`cnpm i webpack webpack-cli -D`,

   - 安装cnpm并全局运行`npm i cnpm -g`
   - 也可以npm换源，自行百度，若喜欢用`create-react-app`的最好换源，因为该命令自动用npm下载资源，速度很慢。

5. 在根目录下创建`webpack.config.js`文件

   - ```JavaScript
     // 向外暴露一个打包的配置对象；因为webpack是基于node构建的；所以webpack支持所有node api和语法
     module.exports = {
         mode: 'development' //'development' or 'production' 可以自己尝试换成不同的参数，观察main.js有和不同，在开发的时候我们就用development
         
     }
     ```

     

6. 注意：webpack4.x提供了约定大于配置的概念；目的是为了尽量减少配置文件的体积；

   - 默认约定了：
   - 打包的入口是`src/index.js`
   - 打包输出的文件是`dist/main.js`
   - 4.x新增了`mode`选项，可选值为`'development' or 'production'`
   - 不可以用`export default {}`的方法导出，因为这是es6中向外导出模块的api，与之对应的是 import ……from ‘标识符’;

7. 现在可以在终端输入命令webpack进行打包，并在页面上打开本地文件查看结果并观察结果；

8. 打开终端，运行`cnpm i webpack-dev-server -D`,并在`package.json`文件中添加`dev`配置，参数的含义想知道的可以百度，或者可以查查还能添加什么参数；

   - ```json
     "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1",
         "dev": "webpack-dev-server --open --port 3000 --hot --host 127.0.0.1"
       }
     ```

9. 终端运行 `npm run dev`（可以先把dist目录下的main.js删除），在页面地址栏输入`localhost:3000/main.js`观察，是有`main.js`的代码页面的，但是我们在根目录下是没有`main.js`文件的，而且我也已经把`dist`目录下的`main.js`给删除了，那这个`main.js`是哪里来的呢？

   - 注意：`webpack-dev-server`打包好的`main.js`是托管到了内存中；所以在项目根目录中看不到；
   - 但是我们可以认为，在项目的根目录中，有一个看不见的`main.js`；

10. 可以修改一下`index.html`中的`main.js`的路径为`src="/main.js"`

11. 同样，我们也可以把物理磁盘上的`index.html`放到内存中去，此时我们需要安装一个插件，运行`cnpm i html-webpack-plugin -D`，然后再webpack.config.js中进行配置：

    ```JavaScript
    const path = require('path')
    const HtmlWebPackPlugin = require('html-webpack-plugin') //导入，在内存中自动生成 index 页面的插件
    
    // 穿件一个插件的实例
    const htmlPlugin = new HtmlWebPackPlugin({
        template: path.join(__dirname, './src/index.html'), // 源文件
        filename: 'index.html' // 生成的呢村中的首页的名称
    })
    
    // 向外暴露一个打包的配置对象；因为webpack是基于node构建的；所以webpack支持所有node api和语法
    module.exports = {
        mode: 'development', //'development' or 'production' 可以自己尝试换成不同的参数，观察main.js有和不同，在开发的时候我们就用development
        plugins: [
            htmlPlugin
        ],
    }
    ```

12. 配置好后，再次运行`npm run dev`,观察结果，有何不一样？结果就是在根目录下就直接进入了`index.html`的页面，说明此时，我们已经把`index.html`放到内存中去了，但我们的项目文件夹中的根目录是没有`inde.html`的文件的；

13. 而且，我们查看页面源码，可以观察到，页面底部多了一个script标签，把mian.js导入进去了，这是插件的一个能力，能把打包好的main.js追加到页面上去，所以此时，我们可以吧index.html页面中的`<script src="/main.js"></script>`这句话给去掉了。

    ```HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Index 首页</title>
    </head>
    <body>
        <!-- 创建一个容器，将来渲染的虚拟DOM,会放到容器内显示 -->
        <div id="app"></div>
    </body>
    </html>
    ```

14. 到此为止，webpack的基本项目基本是完善了，接下学习react写的代码，会在此基础之上

