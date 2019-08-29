<template>
    <v-layout column class="secondary lighten-1">
        <v-layout row wrap class="primary">
            <!-- Network stats -->
            <v-flex xs12 md4 class="px-2">
                <v-layout
                    column
                    class="pa-2 mx-1 secondary--text text--lighten-1 no-select"
                    v-bind:class="{ 'pt-2 px-3': !isMobile }">
                    <v-layout row>
                        <span class="title font-weight-regular">
                            Network Height
                        </span>
                        <v-spacer></v-spacer>
                        <span class="title">
                            {{ networkInfo.height || '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pt-3 pb-1">
                        <span class="body-2 accent--text">
                            Network Stats
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">
                            Difficulty
                        </span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ netStats.difficulty || '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">
                            Hashrate
                        </span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ netStats.hashrate || '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">
                            Avg. Solve Time
                        </span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ avgSolveTime ? `${avgSolveTime.toFixed(2)} s` : '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">
                            Transactions
                        </span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ netStats.txCount || '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pt-2 pb-1">
                        <span class="body-2 accent--text">
                            Supply
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">
                            Circulating
                        </span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ supply.circulating ? `${supply.circulating.toFixed(4)} ${config.coinSymbol}` : '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">Emission</span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ supply.emissionPercent ? `${supply.emissionPercent.toFixed(2)} %` : '-' }}
                        </span>
                    </v-layout>
                    <v-layout row class="pb-1">
                        <span class="subheading font-weight-medium">Reward</span>
                        <v-spacer></v-spacer>
                        <span class="subheading font-weight-bold">
                            {{ supply.reward ? `${supply.reward.toFixed(4)} ${config.coinSymbol}` : '-' }}
                        </span>
                    </v-layout>
                </v-layout>
            </v-flex>
            <!-- Charts -->
            <v-flex
                xs12
                md8
                class="px-2 primary"
                v-bind:class="{ 'px-3': !isMobile }">
                <v-layout
                    column
                    class="py-2"
                    v-bind:class="{ 'px-3': !isMobile }">
                    <div id="netChart"></div>
                </v-layout>
            </v-flex>
        </v-layout>
        <search></search>

        <v-layout row wrap>
            <!-- Transaction Pool -->
            <v-flex xs12 class="pt-5 pb-1 px-3 secondary lighten-1 no-select">
                <v-layout column class="pa-3 secondary lighten-2 elevation-1">
                    <v-layout row>
                        <span class="body-2">Transaction Pool</span>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        v-for="tx in txPoolList"
                        :key="tx.id_hash"
                        class="pt-2 subheading">
                        <v-flex xs2 d-flex>
                            <v-layout row>
                                <span>{{ tx.timeStamp }}</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8 d-flex>
                            <v-layout row justify-center>
                                <span class="font-mono">{{ tx.id_hash }}</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs2 d-flex>
                            <v-layout row justify-end>
                                <span>{{ `${tx.txFee} ${config.coinSymbol}` }}</span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-flex>

            <!-- Block list -->
            <v-flex xs12 class="pa-3 secondary lighten-1 no-select">
                <v-layout column class="pa-3 secondary lighten-2 elevation-1">
                    <v-layout row>
                        <span class="body-2">Recent Blocks</span>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        class="pt-2 body-2">
                        <v-flex xs6 md1 d-flex>
                            <v-layout row>
                                Height
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-layout row justify-start>
                                Date/Time
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-layout row justify-start>
                                Block Hash
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 md1>
                            <v-layout row justify-center>
                                Size
                            </v-layout>
                        </v-flex>
                        <v-flex xs1>
                            <v-layout row justify-end>
                                Txs
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout
                        row
                        wrap
                        v-for="block in recentBlockList"
                        :key="block.hash"
                        class="pt-2 subheading">
                        <v-flex xs6 md1 d-flex>
                            <v-layout row>
                                <span>{{ block.height }}</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md3>
                            <v-layout row justify-start align-baseline>
                                <span class="pr-2">{{ `${block.timeStamp}` }}</span>
                                <span class="body-1">{{ `(${block.timeAgo})` }}</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-layout row justify-start>
                                <span class="font-mono text-truncate">{{ block.hash }}</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 md1>
                            <v-layout row justify-end>
                                <span>{{ block.blockSize }}</span>
                            </v-layout>
                        </v-flex>
                        <v-flex xs3 md1>
                            <v-layout row justify-end>
                                <span>{{ block.num_txes }}</span>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import Config from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
import Search from '@/components/Search';
import ApexCharts from 'apexcharts';

export default {
    name: 'explorer',
    components: {
        'search': Search
    },
    props: {},
    data () {
        return {
            config: Config,
            blockChart: undefined,
            netChartOptions: {
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    enabled: true,
                    theme: 'dark'
                },
                chart: {
                    height: 300,
                    width: '100%',
                    type: 'line',
                    stacked: false,
                    foreColor: '#EDF0F2',
                    sparkline: { enabled: false },
                    animations: { enabled: false },
                    toolbar: { show: false },
                },
                colors:['#5EFC8D', '#7D83FF'],
                grid: {
                    borderColor: '#3B4047',
                    position: 'back',
                },
                yaxis: [
                    { labels: { show: false } },
                    { labels: { show: false }, opposite: true }
                ],
                xaxis: {
                    type: 'numeric',
                    labels: { show: false },
                    axisTicks: { show: false },
                    tickAmount: 1
                },
                series: [
                    { name: 'Hashrate', data: [] },
                    { name: 'BlockTime', data: [] }
                ],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '25%',
                    },
                },
                markers: {
                    size: 0,
                    strokeWidth: 0
                },
                stroke: {
                    curve: 'smooth',
                    show: true,
                    lineCap: 'butt',
                    width: 3,
                    dashArray: 0,
                },
                legend: {
                    position: 'top',
                    labels: {
                        colors: ['#EDF0F2'],
                        useSeriesColors: false
                    },
                    itemMargin: {
                        vertical: 10 // Actually horizontal margins.
                    },
                    onItemClick: {
                        toggleDataSeries: false
                    },
                }
            }
        };
    },
    watch: {
        blockChartData () {

            this.setBlockChart();
        }
    },
    computed: {
        ...mapGetters({
            netStats: 'explorer/netStats',
            supply: 'explorer/supply',
            avgSolveTime: 'explorer/averageSolveTime',
            blockChartData: 'explorer/blockChart',
            recentBlockList: 'explorer/recentBlockList',
            txPoolList: 'explorer/txPoolList'
        }),
        ...mapState({
            networkInfo: state => state.explorer.networkInfo
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    methods: {
        ...mapActions({
        }),
        setBlockChart () {

            if (!this.blockChart) {

                this.netChartOptions.chart.height = this.isMobile ? 150 : 300;
                this.netChartOptions.stroke.width = this.isMobile ? 1 : 3;

                this.blockChart = new ApexCharts(document.getElementById('netChart'), this.netChartOptions);
                this.blockChart.render();
            }

            if (!this.blockChartData) {

                return;
            }

            this.netChartOptions.yaxis = this.blockChartData.yAxis;
            this.netChartOptions.series = this.blockChartData.series;
            this.netChartOptions.xaxis.categories = this.blockChartData.xAxis.categories;
            this.blockChart.updateOptions(this.netChartOptions, false);

        }

    },
    mounted () {

        this.setBlockChart();
    }
};
</script>

<style scoped>
#netChart {
    width: 100%;
    max-width: 100%;
    display: inline-block;
    box-sizing: border-box;
}
</style>
