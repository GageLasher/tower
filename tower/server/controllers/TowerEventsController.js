import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAll)
        .get('/:id', this.getById)
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
    
          const editedTowerEvent = await towerEventsService.update(req.body)
          return res.send(editedTowerEvent)
        } catch (error) {
          next(error)
        }
      }
      async cancelEvent(req, res, next) {
        try {
          const message = await towerEventsService.cancelEvent(req.params.id)
          return res.send(message)
        } catch (error) {
          next(error)
        }
      }
}