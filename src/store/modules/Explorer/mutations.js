import Vue from 'vue';

const mutations = {
    explorerSetLoading: (state, isLoading) => {

        state.loading = isLoading;
    },
    setUpdateTimer: (state, updateTimer) => {

        state.updateTimer = updateTimer;
    },
    setNetworkInfo: (state, networkInfo) => {

        state.networkInfo = networkInfo;
    },
    setGeneratedCoins: (state, coins) => {

        state.generatedCoins = coins;
    },
    setRecentBlocks: (state, blocks) => {

        state.recentBlocks = blocks;
    },
    setTxPool: (state, txPool) => {

        state.txPool = txPool;
    }
};

export default mutations;
