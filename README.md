# fed-uni-app-init

使用uni-app框架快速初始化多端小程序项目

### 目录结构
```text
- config.js         // gulp配置文件
- gulpfile.js       // gulp执行文件
- src               // 主目录
  - assets          // 运程静态资源目录
  - components      // 公共组
  - config          // 全局配置文件
  - packages        // 分包主目录
  - pages           // 主包目录
  - static          // 包内静态资源目录
  - store           // vuex全局数据中心
  - utils           // 工具目录
    - x-filters.js  // 全局过滤器，this.$filters()
    - x-request.js  // 全局http请求，this.$http({})
  - App.vue         // 主组件，所有页面都是在App.vue下进行切换的，是页面入口文件
  - main.js         // 入口文件，主要作用是初始化vue实例并使用需要的插件
  - uni.scss        // 样式风格文件，scss变量
- README.md         // 项目概述
```

### 相关资料
```
开发者工具下载：https://www.dcloud.io/hbuilderx.html
官方文档：https://uniapp.dcloud.io/
```

### 开发环境
```
下载HBuilderX开发工具，使用它进行启动开发编译
```

### 安装依赖
```
  // 当前项目使用的npm包，如eslint
  npm i
  
  // 小程序内使用的npm包，如vuex
  cd src
  npm i
```

### 全局方法
1、`this.$filters.formatZero(0); => 0.00` 在js中使用封闭好的方法，类似过滤器；

2、`this.$http({url: '/api/'})` 发起请求

3、执行vuex中的方法`this.$store.dispatch()`；获取vuex中的数据，`this.$store.state`；

### 注意事项

1、src/assets，此目录存放的静态资源会上传至运程CDN服务器

2、页面及组件中如果要使用运程CDN静态资源，

  a.直接使用全域名地址 
  
  b.使用x-images组件，src地址以/assets开头（推荐）
  
3、因为不支持uni.less全局变量，所以全局改用scss

4、css中引用CDN静态资源方式
 
  a.直接使用全域名地址 
  
  b.`src` 替换为 `cdn` `background: cdn('/assets/svg/customer.svg') no-repeat;`（推荐）

### gulp
```
config.js   // gulp配置文件
upload:oss  // 上传src/assets目录中的静态资源至OSS CDN中
```