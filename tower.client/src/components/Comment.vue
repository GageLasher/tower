<template>
    <div class="col-2">
        <img :src="comment.creator.picture" alt="">
    </div>
    <div class="col-8 bg-light text-dark">
        <div class="row d-flex flex-column">
            <div class="col-12">
                <h5>
                    {{comment.creator.name}}
                </h5>
                <p>
                    {{comment.body}}
                </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        comment: {
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
img {
    border-radius: 50%;
    height: 10vh;
    width: 10vh;
}
</style>