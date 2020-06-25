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
    ${CV} doc --move-apiviewer --target-version=${VERSION_PATH}
fi

echo "updating english manual from source code doc comments"
${CV} doc --from-source

# extra en generation run to have the new version available for the next step
${CV} doc --doc-type manual -l en --target-version=${VERSION_PATH}

# update symlinks and write version files
${CV} doc --process-versions

echo "generating the source verion of the CometVisu for screenshot generation"
qx compile -t=build -f=false

echo "generating english manual, including screenshot generation for all languages"
${DOCKER_RUN} ${CV} doc --doc-type manual -c -f -l en -t build --target-version=${VERSION_PATH}
echo "generating german manual again with existing screenshots"
${CV} doc --doc-type manual -f -l de --target-version=${VERSION_PATH}

echo "generating feature yml file for homepage"
${CV} doc --generate-features

echo "generating sitemap.xml for documentation"
${CV} sitemap

echo "generating test mode build"
CV_TAG_RUNTIME=demo CV_TESTMODE=resource/demo/media/demo_testmode_data.json qx compile -t build -f=false
grunt update-demo-config
rm -rf out/de/$VERSION_PATH/demo
mv compiled/build out/de/$VERSION_PATH/demo

echo "copying JSON schema for hidden configuration"
mkdir -p out/schemas/$VERSION_PATH/
cp source/resource/hidden-schema.json out/schemas/$VERSION_PATH/

# Copy demo-mode to default config
cp out/de/$VERSION_PATH/demo/resource/demo/visu_config_demo_testmode.xml out/de/$VERSION_PATH/demo/resource/config/visu_config.xml

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
