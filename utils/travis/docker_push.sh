#!/bin/bash

VERSION=`cat build/version`

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

IMAGE_NAME=`echo $TRAVIS_REPO_SLUG | awk '{print tolower($0)}'`

IMAGE_TAG="nightly"
if [[ $TRAVIS_TAG != "" ]]; then
    IMAGE_TAG=$TRAVIS_TAG
fi

echo "building docker container for ${IMAGE_NAME}:${IMAGE_TAG},${VERSION} ..."

docker build -t $IMAGE_NAME:$VERSION .
docker tag "${IMAGE_NAME}:${VERSION}" "${IMAGE_NAME}:${IMAGE_TAG}"
docker push "${IMAGE_NAME}:${IMAGE_TAG}"
docker push "${IMAGE_NAME}:${VERSION}"