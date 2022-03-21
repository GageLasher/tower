import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {
    async addComment(body){
        const res = await api.post('api/comments', body)
        AppState.comments = [...AppState.comments, res.data]
        // logger.log(AppState.comments)
        // logger.log(res.data)
    }
    async getComments(id){
        const res = await api.get('api/events/' + id + '/comments')
        AppState.comments = res.data
    }
    async deleteComment(id){
        const res = await api.delete('api/comments/' + id)
        AppState.comments = AppState.comments.filter(c => c.id !== id)
    }
}


export const commentsService = new CommentsService()