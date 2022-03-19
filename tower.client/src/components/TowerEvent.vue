<template>
        <div>

       <img :src="event.coverImg" alt="" class="img-fluid">

           <div class="bg-light shadow d-flex flex-column">
             <h3>
                   {{event.name}}
                   </h3>
               {{event.location}}
               {{new Date(event.startDate).toDateString()}}
               <div class="d-flex justify-content-end" v-if="!event.isCanceled">
                   <span class="text-primary me-2">{{event.capacity }} </span>  Spots Left
               </div>
                <div class="bg-danger text-center" v-if="event.capacity <= 0">
                   <h4>Sold Out</h4>
               </div>
               <div class="bg-danger text-center" v-if="event.isCanceled">
                   <h4>Canceled</h4>
               </div>
           </div>
    
       
        </div>
   
</template>


<script>
export default {
    props: {
        event: {
            type: Object,
            required: true
        }
    },
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>

</style>