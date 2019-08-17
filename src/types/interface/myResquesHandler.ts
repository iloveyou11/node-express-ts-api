import { Request, Response, NextFunction } from 'express'

export interface myRequest extends Request {
    user?: string
}

export interface myResponse extends Response {

}

export type myResquesHandler = (
    req: myRequest,
    res: myResponse,
    next: NextFunction
) => any;
