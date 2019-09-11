import Config from '@/config';
import Utils from '@/utils';
import moment from 'moment';

const getters = {
    supply: (state) => {

        let supply = {
            total: Config.coinSupplyTotal,
            circulating: 0,
            emissionPercent: 0,
            reward: 0
        };

        if (!state.networkInfo) {

            return supply;
        }

        if (state.recentBlocks && state.recentBlocks.length > 0) {

            let reward = state.recentBlocks[state.recentBlocks.length - 1].reward;
            supply.reward = Utils.decimalUnits(reward);
        }

        if (state.generatedCoins) {

            supply.circulating = Utils.decimalUnits(state.generatedCoins);
            supply.emissionPercent = (state.generatedCoins / Config.coinSupplyTotal) * 100;
        }
        return supply;
    },
    netStats: (state) => {

        if (!state.networkInfo) {

            return {};
        }

        let netStats = { txCount: state.networkInfo.tx_count };


        if (state.networkInfo.difficulty) {

            netStats.difficulty = Utils.displayUnits(state.networkInfo.difficulty, 2);
            netStats.hashrate = Utils.hashrate(state.networkInfo.difficulty);
        }

        return netStats;
    },
    averageSolveTime: (state) => {

        if (!state.recentBlocks || state.recentBlocks.length === 0) {

            return;
        }

        let blocks = state.recentBlocks.slice(),
            blockTimes = [];
        let lastTimeStamp = blocks.pop().timestamp;
        while (blocks.length > 0) {

            let timestamp = blocks.pop().timestamp;
            blockTimes.push(lastTimeStamp - timestamp);
            lastTimeStamp = timestamp;
        }
        return blockTimes.reduce((sum, time) => sum + time, 0) / (blockTimes.length - 1);
    },
    recentBlockList: (state) => {

        if (!state.recentBlocks) {

            return [];
        }

        let recentBlocks = [...state.recentBlocks].map((block) => {

            let timeStamp = moment.unix(block.timestamp);
            return Object.assign({
                blockSize: `${Utils.blockSize(block.block_size)}B`,
                timeAgo: timeStamp.fromNow(),
                timeStamp: timeStamp.format('L LT'),
            }, block);
        });
        recentBlocks.sort((a, b) => b.height - a.height);
        return recentBlocks;
    },
    txPoolList: (state) => {

        if (!state.txPool) {

            return [];
        }

        let txPool = [...state.txPool].map((tx) => {

            return Object.assign({
                txFee: Utils.decimalUnits(tx.fee).toFixed(Config.coinUnitPlaces),
                timeStamp: moment.unix(tx.receive_time).format('L LT'),
            }, tx);
        });
        txPool.sort((a, b) => b.receive_time - a.receive_time);
        return txPool;
    },
    blockChart: (state) => {

        if (!state.recentBlocks || state.recentBlocks.length === 0) {

            return;
        }

        let chartData = state.recentBlocks.reduce((series, block) => {

            // Hashrates
            let hashrate = block.difficulty / Config.blockTarget;
            series.hashrate.data.push(hashrate);

            // Solve time
            let solveTime = series.lastBlockTime ? block.timestamp - series.lastBlockTime : 60;
            series.blockTime.data.push(solveTime);

            series.blocks.push(block.height);

            series.lastBlockTime = block.timestamp;
            return series;
        }, {
            hashrate: { name: 'Hashrate', data: []},
            blockTime: { name: 'BlockTime', data: [], type: 'column' },
            blocks: []
        });

        let hashMin = Math.min(...chartData.hashrate.data),
            hashMax = Math.max(...chartData.hashrate.data);
        let solveMin = Math.min(...chartData.blockTime.data),
            solveMax = Math.max(...chartData.blockTime.data);

        return {
            yAxis: [
                {
                    seriesName: 'Hashrate',
                    decimalsInFloat: 0,
                    min: hashMin - (hashMin/20),
                    max: hashMax + (hashMax/50),
                    labels: {
                        show: false
                    }
                },
                {
                    seriesName: 'BlockTime',
                    decimalsInFloat: 0,
                    min: 0,
                    max: solveMax + (solveMax/2),
                    opposite: true,
                    labels: {
                        show: false
                    }
                },
            ],
            xAxis: {
                categories: chartData.blocks
            },
            series: [
                chartData.hashrate,
                chartData.blockTime
            ]
        };
    }
};

export default getters;
