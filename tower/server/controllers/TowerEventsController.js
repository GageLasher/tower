import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAll)
        .get('/:id', this.getById)
        .get('/:id/tickets', this.getTickets)
        .get('/:id/comments', this.getComments)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .put('/:id', this.update)
        .delete('/:id', this.cancelEvent)
    }
    async getAll(req, res, next){
        try {
            const query = req.query
            const towerEvents = await towerEventsService.getAll(query)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
          const towerEvent = await towerEventsService.getById(req.params.id)
          return res.send(towerEvent)
        } catch (error) {
          next(error)
        }
      }
      async getTickets(req, res, next) {
        try {
          const tickets = await ticketsService.getTowerEventTickets({ eventId: req.params.id })
          return res.send(tickets)
        } catch (error) {
          next(error)
        }
      }
      async getComments(req, res, next) {
        try {
          const comments = await commentsService.getComments({ eventId: req.params.id })
          return res.send(comments)
        } catch (error) {
          next(error)
        }
      }
    async create(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            await res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
          req.body.id = req.params.id
          req.body.creatorId = req.userInfo.id
    
          const editedTowerEvent = await towerEventsService.update(req.body)
          return res.send(editedTowerEvent)
        } catch (error) {
          next(error)
        }
      }
      async cancelEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
          const message = await towerEventsService.cancelEvent(req.body)
          return res.send(message)
        } catch (error) {
          next(error)
        }
      }
}