Create database
```
CREATE DATABASE ico_portal CHARACTER SET utf8 COLLATE utf8_bin;
```

Create user
```
CREATE USER ico_portal@localhost IDENTIFIED BY "read_manual";
```

Grant privilegies
```
GRANT ALL PRIVILEGES ON ico_portal.* TO 'ico_portal_user'@'localhost';
```
