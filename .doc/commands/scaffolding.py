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
import logging
from argparse import ArgumentParser
from . import Command


class Scaffolder(Command):

    def __init__(self):
        super(Scaffolder, self).__init__()
        self.log = logging.getLogger("scaffolder")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def _run(self, language, widget_name, force=False):
        section = "manual-%s" % language
        template = os.path.join(self.root_dir, self.config.get(section, "widget-template"))
        if not os.path.exists(template):
            self.log.error("widget template '%s' language '%s' not found" % (widget_name,language))
            exit(1)

        widgets = []
        for file in os.listdir(os.path.join("src", "structure", "pure")):
            if file.endswith(".js") and not file.startswith("_"):
                # this is a widget
                found_widget = os.path.splitext(file)[0]
                if widget_name == "ALL" or widget_name.lower() == found_widget.lower():
                    widgets.append(found_widget)

        if len(widgets) == 0:
            self.log.error("widget '%s' does not exist" % widget_name)
            exit(1)

        if len(widgets) > 1:
            # do not allow forced overriding of multiple widgets, too dangerous
            force = False

        for widget_name in widgets:
            print("Generating doc source for '%s' widget in language '%s'" % (widget_name, language))
            target = os.path.join(self.root_dir, self.config.get(section, "widgets"), widget_name.lower(), "index.rst")

            if force is False and os.path.exists(target):
                self.log.error("widget documentation already exists for widget '%s' in language '%s'" % (widget_name, language))
                continue

            headline = "Das %s Widget" % widget_name
            headline_mark = "=" * len(headline)
            headline += "\n%s" % headline_mark

            with open(template, "r") as f:
                source = f.read()
                source = source.replace("%%%HEADLINE%%%", headline)
                source = source.replace("%%%WIDGET_NAME%%%", widget_name)
                source = source.replace("%%%WIDGET_NAME_LOWER%%%", widget_name.lower())

                if not os.path.exists(target):
                    os.makedirs(os.path.dirname(target))

                with open(target, "w") as ft:
                    ft.write(source)

    def run(self, args):
        parser = ArgumentParser(usage="%(prog)s - CometVisu documentation scaffolder")

        parser.add_argument("--force", "-f", dest="force", action='store_true', help="force existing docs to be overridden")

        parser.add_argument("--language", "-l", dest="language", default="de",
                            help="Language the widget docs should be generated for")

        parser.add_argument("--widget", "-w", dest="widget",
                            help="Name of the widget to generate docs for")

        options = parser.parse_args(args)

        if 'widget' not in options:
            self.log.error("please provide a widget name" % options.type)
            exit(1)

        self._run(options.language, options.widget, force=options.force)