<template>
    <v-app class="primary">
        <v-toolbar
            app
            fixed
            flat
            color="primary">
            <nav-top></nav-top>
        </v-toolbar>
        <v-content>
            <v-container
                fluid
                fill-height
                class="pa-0 primary darken-1">
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Config from '@/config';
import { mapActions, mapState } from 'vuex';
import store from '@/store';
const NavTop = () => import('@/components/NavTop');

export default {
    name: 'App',
    components: {
        'nav-top': NavTop
    },
    data () {
        return {
            config: Config
        };
    },
    computed: {
        ...mapState({

        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    methods: {
        ...mapActions({
            explorerLoad: 'explorer/explorerLoad'
        })
    },
    created () {

        this.explorerLoad();
    }
};
</script>

<style>
body {
    background-color: #2C3033;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2C3033;
    font-size: 16px;
    padding: 0px;
    margin: 0px;
}
.font-mono {
    font-family: 'B612 Mono', monospace !important;
}
.no-select {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-default {
    cursor: default;
}
.hash-id {
    overflow: hidden!important;
    text-overflow: ellipsis!important;
}
.hash-id a {
    text-decoration: none !important;
}
.nerva-gradient {
    background-image: linear-gradient( 135deg, rgba(85, 168, 191, 1) 0%, rgba(99, 88, 145, 1) 100%);
}
</style>
