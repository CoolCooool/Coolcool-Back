#!/bin/bash
cd /home/ubuntu/coolback

echo "Set node V18.15.0(npm v9.5.0)"
source /home/ubuntu/.nvm/nvm.sh
nvm use 18.15

pm2_status=$(pm2 describe coolback)

echo "Check if there is process running"
if [[ $pm2_status != *"Unknown process"* ]]; then
  echo "Deleting existing coolback process..."
  pm2 delete coolback
fi

echo "Set NODE_ENV dev again"
if [[ -z $NODE_ENV || $NODE_ENV != "dev" ]]; then
  export NODE_ENV=dev
fi

echo "Check NODE_ENV"
env | grep NODE_ENV

echo "Start server using pm2"
pm2 start npm --name "coolback" -- run start
