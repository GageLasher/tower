<template>
<div class="row d-flex">

<div v-for="t in tickets" :key="t.id" class="col-1">
<img :src="t.picture" alt="" :title="t.name" class="p-2">
</div>
</div>
</template>


<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { ticketsService } from '../services/TicketsService'

import { AppState } from '../AppState'
export default {
    props: {
        event: {
            type: Object,
            
        }
    },
    setup(props){
      
        return {
            tickets: computed(() => AppState.eventTickets)
        }
    }
}
</script>


<style lang="scss" scoped>
img{
    height: 7vh;
    width: 7vh;
    border-radius: 50%;
}
</style>