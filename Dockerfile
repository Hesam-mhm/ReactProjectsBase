# Stage 1: Build the React app
FROM node:18 as build

WORKDIR /app

COPY package.json ./
RUN yarn

COPY . ./
RUN yarn build

# Stage 2: Serve the React app with Nginx
FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
