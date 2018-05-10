#!/usr/bin/env sh
export PORT=5000
export FQDN=localhost
#export PUBLIC_URL="https://$FQDN/popcodes"
export PUBLIC_URL="http://$FQDN/popcodes"
export REACT_APP_HOMEPAGE="/popcodes"

export REACT_APP_API_PROTOCOL=https
export REACT_APP_API_HOST=triangled-api-sunflower.skuchain.io
export REACT_APP_API_PORT=443
export REACT_APP_FLOW_URL=https://flow-sunflower.skuchain.io
export REACT_APP_BLAH=Sku web starter
export REACT_APP_LOGO_TOP=logo.png
export REACT_APP_LOGO_BOTTOM=logo.png
export REACT_APP_HOMEPAGE=/
export REACT_APP_POPCODE_API=/

export SKC_API_AUTH_URI=https://popskip-01.skuchain.io/auth
export CAYLEY_MGR_URI=https://popskip-01.skuchain.io/cayleymgr

export REACT_APP_SKC_API_AUTH_URI=$SKC_API_AUTH_URI
export REACT_APP_CAYLEY_MGR_URI=$CAYLEY_MGR_URI

export REACT_APP_POPCODE_TEST_DATA_ENABLED=false
export REACT_APP_POPCODE_TEST_DATA_NAME=popcodes_NTT_02

#npm run build
#serve -s build
yarn start
