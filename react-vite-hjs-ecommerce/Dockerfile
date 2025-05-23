# frontend/Dockerfile
FROM node:22.14.0-alpine as build

# set work directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# npm ci는 정확히 package-lock.json에 맞춰 설치 --silent는 불필요한 로그 생략으로 출력 간소화
RUN npm ci --silent 

COPY . ./
RUN npm run build


# Nginx 서버로 빌드 결과 서빙
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
