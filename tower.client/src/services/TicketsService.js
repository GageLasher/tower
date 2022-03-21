import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
    async getEventTickets(eventId){
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log('event tickets log',res.data )
        AppState.eventTickets = res.data
    }
    async attend(body){
        const res = await api.post('api/tickets', body)
        // logger.log(res.data)
        AppState.activeEvent.capacity--
        const ticket = {...res.data, name: res.data.creator.name, picture: res.data.creator.picture }

        AppState.eventTickets.push(ticket)
    }
    async getAccountTickets(){
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data
    }
    async remove(id){
        const res = await api.delete('api/tickets/' + id)
        AppState.myTickets = AppState.myTickets.filter(mt => mt.ticketId !== id)
        
    }
}

export const ticketsService = new TicketsService()