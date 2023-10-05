<template>
    <!-- NOTE passing our props to the v-tour's props -->
    <v-tour name="myTour" :steps="steps" :callbacks="callbacks"></v-tour>
</template>

<script>
export default {
    props: {
        steps: { type: Array, required: true },
        callbacks: { type: Object }
    },
    setup() {
        return {};
    },

    mounted: function () {
        this.$tours['myTour'].start()
    }

};
</script>


<style></style>