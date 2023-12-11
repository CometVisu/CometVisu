#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="develop"
TARGET_BRANCH="gh-pages"
REPO_SLUG="CometVisu/CometVisu"
CV="./cv"
DOCKER_RUN="./bin/docker-run"
REMOTE_NAME="origin"
GENERATE_DOCS=1
GENERATE_DEMO=1
if [[ "$TARGET" == "docs" ]]; then GENERATE_DEMO=0; fi
if [[ "$TARGET" == "demo" ]]; then GENERATE_DOCS=0; fi

echo "${TARGET}, docs: ${GENERATE_DOCS}, demo: ${GENERATE_DEMO}"

if [ "$GITHUB_EVENT_NAME" == "schedule" ]; then
    echo "Skipping deploy in cron build"
    exit 0
fi

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if ([[ "$GITHUB_EVENT_NAME" != "push" ]] && [[ "$GITHUB_EVENT_NAME" != "workflow_dispatch" ]]) || ( [ "$GITHUB_REF" != "refs/heads/$SOURCE_BRANCH" ] &&
    [[ ! "$GITHUB_REF" =~ release-[0-9\.]+ ]] && [[ "$GITHUB_REF" != "refs/heads/ci-test" ]] && [[ "$GITHUB_REF" != "refs/heads/master" ]]); then
    echo "Skipping deploy; ${GITHUB_EVENT_NAME} on ${GITHUB_REF}"
    exit 0
fi

if [ "$GITHUB_REPOSITORY" != "$REPO_SLUG" ] && [[ "$GITHUB_REF" != "refs/heads/ci-test" ]]; then
    echo "Not in main repository => skipping deploy;"
    exit 0
fi


# Save some useful information
REPO=`git config remote.origin.url`
PUSH_REPO="https://x-access-token:${DEPLOY_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
SHA=`git rev-parse --verify HEAD`
NO_API=0
BUILD_CV=1

# Clone the existing gh-pages for this repo into out/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
git clone $REPO out
cd out
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
#rm -rf out/de || exit 0
#rm -rf out/en || exit 0

VERSION=`${CV} doc --get-version`
VERSION_PATH=`${CV} doc --get-target-version`

# check if this version is new (we only check the "de" dir)
NEW_VERSION=0
if [ ! -d "out/de/$VERSION_PATH" ]; then
    NEW_VERSION=1
fi;

if [[ "$GENERATE_DOCS" -eq 1 ]]; then

  # Run our creation script
  echo "generating german manual to extract screenshot examples"
  ${CV} doc --doc-type manual -f -l de --target-version=${VERSION_PATH}

  echo "generating api version $VERSION"

  CV_VERSION=$VERSION qx compile -t build --set apiviewer=true -f=false
  if [ $? -eq 0 ]
  then
    echo "API successfully generated"
  else {
    echo "API generation failed"
    NO_API=1
  }
  fi

  # API screenshots are used by the "doc --from-source" run so we generate them here
  if [[ "$NO_API" -eq 0 ]]; then
      # move the apiviewer to the correct version subfolder
      rm -rf out/en/$VERSION_PATH/api
      # move generate api to target, because we need the build dir for screenshots
      ${CV} doc --move-apiviewer --target-version=${VERSION_PATH}

      # we need a source-build to generate screenshots
      qx compile -t=source -f=false
      echo "generate API screenshots"
      if test -f .protractor-env; then
        source .protractor-env
      fi
      grunt screenshots --subDir=build --browserName=chrome --target=source
      BUILD_CV=0

      # move generated screenshots to the api viewer
      ${CV} doc --move-apiviewer-screenshots --target-version=${VERSION_PATH}
  fi

  echo "updating english manual from source code doc comments"
  ${CV} doc --from-source

  # extra en generation run to have the new version available for the next step
  ${CV} doc --doc-type manual -l en --target-version=${VERSION_PATH}

  if [[ "$BUILD_CV" -eq 1 ]]; then
    echo "generating the source version of the CometVisu for screenshot generation"
    qx compile -t=source -f=false
  fi

  echo "generating english manual, including screenshot generation for all languages"
  ${CV} doc --doc-type manual -c -f -l en -t source --target-version=${VERSION_PATH}
  echo "generating german manual again with existing screenshots"
  ${CV} doc --doc-type manual -f -l de --target-version=${VERSION_PATH}

  # update symlinks and write version files
  ${CV} doc --process-versions

  echo "generating feature yml file for homepage"
  ${CV} doc --generate-features

  echo "generating sitemap.xml for documentation"
  ${CV} sitemap
fi

if [[ "$GENERATE_DEMO" -eq 1 ]]; then
  echo "generating test mode build"
  sed -i 's/"qx.globalErrorHandling": true,/"qx.globalErrorHandling": false,/g' compile.json
  qx deploy --clean -t build -f=false --source-maps --save-source-in-map -o out/de/$VERSION_PATH/demo
  # Copy demo-mode to default config
  cp out/de/$VERSION_PATH/demo/resource/demo/visu_config_demo-tile.xml out/de/$VERSION_PATH/demo/resource/config/visu_config.xml
fi

echo "copying JSON schema for hidden configuration"
mkdir -p out/schemas/$VERSION_PATH/
cp source/resource/hidden-schema.json out/schemas/$VERSION_PATH/


echo "starting deployment..."
# Now let's go have some fun with the cloned repo
cd out
git config --local user.name "$COMMIT_AUTHOR_NAME"
git config --local user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail out.
# as the changesets on new versions are too big we skip this check to prevent timeouts
if [ "$NEW_VERSION" -eq 0 ]; then
    echo "checking diff"
    if [ `git diff --shortstat | wc -l` -eq 0 ]; then
       echo "No changes to the output on this push; exiting."
       exit 0
    fi
fi

if [[ "$GITHUB_REF" == "refs/heads/ci-test" ]]; then
  echo "stopping ci test - dryrun"
  exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
echo "adding all changes to git changeset"
git add --all .
echo "committing changeset"
git commit -q -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
echo "pushing changes to remote repository"
git push "$PUSH_REPO" $TARGET_BRANCH

# Commit generated screenshots and shot-index files into this repo
echo "committing changed screenshots and shot-index files"
cd ..
git config --local user.name "$COMMIT_AUTHOR_NAME"
git config --local user.email "$COMMIT_AUTHOR_EMAIL"

git add doc/**/*.json
git add doc/**/*.png
# only commit when there are changes
if [ `git diff-index --cached HEAD | wc -l` -gt 0 ]; then
  git commit -q -m "[skip ci] Add generated files: ${SHA}"
  git push
fi
