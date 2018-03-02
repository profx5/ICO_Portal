## Requirements
1. Python 3.6.4
```
brew install pyenv
pyenv install 3.6.4
```

2. npm
```
brew install npm
```

3. mysql
```
brew install mysql
brew services start mysql
```

4. (optional) rabbitmq
```
brew intsall rabbitmq
brew services start rabbitmq
```

## Installation
Install python dependencies
```
pip install -r requirements.txt
```

Install npm dependencies
```
npm install
```
Install gulp
```
npm install gulp-cli -g
npm install gulp -D
```

Create user and database
```
mysql -uroot
```
```
CREATE DATABASE ico_portal CHARACTER SET utf8 COLLATE utf8_bin;
CREATE USER ico_portal_user@localhost IDENTIFIED BY "read_manual";
GRANT ALL PRIVILEGES ON ico_portal.* TO 'ico_portal_user'@'localhost';
```

Prepare database
```
python manage.py migrate
```
or (recommended)
[download](https://www.dropbox.com/sh/luvuxz8pqn6hpgb/AACjNzn2snBICDVPpj30JPAta?dl=0) database dump and deploy it
os x
```
mysql -u ico_portal_user -pread_manual ico_portal < ico_portal_dump.sql
```
windows
```
mysql -u ico_portal_user -pread_manual ico_portal
source ico_portal_dump.sql
```

(Optional) Configure rabbitmq
```
rabbitmqctl add_user ico_portal read_manual
rabbitmqctl add_vhost ico_portal_vhost
rabbitmqctl set_permissions -p ico_portal_vhost ico_portal ".*" ".*" ".*"
```

## Run app in development environment
Run dev environment for landing
```
gulp dev
```

Run django server
```
python manage.py runserver
```

Run npm server
```
npm run start
```

## Run celery workers

Run contract events watcher
```
./start_node_watcher.sh
```

Run event processing workers
```
./start_workers.sh
```
