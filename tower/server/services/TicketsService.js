import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService {
    async getAccountTickets(query) {
        const accountTickets = await dbContext.Tickets.find(query).populate('towerevent')
        return accountTickets
      
      }
      async getTowerEventTickets(query) {
        const eventTickets = await dbContext.Tickets.find(query).populate('towerevent')
        return eventTickets
      }
    async create(body) {
        const towerEvent = await towerEventsService.getById(body.eventId)
        towerEvent.capacity--
        await towerEvent.save()
        const ticket = await dbContext.Tickets.create(body)
        return ticket
    }
    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.find(ticketId)
        if (ticket.creatorId.toString() !== userId) {
          throw new Forbidden('this is not your ticket')
        }
        await dbContext.Tickets.findByIdAndDelete(ticketId)
        return 'deleted'
      }
}

export const ticketsService = new TicketsService()