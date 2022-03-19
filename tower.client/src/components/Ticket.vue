<template>
<div v-for="t in tickets" :key="t.id">
<img :src="t.picture" alt="" :title="t.name" class="p-3">
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
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
}
</style>