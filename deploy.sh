#!/bin/bash -e
#
############################################################

export DEPLOYMENT=$1
export PORT=22
export SERVER=leibniz.brightblock.org
export DOCKER_NAME=runes_api_staging
export TARGET_ENV=linode-staging
if [ "$DEPLOYMENT" == "prod" ]; then
  SERVER=spinoza.brightblock.org
  DOCKER_NAME=runes_api_production
  TARGET_ENV=linode-production
elif [ "$DEPLOYMENT" == "devnet" ]; then
  SERVER=rawls.brightblock.org
  DOCKER_NAME=runes_api_staging
  TARGET_ENV=linode-staging
fi
export DOCKER_ID_USER='mijoco'
export DOCKER_CMD='docker'

printf "\n==================================="
printf "\nBuilding image: mijoco/runes_api."
printf "\nConnecting to: $SERVER on ssh port $PORT"
printf "\nDeploying container: $DOCKER_NAME."
printf "\nDeploying target: $TARGET_ENV."
printf "\n\n"

$DOCKER_CMD build -t mijoco/runes_api .
$DOCKER_CMD tag mijoco/runes_api mijoco/runes_api
$DOCKER_CMD push mijoco/runes_api:latest

  ssh -i ~/.ssh/id_rsa -p $PORT bob@$SERVER "
    cd /home/bob/hubgit/runes-api
    pwd
    cat .env;
    docker login;
    docker pull mijoco/runes_api;

    docker rm -f ${DOCKER_NAME}
    source /home/bob/.profile;
    docker run -d -t -i --network host --name ${DOCKER_NAME} -p 6060:6060 -e TARGET_ENV='linode-production' -e btcRpcUser=${RUNES_BTC_RPC_USER} -e btcRpcPwd=${RUNES_BTC_RPC_PWD} -e btcNode=${RUNES_BTC_NODE} -e mongoDbUrl=${RUNES_MONGO_URL} -e mongoDbName=${RUNES_MONGO_DBNAME} -e mongoUser=${RUNES_MONGO_USER} -e mongoPwd=${RUNES_MONGO_PWD} -e sbtcContractId=${RUNES_SBTC_CONTRACT_ID} -e poxContractId=${POX_CONTRACT_ID} -e stacksApi=${RUNES_STACKS_API} -e bitcoinExplorerUrl=${RUNES_BITCOIN_EXPLORER_URL} -e mempoolUrl=${RUNES_MEMPOOL_URL} -e blockCypherUrl=${RUNES_BLOCK_CYPHER_URL} -e publicAppName=${RUNES_PUBLIC_APP} -e publicAppVersion=${RUNES_PUBLIC_APP_VERSION} -e host=${RUNES_HOST} -e port=${RUNES_PORT} -e walletPath=${RUNES_WALLET_PATH} mijoco/runes_api
  ";

printf "Finished....\n"
printf "\n-----------------------------------------------------------------------------------------------------\n";

exit 0;

