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
import ConfigParser

import sh
import shutil
import json
import sys
import re
from argparse import ArgumentParser
from . import Command
from scaffolding import Scaffolder

class DocParser:
    """
    Parse an existing rst file, recognize placeholder section and allow
    those sections to be replaced with new content
    """

    def __init__(self, widget=None, plugin=None):
        self.config = ConfigParser.ConfigParser()
        self.config.read(os.path.join('utils', 'config.ini'))
        self.sections = {}
        self.lines = []
        self.replacements = {}

        if widget is not None:
            self.file = os.path.join(self.config.get("manual-en", "widgets"), widget.lower(), "index.rst")
            if not os.path.exists(self.file):
                if os.path.exists(self.config.get("manual-en", "widget-template")):
                    # fallback to template
                    scaffolder = Scaffolder()
                    scaffolder.generate("en", widget, None)
            self._parse(self.file)
        elif plugin is not None:
            self.file = os.path.join(self.config.get("manual-en", "plugins"), plugin.lower(), "index.rst")
            if not os.path.exists(self.file):
                if os.path.exists(self.config.get("manual-en", "plugin-template")):
                    # fallback to template
                    scaffolder = Scaffolder()
                    scaffolder.generate("en", None, plugin)
            self._parse(self.file)

    def _parse(self, filename):
        with open(filename) as f:
            current_section = None
            # find sections
            for line in f.readlines():
                match = re.match("^\.\. #{3}(START|END)-([A-Z\-]+)#{3}", line)
                if match:
                    section_name = match.group(2)
                    if match.group(1) == "START":
                        current_section = section_name
                        self.lines.append("##########%s" % section_name)
                    else:
                        current_section = None
                    if section_name not in self.sections:
                        self.sections[section_name] = []
                else:
                    if current_section is not None:
                        self.sections[current_section].append(line)
                    else:
                        self.lines.append(line)

    def replace_section(self, name, content):
        self.replacements[name] = content

    def tostring(self):
        content = []
        for line in self.lines:
            if line.startswith("##########"):
                # replace with section content
                section_name = line[10:]
                content.append(".. ###START-%s### Please do not change the following content. Changes will be overwritten\n\n" % section_name)
                if section_name in self.replacements:
                    content.extend(self.replacements[section_name])
                content.append("\n.. ###END-%s###\n" % section_name)
            else:
                content.append(line)
        return "".join(content)

    def write(self):
        with open(self.file, "w") as f:
            f.write(self.tostring())


