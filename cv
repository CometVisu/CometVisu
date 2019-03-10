#!/usr/bin/env python
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
import sys
import json
import os
from argparse import ArgumentParser
from utils.commands.doc import DocGenerator
from utils.commands.scaffolding import Scaffolder
from utils.commands.translation import TranslationHandler
from utils.commands.sitemaps import SitemapGenerator
from utils.commands.build import BuildHelper

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "package.json")) as data_file:
    data = json.load(data_file)
    VERSION = data['version']


def main():
    commands = {
        'doc': DocGenerator,
        'scaffold': Scaffolder,
        'translation': TranslationHandler,
        'sitemap': SitemapGenerator,
        'build': BuildHelper
    }
    if sys.argv[1] in commands:
        handler = commands[sys.argv[1]]()
        handler.run(sys.argv[2:])
    else:
        parser = ArgumentParser(usage="%(prog)s - CometVisu documentation helper commands")
        parser.add_argument("--version", action='version', version=VERSION)

        parser.add_argument('action', type=str, help='action (%s)' % ", ".join(commands.keys()), nargs='?')
        options, unknown = parser.parse_known_args()

        if options.action is None:
            print("please provide an action (%s)" % ",".join(commands.keys()))
            parser.print_help()

        elif options.action not in commands:
            print("action '%s' is not available" % options.action)
            sys.exit(1)

        else:
            handler = commands[options.action]()
            handler.run(sys.argv[2:])

if __name__ == '__main__':
    main()