import { DataStore } from '../../data'
import { RequestHandler } from 'express'
import { PostDetail } from '../../model/postDetail'
import { MyError } from '../../model/message'

interface imgMapInterface {
    [index: string]: string;
};


const imgMap: imgMapInterface = {
    "1": "https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg",
    "2": "https://image.cc0.cn/201906/20190529015745183.jpg?x-oss-process=style/www.cc0.cn-1200px",
    "3": "http://static.runoob.com/images/demo/demo4.jpg"
}

export const getPostDetail: RequestHandler = (req, res, next) => {
    const id = req.params.id
    const seletedPost = DataStore.posts.find(
        (element: any) => {
            return element.id === id
        }
    );

    if (seletedPost) {
        const imgUrls = seletedPost.img.map((item: string) => {
            const imgName = item.slice(0, item.lastIndexOf('.'))
            if (req.app.get('env') === 'development') {
                return 'http://localhost:3000/static/' + item;
            } else {
                return imgMap[imgName]
            }
        })
        const selectReviews = DataStore.review.filter(
            (item: any) => item.postId == req.params.id
        );
        res.json(new PostDetail(seletedPost, selectReviews, imgUrls));
    } else {
        next(new MyError('验证错误', '未找到指定内容', 404))
    }
}


