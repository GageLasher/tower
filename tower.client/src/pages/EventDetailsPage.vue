<template>
<div class="container-fluid">

<div class="row bg-dark text-light shadow rounded m-2">
    <div class="col-4">
        <img :src="event.coverImg" alt="" class="img-fluid">
    </div>
    <div class="col-8">
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <h3 class="me-3">{{event.name}} </h3>
                <h3 class="ms-2">{{new Date(event.startDate).toDateString()}} </h3>
            </div>
            <div class="col-12">
                <h5>{{event.location}} </h5>
            </div>
            <div class="col-12">
                <p>
                    {{event.description}}
                </p>
            </div>
            <div class="col-12 d-flex justify-content-between">
               <span> <span class="text-primary me-2"> {{event.capacity}}</span>  Spots Left</span> 
                <button class="btn btn-warning d-flex justify-content-end">Attend</button>
            </div>
        </div>
    </div>
</div>
<h4 class="m-2">
See who is attending...

</h4>
<div class="row bg-dark text-light shadow rounded m-2">
<div class="col-12">
    <Ticket />
</div>
</div>
</div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService'
import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { ticketsService } from '../services/TicketsService'
export default {
    setup(){
        const route = useRoute()
        watchEffect(async () => {
            try {
                     if(route.name == "Event"){
                    await eventsService.getActiveEvent(route.params.id)
                    await ticketsService.getEventTickets(route.params.id)

                     }
            } catch (error) {
                logger.error(error.message)
                Pop.toast(error.message, "error")
            }
        })
        return {
            event: computed(() => AppState.activeEvent),
            tickets: computed(() => AppState.eventTickets)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>