#后台开发说明

##添加api请按下述步骤进行

* 在route.js中添加路由文件(若在原有路径上添加新api则无需此步骤) 
* 在Route文件夹中新建路由文件(若在原有路径上添加新api则无需此步骤) 
* 在DAO文件夹下配置权限(premission.json)和其相应的功能模块(functionModel)
* 然后在对应的路由文件里添加方法实现逻辑即可

## 添加模型model请按下述步骤进行

* 在Model中定义相应模型
* 在Model/relations中定义相应关系(可选)
* 在DAO/models.js中添加引用，使用的时候直接引入models即可
