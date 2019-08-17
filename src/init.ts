import * as fs from 'fs';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import { BaseContext } from "koa";

// 使用装饰器
import { decorator } from './decorators/router';


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

    //TODO:
    // 将loadController改为装饰器模式
    // 及其简洁，因为现在不需要对controller进行映射了
    loadController() {
        const dirs = fs.readdirSync(__dirname + '/controller');
        dirs.forEach((filename) => {
            require(__dirname + '/controller/' + filename).default;
        })
    }

    //TODO:
    // 将loadRouter改为装饰器模式
    loadRouter() {
        this.loadController();
        this.loadService();
        this.loadConfig();

        const routes = decorator.getRoute();
        // 拿到所有的route，注册进去
        Object.keys(routes).forEach((url) => {
            routes[url].forEach((object) => {
                (<any>this.router)[object.method](url, async (ctx: BaseContext) => {
                    const instance = new object.constructor(ctx, this.app);
                    await instance[object.handler]();
                })
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