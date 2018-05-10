#!/usr/bin/env sh
export PORT=5000
export FQDN=localhost
#export PUBLIC_URL="https://$FQDN/popcodes"
export PUBLIC_URL="http://$FQDN/popcodes"
export REACT_APP_HOMEPAGE="/popcodes"

#npm run build
#serve -s build
#yarn start
npm start
