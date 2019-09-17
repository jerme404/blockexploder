<template>
    <v-layout column class="primary lighten-1">
        <v-layout
            column
            align-center
            justify-center
            class="px-3 py-5 primary secondary--text text--lighten-1 no-select"
            v-if="loading">
            <div class="sk-folding-cube">
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
            </div>
        </v-layout>
        <v-layout
            row
            class="px-3 py-4 primary no-select"
            align-center
            justify-center
            v-else-if="errorMessage">
            <v-icon color="error" size="16">
                fas fa-fw fa-exclamation-triangle
            </v-icon>
            <span class="px-3 title font-weight-regular secondary--text text--lighten-1">
                {{ errorMessage }}
            </span>
        </v-layout>
        <v-layout
            row
            wrap
            shrink
            class="py-3 px-1 primary secondary--text text--lighten-1 no-select"
            v-bind:class="{ 'px-3': !isMobile }"
            v-else-if="block || tx">
            <v-layout
                row
                class="px-3 pb-3"
                align-center>
                <v-icon
                    color="accent"
                    size="20">
                    fas {{ tx ? 'fa-exchange-alt' : 'fa-cube' }}
                </v-icon>
                <span class="px-3 title accent--text">
                    {{ tx ? 'Transaction' : 'Block' }}
                </span>
            </v-layout>
            <v-flex xs12 class="px-3 pb-2">
                <v-layout row>
                    <span class="pr-3 subheading font-weight-bold">
                        Hash
                    </span>
                    <span class="subheading hash-id">
                        {{ tx ? tx.hash : block.hash }}
                    </span>
                </v-layout>
            </v-flex>
            <v-layout row wrap v-if="tx">
                <v-flex xs12 md4 xl3>
                    <v-layout column>
                        <v-layout row class="px-3 pb-2">
                            <span class="subheading font-weight-bold">
                                Confirms
                            </span>
                            <v-spacer></v-spacer>
                            <span class="subheading font-weight-medium">
                                {{ confirms || '-' }}
                            </span>
                        </v-layout>
                        <v-layout row class="px-3 pb-2">
                            <span class="subheading font-weight-bold">
                                Fee
                            </span>
                            <v-spacer></v-spacer>
                            <span class="subheading font-weight-medium">
                                {{ `${tx.fee} ${config.coinSymbol}` }}
                            </span>
                        </v-layout>
                    </v-layout>
                </v-flex>
            </v-layout>
            <block-display :block="block" v-else></block-display>
        </v-layout>
        <search v-if="!loading"></search>
        <v-flex
            xs12
            class="pt-5 px-1 pb-3 secondary lighten-1 no-select"
            v-bind:class="{ 'px-3': !isMobile }">
            <v-layout
                column
                class="mb-3 pa-3"
                v-bind:class="{ 'px-3': !isMobile }"
                v-if="block && !tx">
                <v-layout
                    row
                    class="pb-3"
                    align-center>
                    <v-icon
                        color="accent"
                        size="20">
                        fas fa-fw fa-exchange-alt
                    </v-icon>
                    <span class="px-3 title accent--text">
                        {{ `Transactions (${block.num_txes + 1})` }}
                    </span>
                </v-layout>
                <v-layout row>
                    <span class="body-2">
                        Miner TX
                    </span>
                </v-layout>
                <v-layout row>
                    <span class="font-mono hash-id">
                        <router-link
                            class="info--text text--darken-1"
                            :to="{ name: 'detail', params: { param: block.miner_tx_hash }}">
                            {{ block.miner_tx_hash }}
                        </router-link>
                    </span>
                </v-layout>
                <v-layout column class="pt-3" v-if="block.num_txes > 0">
                    <v-layout row>
                        <span class="body-2">
                            TXes
                        </span>
                    </v-layout>
                    <v-layout
                        row
                        v-for="txHash in block.tx_hashes"
                        :key="txHash">
                        <span class="font-mono hash-id">
                            <router-link
                                class="info--text text--darken-1"
                                :to="{ name: 'detail', params: { param: txHash }}">
                                {{ txHash }}
                            </router-link>
                        </span>
                    </v-layout>
                </v-layout>
            </v-layout>
            <v-layout
                column
                class="py-3"
                v-else-if="tx">
                <v-layout column v-if="block">
                    <v-layout
                        row
                        class="px-3 pb-3"
                        align-center>
                        <v-icon
                            color="accent"
                            size="20">
                            fas fa-fw fa-cube
                        </v-icon>
                        <span class="px-3 title accent--text">
                            Block
                        </span>
                    </v-layout>
                    <v-flex xs12 class="px-3 pb-2">
                        <v-layout row>
                            <span class="pr-3 subheading font-weight-bold">
                                Hash
                            </span>
                            <span class="subheading hash-id">
                                <router-link
                                    class="info--text text--darken-1"
                                    :to="{ name: 'detail', params: { param: block.hash }}">
                                    {{ block.hash }}
                                </router-link>
                            </span>
                        </v-layout>
                    </v-flex>
                    <block-display :block="block">
                    </block-display>
                </v-layout>
                <!-- Inputs -->
                <v-layout column v-if="tx && block && tx.hash != block.miner_tx_hash">
                    <v-layout
                        row
                        class="pa-3"
                        align-center>
                        <v-icon
                            color="accent"
                            size="20">
                            fas fa-fw fa-sign-in-alt
                        </v-icon>
                        <span class="px-3 title accent--text">
                            {{`Inputs (${tx.vin.length})`}}
                        </span>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        class="px-3 body-2 pb-1 font-weight-bold">
                        <v-flex xs12 md8>
                            <v-layout row>
                                <span>
                                    Key Image
                                </span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md4 v-if="!isMobile">
                            <v-layout row>
                                <span>
                                    Offsets
                                </span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        class="py-1 px-3 subheading"
                        align-center
                        v-for="input in tx.vin"
                        :key="input.key.k_image">
                        <v-flex xs12 md8>
                            <v-layout row>
                                <span class="font-mono hash-id">
                                    {{ input.key.k_image }}
                                </span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md4 v-if="!isMobile">
                            <v-layout row>
                                <span>
                                    {{ input.key.key_offsets.join(',') }}
                                </span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>

                <!-- Outputs -->
                <v-layout column>
                    <v-layout
                        row
                        class="pa-3"
                        align-center>
                        <v-icon
                            color="accent"
                            size="20">
                            fas fa-fw fa-sign-out-alt
                        </v-icon>
                        <span class="px-3 title accent--text">
                            {{`Outputs (${tx.vout.length})`}}
                        </span>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        class="px-3 body-2 pb-1 font-weight-bold">
                        <span>Key</span>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        class="px-3"
                        v-for="output in tx.vout"
                        :key="output.target.key">
                        <span class="font-mono hash-id">
                            {{ output.target.key }}
                        </span>
                    </v-layout>
                </v-layout>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import Config from '@/config';
