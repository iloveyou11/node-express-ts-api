import Service from './base'
import { DataStore } from '../data'
import { PostSummary } from '../model/postSummary'
import { PostDetail } from '../model/postDetail'
import { PostFilter } from '../model/postFilter'
import { NewPost } from '../types/interface/newPost';
import errs from '../types/class/error'
import * as uuid from 'uuid';

interface imgMapInterface {
    [index: string]: string;
};
const imgMap: imgMapInterface = {
    "1": "https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg",
    "2": "https://image.cc0.cn/201906/20190529015745183.jpg?x-oss-process=style/www.cc0.cn-1200px",
    "3": "http://static.runoob.com/images/demo/demo4.jpg"
}



export default class posts extends Service {
    //posts

    // 获取全部数据
    getPosts() {
        const filters = new PostFilter(this.ctx.query)
        const filteredData = DataStore.posts.filter(
            (item: any) => {
                let condition = [filters.currency ? (item.currency === filters.currency) : true]
                return condition.every(item => item === true)
            }
        )
        this.ctx.body = filteredData.map((item: any) => new PostSummary(item))
    }

    // 获取单条详细数据
    getPostDetail() {
        const id = this.ctx.params.id
        const seletedPost = DataStore.posts.find(
            (element: any) => {
                return element.id === id
            }
        );
        if (seletedPost) {
            const imgUrls = seletedPost.img.map((item: string) => {
                const imgName = item.slice(0, item.lastIndexOf('.'))
                if (this.ctx.app.env === 'development') {
                    return 'http://localhost:3000/static/' + item;
                } else {
                    return imgMap[imgName]
                }
            })
            const selectReviews = DataStore.review.filter(
                (item: any) => item.postId == this.ctx.params.id
            );
            this.ctx.body = new PostDetail(seletedPost, selectReviews, imgUrls)
        } else {
            throw new errs.NotFound('未找到指定内容')
        }
    }

    // 创建新数据
    createPost() {
        const requireFields = ['title', 'body']
        const givenFields = Object.getOwnPropertyNames(this.ctx.request.body)
        if (!requireFields.every(field => givenFields.includes(field))) {
            throw new errs.ParameterError('没有提供必须参数')
        }
        // 注意这里引入了koa-bodyparser中间件，使用this.ctx.request.body获取body数据
        let body = this.ctx.request.body
        const newPost: NewPost = {
            id: uuid(),
            userId: body.userId,
            title: body.title,
            body: body.body,
            price: body.price,
            currency: body.currency,
            img: []
        };
        DataStore.posts.push(newPost);
        this.ctx.status = 200
        this.ctx.body = {
            msg: '新增成功',
            post: newPost
        }
    }

    // 更新单条数据
    updatePost() {
        const postIndex = DataStore.posts.findIndex(
            (item: any) => item.id == this.ctx.params.id
        );
        if (postIndex > -1) {
            const oldPost = DataStore.posts[postIndex];
            let body = this.ctx.request.body
            const updatePost: NewPost = {
                id: this.ctx.params.id,
                userId: body.userId || oldPost.userId,
                title: body.title || oldPost.title,
                body: body.body || oldPost.body,
                price: body.price || oldPost.price,
                currency: body.currency || oldPost.currency,
                img: body.img || oldPost.img,
            };

            DataStore.posts[postIndex] = updatePost;
            this.ctx.status = 200
            this.ctx.body = {
                msg: '更新成功',
                id: postIndex,
                post: updatePost
            }
        } else {
            throw new errs.NotFound('未找到指定内容')
        }
    }

    // 删除单条数据
    deletePost() {
        const postIndex = DataStore.posts.findIndex(
            (item: any) => item.id === this.ctx.params.id
        )
        if (postIndex > -1) {
            DataStore.posts.splice(postIndex, 1)
            this.ctx.status = 200
            this.ctx.body = {
                msg: '删除成功',
                id: postIndex
            }
        } else {
            throw new errs.NotFound('未找到指定内容')
        }
    }

}
