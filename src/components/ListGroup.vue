<template>
 
    <div class = "listAction" id = "listAction">
        <div v-for = "items in listAction" :key = "items.name" id = "wrapper" class="wrapper">
            <v-btn text small id = "vbtn" class = "vbtn"> 
                <img :src = 'items.sourceimg'/>
                {{ items.name }}
                
            </v-btn>
        </div>
    </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
export default {
    name:  "ListAction",
    props: ['listAction']
}

</script>
<style>
    #listAction {
        display: flex;
        flex-direction: column;
        max-width: 255px;
        background: #FAFAFA;
        border: 1px solid gray;
        border-radius: 20px;
        margin-left: 50%;
        padding: 4px;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #C4C4C4;


        padding: 4px;
    }
    .item {
        display: flex;
        align-items: center;
        padding: 2px;
    }

    .item .text {
        padding-left: 2px;
    }

    #listAction :last-child {
        border-bottom: transparent;
    }
    #vbtn {
        justify-content: left;
        padding-left: 2px;
    }
</style>