#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# No changes required after this line
echo "Running apt-get update"
apt-get update --fix-missing >/dev/null
echo "Finished running apt-get update"

echo "Installing git"
apt-get -q -y install git-core >/dev/null
echo "Finished installing git"

echo "Installing nodejs"
apt-get -q -y install nodejs >/dev/null
ln -s /usr/bin/nodejs /usr/bin/node
echo "Finished installing nodejs"

echo "Installing npm"
apt-get -q -y install npm >/dev/null
echo "Finished installing npm"

echo "Installing ember-cli"
npm install -g ember-cli
echo "Finished installing ember-cli"

echo "Installing bower"
npm install -g bower
echo "Finished installing bower"

echo "Installing phantomjs"
npm install -g phantomjs
echo "Finished installing phantomjs"

echo "Installing libfontconfig - secret dependency of phantomjs"
apt-get -q -y install libfontconfig >/dev/null
echo "Finished installing libfontconfig"

