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

    def generate(self, language, widget_name, plugin_name, force=False):
        self.init_locale(language)
        section = "manual-%s" % language
        mode = 'widget'if widget_name else 'plugin'
        name = widget_name if widget_name else plugin_name
        widgets = []
        if widget_name:
            template = os.path.join(self.root_dir, self.config.get(section, "widget-template"))
            if not os.path.exists(template):
                self.log.error("widget template '%s' language '%s' not found" % (widget_name, language))
                exit(1)

            for file in os.listdir(self.config.get("manual-en", "widgets-path")):
                if file.endswith(".js") and not file.startswith("Abstract"):
                    # this is a widget
                    found_widget = os.path.splitext(file)[0]
                    if widget_name == "ALL" or widget_name.lower() == found_widget.lower():
                        widgets.append(found_widget)
        elif plugin_name:
            template = os.path.join(self.root_dir, self.config.get(section, "plugin-template"))
            if not os.path.exists(template):
                self.log.error("plugin template '%s' language '%s' not found" % (plugin_name, language))
                exit(1)

            plugin_dir = self.config.get("manual-en", "plugins-path")
            if plugin_name == 'ALL':
                widgets = [name for name in os.listdir(plugin_dir) if os.path.isdir(os.path.join(plugin_dir, name))]
            else:
                widgets = [name for name in os.listdir(plugin_dir)
                           if os.path.isdir(os.path.join(plugin_dir, name)) and name.lower() == plugin_name.lower()
                           ]

        if len(widgets) == 0:
            self.log.error("%s '%s' does not exist" % (mode, name))
            exit(1)

        if len(widgets) > 1:
            # do not allow forced overriding of multiple widgets, too dangerous
            force = False

        target_path = os.path.join(self.root_dir, self.config.get(section, "%ss" % mode))

        for widget_name in widgets:
            print("Generating doc source for '%s' %s in language '%s'" % (widget_name, mode, language))
            target = os.path.join(target_path, widget_name.lower(), "index.rst")

            if force is False and os.path.exists(target):
                self.log.error("%s documentation already exists for '%s' in language '%s'" % (mode, widget_name, language))
                continue

            headline = _("The %s widget") % widget_name if mode == 'widget' else _("The %s plugin") % widget_name
            headline_mark = u"=" * len(headline)
            headline += u"\n%s" % headline_mark
            headline = headline.encode('utf-8')

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

        parser.add_argument("--plugin", "-p", dest="plugin",
                            help="Name of the plugin to generate docs for")

        options = parser.parse_args(args)

        if 'widget' not in options and 'plugin' not in options:
            self.log.error("please provide a widget or plugin name")
            print(options)
            exit(1)

        if 'widget' in options and options.widget is not None and \
                        'plugin' in options and options.plugin is not None:
            self.log.error("please provide either a widget or a plugin name")
            exit(1)

        self.generate(options.language,
                  options.widget if 'widget' in options else None,
                  options.plugin if 'plugin' in options else None,
                  force=options.force)