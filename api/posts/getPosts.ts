import { DataStore } from '../../data'
import { RequestHandler } from 'express'
import { PostSummary } from '../../model/postSummary'
import { PostFilter } from '../../model/postFilter'

export const getPosts: RequestHandler = (req, res) => {
    const filters = new PostFilter(req.query)
    const filteredData = DataStore.posts.filter(
        (item: any) => {
            let condition = [filters.currency ? (item.currency === filters.currency) : true]
            return condition.every(item => item === true)
        }
    )
    res.json(filteredData.map((item: any) => new PostSummary(item)))
}