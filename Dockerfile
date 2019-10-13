FROM node:12

COPY ["package.json","package-lock.json","/home/node/app/"]

WORKDIR /home/node/app

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs

COPY [".","."]

CMD npm install -g @angular/cli && \
    npm rebuild node-sass && \
    npm install && \
    npm install -g nodemon | ng serve --host 0.0.0.0 --port 4100
EXPOSE 4100