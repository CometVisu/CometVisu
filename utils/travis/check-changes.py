#!/usr/bin/env python

import sys
import sh
import json
import requests
import re
import os
from datetime import datetime

source_dir = '%s/source' % os.environ['TRAVIS_BUILD_DIR']
client_dir = '%s/client/source' % os.environ['TRAVIS_BUILD_DIR']
script_dir = os.path.dirname(os.path.realpath(__file__))

def check_for_changes(type = 'cv'):
    if type not in ['cv', 'client']:
        print(0)
        return
    with open('%s/bintray-deploy.json' % script_dir, 'r') as f:
        bintray_config = json.load(f)

    bintray_version = bintray_config['version']['name']
    base_url = 'https://api.bintray.com/packages/%s/%s/%s' % (
        bintray_config['package']['subject'],
        bintray_config['package']['repo'],
        bintray_config['package']['name']
    )
    r = requests.get('%s/versions/%s/files?include_unpublished=1' % (base_url, bintray_version), auth=(os.environ['BINTRAY_USER'], os.environ['BINTRAY_KEY']))
    newest_build_time = None
    if r.status_code == 200:
        for file in r.json():
            build_time = datetime.strptime(upper(file['created']), '%Y-%m-%dT%H:%M:%S.%f%Z')
            if type == 'cv' and file['name'][0:10] == 'CometVisu-':
                if newest_build_time is None or newest_build_time < build_time:
                    newest_build_time = build_time
            elif type == 'client' and 'CometVisuClient' in file['name']:
                if newest_build_time is None or newest_build_time < build_time:
                    newest_build_time = build_time

    build = True

    if newest_build_time is not None:
        raw = sh.git('--no-pager', 'log', '--pretty=format:', '--name-only', '--since="%s"' % newest_build_time, source_dir if type == 'cv' else client_dir)
        changed_files = [x.rstrip("\n") for x in raw if len(x.rstrip("\n")) > 0]
        build = len(changed_files) > 0

    print(1 if build else 0)

if __name__ == '__main__':
    check_for_changes(sys.argv[1] if len(sys.argv) > 1 else "cv")
