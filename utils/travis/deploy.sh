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
if [ "$TRAVIS_PULL_REQUEST" != "false" ] || ( [ "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ] && [ "$TRAVIS_BRANCH" != "master" ] ); then
    echo "Skipping deploy;"
    exit 0
fi

if [ "$TRAVIS_REPO_SLUG" != "$REPO_SLUG" ]; then
    echo "Not in main repository => skipping deploy;"
    exit 0
fi

if [ "$TRAVIS_BRANCH" != "master" ]; then
    echo "ATTENTION! Deploying docs from non master branch. Please change this!!!"
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

# Run our creation script
echo "generating german manual to extract screenshot examples"
$CV doc --doc-type manual -f -l de

VERSION=`${CV} doc --get-version`
utils/update_version.py
echo "generating api version $VERSION"
source temp-python/bin/activate
# check O_NONBLOCK
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); print(flags&os.O_NONBLOCK);'
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); fcntl.fcntl(sys.stdout, fcntl.F_SETFL, flags&~os.O_NONBLOCK);'
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); print(flags&os.O_NONBLOCK);'
{
  ${DOCKER_RUN} ./generate.py api -qsI --macro=CV_VERSION:$VERSION &&
  echo "API successfully generated"
} || {
  echo "API generation failed"
  NO_API=1
}
deactivate

echo "updating english manual from source code doc comments"
${CV} doc --from-source

# update symlinks and write version files
${CV} doc --process-versions

echo "generating english manual, including screenshot generation for all languages"
${DOCKER_RUN} ${CV} doc --doc-type manual -c -f -l en -t build --target-version=${VERSION}
echo "generating german manual again with existing screenshots"
${CV} doc --doc-type manual -f -l de --target-version=${VERSION}

if [[ "$NO_API" -eq 0 ]]; then
    echo "generate API screenshots"
    ${DOCKER_RUN} grunt screenshots --subDir=source --browserName=chrome --target=build --force

    # move the apiviewer to the correct version subfolder, including screenshots
    rm -r out/en/$VERSION/api
    ${CV} doc --move-apiviewer
fi

echo "generating feature yml file for homepage"
${CV} doc --generate-features

echo "generating sitemap.xml for documentation"
${CV} sitemap

echo "starting deployment..."
# Now let's go have some fun with the cloned repo
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
# as the changesets on master are too big we skip this check to prevent timeouts
if [ "$TRAVIS_BRANCH" != "master" ]; then
    echo "checking diff"
    if [ `git diff --shortstat | wc -l` -eq 0 ]; then
       echo "No changes to the output on this push; exiting."
       exit 0Dito
    fi
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add --all .
git commit -m "Deploy to GitHub Pages: ${SHA}"

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
git push $SSH_REPO $TARGET_BRANCH
