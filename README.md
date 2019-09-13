# blockexploder

![explorer screenshot](docs/img/exploder-screenshot.png)

## Project setup

#### Install vue-cli dev tools

```bash
npm install vue-cli -g
```

#### Clone the project and install dependencies

```bash
git clone https://github.com/jerme404/blockexploder
cd blockexploder
npm install
```

#### Compile with hot-reloading for development

```bash
npm run dev
```

#### Compile and minify for production

```bash
npm run build
```

#### Build with URL path

Set `VUE_PUBLIC_PATH=/<path>/` in `./env.withpath`

```bash
npm run build-with-path
```

#### Hosting
Some specific configuration may be needed depending on your web server.

For nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

See the [vue-router history mode docs](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations).
