import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TowerEventsService {
    async update(update) {
        const original = await dbContext.TowerEvents.findById(update.id)
        if(original.isCanceled){
            throw new BadRequest("this event is already canceled")
        }
        original.name = update.name ? update.name : original.name
        original.description = update.description ? update.description : original.description
       
       
        
        await original.save()
        await original.populate('creator')
        return original
      }
    async getById(id) {
        const towerEvent = await dbContext.TowerEvents.findById(id)
    if (!towerEvent) {
      throw new BadRequest('Invalid Id')
    }
    return towerEvent
    }
    async getAll(query = {}) {
        const towerEvents = await dbContext.TowerEvents.find(query)
        return towerEvents
    }
    async create(body) {
        const towerEvent = await dbContext.TowerEvents.create(body)
        return towerEvent
    }
    async cancelEvent(id) {
        const original = await dbContext.TowerEvents.findById(id)
        if(original.isCanceled){
            throw new BadRequest("this event is already canceled")
        }
        original.isCanceled = !original.isCanceled
        await original.save()
        return 'canceled event'
      }

}

export const towerEventsService = new TowerEventsService()