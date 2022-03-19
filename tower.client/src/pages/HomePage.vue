<template>
<div class="container-fluid">
 <div class="row">
   <div class="col-12">
     <img src="../assets/img/banner.png" alt="" class="img-fluid">
   </div>
 </div>
<div class="row bg-dark text-light shadow me-1 ms-1 mt-3">
  <div class="col-12 d-flex justify-content-between p-2">
    <h4  class="selectable" title="All Events" @click="getAll()">All</h4>

    <h4 class="selectable" title="Conventions" @click="filter('convention')">Conventions</h4>

    <h4  class="selectable" title="Sports" @click="filter('sport')">Sports</h4>
    <h4  class="selectable" title="Digital" @click="filter('digital')">Digital</h4>
    <h4  class="selectable" title="Concertrs" @click="filter('concert')">Concerts</h4>
  </div>
</div>
 <div class="row">
   <div class="col-md-3 mt-4 selectable" :title="e.name" v-for="e in events" :key="e.id"  @click="goTo(e.id)">
     <TowerEvent :event="e" />
   </div>
 </div>

</div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { eventsService } from '../services/EventsService'
import { useRouter } from 'vue-router'
export default {
   name: 'Home',
  setup(){
    const router = useRouter()
    return {
      events: computed(() => AppState.towerEvents),

      async getAll(){
        await eventsService.getAll()
      },
      async filter(str){
        await eventsService.getAll(`?type=${str}`)
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
.main-img {
  
  height: 250px;
  width: 1000px;  
  
}
</style>