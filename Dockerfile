FROM node:9-jessie as frontend

WORKDIR /tmp

COPY package.json /tmp/
RUN npm install

COPY frontend /tmp/frontend

RUN npm run build


FROM python:3.6.4-stretch

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=frontend /tmp/assets/ assets
COPY --from=frontend /tmp/webpack-stats.prod.json webpack-stats.prod.json

COPY manage.py   manage.py
COPY scripts     scripts
COPY helpdesk    helpdesk
COPY landing     landing
COPY solidity-contracts solidity-contracts
COPY ico_portal  ico_portal
COPY blockchain  blockchain
COPY user_office user_office

RUN ./manage.py collectstatic --no-input

RUN mkdir /static && mv assets/* /static
RUN mkdir /media_data

COPY docker-entrypoint.sh /usr/local/bin/

ENV DJANGO_SETTINGS_MODULE "ico_portal.settings.production"

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["/usr/src/app/scripts/start_server.sh"]
