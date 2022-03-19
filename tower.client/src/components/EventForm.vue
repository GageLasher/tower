<template>
<form @submit.prevent="createEvent">
<div class="row justify-content-center">
    <div class="row p-3">
        <div class="col-12">
            <label for="">Name: </label>
            <input v-model="editable.name" type="text" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Description: </label>
            <input v-model="editable.description" type="text" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Cover Image: </label>
            <input v-model="editable.coverImg" type="text" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Location: </label>
            <input v-model="editable.location" type="text" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Capacity: </label>
            <input v-model="editable.capacity" type="number" name="" id="" min="0">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Date: </label>
            <input v-model="editable.startDate" type="date" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Type: </label>
            <select v-model="editable.type">
            <option>
              Convention
            </option>
            <option>
              Sport
            </option>
            <option>
              Digital
            </option>
            <option>
              Concert
            </option>
          </select>
        </div>
        </div>
        
        <div class="row p-3 justify-content-end">
            <div class="col-4">
                <button class="btn btn-primary" type="submit">
                Submit
            </button>
            </div>
            
        </div>
    </div>
   
        
   
    
</form>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'

import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import { eventsService } from '../services/EventsService'
export default {
    setup(){
       const editable = ref({})
       const router = useRouter()
    
        return {
            editable,
            async createEvent(){
                try {
                    await eventsService.createEvent(editable.value)
                    router.push({
                        name: 'Event',
                        params: {id: AppState.activeEvent.id}
                    })
                     Modal.getOrCreateInstance(
              document.getElementById("create-event")
            ).hide();
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, "error")
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>