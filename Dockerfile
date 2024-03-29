FROM node:16.12.0 AS builder
RUN mkdir app
COPY . app/
WORKDIR /app
RUN yarn install && yarn build
# stage2
FROM node:16.12.0-alpine
RUN apk add --no-cache chromium
ARG OUTPUT_DIR
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    OUTPUT_DIR=${OUTPUT_DIR}
VOLUME [ `/app/${OUTPUT_DIR}` ]
RUN mkdir app
COPY --from=builder app ./app
RUN chown -R node:node app
USER node
EXPOSE 3000
WORKDIR /app
CMD ["node", "out/index.js"]