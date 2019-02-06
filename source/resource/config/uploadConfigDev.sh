#!/bin/bash

#kopieren
scp /media/develop/CometVisu_dev/source/resource/config/visu*.xml root@wiregate1769:/var/www/cometvisu11dev/source/resource/config
scp /media/develop/CometVisu_dev/source/resource/config/*.js root@wiregate1769:/var/www/cometvisu11dev/source/resource/config
scp /media/develop/CometVisu_dev/source/resource/config/media/*.css root@wiregate1769:/var/www/cometvisu11dev/source/resource/config/media

scp /media/develop/CometVisu_dev/source/resource/plugins/openweathermap/owm/*.js root@wiregate1769:/var/www/cometvisu11dev/source/resource/plugins/openweathermap/owm
scp /media/develop/CometVisu_dev/source/resource/plugins/openweathermap/*.css root@wiregate1769:/var/www/cometvisu11dev/source/resource/plugins/openweathermap/
#scp /media/develop/CometVisu_dev/source/resource/config/*.css root@wiregate1769:/var/www/cometvisu11dev/source/resource/config

echo "Config hochgeladen..."
