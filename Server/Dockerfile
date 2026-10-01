FROM node:20-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Install dependencies first (cached layer)
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

# Copy ALL source code including prisma schema and config
COPY . .

# Generate Prisma Client — pass a dummy DATABASE_URL to satisfy prisma.config.ts
# (prisma generate does NOT connect to the DB, it only reads the schema)
RUN DATABASE_URL="mysql://root:dummy@localhost:3306/tradeforge" npx prisma generate

# Now build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]