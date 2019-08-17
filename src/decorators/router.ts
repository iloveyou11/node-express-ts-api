interface DecoratorConfig {
    method: string,
    constructor: any,
    handler: string
}

interface DecoratorConfigs {
    [key: string]: Array<DecoratorConfig>
}

export class Decorator {
    router: DecoratorConfigs = {} //用于保存路由的映射关系
    // setRouter 将路由映射放入this.router中，并检查是否重复，因为每个地址且不同http method 不算冲突，所以我们保存的时候需要用到数组
    setRouter(url: string, decorator: DecoratorConfig) {
        const _de = this.router[url];
        if (_de) {
            //检查http method 是否冲突
            for (const index in _de) {
                const object = _de[index];
                if (object.method === decorator.method) {
                    console.log(`路由地址 ${object.method} ${url} 已经存在`)
                    return
                }
            }
            //不冲突则注册
            this.router[url].push(decorator);
        } else {
            this.router[url] = [];
            this.router[url].push(decorator);
        }
    }

    /**
     * 用法@instance.get('/')
     * @param url 
     */
    // get 装饰器，用于装饰我们的controller
    get(url: string) {
        return (target: any, propertyKey: string) => {
            (<any>this).setRouter(url, {
                method: 'get',
                constructor: target.constructor,
                handler: propertyKey
            })
        }
    }

    /**
   * 用法@instance.post('/')
   * @param url 
   */
    // get 装饰器，用于装饰我们的controller
    post(url: string) {
        return (target: any, propertyKey: string) => {
            (<any>this).setRouter(url, {
                method: 'post',
                constructor: target.constructor,
                handler: propertyKey
            })
        }
    }

    /**
  * 用法@instance.put('/')
  * @param url 
  */
    // get 装饰器，用于装饰我们的controller
    put(url: string) {
        return (target: any, propertyKey: string) => {
            (<any>this).setRouter(url, {
                method: 'put',
                constructor: target.constructor,
                handler: propertyKey
            })
        }
    }

    /**
  * 用法@instance.delete('/')
  * @param url 
  */
    // get 装饰器，用于装饰我们的controller
    delete(url: string) {
        return (target: any, propertyKey: string) => {
            (<any>this).setRouter(url, {
                method: 'delete',
                constructor: target.constructor,
                handler: propertyKey
            })
        }
    }

    /**
     * 返回路由
     */
    // getRoute 返回所有的路由
    getRoute() {
        return this.router;
    }
}


export const decorator = new Decorator;