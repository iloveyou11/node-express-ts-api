import { RequestParamHandler } from 'express'
import { MyError } from '../../model/message'

const dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/

export const dateParam: RequestParamHandler = (req, res, next, value, name) => {
    const parsed = dateReg.exec(value)
    if (parsed) {
        const [_, year, month, day] = parsed.map(item => parseInt(item));
        const date = new Date(year, month - 1, day)
        req.params[name] = date
        next()
    } else {
        next(new MyError(
            '解析失败',
            '日期无法被正确解析!正确格式：YYYY-MM-DD',
            400
        ))
    }
}