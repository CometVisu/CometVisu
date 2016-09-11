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
import sh
import shutil
from argparse import ArgumentParser
from . import Command


class DocGenerator(Command):

    def __init__(self):
        super(DocGenerator, self).__init__()
        self.log = logging.getLogger("doc")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

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

        if not os.path.exists(source_dir):
            self.log.error("no sources found for manual (%s) in language '%s'" % (source_dir, language))
            exit(1)

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

        options = parser.parse_args(args)

        if 'doc' not in options or options.doc == "manual":
            self._run(options.language, options.target, options.browser, force=options.force, skip_screenshots=not options.complete)
        elif options.doc == "source":
            grunt = sh.Command("grunt")
            if options.target is not None:
                grunt("api-doc", "--subDir=jsdoc", "--browserName=%s" % options.browser, "--targetDir=%s" % options.target, _out=self.process_output, _err=self.process_output)
            else:
                grunt("api-doc", "--subDir=jsdoc", "--browserName=%s" % options.browser, _out=self.process_output, _err=self.process_output)
        else:
            self.log.error("generation of '%s' documentation is not available" % options.type)
            exit(1)