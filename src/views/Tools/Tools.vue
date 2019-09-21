<template>
    <v-layout row wrap class="primary">
        <v-flex xs12>

            <v-layout row class="pa-3">
                <span>Tools</span>
            </v-layout>
        </v-flex>
    </v-layout>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'tools',
    components: {},
    props: {},
    data () {
        return {};
    },
    computed: {
        ...mapGetters({
        }),
        ...mapState({
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    methods: {
        ...mapActions({
        })
    }
};
</script>

<style scoped>

</style>
