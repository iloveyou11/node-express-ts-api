import error from '../types/class/error'
const { HttpError } = error;

const catchError = async (ctx: any, next: any) => {
    try {
        await next()
    } catch (error) {
        // 开发环境
        // 生产环境
        // 开发环境 不是HttpError
        const isHttpError = error instanceof HttpError
        // const isDev = global.config.environment === 'dev'
        // if (isDev && !isHttpError) {
        //     throw error
        // }

        if (isHttpError) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: 'error',
                error_code: 999, //自定义错误码，表示未知错误
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

export default catchError