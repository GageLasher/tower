import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  towerEvents: [],
  activeEvent: {},
  events: [],
  eventTickets: [],
  comments: [],
  myTickets: []

})
