#!/usr/bin/python
# -*- coding: utf-8 -*-

import subprocess
import datetime
import json
import os
import sys
import re

root_dir = os.path.abspath(os.path.join(os.path.realpath(os.path.dirname(__file__)), '..'))


def update_version(service_worker_cache=False):
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

    if service_worker_cache is True:
        regex = re.compile("var CACHE = \"(.+)\";", re.IGNORECASE)
        with open(os.path.join(root_dir, "source", "ServiceWorker.js"), 'r+') as f:
            content = f.read()
            content = regex.sub("var CACHE = \"%s\";" % data['revision'], content)
            f.seek(0)
            f.write(content)

if __name__ == '__main__':
    update_version(len(sys.argv) == 2 and sys.argv[1] == "worker")