class DocGenerator(Command):
    _source_version = None

    def __init__(self):
        super(DocGenerator, self).__init__()
        self.log = logging.getLogger("doc")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def _get_doc_version(self):
        git = sh.Command("git")
        branch = git("rev-parse", "--abbrev-ref", "HEAD").strip() if os.environ.get('TRAVIS_BRANCH') is None \
            else os.environ.get('TRAVIS_BRANCH')

        if branch == "develop":
            return self.config.get("DEFAULT", "develop-version-mapping")
        else:
            # read version
            return self._get_source_version()

    def _get_source_version(self):
        if self._source_version is None:
            with open("package.json") as data_file:
                data = json.load(data_file)
                self._source_version = data['version']
        return self._source_version

    def _run(self, language, target_dir, browser, skip_screenshots=True, force=False):

        sphinx_build = sh.Command("sphinx-build")

        # check if sources exist for this language
        section = "manual-%s" % language
        target_type = self.config.get(section, "target-type")

        source_dir = os.path.join(self.root_dir, self.config.get(section, "source"))
        if target_dir is None:
            target_dir = os.path.join(self.root_dir, self.config.get(section, "target"))
        else:
            target_dir = os.path.join(self.root_dir, target_dir)
        target_dir = target_dir.replace("<version>", self._get_doc_version())
        print("generating doc to %s" % target_dir)

        if not os.path.exists(source_dir):
            self.log.error("no sources found for manual (%s) in language '%s'" % (source_dir, language))
            sys.exit(1)

        if force and os.path.exists(target_dir):
            # delete target dir
            print("deleting old content in '%s'" % target_dir)
            shutil.rmtree(target_dir)

        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        # first run generates the widget-example configs
        sphinx_build("-b", target_type, source_dir, target_dir, _out=self.process_output, _err=self.process_output)

        if not skip_screenshots:
            grunt = sh.Command("grunt")
            # generate the screenshots
            grunt("screenshots", "--subDir=manual", "--browserName=%s" % browser, _out=self.process_output, _err=self.process_output)

            # 2dn run with access to the generated screenshots
            sphinx_build("-b", target_type, source_dir, target_dir, _out=self.process_output, _err=self.process_output)

    def from_source(self, path, plugin=False):
        """
        Generates the english manual from the source code comments (api documentation)
        """
        # traverse through the widgets
        root, dirs, files = os.walk(path).next()
        source_files = []
        if plugin:
            for dir in dirs:
                source_files.append((dir, os.path.join(root, dir, "structure_plugin.js")))
        else:
            for file in files:
                if file != "_common.js":
                    source_files.append((file[0:-3], os.path.join(root, file)))

        for name, file in source_files:

            with open(file) as f:
                content = {
                    "WIDGET-DESCRIPTION": [],
                    "WIDGET-EXAMPLES": []
                }
                reading = False
                code_block = False
                example = False
                section = "WIDGET-DESCRIPTION"
                for line in f.readlines():
                    if line.startswith("define"):
                        # source code starts here -> do not proceed
                        break

                    if re.match("^\s*/\*\*\s*$", line):
                        reading = True

                    elif reading:
                        if re.match("^[\s*]*\*/\s*$", line):
                            break

                        match = re.match("\s*\*?\s(.+)", line)
                        if match:
                            indent = ""
                            if match.group(1)[0:1] == "@":
                                if match.group(1)[1:15] == "widget_example":
                                    section = "WIDGET-EXAMPLES"
                                    content[section].append(".. widget-example::\n\n    %s\n" % match.group(1)[16:])
                                elif match.group(1)[1:8] == "example":
                                    section = "WIDGET-DESCRIPTION"
                                    content[section].append(".. code-block:: xml\n")
                                    caption = re.match("\s*<caption>([^<]+)</caption>", match.group(1)[9:])
                                    if caption:
                                        content[section].append("    :caption: %s\n" % caption.group(1))
                                    content[section].append("\n")
                                    example = True
                                else:
                                    section = "WIDGET-DESCRIPTION"
                                continue

                            line_content = match.group(1)
                            if match.group(1).strip() == "*":
                                line_content = ""
                                example = False

                            if section == "WIDGET-EXAMPLES" or example:
                                indent = "    "
                            else:
                                if re.match("\s*```\s*$", line_content):
                                    if not code_block:
                                        line_content = "\n.. code-block:: xml\n"
                                        code_block = True
                                    else:
                                        line_content = "\n"
                                        code_block = False
                                elif code_block:
                                    indent = "    "
                                elif re.match("\s*TODO:?\s(.*)$", line_content):
                                    todo = re.match("\s*TODO:?\s(.*)$", line_content)
                                    line_content = ".. TODO::\n\n    %s\n" % todo.group(1)

                            content[section].append("%s%s\n" % (indent, line_content))

            if (len("".join(x.strip() for x in content['WIDGET-DESCRIPTION'])) == 0 or
                    content['WIDGET-DESCRIPTION'][0].startswith(".. TODO::\n\n    complete docs")):
                if len(content['WIDGET-EXAMPLES']) == 0:
                    continue
                else:
                    content['WIDGET-DESCRIPTION'].insert(0, ".. TODO::\n\n    add widget description\n")

            parser = DocParser(widget=name) if not plugin else DocParser(plugin=name)
            for section in content:
                parser.replace_section(section, content[section])

            parser.write()
            # print(file)
            # print(content)
            #print(parser.tostring())

    def run(self, args):
        parser = ArgumentParser(usage="%(prog)s - CometVisu documentation generator")

        parser.add_argument("--force", "-f", dest="force", action='store_true', help="force existing docs to be overridden")

        parser.add_argument("--complete", "-c", dest="complete", action='store_true', help="Complete run: generate docs + screenshots")

        parser.add_argument("--language", "-l", dest="language", default="de",
                            help="Language of documentation (only available for manual)")

        parser.add_argument("--target", dest="target",
                            help="Target dir for generation")

        parser.add_argument("--browser", "-b", dest="browser", default="chrome",
                            help="Browser used for screenshot generation")

        parser.add_argument('--doc-type', "-dt", dest="doc", default="manual",
                            type=str, help='type of documentation to generate (manual, source)', nargs='?')

        parser.add_argument("--from-source", dest="from_source", action="store_true", help="generate english manual from source comments")

        options = parser.parse_args(args)

        if options.from_source:
            #self.from_source(os.path.join("src", "structure", "pure"))
            self.from_source(os.path.join("src", "plugins"), plugin=True)

        elif 'doc' not in options or options.doc == "manual":
            self._run(options.language, options.target, options.browser, force=options.force, skip_screenshots=not options.complete)
            sys.exit(0)

        elif options.doc == "source":
            grunt = sh.Command("grunt")
            if options.target is not None:
                grunt("api-doc", "--subDir=jsdoc", "--browserName=%s" % options.browser, "--targetDir=%s" % options.target, _out=self.process_output, _err=self.process_output)
            else:
                target_dir = self.config.get("api", "target").replace("<version>", self._get_doc_version())
                grunt("api-doc", "--subDir=jsdoc", "--browserName=%s" % options.browser, "--targetDir=%s" % target_dir, _out=self.process_output, _err=self.process_output)
        else:
            self.log.error("generation of '%s' documentation is not available" % options.type)
            sys.exit(1)
