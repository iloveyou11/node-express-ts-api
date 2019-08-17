import { RequestHandler } from 'express';
import { DataStore } from '../../data';
import { NewPost } from '../../interface/newPost';
import { MyError, resInfo } from '../../model/message'

export const updatePost: RequestHandler = (req, res, next) => {
    const postIndex = DataStore.posts.findIndex(
        (item: any) => item.id == req.params.id
    );
    if (postIndex > -1) {
        const oldPost = DataStore.posts[postIndex];
        const updatePost: NewPost = {
            id: req.params.id,
            userId: req.body.userId || oldPost.userId,
            title: req.body.title || oldPost.title,
            body: req.body.body || oldPost.body,
            price: req.body.price || oldPost.price,
            currency: req.body.currency || oldPost.currency,
            img: req.body.img || oldPost.img,
        };

        DataStore.posts[postIndex] = updatePost;
        res.json(new resInfo('更新成功', 200, { id: postIndex, post: updatePost }))
    } else {
        next(new MyError('验证错误', '未找到指定内容', 404))
    }
}