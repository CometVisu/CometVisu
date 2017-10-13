#!/usr/bin/env bash

docker build -t cv-doc-helper -f .docker/doc-helper .
ID=`docker ps -a | grep cv_doc | awk '{print $1}'`
if [ ! -z "$ID" ]; then
    docker rm $ID
fi