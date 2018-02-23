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

## Installation
Install python dependencies
```
pip install -r requirements.txt
```

Install npm dependencies
```
npm install
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
python manage.py makemigrations
python manage.py migrate
```

## Run app in development environment

Run django server
```
python manage.py runserver
```

Run npm server
```
npm run start
```
