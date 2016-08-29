#!/bin/bash

nodejs_modules="jsdoc libxmljs-mt libxml-xsd easyimage"
nodejs_modules_installed="$(npm list --depth=0)"

for m in $nodejs_modules; do
    if ! echo "$nodejs_modules_installed" | grep -q "\\s$m"@; then
        echo "install $m"
        npm install "$m"
    else
        echo "update $m"
        npm update "$m"
    fi
done