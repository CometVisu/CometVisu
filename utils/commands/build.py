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
from . import Command


class BuildHelper(Command):

    def __init__(self):
        super(BuildHelper, self).__init__()
        self.log = logging.getLogger("BuildHelper")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def build_plugins(self):
        if not os.path.exists("build"):
            print("Please run generate the build first")
            return
        p = re.compile("^qx.\$\$packageData\['\d+'\]=(.+);")
        for subdir, dirs, files in os.walk(os.path.join("build", "script")):
            for file in files:
                # print(os.path.join(subdir, file))
                with open(os.path.join(subdir, file), 'r+') as f:
                    content = f.read()
                    if content.split("\n")[0] == "//PROCESSED":
                        # already processed
                        continue
                    data = p.findall(content)
                    # print(data)
                    if len(data) > 0:
                        package_data = json.loads(data[0])
                        first_resource = True
                        #print(package_data['resources'])
                        for resource in package_data['resources']:
                            if resource.startswith("plugins/") and resource.split(".")[-1] == "js":
                                #print(os.path.join("build", "resource", resource))
                                with open(os.path.join("build", "resource", resource), 'r') as fr:
                                    if first_resource is True:
                                        content = "//PROCESSED\n%s" % content
                                        #content += "(function() {"
                                        first_resource = False
                                    content += " "+rjsmin.jsmin(fr.read().replace("\n", ""), keep_bang_comments=True)
                        if first_resource is False:
                            # something has been added
                            #content += "})();"
                            f.seek(0)
                            f.truncate()
                            f.write(content)
                            print("%s has peen processed" % os.path.join(subdir, file))

    def run(self, args):
        parser = ArgumentParser(usage="%(prog)s - CometVisu build helper scrips")

        parser.add_argument("--build-plugins", "-bp", dest="build_plugins", action='store_true', help="include external libs in plugin parts")

        options = parser.parse_args(args)

        if options.build_plugins:
            self.build_plugins()