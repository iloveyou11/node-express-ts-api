import { RequestHandler } from 'express';
import uuid from 'uuid/v4';
import { DataStore } from '../../data';
import { NewPost } from '../../interface/newPost';
import { MyError, resInfo } from '../../model/message'

export const createPost: RequestHandler = (req, res, next) => {
    const requireFields = ['title', 'body']
    const givenFields = Object.getOwnPropertyNames(req.body)
    if (!requireFields.every(field => givenFields.includes(field))) {
        return next(new MyError('参数缺失', '没有提供必须参数', 400))
    }
    const newPost: NewPost = {
        id: uuid(),
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        currency: req.body.currency,
        img: []
    };
    DataStore.posts.push(newPost);
    res.json(new resInfo('新增成功', 200, { post: newPost }))
};
