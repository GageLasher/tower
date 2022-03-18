import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .delete('/:id', this.remove)
     
    }
    async create(req, res, next){
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.create(req.body)
            await res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const ticketId = req.params.id
            const userId = req.userInfo.id
          const message = await ticketsService.remove(ticketId, userId)
          return res.send(message)
        } catch (error) {
          next(error)
        }
      }

}