Oneincredible - Platform
========================

The Oneincredible video platform.

Installation Prerequisites
--------------------------

This installtion requires npm. Please download and install npm for your particular platform. 
```
https://nodejs.org/en/download/package-manager/
```

Install Yarn
```
sudo npm install yarn -g
```

Installation Instructions
-------------------------

Clone this repository.
```
git clone https://github.com/oneincredible/platform.git
```

Copy the docker compose file.
```
wget https://raw.githubusercontent.com/oneincredible/platform/master/.circleci/docker-compose.yml -P platform
```

Execute docker compose
```
cd platform
docker-compose -f docker-compose.yml up
```

Execute yarn
```
cd  projects/client-web/
yarn
yarn run dev
```

