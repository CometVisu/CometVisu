#!/bin/bash

VERSION_TAG=`cat build/version`

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

BRANCH=`echo $GITHUB_REF | awk '{split($0,a,"/"); print tolower(a[3])}'`
IMAGE_NAME=`echo $GITHUB_REPOSITORY | awk '{print tolower($0)}'`

if [[ "$BRANCH" = "master" ]]; then
    MASTER_TAG=latest
elif [[ "$BRANCH" = "develop" ]] || [[ "$BRANCH" = "ci-test" ]]; then
    MASTER_TAG=testing
else
  echo "unknown branch '$BRANCH' aborting docker build"
  exit 1
fi

# TODO handle tag builds

if [[ "$BRANCH" = "develop" ]] || [[ "$BRANCH" = "ci-test" ]]; then
    SUB_TAG="testing-`date +%Y%m%d`"
fi

if [[ "$BRANCH" = "ci-test" ]]; then
  echo "building docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG} ..."
  echo "...skipped in ci-test branch"
  exit 0
fi

echo "building docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG} ..."

BUILD_DATE=`date --iso-8601=seconds`
VCS_REF=`git rev-parse --short HEAD`

docker build -t $IMAGE_NAME:$VERSION_TAG --build-arg BUILD_DATE="$BUILD_DATE" --build-arg VCS_REF="$VCS_REF" --build-arg VERSION_TAG="$VERSION_TAG" --build-arg GITHUB_RUN_NUMBER --build-arg GITHUB_RUN_ID .
docker tag "${IMAGE_NAME}:${VERSION_TAG}" "${IMAGE_NAME}:${MASTER_TAG}"
docker push "${IMAGE_NAME}:${MASTER_TAG}"
docker push "${IMAGE_NAME}:${VERSION_TAG}"

if [[ "$SUB_TAG" != "" ]]; then
    docker tag "${IMAGE_NAME}:${VERSION_TAG}" "${IMAGE_NAME}:${SUB_TAG}"
    docker push "${IMAGE_NAME}:${SUB_TAG}"
fi

echo "building ARM docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG} ..."
docker build -f Dockerfile -t "${IMAGE_NAME}:${VERSION_TAG}-arm" --build-arg CONTAINER_FROM="cometvisu/cometvisuabstractbase:arm32v7-latest" --build-arg BUILD_DATE="$BUILD_DATE" --build-arg VCS_REF="$VCS_REF" --build-arg VERSION_TAG="$VERSION_TAG" --build-arg GITHUB_RUN_NUMBER --build-arg GITHUB_RUN_ID .
docker tag "${IMAGE_NAME}:${VERSION_TAG}-arm" "${IMAGE_NAME}:${MASTER_TAG}-arm"
docker push "${IMAGE_NAME}:${MASTER_TAG}-arm"
docker push "${IMAGE_NAME}:${VERSION_TAG}-arm"
