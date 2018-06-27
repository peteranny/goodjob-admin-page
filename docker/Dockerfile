FROM node:10

COPY . /app

WORKDIR /app

ARG REACT_APP_API_HOST

ENV REACT_APP_API_HOST="${REACT_APP_API_HOST}"


RUN yarn install && yarn run release && yarn cache clean

EXPOSE 80

CMD ["npm", "run", "production-server"]
