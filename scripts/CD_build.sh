#!/usr/bin/env bash

echo "Move to coolback directory"
cd /home/ubuntu/coolback

echo "Make coolback directory open"
sudo chmod 777 /home/ubuntu/coolback

echo "Set node V18.15.0(npm v9.5.0)"
source /home/ubuntu/.nvm/nvm.sh
nvm use 18.15

echo "Removing node_modules and package-lock.json"
sudo rm -rf node_modules
sudo rm -rf package-lock.json

echo "Check NODE_ENV exists"
if [[ -z $NODE_ENV || $NODE_ENV != "dev" ]]; then
  echo "Set Node_ENV dev"
  export NODE_ENV=dev
fi

echo "npm install again!!"
npm install

echo "Doing npm run build"
npm run build
