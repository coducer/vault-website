# Build stage
FROM node:22-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm vips-dev git

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine
RUN apk add --no-cache vips-dev

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001 -G nodejs && \
    chown -R strapi:nodejs /app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]
