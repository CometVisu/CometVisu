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
import json
import logging
import sh
from argparse import ArgumentParser

grunt = sh.Command("grunt")
sphinx_build = sh.Command("sphinx-build")

log = logging.getLogger("doc")
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
source_type = "rst"
target_type = "html"

root_dir = os.path.abspath(os.path.join(os.path.realpath(os.path.dirname(__file__)), '..'))

with open(os.path.join(root_dir, "package.json")) as data_file:
    data = json.load(data_file)
    VERSION = data['version']


def generate_manual(language, target_dir, browser):
    # check if sources exist for this language
    source_dir = os.path.join(root_dir, "doc", language, "manual")
    if target_dir is None:
        target_dir = os.path.join(root_dir, "doc", language, "manual", target_type)
    else:
        target_dir = os.path.join(root_dir, target_dir)

    if not os.path.exists(source_dir):
        log.error("no sources found for manual in language '%s'" % language)
        exit(1)

    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    # first run generates the widget-example configs
    print(sphinx_build("-b", target_type, source_dir, target_dir))

    # generate the screenshots
    print(grunt("screenshots", "--subDir=manual", "--browserName=%s" % browser))

    # 2dn run with access to the generated screenshots
    print(sphinx_build("-b", target_type, source_dir, target_dir))


def create_widget_skeleton(language, widget_name, force=False):
    template = os.path.join(root_dir, "doc", "manual", "_templates", language, "widget-template.rst")
    if not os.path.exists(template):
        log.error("widget template does language '%s' not found" % language)
        exit(1)

    widgets = []
    for file in os.listdir(os.path.join("src", "structure", "pure")):
        if file.endswith(".js") and not file.startswith("_"):
            # this is a widget
            found_widget = os.path.splitext(file)[0]
            if widget_name == "ALL" or widget_name.lower() == found_widget.lower():
                widgets.append(found_widget)

    if len(widgets) == 0:
        log.error("widget '%s' does not exist" % widget_name)
        exit(1)

    if len(widgets) > 1:
        # do not allow forced overriding of multiple widgets, too dangerous
        force = False

    for widget_name in widgets:
        print("Generating doc source for '%s' widget in language '%s'" % (widget_name, language))
        target = os.path.join(root_dir, "doc", "manual", language, "config", "widgets", widget_name.lower(), "index.rst")

        if force is False and os.path.exists(target):
            log.error("widget documentation already exists for widget '%s' in language '%s'" % (widget_name, language))
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


def main():
    parser = ArgumentParser(usage="%(prog)s - CometVisu documentation generator")
    parser.add_argument("--version", action='version', version=VERSION)

    parser.add_argument("--force", "-f", dest="force", action='store_true', help="force existing docs to be overridden")

    parser.add_argument("--language", "-l", dest="language", default="de",
                        help="Language of documentation (only available for manual)")

    parser.add_argument("--target", dest="target",
                        help="Target dir for generation")

    parser.add_argument("--widget", "-w", dest="widget",
                        help="Name of the widget to generate docs for")

    parser.add_argument("--browser", "-b", dest="browser", default="chrome",
                        help="Browser used for screenshot generation")

    parser.add_argument('--doc-type', "-dt", dest="doc", default="manual",
                        type=str, help='type of documentation to generate (manual, source)', nargs='?')

    parser.add_argument('action', type=str, help='what should I do?', nargs='?')
    options = parser.parse_args()

    if options.action is None:
        log.error("please provide an action (doc, create-widget-skeleton)")
        parser.print_help()

    elif options.action == "doc":

        if 'type' not in options or options.type == "manual":
            generate_manual(options.language, options.target, options.browser)
        elif options.type == "source":
            if options.target is not None:
                print(grunt("api-doc", "--subDir=jsdoc", "--browserName=%s" % options.browser, "--targetDir=%s" % options.target))
            else:
                print(grunt("api-doc", "--subDir=jsdoc", "--browserName=%s" % options.browser))
        else:
            log.error("generation of '%s' documentation is not available" % options.type)
            exit(1)
    elif options.action == "create-widget-skeleton":
        if 'widget' not in options:
            log.error("please provide a widget name" % options.type)
            exit(1)

        create_widget_skeleton(options.language, options.widget, force=options.force)
    else:
        log.error("action '%s' is not available" % options.action)
        exit(1)

if __name__ == '__main__':
    main()