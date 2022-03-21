<template>
        <div>

       <img :src="event.coverImg" alt="" class="img-fluid">

           <div class="bg-light shadow d-flex flex-column">
               <div class="selectable" title="event" @click="goTo(event.id)">

             <h3>
                   {{event.name}}
                   </h3>
               {{event.location}}
               {{new Date(event.startDate).toDateString()}}
               <div class="d-flex justify-content-end" v-if="!event.isCanceled">
                   <span class="text-primary me-2">{{event.capacity }} </span>  Spots Left
               </div>
               </div>
                <div class="bg-danger text-center" v-if="event.capacity <= 0">
                   <h4>Sold Out</h4>
               </div>
               <div class="bg-danger text-center" v-if="event.isCanceled">
                   <h4>Canceled</h4>
               </div>
                <div class="bg-danger text-center" v-if="attending">
                   <h4 @click="notGoing" class="selectable" title="not going">Not going...</h4>
               </div>
           </div>
    
       
        </div>
   
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { eventsService } from '../services/EventsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
export default {
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    setup(props){
        const route = useRoute()
        const router = useRouter()
        return {
            attending: computed(() => {
                if (route.name == "Account") {
                    return true
                }
            }),
            async notGoing(){
                try {
                    let ticket = AppState.myTickets.find(mt => mt.eventId == props.event.id)
                    logger.log(ticket)
                    await ticketsService.remove(ticket.ticketId)
                } catch (error) {
                    logger.error(error)
          Pop.toast(error.message, 'error')
                }
            },
            async goTo(id){
        try {

            await eventsService.getActiveEvent(id)
          router.push({
            
                        name: 'Event',
                        params: {id: AppState.activeEvent.id}
                    })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
        }
    }
}
</script>


<style lang="scss" scoped>

</style>