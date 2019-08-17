import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';
import uuid from 'uuid/v4';

export function getFileUploader(env: string): RequestHandler {
    if (env === 'development') {
        const fileID = uuid()
        const fileStore = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve('./', 'public', '/img'))
            },
            filename: (req, file, cb) => {
                cb(null, fileID + path.extname(file.originalname));
            }
        })
        return multer({ storage: fileStore }).single('file')
    } else {
        return (req, res, next) => { next() }
    }
}
