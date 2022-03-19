<template>
  <div class="container-fluid">
    <div class="row bg-dark text-light shadow rounded m-2">
      <div class="col-4">
        <img :src="event.coverImg" alt="" class="img-fluid" />
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-12 d-flex justify-content-between">
            <h3 class="me-3">{{ event.name }}</h3>
            <h3 class="ms-2">{{ new Date(event.startDate).toDateString() }}</h3>
          </div>
          <div class="col-12">
            <h5>{{ event.location }}</h5>
          </div>
          <div class="col-12">
            <p>
              {{ event.description }}
            </p>
          </div>
          <div class="col-12 d-flex justify-content-between">
            <span>
              <span class="text-primary me-2"> {{ event.capacity }}</span> Spots
              Left</span
            >
            <button class="btn btn-warning d-flex justify-content-end mb-2">
              Attend
            </button>
          </div>
        </div>
      </div>
    </div>
    <h4 class="m-2">See who is attending...</h4>
    <div class="row bg-dark text-light shadow rounded m-2">
      <div class="col-12">
        <Ticket />
      </div>
    </div>
    <div class="div">
      <div class="row justify-content-center">
        <div class="col-8 mt-5">
          <h4>What are people saying...</h4>
          <div class="bg-dark text-light">
            <div class="row">
              
              <div class="col-12 p-5">
                 <form action="" @submit.prevent="addComment">

                <div class="form-group">
                  <label for="exampleFormControlTextarea1"
                    class="d-flex justify-contend-end">Join the conversation</label
                  >
                  <textarea
                    v-model="editable.body"
                    
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Tell the people..."
                  ></textarea>
                </div>
                    <div class="col-12 d-flex justify-content-end">

                 <button type="submit" class="btn btn-success mt-3 d-flex justify-content-end">Post Comment</button>
                    </div>
                </form>
              </div>
              <div class="row d-flex justify-content-center m-2" v-for="c in comments" :key="c.id">
                  <Comment :comment="c" />
              </div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { eventsService } from '../services/EventsService'
import { commentsService } from '../services/CommentsService'

import { watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { ticketsService } from '../services/TicketsService'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    watchEffect(async () => {
      try {
        if (route.name == "Event") {
          await eventsService.getActiveEvent(route.params.id)
          await ticketsService.getEventTickets(route.params.id)
          await commentsService.getComments(AppState.activeEvent.id)

        }
      } catch (error) {
        logger.error(error.message)
        Pop.toast(error.message, "error")
      }
    })
    
    return {
        editable,
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.eventTickets),
      comments: computed(() => AppState.comments.filter(c => c.eventId == AppState.activeEvent.id)),
        async addComment(){
               try {
                   logger.log(editable.value)
                   editable.value.eventId = AppState.activeEvent.id
                   await commentsService.addComment(editable.value)
                   editable.value = {}
                   
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