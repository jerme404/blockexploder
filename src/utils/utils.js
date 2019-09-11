import Config from '@/config';

const blockSize = function (size) {

    return displayUnits(size, size >= 1000 ? 2 : 0);
};

const decimalUnits = function (numIn) {

    if (isNaN(numIn)) {

        return 0;
    }

    let divisor = Math.pow(10, Config.coinUnitPlaces);
    return numIn / divisor;
};

const displayUnits = function (input, decimals) {

    let units = ['k', 'M', 'G', 'T', 'P', 'E'],
        unit = '',
        unitIndex = 0;

    while (input > 1000) {

        unit = units[unitIndex];
        input = input/1000;
        unitIndex++;
    }

    return `${input.toFixed(decimals || 0)} ${unit}`;
};

const hashrate = function (difficulty) {

    return `${displayUnits(difficulty/Config.blockTarget, 2)}H/s`;
};

export default {
    blockSize,
    decimalUnits,
    displayUnits,
    hashrate
};
