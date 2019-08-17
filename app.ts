import express from 'express'
import bodyParser from 'body-parser'
import * as path from 'path'
const app = express();

import { postsRouter } from './api'
import { downloadImg } from './api/posts/downloadImg'

import { errorHandler } from './api/error/errorHandler'
import { dateParam } from './api/util/reqParams'


import { myResquesHandler } from './interface/myResquesHandler'


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.resolve('./', 'public', 'img')))

// 加入中间件
const authenticate: myResquesHandler = (req, res, next) => {
    const user = 'pennie'
    req.user = user
    next()
}
const logger: myResquesHandler = (req, res, next) => {
    console.log(`用户:${req.user}, 时间:${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}, 方法:${req.method}, 路径:${req.path}`)
    next()
}
app.use(authenticate);
app.use(logger);
app.use(errorHandler); //错误处理

// 设置允许跨域
// app.use((req, res, next) => {
//     res.set({
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE'
//     });
//     next();
//   });

app.use('/posts', postsRouter);


// params参数限定
app.get('/posts/:fromDate/:toDate', (req, res, next) => {
    res.json(req.params)
})
app.param('fromDate', dateParam)
app.param('toDate', dateParam)


/**
 * res.send
 * res.json
 * res.format
 * res.sendFile
 * res.download
 *
 * res.headers : res.get res.set
 * res.status
 */
app.get('/download/img/:id', downloadImg);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server started at http://localhost:3000');
});
