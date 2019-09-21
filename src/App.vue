<template>
    <v-app class="primary">
        <v-toolbar
            app
            fixed
            flat
            color="primary">
            <nav-top></nav-top>
        </v-toolbar>
        <v-content grow>
            <v-container
                fluid
                fill-height
                class="pa-0 primary darken-1">
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer
            class="pa-3 primary no-select"
            dark
            height="auto">
            <v-layout row wrap align-center>
                <v-flex xs12 md4 order-xs2 order-md1>
                    <v-layout column v-bind:class="{ 'align-start': !isMobile }">
                        <span class="body-2 font-weight-bold">
                            {{ `${config.footerAppTitle} v${appVersion}` }}
                        </span>
                        <span class="caption font-weight-medium">
                            {{ `&copy; ${config.copyright}` }}
                        </span>
                        <span
                            class="caption font-weight-medium"
                            v-if="config.coinSymbol != 'XNV' && config.coinSymbol != 'XAM'">
                            &copy; 2019 JerMe404
                        </span>
                        <v-layout
                            row
                            align-center
                            v-if="config.coinSymbol != 'XNV' && config.coinSymbol != 'XAM'">
                            <span class="caption font-weight-medium">
                                Based on JerMe404's
                                <a
                                    href="https://github.com/jerme404/blockexploder"
                                    rel="nofollow"
                                    target="_blank">
                                    <span class="pl-1 repo-link caption font-weight-medium info--text">
                                        blockexploder
                                    </span>
                                </a>
                            </span>
                        </v-layout>
                    </v-layout>
                </v-flex>
                <v-flex xs12 md4 order-xs1 order-md2>
                    <v-layout column>
                        <v-layout row align-center justify-center>
                            <a
                                v-for="(link, index) in config.footerLinks"
                                :href="link.url"
                                :key="index"
                                rel="nofollow"
                                target="_blank"
                                class="pa-2 mx-2">
                                <v-icon
                                    size="22" color="secondary lighten-2">
                                    {{ link.icon }}
                                </v-icon>
                            </a>
                        </v-layout>
                    </v-layout>
                </v-flex>
                <v-flex xs12 md4 order-xs3>
                </v-flex>
            </v-layout>
        </v-footer>
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
        },
        appVersion () {

            return process.env.VUE_APP_VERSION;
        }
    },
    methods: {
        ...mapActions({
            explorerLoad: 'explorer/explorerLoad'
        }),

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
.repo-link {
    text-decoration: none !important;
}
.nerva-gradient {
    background-image: linear-gradient( 135deg, rgba(85, 168, 191, 1) 0%, rgba(99, 88, 145, 1) 100%);
}
</style>
