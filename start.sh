#!/usr/bin/env sh
export PORT=5000
export PUBLIC_URL="https://$FQDN/popcodes"
export REACT_APP_HOMEPAGE="/popcodes"

npm run build
serve -s build
#npm run start
