<template>
<form @submit.prevent="editEvent">
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
            <label for="">Location: </label>
            <input v-model="editable.location" type="text" name="" id="">
        </div>
        </div>
         <div class="row p-3">
        <div class="col-12">
            <label for="">Date: </label>
            <input v-model="editable.startDate" type="date" name="" id="">
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
import { watchEffect } from '@vue/runtime-core'
export default {
    setup(){
       const editable = ref({})
       const router = useRouter()
        watchEffect(()=> {
           editable.value = AppState.activeEvent
       })
        return {
            editable,
            async editEvent(){
                try {
                    await eventsService.editEvent(editable.value, AppState.activeEvent.id)
                     Modal.getOrCreateInstance(
              document.getElementById("edit-event")
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