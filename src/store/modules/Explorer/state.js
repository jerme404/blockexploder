import ExplorerService from './services/Explorer';

const state = {
    updateTimer: undefined,
    updateLoading: false,
    explorerService: undefined,
    networkInfo: {},
    txPool: [],
    generatedCoins: 0, 
    recentBlocks: [],

};

state.explorerService = new ExplorerService();
export default state;
