# DoddCMS
内容管理系统 毕业设计项目
启动项目`pm2 start process.js`
## 项目依赖项
* nodejs >=6  nodejs官网下载:https://nodejs.org/en/download/  
* npm源国内推荐淘宝cnpm(选装) https://npm.taobao.org/
* pm2  安装方法 :npm install pm2 -g
* express >=4   这个在安装项目时会自动安装
* browser-sync (前端运行可选)  安装方法:npm install browser-sync -g


## 安装项目
在目录下打开控制台，输入`npm install`


## 运行
windowns下可以运行run.bat(需要pm2)
平台通用启动代码 `pm2 start process.json`
没有安装pm2的童鞋可以使用 `npm start`来启动(这就失去了pm2的好处)


##以上为后端运行方法

## 前端运行
前端项目为纯静态项目

config.js配置好后台api地址即可

前端可以运行在任何能响应http请求的服务器中

例如apache、nginx、tomcat、iis。

开发时使用browser-sync运行具有热重载功能的服务器，若装有browser-sync可以直接运行html下的run.bat或者在该目录下控制台输`browser-sync start --server --files "**/*.css, **/*.html,**/*.js,**/*.htm,*/*.*,*.*"`
