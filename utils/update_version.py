#!/usr/bin/python
# -*- coding: utf-8 -*-

import subprocess
import datetime
import json
import os

root_dir = os.path.abspath(os.path.join(os.path.realpath(os.path.dirname(__file__)), '..'))


def update_version():
    # gather information from git
    data = {
        "revision": subprocess.check_output(["git", "rev-parse", "HEAD"]).strip("\n"),
        "branch": subprocess.check_output(["git", "rev-parse", "--abbrev-ref", "HEAD"]).strip("\n"),
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