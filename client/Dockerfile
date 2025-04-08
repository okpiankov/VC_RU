FROM node:23-alpine3.20

WORKDIR /app

COPY package.json package-lock.json ./
# устанавливаю зависимости  из файла package-lock.json: если через RUN npm ci
# RUN npm ci
RUN npm install
# копирую все файлы в рабочий каталог
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# # обязательно добавляю в .dockerignore node_modules
# из dockerHub подгружаю готовый образ nodeJS + alpine(дистрибутив Alpine Linux те мини ОС)
# какой образ использовать за основу лучше?
# FROM node:lts-alpine, значит вы сообщаете сборке, что всегда будете использовать последнюю рабочую версию
# Если нужно контролировать процесс (например, новая версия Node может нарушить работу сборки),
# то  можно  указать конкретную версию для node и alpine
# FROM node:lts-alpine3.17
# FROM node:18-alpine

# CMD ["npm run dev"]
# CMD ["sh", "-c", "npm run db:deploy && npm run dev"]
# Можно собирать образ и запускать контейнер только на основе DockerFile
# docker build .  – строю собственный образ на основе DockerFile и указываю путь где через .
# docker images – посмотреть созданный образ
# docker run 46e6b865f658 -  на основе созданного образа images запускаю контейнер по id
# docker ps – список запущенных контейнеров берем id контейнера
# docker stop 35667 ec28240 – останавливаю контейнер
# docker start b53678e0b7da запускаю контейнер по id