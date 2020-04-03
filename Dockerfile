FROM nginx:alpine

ADD ./nginx/server.conf /etc/nginx/conf.d/default.conf 
RUN mkdir /root/logs
RUN chmod 755 -R /root

RUN apk update
RUN apk add git npm
RUN git clone https://github.com/sy4may0/ninigi.git
ADD .env /ninigi/.env 
WORKDIR /ninigi
RUN npm install && npm run build

CMD ["nginx", "-g", "daemon off;"]

