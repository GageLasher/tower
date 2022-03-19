import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TowerEventsService {
    async update(update) {
        const original = await dbContext.TowerEvents.findById(update.id)
        if(original.isCanceled){
            throw new BadRequest("this event is already canceled")
        }
        if(original.creatorId.toString() !== update.creatorId){
            throw new BadRequest('this isnt your event')
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
        const towerEvents = await dbContext.TowerEvents.find(query).populate('creator')
        return towerEvents
    }
    async create(body) {
        const createdDate = new Date(body.startDate)
        const currentDate = new Date()
        if(createdDate < currentDate){
            throw new BadRequest('make a date in the future')
        }
        const towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('creator')
        return towerEvent
    }
    async cancelEvent(body) {
        const original = await dbContext.TowerEvents.findById(body.id)
        if(original.creatorId.toString() !== body.creatorId){
            throw new BadRequest('this isnt your event')
        }
        if(original.isCanceled){
            throw new BadRequest("this event is already canceled")
        }
        original.isCanceled = !original.isCanceled
        await original.save()
        return 'canceled event'
      }

}

export const towerEventsService = new TowerEventsService()