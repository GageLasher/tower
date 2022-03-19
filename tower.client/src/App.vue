<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from './AppState'
import { logger } from './utils/Logger'
import Pop from './utils/Pop'
import { eventsService } from '../src/services/EventsService'
export default {
  name: 'App',
  setup() {
    watchEffect(async () => {
      try {
          await eventsService.getAll()
      } catch (error) {
        logger.log(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
