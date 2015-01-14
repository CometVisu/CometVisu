#!/bin/bash

VERSION="$1"
USER="$2"
PASS="$3"

if [[ -z $PASS ]]; then
  echo "Call script with the new version name as parameter like
  $0 \"1.2.3\" \"MySVNUserName\" \"MySVNPass\" [-dry]"
  exit
fi

RELEASE_DIR="release_$VERSION"
SVN_CMD="svn --username $USER --password $PASS"

if [ x"$4" = "x-dry" ]; then
  echo "Dry run!"
  SVN_CMD="echo svn"
fi

echo "Creating Release: '$VERSION' in '$RELEASE_DIR'"

# Make sure we start at the location of this script
# NOTE: the script assumes to live at .../CometVisu/_support
cd "$( dirname "${BASH_SOURCE[0]}" )"

$SVN_CMD copy -m "Creating release branch $VERSION" \
  "svn+ssh://$USER@svn.code.sf.net/p/openautomation/code/CometVisu/trunk" \
  "svn+ssh://$USER@svn.code.sf.net/p/openautomation/code/CometVisu/branches/$RELEASE_DIR"

# NOTE: the script assumes that the branches live at .../CometVisu/branches
cd ../branches

if [ x"$4" = "x-dry" ]; then
  # dry run? Then fake copy in /tmp/branches
  if [ -e  /tmp/branches ]; then
    echo "/tmp/branches does already exist - deleting it..."
    rm -rf /tmp/branches
  fi
  mkdir /tmp/branches
  mkdir /tmp/_support
  cp ../_support/* /tmp/_support
  cp -r ../trunk /tmp/branches/$RELEASE_DIR
  cd /tmp/branches
fi

$SVN_CMD up
echo $VERSION > $RELEASE_DIR/VERSION
echo $VERSION > $RELEASE_DIR/src/version
sed -i "s/Version: SVN/Version: $VERSION/" $RELEASE_DIR/src/config/visu_config.xml 
sed -i "s/Version: SVN/Version: $VERSION/" $RELEASE_DIR/src/config/demo/visu_config_demo.xml 
sed -i "s/comet_16x16_000000.png/comet_16x16_ff8000.png/" $RELEASE_DIR/src/index.html
cd $RELEASE_DIR

#make
JS_ENGINE=`which node nodejs 2>/dev/null | head -n 1`
TIMESTAMP=`date +%Y%m%d-%H%M%S`
STATIC_FILES_PRE=$(cat src/cometvisu.appcache  | sed '0,/T MODIFY!$/{//!b};d')
STATIC_FILES_POST=$(cat src/cometvisu.appcache  | sed '/^NETWORK:$/,/^$/{//!b};d')
PLUGIN_FILES=$(find src | grep plugins | grep -E "structure_plugin.js|\.css" | sed 's%src/%%')
DESIGN_FILES=$(find src | grep designs | grep -E "\.js|\.css|\.ttf" | grep -v "custom.css" | sed 's%src/%%')
mkdir -p ./release
$JS_ENGINE ../../_support/r.js -o build.js
find release -path "*/.svn" -exec rm -rf {} +
echo -e "$STATIC_FILES_PRE\n$DESIGN_FILES\n$PLUGIN_FILES\n\nNETWORK:\n$STATIC_FILES_POST" | \
  sed "s/# Version.*/# Version $VERSION:$TIMESTAMP/"  \
  > release/cometvisu.appcache
rm release/build.txt

chmod -R a+w src/config
chmod -R a+w release/config
# why do I need this?!? I'd expect r.js to create that dir already...
mkdir -p release/config/backup
chmod -R a+w release/config/backup
cd ..
$SVN_CMD propdel svn:ignore $RELEASE_DIR
$SVN_CMD add $RELEASE_DIR/docs --depth infinity
$SVN_CMD add $RELEASE_DIR/release --depth infinity
$SVN_CMD ci -m "New release: $VERSION" 

tar -cjp --exclude-vcs  -f CometVisu_$VERSION.tar.bz2 $RELEASE_DIR

