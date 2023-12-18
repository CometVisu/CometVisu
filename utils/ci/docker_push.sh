#!/bin/bash

VERSION_TAG=`cat build/version`
TESTING=0
IS_RELEASE=0

echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

if [[ $GITHUB_REF =~ ^refs/tags/(.+) ]]; then
  IS_TAG=1
  TAG=${BASH_REMATCH[1]}
  BRANCH=""
else
  IS_TAG=0
  BRANCH=`echo $GITHUB_REF | awk '{split($0,a,"/"); print tolower(a[3])}'`
  TAG=""

  echo "only tagged git versions are pushed to docker"
  exit 1
fi
IMAGE_NAME=`echo $GITHUB_REPOSITORY | awk '{print tolower($0)}'`

if [[ $IS_TAG == 1 ]]; then
    MASTER_TAG=$TAG
    IN_DEVELOP=$(git branch -r --contains "$TAG" | grep -c develop)
    IN_MASTER=$(git branch -r --contains "$TAG" | grep -c master)
    IN_RELEASE=$(git branch -r --contains "$TAG" | grep -c release-)

    if [[ $IN_DEVELOP == 0 && $IN_MASTER == 0 && $IN_RELEASE == 0 ]]; then
      echo "tag '$TAG' needs to be in branch 'master', 'develop' or one of the 'release-*' branches"
      git branch -r --contains "$TAG"
      exit 1
    fi

    # check if we have a "real" release tag like "v0.12.0" with no appendix
    [[ $TAG =~ ^v\d{1,2}\.\d{1,3}\.\d{1,3}$ ]] && IS_RELEASE=1

    if [[ $IS_RELEASE == 1 && $IN_DEVELOP == 1 ]]; then
      echo "building real release versions in the develop-branch are not supported. They must be created either in the master or one of the release-branches!"
      exit 1
    fi

    if [[ $IN_DEVELOP == 1 ]]; then
      MASTER_TAG=testing
      TESTING=1
    elif [[ $IN_MASTER == 1 ]]; then
      MASTER_TAG=latest
    elif [[ $IN_RELEASE == 1 ]]; then
      # dont use tag at all
      TAG=""
      if [[ $IS_RELEASE == 1 ]]; then
        # disable using MASTER_TAG be setting is to the same value as the VERSION_TAG
        MASTER_TAG=$VERSION_TAG
      else
        # only use github ref tag as version (MASTER_TAG contains the git tag here)
        VERSION_TAG=$MASTER_TAG
      fi
    fi
elif [[ "$BRANCH" = "master" ]]; then
    MASTER_TAG=latest
elif [[ "$BRANCH" = "develop" ]] || [[ "$BRANCH" = "ci-test" ]]; then
    MASTER_TAG=testing
    TESTING=1
elif [[ "$BRANCH" =~ ^release-.+ ]]; then
    MASTER_TAG=$VERSION_TAG
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

TAGS=""
if [[ "$MASTER_TAG" != "$VERSION_TAG" ]]; then
  TAGS="${TAGS} -t ${IMAGE_NAME}:${MASTER_TAG}"
fi

if [[ "$SUB_TAG" != "" ]]; then
  TAGS="${TAGS} -t ${IMAGE_NAME}:${SUB_TAG}"
fi

if [[ "$TAG" != "" ]]; then
  TAGS="${TAGS} -t ${IMAGE_NAME}:${TAG}"
fi
echo "TAGS: '${TAGS}'"

docker buildx build -t $IMAGE_NAME:$VERSION_TAG \
  ${TAGS} \
  --platform linux/amd64,linux/arm/v7,linux/arm64 \
  --build-arg BUILD_DATE="$BUILD_DATE" \
  --build-arg VCS_REF="$VCS_REF" \
  --build-arg VERSION_TAG="$VERSION_TAG" \
  --build-arg GITHUB_RUN_NUMBER \
  --build-arg GITHUB_RUN_ID \
  --push .
