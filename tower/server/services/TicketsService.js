import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService {
    async getAccountTickets(query) {
        const accountTickets = await dbContext.Tickets.find(query).populate('creator', 'name picture').populate('towerevent')
        return accountTickets.map(mongooseDocument => {
            const accountTicket = mongooseDocument.toJSON()
            return {
                
              eventId: accountTicket.eventId,
              accountId: accountTicket.accountId,
              ticketId: accountTicket.id,
              ...accountTicket.creator,
              ...accountTicket.towerevent
            }
          })
        // return accountTickets
      
      }
      async getTowerEventTickets(query) {
        const eventTickets = await dbContext.Tickets.find(query).populate('creator')
        return eventTickets.map(mongooseDocument => {
            const eventTicket = mongooseDocument.toJSON()
            return {
                
              eventId: eventTicket.eventId,
              ticketId: eventTicket.id,
              ...eventTicket.creator
            }
          })
      }
    async create(body) {
        const towerEvent = await towerEventsService.getById(body.eventId)
        
        if(towerEvent.capacity <= 0) {
            throw new BadRequest('there isnt any spots left')
        }
        towerEvent.capacity--
        await towerEvent.save()
        const ticket = await dbContext.Tickets.create(body)
        await ticket.populate('creator')
        return ticket
    }
    async remove(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        const towerEvent = await towerEventsService.getById(ticket.eventId)
        
        if (ticket.creatorId.toString() !== userId) {
          throw new Forbidden('this is not your ticket')
        }
        towerEvent.capacity++
        await dbContext.Tickets.findByIdAndDelete(ticketId)
        return 'deleted'
      }
}

export const ticketsService = new TicketsService()