import Utils from '@/utils';
import moment from 'moment';
import { mapState } from 'vuex';
import store from '@/store';
import Search from '@/components/Search';
const BlockDisplay = () => import('./components/BlockDisplay');

export default {
    name: 'detail',
    components: {
        'search': Search,
        'block-display': BlockDisplay
    },
    props: {},
    data () {
        return {
            config: Config,
            loading: false,
            blockResult: undefined,
            txResult: undefined,
            errorMessage: undefined
        };
    },
    watch: {
        '$route' (to, from) {

            this.doSearch();
        }
    },
    computed: {
        ...mapState({
            explorerService: state => state.explorer.explorerService,
            networkInfo: state => state.explorer.networkInfo
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        block () {

            if (!this.blockResult) {

                return;
            }

            let blockData = Object.assign({}, this.blockResult.block_header, this.blockResult.json);
            blockData.timeStamp = moment.unix(blockData.timestamp).format('L LT');
            blockData.blockSize = `${Utils.blockSize(blockData.block_size)}B`;
            blockData.diff = Utils.displayUnits(blockData.difficulty, 2);
            blockData.hashrate = Utils.hashrate(blockData.difficulty);
            blockData.blockReward = Utils.decimalUnits(blockData.reward);
            return blockData;
            //return Object.assign(blockData, this.blockResult.json);
        },
        tx () {

            if (!this.txResult) {

                return;
            }

            let txData = Object.assign({}, this.txResult, this.txResult.json);
            txData.fee = Utils.decimalUnits(txData.rct_signatures.txnFee);
            return txData;
            //return Object.assign(txData, this.txResult.json);
        },
        confirms () {

            if (!this.txResult && !this.networkInfo) {

                return;
            }
            if (this.txResult.in_pool) {

                return 'Unconfirmed';
            }
            return this.networkInfo.height - this.txResult.block_height;
        }
    },
    methods: {
        doSearch () {

            if (!this.$route.params || !this.$route.params.param) {

                return;
            }

            this.errorMessage = undefined;
            this.blockResult = undefined;
            this.txResult = undefined;

            let param = this.$route.params.param;

            // Hash
            if (param.length == 64) {

                return this.findHash(param);
            }

            // Height
            if (!isNaN(param)) {

                return this.findHeight(param);
            }

            this.errorMessage = 'Invalid search query';
        },
        findBlockHash (hash) {

            return this.explorerService.getBlock(hash).then((blockResult) => {

                this.$nextTick(() => {
                    this.blockResult = blockResult;
                    this.loading = false;
                });
                return Promise.resolve();
            }).catch((err) => {

                return Promise.reject(err);
            });
        },
        findTxHash (hash) {

            return this.explorerService.getTransaction(hash).then((txResult) => {

                if (txResult) {

                    txResult.hash = hash;
                    this.$nextTick(() => {
                        this.txResult = txResult;
                    });

                    if (txResult.in_pool) {

                        return Promise.resolve();
                    }
                    return this.explorerService.getBlockHash(txResult.block_height);
                }
                return Promise.reject('Tx not found');

            }).catch((err) => {

                return Promise.reject(err);
            }).then((blockHash) => {

                if (blockHash) {

                    this.findBlockHash(blockHash);
                }
                return Promise.resolve();
            }).catch((err) => {

                return Promise.reject(err);
            });
        },
        findHash (hash) {

            // Validate hex string.
            let hashRegex = /[0-9A-Fa-f]{64}/g;
            if (!hashRegex.test(hash)) {

                this.errorMessage = 'Invalid block or tx hash';
                return;
            }

            this.loading = true;
            return this.findBlockHash(hash).then(() => {

                this.loading = false;
                return Promise.resolve();
            }).catch((err) => {

                return this.findTxHash(hash);
            }).then(() => {

                this.loading = false;
            }).catch((err) => {

                this.loading = false;
                this.errorMessage = 'Hash not found';
            });
        },
        findHeight (height) {

            this.loading = true;

            return this.explorerService.getBlockHash(height).then((hash) => {

                return this.findHash(hash);
            }).catch((err) => {

                this.loading = false;
                this.errorMessage = `No block found for height ${height}`;
            });
        }
    },
    mounted () {

        this.doSearch();
    }
};
</script>

<style scoped>
/* Spinner code copied from https://github.com/tobiasahlin/SpinKit */
.sk-folding-cube {
    margin: 20px auto;
    width: 40px;
    height: 40px;
    position: relative;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #7D83FF;
    -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
    animation: sk-foldCubeAngle 2.4s infinite linear both;
    -webkit-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
    -webkit-transform: scale(1.1) rotateZ(90deg);
    transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
    -webkit-transform: scale(1.1) rotateZ(180deg);
    transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
    -webkit-transform: scale(1.1) rotateZ(270deg);
    transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
}
.sk-folding-cube .sk-cube4:before {
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
    0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
    } 25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
    } 90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
    }
}

@keyframes sk-foldCubeAngle {
    0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
    } 25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
    } 90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
    }
}
</style>
