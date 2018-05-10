# Who let the dogs out woof, woof, woof, woof, woof 

## Overview
Who let the dogs out is an REST API that returns soccer matches from supported Leagues.

### Supported Leagues
1. Brasileirão Serie A
2. Brasileirão Serie B
3. Brasileirão Serie C
4. Brasileirão Serie D
5. Copa do Brasil
6. Taça Libertadores
7. Copa do Nordeste
8. Copa do Mundo
9. Copa do Sulamericana
10. Champions League

## Getting Started

Install yarn:
```sh
npm install -g yarn
# you may need sudo for this
```

Install dependencies:
```sh
yarn
```

Set environment (vars):
```sh
get .env file on #dev channel of our slack.
```

Start server:
```sh
# Start server
yarn start
```

## Docker

#### Using Docker Compose for Development
```sh
# service restarts on file change
bash bin/development.sh
```
