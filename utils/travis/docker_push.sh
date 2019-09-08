#!/bin/bash

VERSION_TAG=`cat build/version`

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

IMAGE_NAME=`echo $TRAVIS_REPO_SLUG | awk '{print tolower($0)}'`

if [[ "$TRAVIS_BRANCH" = "master" ]]; then
    MASTER_TAG=latest
elif [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    MASTER_TAG=testing
fi

if [[ "$TRAVIS_BRANCH" = "develop" ]]; then
    SUB_TAG="testing-`date +%Y%m%d`"
fi

echo "building docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG} ..."

BUILD_DATE=`date --iso-8601=seconds`
VCS_REF=`git rev-parse --short HEAD`

docker build -t $IMAGE_NAME:$VERSION_TAG --build-arg BUILD_DATE="$BUILD_DATE" --build-arg VCS_REF="$VCS_REF" --build-arg VERSION_TAG="$VERSION_TAG" --build-arg TRAVIS_JOB_NUMBER --build-arg TRAVIS_JOB_WEB_URL --build-arg TRAVIS_BUILD_WEB_URL .
docker tag "${IMAGE_NAME}:${VERSION_TAG}" "${IMAGE_NAME}:${MASTER_TAG}"
docker push "${IMAGE_NAME}:${MASTER_TAG}"
docker push "${IMAGE_NAME}:${VERSION_TAG}"

if [[ "$SUB_TAG" != "" ]]; then
    docker tag "${IMAGE_NAME}:${VERSION_TAG}" "${IMAGE_NAME}:${SUB_TAG}"
    docker push "${IMAGE_NAME}:${SUB_TAG}"
fi

echo "building ARM docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG} ..."
docker build -f Dockerfile -t "${IMAGE_NAME}:${VERSION_TAG}-arm" --build-arg CONTAINER_FROM="cometvisu/cometvisuabstractbase:arm32v7-latest" --build-arg BUILD_DATE="$BUILD_DATE" --build-arg VCS_REF="$VCS_REF" --build-arg VERSION_TAG="$VERSION_TAG" --build-arg TRAVIS_JOB_NUMBER --build-arg TRAVIS_JOB_WEB_URL --build-arg TRAVIS_BUILD_WEB_URL .
docker tag "${IMAGE_NAME}:${VERSION_TAG}-arm" "${IMAGE_NAME}:${MASTER_TAG}-arm"
docker push "${IMAGE_NAME}:${MASTER_TAG}-arm"
docker push "${IMAGE_NAME}:${VERSION_TAG}-arm"
