#!/usr/bin/env bash

for file in ./utils/git-hooks/*.sh
do
 # do something on $file
 filename=$(basename "$file")
 filename="${filename%.*}"
 echo "installing $filename hook"
 ln -s "../.$file" ".git/hooks/$filename"
done