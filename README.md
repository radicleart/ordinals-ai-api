# runes-api

Node Server for RUNES proxy server.

## Swagger API Docs

- [swagger docs](https://runes.bridge.sbtc.tech/runes-api/).

## Build

```bash
node -v
v19.7.0

npm install
npm run build
```

### Locally on regtest

See also [API README](https://github.com/radicleart/runes-api)

```bash
npm run devenv
```

## Dev

Run locally with bitcoin regtest network;

```bash
Bitcoin-Qt -regtest -datadir=${home}/Library/Application\ Support/Bitcoin -conf=${home}/Library/Application\ Support/Bitcoin/regtest/bitcoin.conf
npm run sim
```

Run locally on bitcoin testnet network;

```bash
Bitcoin-Qt -testnet -datadir=${home}/Library/Application\ Support/Bitcoin/testnet -conf=${home}/Library/Application\ Support/Bitcoin/testnet/bitcoin.conf
npm run dev
```

### Mongo

Connects to Mongo Cloud development db instance using environment variables see Environment secton.

Local IP address has to be added to Mongo Cloud allowed network - contact system administrator.

### Environment

Environment is set on target server ad injected via docker variables. Config for running
locally without docker is set i `$lib/config.ts`

## Test

Tests outstanding,

```bash
npm run test
```

## Deploy

Currently builds to Linode via ssh and rsync.

### Mongo Production

Connects to Mongo Cloud db instance using environment variable stored on the target VM.

### Docker Run

```bash
# prod
docker rm -f runes_api_production
docker run -d -t -i --network host --name runes_api_production -p 6060:6060 -e TARGET_ENV='linode-production' -e btcRpcUser=${RUNES_BTC_RPC_USER} -e btcRpcPwd=${RUNES_BTC_RPC_PWD} -e btcNode=${RUNES_BTC_NODE} -e mongoDbUrl=${RUNES_MONGO_URL} -e mongoDbName=${RUNES_MONGO_DBNAME} -e mongoUser=${RUNES_MONGO_USER} -e mongoPwd=${RUNES_MONGO_PWD} -e sbtcContractId=${RUNES_SBTC_CONTRACT_ID} -e poxContractId=${POX_CONTRACT_ID} -e stacksApi=${RUNES_STACKS_API} -e bitcoinExplorerUrl=${RUNES_BITCOIN_EXPLORER_URL} -e mempoolUrl=${RUNES_MEMPOOL_URL} -e blockCypherUrl=${RUNES_BLOCK_CYPHER_URL} -e publicAppName=${RUNES_PUBLIC_APP} -e publicAppVersion=${RUNES_PUBLIC_APP_VERSION} -e host=${RUNES_HOST} -e port=${RUNES_PORT} -e walletPath=${RUNES_WALLET_PATH} mijoco/runes_api

docker logs -f runes_api_production
```

```bash
# stag
docker rm -f runes_api_staging
docker run -d -t -i --network host --name runes_api_staging -p 6060:6060 -e TARGET_ENV='linode-staging' -e btcRpcUser=${RUNES_BTC_RPC_USER} -e btcRpcPwd=${RUNES_BTC_RPC_PWD} -e btcNode=${RUNES_BTC_NODE} -e mongoDbUrl=${RUNES_MONGO_URL} -e mongoDbName=${RUNES_MONGO_DBNAME} -e mongoUser=${RUNES_MONGO_USER} -e mongoPwd=${RUNES_MONGO_PWD} -e sbtcContractId=${RUNES_SBTC_CONTRACT_ID} -e poxContractId=${POX_CONTRACT_ID} -e stacksApi=${RUNES_STACKS_API} -e bitcoinExplorerUrl=${RUNES_BITCOIN_EXPLORER_URL} -e mempoolUrl=${RUNES_MEMPOOL_URL} -e blockCypherUrl=${RUNES_BLOCK_CYPHER_URL} -e publicAppName=${RUNES_PUBLIC_APP} -e publicAppVersion=${RUNES_PUBLIC_APP_VERSION} -e host=${RUNES_HOST} -e port=${RUNES_PORT} -e walletPath=${RUNES_WALLET_PATH} mijoco/runes_api

docker logs -f runes_api_production
```

```bash
# stag
docker rm -f runes_api_devnet
docker run -d -t -i --network host --name runes_api_devnet -p 6060:6060 -e TARGET_ENV='linode-staging' -e btcRpcUser=${RUNES_BTC_RPC_USER} -e btcRpcPwd=${RUNES_BTC_RPC_PWD} -e btcNode=${RUNES_BTC_NODE} -e mongoDbUrl=${RUNES_MONGO_URL} -e mongoDbName=${RUNES_MONGO_DBNAME} -e mongoUser=${RUNES_MONGO_USER} -e mongoPwd=${RUNES_MONGO_PWD} -e sbtcContractId=${RUNES_SBTC_CONTRACT_ID} -e poxContractId=${POX_CONTRACT_ID} -e stacksApi=${RUNES_STACKS_API} -e bitcoinExplorerUrl=${RUNES_BITCOIN_EXPLORER_URL} -e mempoolUrl=${RUNES_MEMPOOL_URL} -e blockCypherUrl=${RUNES_BLOCK_CYPHER_URL} -e publicAppName=${RUNES_PUBLIC_APP} -e publicAppVersion=${RUNES_PUBLIC_APP_VERSION} -e host=${RUNES_HOST} -e port=${RUNES_PORT} -e walletPath=${RUNES_WALLET_PATH} mijoco/runes_api
```
