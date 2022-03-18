import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class CommentsService {
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment
    }
    async getComments(query) {
        const comments = await dbContext.Comments.find(query).populate('creator')
        if(!comments){
            throw new BadRequest('No comments to be found')
           }
        return comments
      }
      async remove(commendId, userId) {
        const comment = await dbContext.Comments.findById(commendId)
        if (comment.creatorId.toString() !== userId) {
          throw new Forbidden('this is not your comment')
        }
        await dbContext.Comments.findByIdAndDelete(commendId)
        return 'deleted'
      }
}

export const commentsService = new CommentsService()