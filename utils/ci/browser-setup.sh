#!/bin/bash

echo "installing $CV_BROWSER - $CV_VERSION..."

if [ "$CV_BROWSER" = "" ]; then
    exit 0
fi

if [ $CV_BROWSER = Firefox ]; then
    wget -q -O /tmp/firefox.tar.bz2 "https://download.mozilla.org/?product=firefox-${CV_VERSION}&lang=en-US&os=linux64"
    tar xf /tmp/firefox.tar.bz2
else
    wget -q -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-${CV_VERSION}_current_amd64.deb
    dpkg --extract /tmp/chrome.deb chrome-x
    if [ $CV_VERSION = stable ]; then
        mv chrome-x/opt/google/chrome chrome
        mv chrome/google-chrome chrome/google-chrome-stable
    else
        mv chrome-x/opt/google/chrome-$CV_VERSION chrome
        rm chrome/google-chrome
    fi
    ln -s google-chrome-$CV_VERSION chrome/google-chrome
fi