import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService {
    async getEventTickets(eventId){
        const res = await api.get('api/events/' + eventId + '/tickets')
        logger.log(res.data)
        AppState.eventTickets = res.data
    }
}

export const ticketsService = new TicketsService()