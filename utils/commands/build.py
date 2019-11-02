#!/usr/bin/python
# -*- coding: utf-8 -*-

# copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
#
# This program is free software; you can redistribute it and/or modify it
# under the terms of the GNU General Public License as published by the Free
# Software Foundation; either version 3 of the License, or (at your option)
# any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA

import os
import re
import json
import rjsmin
import logging
from argparse import ArgumentParser

import shutil

from . import Command


class BuildHelper(Command):

    def __init__(self):
        super(BuildHelper, self).__init__()
        self.log = logging.getLogger("BuildHelper")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def build_plugins(self, build_dir="build"):
        if not os.path.exists(build_dir):
            print("Please run generate the build first")
            return
        p = re.compile("^qx.\$\$packageData\['\d+'\]=(.+);")
        scripts_reg = re.compile("[\w]+\.addScripts\(\[?([^\]\)]+)\]?,?(\[[^\]]\]+)?\)")
        for subdir, dirs, files in os.walk(os.path.join(build_dir, "cv")):
            for file in files:
                if file[-3:] != ".js":
                    continue
                # print(os.path.join(subdir, file))
                with open(os.path.join(subdir, file), 'r+') as f:
                    content = f.read()
                    if content.split("\n")[0] == "//PROCESSED":
                        # already processed
                        continue
                    data = p.findall(content)
                    if len(data) > 0:
                        package_data = json.loads(data[0])
                        first_resource = True
                        js_files = []
                        print(package_data['resources'])
                        for resource in package_data['resources']:
                            if resource.startswith("plugins/") and resource.split(".")[-1] == "js":
                                js_files.append(resource)
                        if len(js_files) > 0:
                            scripts_match = scripts_reg.findall(content)
                            if len(scripts_match) > 0:
                                # resolve variables
                                scripts = []
                                load_order = json.loads(scripts_match[0][1]) if len(scripts_match[0]) == 2  and scripts_match[0][1] else None
                                for var in scripts_match[0][0].split(","):
                                    var_match = re.search("%s=\'([^\']+)\'" % var, content)
                                    if var_match is not None:
                                        scripts.append(var_match.group(1))
                                loaded = []
                                if load_order is not None:
                                    for idx in load_order:
                                        script = scripts[idx]
                                        with open(os.path.join(build_dir, "resource", script), 'r') as fr:
                                            if first_resource is True:
                                                content = "//PROCESSED\n%s" % content
                                                first_resource = False
                                            content += " "+rjsmin.jsmin(fr.read().replace("\n", ""), keep_bang_comments=True)
                                        loaded.append(script)

                                # load the rest
                                for script in filter(lambda s: s not in loaded, scripts):
                                    with open(os.path.join(build_dir, "resource", script), 'r') as fr:
                                        if first_resource is True:
                                            content = "//PROCESSED\n%s" % content
                                            first_resource = False
                                        content += " "+rjsmin.jsmin(fr.read(), keep_bang_comments=True)

                        if first_resource is False:
                            # something has been added
                            f.seek(0)
                            f.truncate()
                            f.write(content)
                            print("%s has peen processed" % os.path.join(subdir, file))

    def update_paths(self, build_dir="build"):
        with open(os.path.join(build_dir, "editor", "text", "index.html"), "r+") as f:
            data = f.read()
            # change path to node_modules
            data = data.replace("../../../node_modules", "../../node_modules")
            # we want the min version
            data = data.replace("monaco-editor/dev/vs", "monaco-editor/min/vs")
            f.seek(0)
            f.write(data)
            f.truncate()

        # cleanup
        try:
            dev = os.path.join(build_dir, "node_modules", "monaco-editor", "dev")
            if os.path.exists(dev):
                shutil.rmtree(dev)
            maps = os.path.join(build_dir, "node_modules", "monaco-editor", "min-maps")
            if os.path.exists(maps):
                shutil.rmtree(maps)
            ts = os.path.join(build_dir, "node_modules", "monaco-editor", "monaco.d.ts")
            if os.path.exists(ts):
                os.unlink(ts)
        except Exception as e:
            print(str(e))

        # create config media + backup dir
        media = os.path.join(build_dir, "resource", "config", "media")
        if not os.path.exists(media):
            os.mkdir(media)

        backup = os.path.join(build_dir, "resource", "config", "backup")
        if not os.path.exists(backup):
            os.mkdir(backup)

    def run(self, args):
        parser = ArgumentParser(usage="%(prog)s - CometVisu build helper scrips")

        parser.add_argument("--build-plugins", "-bp", dest="build_plugins", action='store_true', help="include external libs in plugin parts")
        parser.add_argument("--update-paths", "-up", dest="update_paths", action='store_true', help="update some paths inside certain files")
        parser.add_argument("--build-dir", "-d", dest="build_dir", default="build", help="build dir")

        options = parser.parse_args(args)

        if options.build_plugins:
            self.build_plugins(options.build_dir)
        elif options.update_paths:
            self.update_paths(options.build_dir)
