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
import sys
import json
from os import path
from argparse import ArgumentParser
from commands.doc import DocGenerator
from commands.scaffolding import Scaffolder
from commands.translation import TranslationHandler

root_dir = path.abspath(path.join(path.realpath(path.dirname(__file__)), '..'))

with open(path.join(root_dir, "package.json")) as data_file:
    data = json.load(data_file)
    VERSION = data['version']


def main():
    commands = {
        'doc': DocGenerator,
        'scaffold': Scaffolder,
        'translation': TranslationHandler
    }

    parser = ArgumentParser(usage="%(prog)s - CometVisu documentation helper commands")
    parser.add_argument("--version", action='version', version=VERSION)

    parser.add_argument('action', type=str, help='action (%s)' % ", ".join(commands.keys()), nargs='?')
    options, unknown = parser.parse_known_args()

    if options.action is None:
        print("please provide an action (%s)" % ",".join(commands.keys()))
        parser.print_help()

    elif options.action not in commands:
        print("action '%s' is not available" % options.action)
        exit(1)

    else:
        handler = commands[options.action]()
        handler.run(sys.argv[2:])

        create_widget_skeleton(options.language, options.widget, force=options.force)
    elif options.action == "update-translation":
        # pygettext -d messages -p locale/ .doc/docutils/directives/*.py
        pygettext("-d", "messages", "-p", config.get("main", "locale"), ".doc/docutils/directives/*.py", _out=process_output, _err=process_output)
    else:
        log.error("action '%s' is not available" % options.action)
        exit(1)

if __name__ == '__main__':
    main()