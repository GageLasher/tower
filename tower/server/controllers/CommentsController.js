import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";

export class CommentsController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .delete('/:id', this.remove)
    }
    async create(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.create(req.body)
            await res.send(comment)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const commentId = req.params.id
            const userId = req.userInfo.id
          const message = await commentsService.remove(commentId, userId)
          return res.send(message)
        } catch (error) {
          next(error)
        }
      }
}