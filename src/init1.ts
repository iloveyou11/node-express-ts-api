import * as fs from 'fs';
import * as path from 'path';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import { BaseContext } from "koa";

// 遍历文件夹形式挂载全部路由
// const path=require('path')
// export function initRouter() {
//     const dirs = fs.readdirSync(path.resolve(__dirname,'./router'));
//     dirs.forEach((filename) => {
//         // mod为每个路由导出的指定格式的json，如
//         // {
//         //     'get /': user,
//         //     'get /userinfo': userInfo
//         // }
//         const mod = require(path.join(__dirname,'/router/',filename)).default;
//         console.log(mod)
//         Object.keys(mod).map((key) => {
//             const [method, path] = key.split(' ');
//             const handler = mod[key];
//             // (<any>route)是为了让typescript编译正确，我们将route强行断言为any类型，这样就不会报错了
//             (<any>route)[method](path, handler);
//         })
//     })
//     return route.routes();
// }


// 改为面向对象的方式
export class InitManager {
    router: Router = new Router;
    controller: any = {};
    ctx: BaseContext;

    app: Koa;
    constructor(ctx: BaseContext, app: Koa) {
        this.ctx = ctx;
        this.app = app;
    }

    // loadController函数，其实做了一件非常简单的事情，就是构造一个controller对象，里面有所有controller的信息
    loadController() {
        const dirs = fs.readdirSync(path.join(__dirname, '/controller'));
        // 遍历controller下的所有文件
        dirs.forEach(filename => {
            const property = filename.split('.')[0];//文件名
            // 注意：这里使用default获取时，对象的ts文件应该采用export default class的形式
            const mod = require(path.join(__dirname, '/controller/', filename)).default;

            // mod为导出的类形式
            // export default class User extends Controller {
            //     async user() {
            //         this.ctx.body = 'hello user';
            //     }
            //     async userInfo() {
            //         this.ctx.body = 'hello userinfo';
            //     }
            // }
            if (mod) {
                const methodNames = Object.getOwnPropertyNames(mod.prototype).filter((names) => {
                    if (names !== 'constructor') {
                        return names;
                    }
                })
                // Object.defineProperty重写this.controller的property属性
                Object.defineProperty(this.controller, property, {
                    get() {
                        // 构造一个controller对象，里面有所有controller的信息
                        const merge: { [key: string]: any } = {};
                        methodNames.forEach((name) => {
                            merge[name] = {
                                type: mod,
                                methodName: name
                            }
                        })
                        return merge;
                    }
                })
            }
        })
    }

    // loadRouter函数主要做的是调用router.ts模块中的函数，获得我们刚刚定义的路由规则，然后进行路由方法和path的提取
    loadRouter() {
        this.loadController();
        this.loadService();
        this.loadConfig();

        const mod = require(path.join(__dirname, '/router.js'));
        // mod:
        //  (controller: any) => {
        //     return {
        //         'get /': controller.user.user,
        //         'get /userinfo': controller.user.userinfo
        //     }
        // }
        const routers = mod(this.controller); //拿到所有的routers
        // // 验证controller数据是否正确
        // console.log('controller');
        // console.log(this.controller);
        // 验证routers数据是否正确
        console.log('routers');
        console.log(routers);

        Object.keys(routers).forEach((key) => {
            const [method, path] = key.split(' ');
            (<any>this.router)[method](path, async (ctx: BaseContext) => {
                // 重新构建一个controller对象，传递ctx参数进去，再调用我们路由规则定义的方法，完成了controller的实现
                const _class = routers[key].type; //拿到class
                const handler = routers[key].methodName; //拿到对应的处理函数
                const instance = new _class(ctx, this.app);  //注意这里传入app
                instance[handler]();
                // const instance = new _class(ctx); //创建唯一实例
                // instance[handler](); //挂载路由

                // 为什么要每一个请求重新构建controller对象呢？
                // 因为每一个请求都是独立的请求，需要新的ctx。
                // 在高并发的情况下，如果一直公用一个controller，而不是重新创建，就会发生难以估计的错误。 
                // 那么我们必须保证在每一次请求中，我们的controller都是独立的一个新对象。
            })
        })
        return this.router.routes();
    }

    // 挂载所有的service到ctx上

    // 想要的形式：controller中使用this.ctx.service.user.getName(); —— this.ctx.service.[类名].[方法名]()
    // 这样的形式，那我们必须要对ctx.service的getter进行重写
    // 我们在controller中可能会多次使用到this.ctx.service对象，所以我们必须要对其进行缓存，
    // 不然每次使用，我们都遍历service文件夹，导入模块，重新生成所有service对象，再挂载，性能会急剧下降。

    // 重写this.ctx.service的getter
    // 第一次访问getter的时候，扫描模块，导入，并且缓存
    // 判断是否有缓存，有缓存了直接返回缓存

    loadService() {
        let that = this
        // const serviceDir = fs.readdirSync(path.join(__dirname,'/service'));
        const serviceDir = fs.readdirSync(__dirname + '/service');
        Object.defineProperty(this.app.context, 'service', {
            get() {
                if (!(<any>this)['cache']) {
                    (<any>this)['cache'] = {};
                }
                const loaded = (<any>this)['cache'];
                if (!loaded['service']) {
                    loaded['service'] = {};
                    serviceDir.forEach((d: any) => {
                        const name = d.split('.')[0];
                        // 注意：这里使用default时，对应导出的类也全部应该采用export default class的形式，否则报错
                        const mod = require(__dirname + '/service/' + d).default;
                        loaded['service'][name] = new mod(this, that.app);  //注意这里传入app
                        // loaded['service'][name] = new mod(this);
                    });
                    return loaded.service;
                }
                return loaded.service;
            }
        });
    }

    // 挂载全部配置到app下
    loadConfig() {
        const configDef = __dirname + '/config/default.js';
        const configEnv = __dirname + (process.env.NODE_ENV === 'production' ? '/config/pro.js' : '/config/dev.js');
        const conf = require(configEnv);
        const confDef = require(configDef);
        const merge = Object.assign({}, conf, confDef);
        Object.defineProperty(this.app, 'config', {
            get: () => {
                return merge
            }
        })
    }
}