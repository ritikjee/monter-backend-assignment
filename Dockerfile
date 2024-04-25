FROM node:21 as builder

WORKDIR /build

COPY package*.json .

RUN npm i

COPY src/ src/
COPY tsconfig.json .

RUN npm run build


FROM node:21 as runner

WORKDIR /app

COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules
COPY --from=builder build/dist dist



WORKDIR /
RUN rm -rf build

WORKDIR /app

CMD [ "npm","start" ]

