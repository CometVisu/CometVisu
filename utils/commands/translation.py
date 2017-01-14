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
import sh
from . import Command

class TranslationHandler(Command):

    def __init__(self):
        super(TranslationHandler, self).__init__()
        self.log = logging.getLogger("doc")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def _run(self):
        pygettext = sh.Command("pygettext")
        pygettext("-d", "messages", "-p", self.config.get("DEFAULT", "locale"), "utils/docutils/directives/*.py",
                  "utils/commands/*.py",
                  _out=self.process_output, _err=self.process_output)

    def run(self, args):
        self._run()
