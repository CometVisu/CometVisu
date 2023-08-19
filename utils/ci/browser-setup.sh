#!/bin/bash

set -e

echo "installing $CV_BROWSER - $CV_VERSION..."

if [ "$CV_BROWSER" = "" ]; then
    exit 0
fi

curl --silent --show-error --location --remote-name https://github.com/SeleniumHQ/selenium/raw/trunk/common/manager/linux/selenium-manager
chmod +x selenium-manager
./selenium-manager --version
if [[ -z "$DELETE_INSTALLED_WEBDRIVER" ]]; then
    rm -f /usr/local/bin/chromedriver
    rm -f /usr/bin/chromedriver
fi

if [ $CV_BROWSER = Firefox ]; then
    OUTPUT=$(./selenium-manager --browser=firefox --browser-version=$CV_VERSION)
    DRIVER_PATH=$(printf ${OUTPUT} | grep "Driver path" | awk '{print $4}')
    BROWSER_PATH=$(printf ${OUTPUT} | grep "Browser path" | awk '{print $4}')
    ln -s -f ${BROWSER_PATH} firefox
    echo WEBDRIVER_PATH=${DRIVER_PATH} | tee .protractor-env
    echo BROWSER_PATH=${BROWSER_PATH} | tee -a .protractor-env
else
  OUTPUT=$(./selenium-manager --browser=chrome --browser-version=$CV_VERSION)
  DRIVER_PATH=$(printf "${OUTPUT}" | grep "Driver path" | awk '{print $4}')
  BROWSER_PATH=$(printf "${OUTPUT}" | grep "Browser path" | awk '{print $4}')
  ln -s -f ${BROWSER_PATH} chrome
  CHROME_FULL_VERSION=$($BROWSER_PATH --version | awk '{print $3}')
  echo WEBDRIVER_PATH=${DRIVER_PATH} | tee .protractor-env
  echo BROWSER_PATH=${BROWSER_PATH} | tee -a .protractor-env
  mkdir -p ./node_modules/protractor/node_modules/webdriver-manager/selenium/
  cp ${DRIVER_PATH} ./node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_${CHROME_FULL_VERSION}
  ./selenium-manager --browser=chrome --browser-version=$CV_VERSION --debug
fi
