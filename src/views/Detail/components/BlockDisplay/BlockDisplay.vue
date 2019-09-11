<template>
    <v-layout row wrap>
        <v-flex xs12 md4 xl3>
            <v-layout column>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Height
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.height }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Depth
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.depth }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Timestamp
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.timeStamp }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Block Size
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.blockSize }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Version
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.major_version }}
                    </span>
                </v-layout>
            </v-layout>
        </v-flex>
        <v-flex xs12 md4 xl3 offset-md1>
            <v-layout column>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Nonce
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.nonce }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Difficulty
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.diff }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Hashrate
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ block.hashrate }}
                    </span>
                </v-layout>
                <v-layout row class="px-3 pb-2">
                    <span class="subheading font-weight-bold">
                        Reward
                    </span>
                    <v-spacer></v-spacer>
                    <span class="subheading font-weight-medium">
                        {{ `${block.blockReward} ${config.coinSymbol}` }}
                    </span>
                </v-layout>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import Config from '@/config';

export default {
    name: 'detail',
    props: {
        block: undefined
    },
    data () {
        return {
            config: Config
        };
    }
};
</script>

<style scoped>

</style>
