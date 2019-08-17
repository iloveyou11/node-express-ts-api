
class HttpError extends Error {
    errorCode: number
    code: number
    msg: string
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterError extends HttpError {
    constructor(msg?: string, errorCode?: number) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpError {
    constructor(msg?: string, errorCode?: number) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpError {
    constructor(msg?: string, errorCode?: number) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}

class AuthFailed extends HttpError {
    constructor(msg?: string, errorCode?: number) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class Forbbiden extends HttpError {
    constructor(msg?: string, errorCode?: number) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

export default {
    HttpError,
    ParameterError,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden
}

