#!/usr/bin/env bash

changedfiles=( `git diff-tree --no-commit-id --name-only HEAD@{1} HEAD` )

if [[ "${changedfiles[*]}" =~ ".gitmodules" ]]; then
    echo "initializing & updating submodule(s)"
    git submodule update --init --recursive
else
    echo "updating submodules"
    git submodule update
fi

# try to figure out if there are deleted/added javascript files
changes=`git diff --name-status HEAD@{1} HEAD@{2} | grep "^[DA].*\.js$" | wc -l`
if [[ $changes > 0 ]]; then
    echo "------------------------------------------"
    echo "$changes javascript files deleted or added"
    ./generate.py source
fi
