**controller**
专门处理业务的控制流程，尽量不出现任何的业务逻辑，而且controller必须放在controller文件夹中，否则无法读取到
**router**
路由的设置，我们全部放在了routers.js中，集中化管理，使得我们的路由、Http方法不会因为散落各地而难以查找
**service**
业务逻辑与控制器完全分离，不依赖于控制器，能够方便你的逻辑复用和单元测试
**config**
