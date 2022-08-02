# puppeterr-pdf-test

https://cheatcode.co/tutorials/how-to-generate-a-pdf-in-node-js-with-puppeteer-and-javascript

## test print pdf from chart.js

## 打包成 Dockerfile

當打包成 dockerFile 基本上目前會遇到以下兩個問題

屬於 chromium 的 bug
### Fail to launch Chromium

https://yami.io/alpine-puppeteer-enoent/

this bug could fix with

add follow block in Dockerfile to fix

```yaml=
RUN apk add --no-cache chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```
### running as root without –no-sandbox

[running as root without –no-sandbox](https://techozu.com/fix-running-as-root-without-no-sandbox-error-in-puppeteer/)

this bug could fix with add two args in launch part

```nodejs=
const browser = await puppeteer.launch({ headless: true,  args: ['--no-sandbox', '--disable-setuid-sandbox'] });
```

## modify for docker build and docker-compose

for docker build 

we need to add VOLUME to create mount point in container

```yaml
VOLUME [ `/app/${OUTPUT_DIR}` ]
```

and add run -v with host path for the corresponding mount point in container

```sh
docker run -d -v hostPath:/app/${OUTPUT_DIR} -p 3000:3000 
```

## use compose 

in this part we could use compose syntax

to do above setup

```yaml
volumes:
    - HOSTPATH:/app/${OUTPUT_DIR}
```

## how to use build

### 1 build
```sh
sh build.sh
```
### 2 run
```sh
sh run.sh
```

## how to use docker-compose 

### 1 build
```sh
docker-compose build
```
### 2 run
```sh
docker-compose up
```
### 3 stop
```sh
docker-compose down
```