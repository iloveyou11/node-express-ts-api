import * as Koa from 'koa';
import { InitManager } from './init'
import catchError from './middlewares/error'

const bodyParser = require('koa-bodyparser')
const app = new Koa;
app.use(bodyParser())


// 当我们新增一个路由模块的时候，就要来回的切换目录，先import再route搞一下，极其繁琐，而且重复。
// 我们必须解放我们的生产力：自动扫描

// app启动变得干净无比，不再出现任何乱七八杂的路由
// loader模块自动加载所有的路由，我们想要增加路由就可以增加一个文件，然后按照我们的规范，导出就可以自动加载
// 不用再担心app.ts变长了，我们也可以在路由模块中直接看到我们的http method与路由的映射

// app.context是app实例的ctx上下文对象
const initManager = new InitManager(app.context, app)
app.use(initManager.loadRouter())
app.use(catchError)



app.listen(3000, '127.0.0.1', () => {
    console.log('start at http://127.0.0.1:3000');
})