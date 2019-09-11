<template>
    <v-layout row shrink class="primary">
        <v-flex xs12 md8 offset-md2 d-flex>
            <v-layout
                row
                align-center
                class="px-3 mx-3 search-wrapper secondary lighten-2 elevation-1">
                <input
                    ref="search"
                    v-model="searchText"
                    placeholder="Search"
                    class="search-input"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-on:keyup.enter="search">
                <v-icon
                    size="22"
                    color="secondary darken-2"
                    class="cursor-pointer"
                    v-if="searchText"
                    @click="clearSearchText">
                    fas fa-fw fa-times-circle
                </v-icon>
                <v-icon
                    size="22"
                    color="accent"
                    class="mr-1 ml-2 cursor-pointer"
                    @click="search">
                    fas fa-fw fa-search
                </v-icon>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'search',
    components: {},
    props: {},
    data () {
        return {
            searchText: ''
        };
    },
    computed: {
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    methods: {
        clearSearchText () {

            this.searchText = '';
            this.$nextTick(() => this.$refs.search.focus());
        },
        search () {

            if (!this.searchText) {

                return;
            }
            this.$router.push(`/detail/${this.searchText}`);
        }
    }
};
</script>

<style scoped>
.search-wrapper {
    border-radius: 36px;
    position: relative;
    top: 24px;
}
.search-wrapper:focus-within {

}
.search-input {
    font-size: 16px;
    font-weight: 500;
    border: 0;
    outline: none;
    padding: 12px;
    flex-grow: 1;
}
</style>
