import Axios from 'axios';
import Config from '@/config';

const endpoints = {
    getInfo: 'get_info',
    getTxPool: 'get_transaction_pool',
    getBlockHeaders: 'get_block_headers_range',
    getGeneratedCoins: 'get_generated_coins'
};

export default class ExplorerService {

    constructor () {

        this.httpClient = Axios.create({
            baseURL: Config.explorerApi
        });
    };

    /**
    * @name getInfo
    */
    getInfo () {

        return this.apiRequest({ endpoint: endpoints.getInfo });
    };

    /**
    * @name getBlockHeaders
    * @param {object} blockRange
    * @param {integer} blockRange.start
    * @param {integer} blockRange.end
    */
    getBlockHeaders (blockRange) {

        let queryParams = Object.assign({
            endpoint: endpoints.getBlockHeaders
        }, blockRange);
        return this.apiRequest(queryParams);
    };

    /**
    * @name getTxPool
    */
    getTxPool () {

        return this.apiRequest({ endpoint: endpoints.getTxPool });
    };

    /**
    * @name getGeneratedCoins
    */
    getGeneratedCoins () {

        return this.apiRequest({ endpoint: endpoints.getGeneratedCoins });
    };

    /**
    * @name apiRequest
    * @description Calls nerva's php API at the specified endpoint.
    * @param {object} queryParams
    */
    apiRequest (queryParams) {

        return this.httpClient({
            params: queryParams
        }).then((response) => {

            if (!response.data) {

                return Promise.reject({ errorMessage: 'No data returned in response' });
            }

            if (response.data.error) {

                return Promise.reject(response.data.error);
            }

            return Promise.resolve(response.data);
        }).catch((err) => {

            return Promise.reject(err);
        });
    };
};
