[![Build Status](https://travis-ci.com/OnGridSystems/ICO_Portal.svg?token=YtkmGHXy5XUn2VXCRKwy&branch=master)](https://travis-ci.com/OnGridSystems/ICO_Portal)
## Requirements
1. Python 3.6.4
```
brew install pyenv
pyenv install 3.6.4
```

2. npm and python 2.7
```
brew install npm
pyenv install 3.6.4
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

4. (for testing) leveldb
```
brew install leveldb
```

## Installation
# on MacOS (and Windows)
Prepare submodules
```
git submodule update --init
```

Install python dependencies
```
pip install -r requirements-dev.txt
```

Install gulp
```
npm install gulp-cli -g
npm install gulp -D
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

Import dump
```
mysql -u ico_portal_user -pread_manual ico_portal < ico_portal_dump.sql
```
(for windows)
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

# Install on Linux Ubuntu 16 LTS
Add swap as overlay (for low-memory VMs)
```
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile   none    swap    sw    0   0" >> /etc/fstab
```

Update linux packages and add sources for python3.6 and NodeJS (accept all default values)
```
apt -y update
apt -y install software-properties-common
add-apt-repository -y ppa:deadsnakes/ppa
apt -y install curl
apt -y upgrade
apt -y update
apt -y install screen vim mysql-server libmysqlclient-dev python3.6-dev rabbitmq-server python3-pip python3-dev python3.6 git
# add NodeJS repo, install node and npm
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
apt -y install screen vim nodejs
```

Create deploy keys for this repository
```
echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDV7qnI8rBUhi7ul8k7q9Yd2qkM9a91xRaz6Jl167RHoLfH5pLLezO2pt3XYe7xQD7AcUd/0ysLEWw84/P96A8cv9ck/rNmz7IywEe/sb4kPAEfTbDHYyhTEQwuqrnjyT48gy5kL608JQzlStgsxUUzmz8SwRvYbqZCdDTW24kdIokvObGj9n7t5Q/+55DBKC8ZcSqrNzNTFnNqO1WNEXpj0c+5G6fF8qRZhs+hqzU5EpDPWP9d5R1kDtOeZOQiToujdN4qG+cVfnZTiSDWwse/M1XFEzsoSMTldJ75fSNF9/MF8ox0unaJAZ4Lb9O5JtyUzWQuwEceuyLNghF8uhph root@icoportal > ~/.ssh/id_ico_lk.pub
read -d "" PRIVKEY <<"EOF"
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1e6pyPKwVIYu7pfJO6vWHdqpDPWvdcUWs+iZdeu0R6C3x+aS
y3sztqbd12Hu8UA+wHFHf9MrCxFsPOPz/egPHL/XJP6zZs+yMsBHv7G+JDwBH02w
x2MoUxEMLqq548k+PIMuZC+tPCUM5UrYLMVFM5s/EsEb2G6mQnQ01tuJHSKJLzmx
o/Z+7eUP/ueQwSgvGXEqqzczUxZzajtVjRF6Y9HPuRunxfKkWYbPoas1ORKQz1j/
XeUdZA7TnmTkIk6Lo3TeKhvnFX52U4kg1sLHvzNVxRM7KEjE5XSe+X0jRffzBfKM
dLp2iQGeC2/TuSbclM1kLsBHHrsizYIRfLoaYQIDAQABAoIBAQDG6cpkVYMulDU/
E1LAcN39lDprGmWykzawwS0vP6G4l+9Jp1IGcN98jVrn0N9i4eF2/d0FNUtoVyLU
2v8arpKeoKFifJBCoAuItNABpTquZjyE5q/gNIph8g/ptERzT8LWcQLJlKr2qVx8
NkMaHbJicY8L2RITA48DaxlWTXoH40mE6fznD72tXEX9uQ7Sq0k0pO0pNKuNDmCn
PPgjqI8T7C/rXNM4XmRR2iyP7TCzBhiWQR/G8ChBYy579qgoPpNDt+lKdYLmtnjY
7mOVvKmhp703RoTBudpkaCwDM2Dq3fhC/+QAoeUYmFFwOv68eylgLq9FCNikDqh5
BvxEmRGBAoGBAOwj4osqywA+ZcmSjWdfG2Aed0PKsJI7X1KQre0EkgUjfE0wlhj6
Nr88a8EHNrrVaZvj6DEPuAskL2NSquYT1G9PmiSDob0CheZ3cjrMJbb1iiC+NTX7
CdaUHb9Z/nOsIGYkwkZWYLal4GSi4Uu2avAlqLtyX/juAwtYsRD4+cydAoGBAOfs
pAGqweAYwKFtmYd4/wM1h+0Rp5RqLw4Sh5i51UAYupb4L0F5JllD9syv7H5Je837
bm2LchLy5Mh0tTx5H7AHlQhaSmImW4rav5A4Y1PyFj1VF+lhjB0TQLCW/o0O6Cxz
hYtRPlWJrGQFukLP148nsK05TOw7pR36UFMLGx+VAoGAMtRqoGA+wDeuO1yDeZvc
Ta1hKMOJjIChPSmNdraEI/0GdasetBOwEywTWcKOwlrL19WQFnd2u1c3qB6UUOA1
2xv8Zx26g+/2GKzfds6Y07A44mFvHMaD0J+jY5wgjI+hjbsd4nwXZ1l/WspAysZi
cHz6vBabl/7LwvZ9btTZGHUCgYA7Fn4+cnvMlWHWfu7jpf8KmUPVMW9Jj7gHVM85
KPdcyjAXsImRm8Uabwdc5OFS13P0ab+bpzBcBYgmTh2yl4VsOrJMm3xh/zXJbavq
mYMs6vuhiqF580FYUwRjOUUHOSoL0S7P7NX9wwKpxQ/MX9miflE0AOpJMXUC6zg1
wBmb9QKBgQDgvRWA3Q+3odYKVm/+Zx8U12kk2bZOOWfwcZGO32znHJTcba9PLO6x
eGJ28D83vWVo+Qc/kiNp28mwwC2GzJE4qQIr8tKzu2xWKG9ygdwxVRwFqeoDBiD/
PcGFyHyS7RF5Z9VGX7a4P/P6ZQ9xWrXOoCuERpIqRaUfn2+Dmzidgg==
-----END RSA PRIVATE KEY-----
EOF
echo "$PRIVKEY" > ~/.ssh/id_ico_lk
chmod 0600 ~/.ssh/id_ico_lk
chmod 0600 ~/.ssh/id_ico_lk.pub
read -d "" SSHCONFIG <<"EOF"
Host github.com
    Hostname github.com
    IdentityFile ~/.ssh/id_ico_lk
    IdentitiesOnly yes
EOF
echo "$SSHCONFIG" >> ~/.ssh/config
```

Install virtualenv
```
pip3 install -U pip virtualenv
```

Clone repository, create venv and install all packages
```
git clone git@github.com:ongrid/ICO_Portal.git
cd ICO_Portal/
virtualenv --python=python3.6 .
source bin/activate
pip install -r requirements.txt
npm install
npm install gulp-cli -g
npm install gulp -D
```

Prepare submodules
```
git submodule update --init
```

Create MySQL schema and import dump
```
read -d "" SQL <<"EOF"
CREATE DATABASE ico_portal CHARACTER SET utf8 COLLATE utf8_bin;
CREATE USER ico_portal_user@localhost IDENTIFIED BY "read_manual";
GRANT ALL PRIVILEGES ON ico_portal.* TO 'ico_portal_user'@'localhost';
EOF
echo "$SQL" | mysql -u root
mysql -u ico_portal_user -pread_manual ico_portal < ico_portal_dump.sql
```

Add users to RabbitMQ
```
rabbitmqctl add_user ico_portal read_manual
rabbitmqctl add_vhost ico_portal_vhost
rabbitmqctl set_permissions -p ico_portal_vhost ico_portal ".*" ".*" ".*"
```

Install docker CE
```
apt -y install apt-transport-https ca-certificates
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt -y update
apt -y install docker-ce
```

Run Ethereum node
```
docker rm -f geth_rinkeby
docker run -d --name geth_rinkeby -p 8545:8545 -p 30303:30303 -p 30303:30303/udp ethereum/client-go --rpc --rpcaddr "0.0.0.0" \
    --rpccorsdomain "*" --port 30303 --rinkeby --fast --cache 4096
```

Import accounts
```
docker exec -it geth_rinkeby geth --rinkeby --exec \
   'personal.importRawKey("3460743f68c15f00138b8a901920aaefe34d08a193dfc62b7960ba0e257a059a","");\
    personal.unlockAccount("0xe836e4d82adc2b96985227f3390a49c06c67847c","",0);\
    personal.importRawKey("d0a2cfad9ee3281316611409627375edce5d76fe53beaf26cfd51e61c0586b70","");\
    personal.unlockAccount("0x96931D05A56e0a95006133f9739df0146Bd0Dc7A","",0);\
    personal.importRawKey("b64b329d759aaaaed2701b626368a9db0cbfbd344fa33865721b99deb9a80b40","");\
    personal.unlockAccount("0x0cfd141fa4e8a8ef6b6A8180472573a3EDbbfe0d","",0);\
    personal.importRawKey("674da0314a5815e52b0aebf1964a36d18ef4ea0e192bd9dd2744fbcc8d30f5bf","");\
    personal.unlockAccount("0xDEfE2673504264d3659bdA8Fdfb86aDCD29687F5","",0);\
    personal.listAccounts' attach
```
## Running
Run all services using `honcho`
```
honcho start
```

You can run specific service/services
```
honcho start web webpack
```

To customize webpack bundle serving use this env variables:
1. `NPM_HOST` and `NPM_PORT` set host and port for serving bundle.js file (default 0.0.0.0 and 3000)
2. `BUNDLE_SERVING_PATH` set path from which django tries to load bundle.js file (default http://0.0.0.0:3000/)

# Testing
Set environment
```
export DJANGO_SETTINGS_MODULE='ico_portal.settings.test'
```

Run tests
```
./manage.py test
```
