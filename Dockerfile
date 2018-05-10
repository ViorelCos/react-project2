FROM node:8

RUN npm install -g yarn serve

ADD bitbucket /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

ADD ssh_config /root/.ssh/config

ADD . /srv
WORKDIR /srv

RUN npm install

CMD ./start.sh
