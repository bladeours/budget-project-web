FROM node:latest as build

ENV ENV_BACKEND_URI http://localhost:8080
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN apt-get update && apt-get install gettext-base

RUN npm install

RUN envsubst < src/app/environments/environment.template.ts > src/app/environments/environment.ts && npm run build --prod

FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/ngx /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
