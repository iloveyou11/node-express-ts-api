import { Controller } from "./base";

// 我们可以轻易的在这个类中定义很多的方法，来表示一个模块。
// 想用ctx的时候，只需要this.ctx就可以拿到，非常的方便。
// 一组相关的路由地址，都放于一个类中，方便看，也方便维护。

// 现在路由其实有一个很大的问题，就是路由太分散，不方便进行统一的管理。在这里，我们势必要对其进行重写。

export default class User extends Controller {

    // 注意：在这里增添新的函数时，务必要在router.ts中写相应的路由，才能正常访问路由
    // 在稍后会实现装饰器的版本，就不用这个麻烦地来回切换文件挂在路由，只需要使用@地方式，在函数上实现装饰功能即可

    // 测试路由
    async index() {
        this.ctx.body = '欢迎欢迎';
    }

    // async getUserName() {
    //     this.ctx.body = '我是张三';
    // }

    // async getUserAge() {
    //     this.ctx.body = '我今年20岁';
    // }


    // 测试挂载到ctx上的service
    // 使用方法： this.ctx.service.user.getName()
    async getUserName() {
        this.ctx.body = this.ctx.service.user.getName();
    }

    async getUserAge() {
        this.ctx.body = this.ctx.service.user.getAge();
    }

    // 测试挂载到app上的config
    // 使用方法：this.app.config.....
    getConfig() {
        return (<any>this.app)['config']
    }

    async getDefaultName1() {
        this.ctx.body = this.getConfig().defaultName1;//注意这里
    }
}