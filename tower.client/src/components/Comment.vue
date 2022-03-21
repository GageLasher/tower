<template>
    <div class="col-md-2 col-xs-2">
        <img :src="comment.creator.picture" alt="">
    </div>
    <div class="col-md-8 col-xs-8 bg-light text-dark">
        <div class="row">
            <div class="col-12 d-flex justify-content-between" >
                
                    {{comment.creator.name}}
                    <i class="mdi mdi-delete selectable " title="delete comment" v-if="comment.creatorId == account.id"  @click="deleteComment(comment.id)"></i>
            </div>
                <div class="col-12">

                <p>
                    {{comment.body}}
                </p>
                </div>
            
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { commentsService } from '../services/CommentsService'
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    setup(props){
        return {
            account: computed(() => AppState.account),
            async deleteComment(id){
                try {
                    if(await Pop.confirm()){

                        await commentsService.deleteComment(id)
                    }
                } catch (error) {
                    logger.log(error)
                    Pop.toast(error.message, "error")
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
img {
    border-radius: 50%;
    height: 10vh;
    width: 10vh;
}
</style>