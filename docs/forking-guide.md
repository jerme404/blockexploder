# Forking blockexploder

### Styling

Put your logo in `/src/assets`. I might only be using `logo-color.png`.

Replace `/public/favicon.ico` with your own favicon.

Set your theme colors in `/src/theme.js`.

### Coin Config

Update `/src/config/config.js`.

### Daemon API

I'm pointing at a Google cloud function, which just adds CORS and forwards requests to the Nerva PHP API.

All of the response objects are normal Monero-style `json_rpc` format.
