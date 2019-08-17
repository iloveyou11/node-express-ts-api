import { Router } from 'express';
import { checkFilter } from './util/checkFilter';
import { getPosts } from './posts/getPosts';
import { getPostDetail } from './posts/getPostDetail';
import { createPost } from './posts/createPost';
import { deletePost } from './posts/deletePost';
import { uploadImg } from './posts/uploadImg';
import { updatePost } from './posts/updatePost';

export let postsRouter = Router();

postsRouter.get('/', checkFilter, getPosts);
postsRouter.get('/:id', getPostDetail);

postsRouter.post('/', createPost);
postsRouter.delete('/:id', deletePost);
postsRouter.put('/:id', updatePost);

// 上传图片
postsRouter.post('/:id/img', uploadImg);
