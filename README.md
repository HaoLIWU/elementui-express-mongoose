# elementui-express-mongoose
病例管理相关代码

### Clone it

+ git clone https://github.com/HaoLIWU/elementui-express-mongoose.git

### client

> + 1 Run 
>> + cd 到 client文件夹，`npm install`安装依赖,然后 `npm run start` 进行在线编译运行
> + 2 技术栈
>> + vue+mui+mint-ui+vue-router+vuex
>> + 异步加载组件、mixin、路由守卫、动态加载组件等
> + 3 注意事项：
>> + 这是一个基于统计文件夹下server后台的病历记录移动app，运行时需要先将下面的server端开启才能使用


### Run server

+ 这个server文件夹有两个子文件夹，一个是用vue+vuex+vue-router+elementui做的数据管理单页面（backgroundManagementPage），一个是用 nodejs+express+mongoose做的对数据增删查改的接口（serverInterface）
，分别 cd 到这两个子文件夹，然后 `npm install` 进行安装依赖。
+ 先打开本地的 MongoDB数据库，并新建一个名字为 `bingli` 的数据库
+ cd 文件夹 `serverInterface`  里面，`node app.js` 运行代码
+ cd 文件夹 `backgroundManagementPage` 里面，`npm run serve`进行在线编译运行

### 子文件夹 serverInterface

+ 这是一个使用 nodejs+express+mongoose 的 文件夹， 主要是 对数据进行 增删查改，为前端提供接口

### 子文件夹 backgroundManagementPage

1. 技术栈：vue+vuex+vue-router+elementui
2. 使用到的vue技术有：异步加载组件、动态加载组件、mixin
3. 借助 elementui 封装了 两个公共组件 CenterDialog.vue 和 Table.vue
4. 通过 localStorage 与 vue-router 模拟了前端路由守卫
