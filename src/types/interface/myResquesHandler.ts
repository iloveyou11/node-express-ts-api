import { Request, Response } from 'koa'

export interface myRequest extends Request {
    user?: string
}

export interface myResponse extends Response {

}

export type myResquesHandler = (
    req: myRequest,
    res: myResponse,
    next: Function
) => any;
