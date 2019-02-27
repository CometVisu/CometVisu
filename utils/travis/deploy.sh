#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="develop"
TARGET_BRANCH="gh-pages"
REPO_SLUG="CometVisu/CometVisu"
CV="./cv"
DOCKER_RUN="./bin/docker-run"

if [ "$TRAVIS_EVENT_TYPE" == "cron" ]; then
    echo "Skipping deploy in cron build"
    exit 0
fi

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" ] || ( [ "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ] && [[ ! "$TRAVIS_BRANCH" =~ release-[0-9\.]+ ]]); then
    echo "Skipping deploy;"
    exit 0
fi

if [ "$TRAVIS_REPO_SLUG" != "$REPO_SLUG" ]; then
    echo "Not in main repository => skipping deploy;"
    exit 0
fi


# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`
NO_API=0

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

# Run our creation script
echo "generating german manual to extract screenshot examples"
$CV doc --doc-type manual -f -l de --target-version=${VERSION_PATH}

utils/update_version.py
echo "generating api version $VERSION"
source temp-python/bin/activate
# Turn off O_NONBLOCK (breaks large stdout writes)
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); fcntl.fcntl(sys.stdout, fcntl.F_SETFL, flags&~os.O_NONBLOCK);'
{
  ${DOCKER_RUN} ./generate.py api -qsI --macro=CV_VERSION:$VERSION &&
  echo "API successfully generated"
} || {
  echo "API generation failed"
  NO_API=1
}
deactivate

# API screenshots are used by the "doc --from-source" run so we generate them here
if [[ "$NO_API" -eq 0 ]]; then
    echo "generate API screenshots"
    ${DOCKER_RUN} grunt screenshots --subDir=source --browserName=chrome --target=build --force

    # move the apiviewer to the correct version subfolder, including screenshots
    rm -rf out/en/$VERSION_PATH/api
    ${CV} doc --move-apiviewer --target-version=${VERSION_PATH}
fi

echo "updating english manual from source code doc comments"
${CV} doc --from-source

# extra en generation run to have the new version available for the next step
${CV} doc --doc-type manual -l en --target-version=${VERSION_PATH}

# update symlinks and write version files
${CV} doc --process-versions

echo "generating english manual, including screenshot generation for all languages"
${DOCKER_RUN} ${CV} doc --doc-type manual -c -f -l en -t build --target-version=${VERSION_PATH}
echo "generating german manual again with existing screenshots"
${CV} doc --doc-type manual -f -l de --target-version=${VERSION_PATH}

echo "generating feature yml file for homepage"
${CV} doc --generate-features

echo "generating sitemap.xml for documentation"
${CV} sitemap

echo "generating test mode build"
source temp-python/bin/activate
./generate.py build --macro=CV_TESTMODE:resource/demo/media/demo_testmode_data.json
grunt update-demo-config
rm -rf out/de/$VERSION_PATH/demo
mv build out/de/$VERSION_PATH/demo

# Copy demo-mode to default config
cp out/de/$VERSION_PATH/demo/resource/demo/visu_config_demo_testmode.xml out/de/$VERSION_PATH/demo/resource/config/visu_config.xml

echo "generating test mode source version"
./generate.py source-hybrid --macro=CV_TESTMODE:resource/demo/media/demo_testmode_data.json
grunt update-demo-config-source
rm -rf out/de/$VERSION_PATH/demo-source
mkdir -p out/de/$VERSION_PATH/demo-source/client/source/class/cv/
mkdir -p out/de/$VERSION_PATH/demo-source/source/
# copy files
cp -r client/source/class/cv out/de/$VERSION_PATH/demo-source/client/source/class/
cp -r source/class source/resource source/loader source/script source/index.html source/manifest.json out/de/$VERSION_PATH/demo-source/source/
cp out/de/$VERSION_PATH/demo-source/source/resource/demo/visu_config_demo_testmode.xml out/de/$VERSION_PATH/demo-source/source/resource/config/visu_config.xml
deactivate

echo "starting deployment..."
# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail out.
# as the changesets on new versions are too big we skip this check to prevent timeouts
if [ "$NEW_VERSION" -eq 0 ]; then
    echo "checking diff"
    if [ `git diff --shortstat | wc -l` -eq 0 ]; then
       echo "No changes to the output on this push; exiting."
       exit 0
    fi
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
echo "adding all changes to git changeset"
git add --all .
echo "committing changeset"
git commit -q -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../utils/travis/deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Now that we're all set up, we can push.
echo "pushing changes to remote repository"
git push $SSH_REPO $TARGET_BRANCH
