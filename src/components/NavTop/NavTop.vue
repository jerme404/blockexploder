<template>
    <v-layout row grow class="no-select">
        <v-flex xs12>
            <v-layout row align-center class="secondary--text">
                <a :href="config.websiteUrl" rel="nofollow" target="_blank">
                    <img
                        align="middle"
                        src="@/assets/logo-color.png"
                        alt="Logo"
                        class="nav-logo"
                        v-bind:class="{ 'nav-logo-mobile': isMobile }">
                </a>
                <v-spacer></v-spacer>
                <v-layout
                    row
                    align-center
                    justify-end
                    v-bind:class="{ 'px-2': !isMobile }">
                    <router-link to="/" class="px-1 ml-2 py-2 nav-link" exact>
                        <span>Explorer</span>
                    </router-link>
                    <!--<router-link to="/tools" class="px-1 ml-2 py-2 nav-link" exact>
                        <span>Tools</span>
                    </router-link>
                    <router-link to="/api" class="px-1 ml-2 py-2 nav-link" exact>
                        <span>API</span>
                    </router-link>-->
                </v-layout>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import Config from '@/config';
import { mapActions, mapGetters } from 'vuex';
import store from '@/store';

export default {
    name: 'navTop',
    data () {
        return {
            config: Config
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        currentRoute () {
            return this.$route.meta.title;
        }
    },
    methods: {
        ...mapActions({
            closeWallet: 'wallet/closeWallet',
            getKeys: 'wallet/getKeys'
        }),
        showWalletKeys () {

            this.getKeys();
        },
        signOut () {

            this.closeWallet();
            this.$router.push({ name: 'dashboard' });
        }
    }
};
</script>

<style scoped>
.nav-logo {
    height: 42px;
    width: auto;
}
.nav-logo-mobile {
    height: 36px !important;
    width: auto;
}
.nav-link{
    color: #AEAEAE;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 500;
    /*border-bottom: 1px solid rgba(0,0,0,0);*/
}
.nav-link:hover, .nav-link:hover i {
    color: #CECECE;
}
.router-link-active.nav-link,
.router-link-exact-active.nav-link {
    cursor: default;
    color: #EDF0F2;
    /*border-bottom: 1px solid #6D7EF7;*/
}
</style>
