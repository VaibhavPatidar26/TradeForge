FROM node:20-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Install dependencies first (cached layer)
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

# Copy ALL source code including prisma schema
COPY . .

# Generate Prisma Client AFTER all files are copied (so nothing gets overwritten)
RUN npx prisma generate

# Now build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]