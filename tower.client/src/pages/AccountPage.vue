<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h3>Your upcoming events...</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3"  v-for="e in myTickets" :key="e.id">
        <TowerEvent :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { ticketsService } from '../services/TicketsService';
import { eventsService } from '../services/EventsService';
import { useRouter } from 'vue-router';
export default {
  name: 'Account',
  setup() {
    const router = useRouter()
    onMounted(async () => {
      try {
        await ticketsService.getAccountTickets()
        // logger.log(AppState.myTickets)
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
        
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
