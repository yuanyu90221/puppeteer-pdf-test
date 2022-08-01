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