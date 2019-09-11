<template>
    <v-layout row class="primary">
        <v-layout column justify-center>
            <v-layout row shrink align-center justify-center class="pb-3">
                <span class="pr-2 not-found-big accent--text no-select">4</span>
                <v-icon :size="72" color="accent">fas fa-toilet-paper</v-icon>
                <span class="pl-2 not-found-big accent--text no-select">4</span>
            </v-layout>
        </v-layout>
    </v-layout>

</template>

<script>
export default {
    name: 'notFound'
};
</script>

<style scoped>
.not-found-big {
    font-size: 96px;
    font-weight: 500;
}
</style>
