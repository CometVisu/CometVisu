#!/bin/bash

VERSION_TAG=`cat build/version`
TESTING=0

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

if [[ $GITHUB_REF =~ ^refs/tags/(.+) ]]; then
  IS_TAG=1
  TAG=${BASH_REMATCH[1]}
  BRANCH=""
else
  IS_TAG=0
  BRANCH=`echo $GITHUB_REF | awk '{split($0,a,"/"); print tolower(a[3])}'`
  TAG=""
fi
IMAGE_NAME=`echo $GITHUB_REPOSITORY | awk '{print tolower($0)}'`

if [[ $IS_TAG == 1 ]]; then
    MASTER_TAG=$TAG
    IN_DEVELOP=$(git branch --contains "$TAG" | grep -c develop)
    IN_MASTER=$(git branch --contains "$TAG" | grep -c master)
    if [[ $IN_DEVELOP == 1 ]]; then
      MASTER_TAG=testing
      TESTING=1
    elif [[ $IN_MASTER == 1 ]]; then
      MASTER_TAG=latest
    else
      echo "tag '$TAG' needs to be in branch 'master' or 'develop'"
      exit 1
    fi
elif [[ "$BRANCH" = "master" ]]; then
    MASTER_TAG=latest
elif [[ "$BRANCH" = "develop" ]] || [[ "$BRANCH" = "ci-test" ]]; then
    MASTER_TAG=testing
    TESTING=1
else
  echo "unknown branch '$BRANCH' aborting docker build"
  exit 1
fi


if [[ $TESTING == 1 ]]; then
    SUB_TAG="testing-`date +%Y%m%d`"
fi

if [[ "$BRANCH" = "ci-test" ]]; then
  echo "building docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG},${TAG} ..."
  echo "...skipped in ci-test branch"
  exit 0
fi

echo "building docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG},${TAG} ..."

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

if [[ "$TAG" != "" ]]; then
    docker tag "${IMAGE_NAME}:${VERSION_TAG}" "${IMAGE_NAME}:${TAG}"
    docker push "${IMAGE_NAME}:${TAG}"
fi

echo "building ARM docker container for ${IMAGE_NAME}:${VERSION_TAG},${MASTER_TAG},${SUB_TAG},${TAG} ..."
docker build -f Dockerfile -t "${IMAGE_NAME}:${VERSION_TAG}-arm" --build-arg CONTAINER_FROM="cometvisu/cometvisuabstractbase:arm32v7-latest" --build-arg BUILD_DATE="$BUILD_DATE" --build-arg VCS_REF="$VCS_REF" --build-arg VERSION_TAG="$VERSION_TAG" --build-arg GITHUB_RUN_NUMBER --build-arg GITHUB_RUN_ID .
docker tag "${IMAGE_NAME}:${VERSION_TAG}-arm" "${IMAGE_NAME}:${MASTER_TAG}-arm"
docker push "${IMAGE_NAME}:${MASTER_TAG}-arm"
docker push "${IMAGE_NAME}:${VERSION_TAG}-arm"

if [[ "$SUB_TAG" != "" ]]; then
    docker tag "${IMAGE_NAME}:${VERSION_TAG}-arm" "${IMAGE_NAME}:${SUB_TAG}-arm"
    docker push "${IMAGE_NAME}:${SUB_TAG}-arm"
fi

if [[ "$TAG" != "" ]]; then
    docker tag "${IMAGE_NAME}:${VERSION_TAG}-arm" "${IMAGE_NAME}:${TAG}-arm"
    docker push "${IMAGE_NAME}:${TAG}-arm"
fi
