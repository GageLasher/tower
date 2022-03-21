import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService {
    async getAll(query = ""){
        const res = await api.get('api/events/' + query)
        logger.log(res.data)
        AppState.towerEvents = res.data
    }
    async createEvent(body){
        const res = await api.post('api/events', body)
        AppState.activeEvent = res.data
        AppState.events = [...AppState.events, res.data]
    }
    async getActiveEvent(id){
        const res = await api.get('api/events/'+id)
        AppState.activeEvent = res.data
        
    }
    async cancelEvent(id){
        const res = await api.delete('api/events/' + id)
        AppState.activeEvent.isCanceled = true
    }
    async editEvent(body, id){
        const res = await api.put('api/events/' + id, body)
    }
}

export const eventsService = new EventsService()