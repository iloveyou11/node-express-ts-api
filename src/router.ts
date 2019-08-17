// 我们这里的设计是router模块导出一个函数，函数的参数是一个controller对象。 里面包含着我们要规定的路由信息。
// 规则: controller.[文件名].[方法名]
// 这样做的好处就是我们定义路由的时候，第二个参数就是文件名，第三个参数就是方法名，一目了然。

// 注意：这里的controller.[文件名].[方法名]一定要一一对应，斗则路由无法正确挂载
module.exports = (controller: any) => {
    return {
        'get /': controller.user.index,
        'get /user/getUserName': controller.user.getUserName,
        'get /user/getUserAge': controller.user.getUserAge,
        'get /user/getDefaultName1': controller.user.getDefaultName1,

        'get /posts': controller.posts.getPosts,
        'get /posts/:id': controller.posts.getPostDetail,
        'post /posts': controller.posts.createPost,
        'delete /posts/:id': controller.posts.deletePost,
        'put /posts/:id': controller.posts.updatePost,

        'get /img/download/:id': controller.img.downloadImg,
        'post /img/upload': controller.img.uploadImg,
    }
}