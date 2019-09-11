import Axios from 'axios';
import Config from '@/config';

const endpoints = {
    getInfo: 'get_info',
    getTxPool: 'get_transaction_pool',
    getBlockHeaders: 'get_block_headers_range',
    getGeneratedCoins: 'get_generated_coins',
    getBlock: 'get_block',
    getBlockHeaderByHash: 'get_block_header_by_hash',
    getBlockHeaderByHeight: 'get_block_header_by_height',
    getTransactions: 'get_transactions',
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
    * @name getBlock
    * @param {string} hash
    */
    getBlock (hash) {

        if (!hash) {

            return Promise.reject('Block hash is required');
        }

        return this.apiRequest({
            endpoint: endpoints.getBlock,
            hash: hash
        }).then((response) => {

            return response.block_header ?
                response : Promise.reject(`Block not found for hash ${hash}`);
        }).catch((err) => {

            return Promise.reject(err);
        });
    };

    /**
    * @name getBlockHash
    * @param {string|integer} height
    */
    getBlockHash (height) {

        return this.apiRequest({
            endpoint: endpoints.getBlockHeaderByHeight,
            height: height
        }).then((response) => {

            return (response.block_header && response.block_header.hash) ?
                response.block_header.hash : Promise.reject(`Block not found for height ${height}`);
        }).catch((err) => {

            return Promise.reject(err);
        });
    };

    /**
    * @name getTransaction
    * @param {string} hash
    */
    getTransaction (hash) {

        return this.apiRequest({
            endpoint: endpoints.getTransactions,
            'hash[]': hash
        }).then((response) => {

            if (response.length && response[0].block_height) {

                // Array is returned from api currently.
                return response[0];
            }
            return Promise.reject(`Transaction not found for hash ${hash}`);
        }).catch((err) => {

            return Promise.reject(err);
        });
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
