#!/bin/bash


if ! command -v node &> /dev/null
then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
    nvm install node
    
fi
npm  install
node index.js