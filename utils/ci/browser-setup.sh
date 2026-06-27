#!/bin/bash

set -e

echo "installing $CV_BROWSER - $CV_VERSION..."

if [ "$CV_BROWSER" = "" ]; then
    exit 0
fi

SELENIUM_MANAGER=./node_modules/selenium-webdriver/bin/linux/selenium-manager
$SELENIUM_MANAGER --version

if [ $CV_BROWSER = Firefox ]; then
    OUTPUT=$($SELENIUM_MANAGER --browser=firefox --browser-version=$CV_VERSION)
    DRIVER_PATH=$(printf ${OUTPUT} | grep "Driver path" | awk '{print $4}')
    BROWSER_PATH=$(printf ${OUTPUT} | grep "Browser path" | awk '{print $4}')
    ln -s -f ${BROWSER_PATH} firefox
    echo WEBDRIVER_PATH=${DRIVER_PATH} | tee .protractor-env
    echo BROWSER_PATH=${BROWSER_PATH} | tee -a .protractor-env
else
  OUTPUT=$($SELENIUM_MANAGER --browser=chrome --browser-version=$CV_VERSION)
  BROWSER_PATH=$(printf "${OUTPUT}" | grep "Browser path" | awk '{print $4}')
  CHROME_FULL_VERSION=$($BROWSER_PATH --version | awk '{print $3}')
  OUTPUT=$($SELENIUM_MANAGER --browser=chrome --browser-version=$CV_VERSION --driver chromedriver --driver-version=$CHROME_FULL_VERSION)
  DRIVER_PATH=$(printf "${OUTPUT}" | grep "Driver path" | awk '{print $4}')
  ln -s -f ${BROWSER_PATH} chrome
  echo WEBDRIVER_PATH=${DRIVER_PATH} | tee .protractor-env
  echo BROWSER_PATH=${BROWSER_PATH} | tee -a .protractor-env
  mkdir -p ./node_modules/protractor/node_modules/webdriver-manager/selenium/
  cp ${DRIVER_PATH} ./node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_${CHROME_FULL_VERSION}
  $SELENIUM_MANAGER --browser=chrome --browser-version=$CV_VERSION --debug
fi
