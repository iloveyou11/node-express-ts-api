import { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (req.app.get('env') === 'development') {
        // 开发环境
        return res.status(err.status).json(err)
    } else {
        // 生产环境
        return res.status(err.status).json(err.publicVersion);
    }
}