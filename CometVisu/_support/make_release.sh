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
SVN_CMD="svn"

if [ x"$4" = "x-dry" ]; then
  echo "Dry run!"
  SVN_CMD="echo svn"
fi

echo "Creating Release: '$VERSION' in '$RELEASE_DIR'"

# Make sure we start at the location of this script
# NOTE: the script assumes to live at .../CometVisu/_support
cd "$( dirname "${BASH_SOURCE[0]}" )"

$SVN_CMD copy --username $USER --password $PASS -m "Creating release branch $VERSION" \
  "https://openautomation.svn.sourceforge.net/svnroot/openautomation/CometVisu/trunk" \
  "https://openautomation.svn.sourceforge.net/svnroot/openautomation/CometVisu/branches/$RELEASE_DIR"

# NOTE: the script assumes that the branches live at .../CometVisu/branches
cd ../branches

if [ x"$4" = "x-dry" ]; then
  # dry run? Then fake copy in /tmp/branches
  if [ -e  /tmp/branches ]; then
    echo "/tmp/branches does already exist - deleting it..."
    rm -rf /tmp/branches
  fi
  mkdir /tmp/branches
  cp -r ../trunk /tmp/branches/$RELEASE_DIR
  cd /tmp/branches
fi

$SVN_CMD up
$SVN_CMD propdel svn:ignore $RELEASE_DIR
echo $VERSION > $RELEASE_DIR/VERSION
sed -i "s/Version: SVN/Version: $VERSION/" $RELEASE_DIR/src/visu_config.xml 
sed -i "s/Version: SVN/Version: $VERSION/" $RELEASE_DIR/src/visu_config_demo.xml 
sed -i "s/comet_16x16_000000.png/comet_16x16_ff8000.png/" $RELEASE_DIR/src/index.html
cd $RELEASE_DIR
make
cd ..
$SVN_CMD ci -m "New release: $VERSION" 

tar -cj --exclude-vcs  -f CometVisu_$VERSION.tar.bz2 $RELEASE_DIR

