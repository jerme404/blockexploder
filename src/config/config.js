export default {
    coinName: 'NERVA',
    coinSymbol: 'XNV',
    coinUnitPlaces: 12,
    coinUriPrefix: 'nerva:',
    coinSupplyTotal: 18446744073709551615,
    addressPrefix: 0x3800,
    integratedAddressPrefix: 0x7081,
    subAddressPrefix: 0x1080,
    blockTarget: 60,
    updateInterval: 15000, // Auto refresh interval in milliseconds
    explorerApi: 'https://us-central1-nerva-248022.cloudfunctions.net/nervaApi',
    websiteUrl: 'https://getnerva.org',
    footerAppTitle: 'NERVA Block Explorer',
    copyright: '2019 NERVA',
    footerLinks: [
        {
            name: 'BitBucket',
            icon: 'fab fa-bitbucket',
            url: 'https://bitbucket.org/nerva-project'
        },
        {
            name: 'Discord',
            icon: 'fab fa-discord',
            url: 'https://discord.gg/jsdbEns/'
        },
        {
            name: 'Reddit',
            icon: 'fab fa-reddit-alien',
            url: 'https://www.reddit.com/r/Nerva/'
        },
        {
            name: 'Twitter',
            icon: 'fab fa-twitter',
            url: 'http://twitter.com/NervaCurrency'
        },
        {
            name: 'Telegram',
            icon: 'fab fa-telegram-plane',
            url: 'https://t.me/NervaXNV'
        }
    ]
};
