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

import logging
import os
import fnmatch
import time
from . import Command


class SitemapGenerator(Command):

    def __init__(self):
        super(SitemapGenerator, self).__init__()
        self.log = logging.getLogger("sitemap")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def _run(self):
        map = '<?xml version="1.0" encoding="UTF-8"?>\n\
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 \
http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" \
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

        path = os.path.join(self.root_dir, self.config.get("sitemap", "subdir"))
        files = [os.path.join(dirpath.replace(path, "")[1:], f)
                 for dirpath, dirnames, files in os.walk(path)
                 for f in fnmatch.filter(files, '*.html')]

        for file in files:
            modtime = os.path.getmtime(os.path.join(path, file))
            iso_time = time.strftime("%Y-%m-%d", time.localtime(modtime))
            map += '  <url>\n' \
                   '    <loc>%s%s</loc>\n' \
                   '    <lastmod>%s</lastmod>\n' \
                   '    <priority>%s</priority>\n' \
                   '  </url>\n' % (
                       self.config.get("sitemap", "base"),
                       file,
                       iso_time,
                       self.config.get("sitemap", "prio")
                   )
        map += "</urlset>"
        with open(os.path.join(self.root_dir, self.config.get("sitemap", "file")), 'w') as f:
            f.write(map)

    def run(self, args):
        self._run()
