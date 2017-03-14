#!/usr/bin/python
# -*- coding: utf-8 -*-

try:
    import sh
except ImportError:
    pass

import datetime
import json
import os

root_dir = os.path.abspath(os.path.join(os.path.realpath(os.path.dirname(__file__)), '..'))


def update_version():
    # gather information from git
    git = sh.Command("git") if sh is not None else None
    data = {
        "revision": git("rev-parse", "HEAD").strip("\n") if git is not None else None,
        "branch": git("rev-parse", "--abbrev-ref", "HEAD").strip("\n") if git is not None else None,
        "date": datetime.datetime.now().isoformat()
    }
    with open(os.path.join(root_dir, "package.json")) as data_file:
        package_data = json.load(data_file)
        data["version"] = package_data['version']

    with open(os.path.join(root_dir, "source", "class", "cv", "Version.js"), 'w') as f:
        f.write('''
qx.Class.define("cv.Version", {
  type: "static",

  statics: {
    REV: "%(revision)s",
    BRANCH: "%(branch)s",
    VERSION: "%(version)s",
    DATE: "%(date)s"
  }
});
''' % data)

if __name__ == '__main__':
    update_version()