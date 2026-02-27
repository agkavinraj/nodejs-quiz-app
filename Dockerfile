FROM node:slim AS base

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

FROM gcr.io/distroless/nodejs

WORKDIR /app

COPY --from=base /app ./

EXPOSE 3000

CMD ["server.js"]