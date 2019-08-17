import { RequestHandler } from 'express'
import { DataStore } from '../../data'
import { MyError, resInfo } from '../../model/message'

export const deletePost: RequestHandler = (req, res, next) => {
    const postIndex = DataStore.posts.findIndex(
        (item: any) => item.id === req.params.id
    )
    if (postIndex > -1) {
        DataStore.posts.splice(postIndex, 1)
        res.json(new resInfo('删除成功', 200, { id: postIndex }))
    } else {
        next(new MyError('验证错误', '未找到指定内容', 404))
    }
}