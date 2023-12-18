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
import sys
from docutils.parsers.rst import Directive, nodes
from docutils import statemachine
import gettext
from settings import config, root_dir

kwargs = {}
if sys.version_info[0] < 3:
    kwargs['unicode'] = True

gettext.install('messages', **kwargs)


class ApiDocDirective(Directive):
    """
    reStructuredText directive for retrieving information from the source code documentation.

    .. api-doc:: <widget-name> <doc part>

    @author Tobias Bräutigam
    @since 0.10.0
    """
    required_arguments = 1
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {}
    has_content = False

    locale = 'en'
    part_translations = {}

    def init_part_translations(self):
        self.part_translations = {
            'since': _("Available since"),
            'author': _('Author')
        }

    def init_locale(self):
        self.locale = self.state.document.settings.env.config.language
        t = gettext.translation('messages', localedir=os.path.join(root_dir, config.get("DEFAULT", "locale")), languages=[self.locale])
        t.install(**kwargs)

        self.init_part_translations()

    def normalize_part(self, name):
        return self.part_translations[name] if name in self.part_translations else name

    def run(self):
        self.init_locale()

        widget_name = self.arguments[0]

        if len(self.arguments) <= 1 or self.arguments[1] == "all":
            doc_parts = ['since', 'author']
        else:
            doc_parts = [self.arguments[1]]

        parts = widget_name.split(".")
        widget_path = None
        if len(parts) > 1:
            widget_path = os.path.join(config.get("DEFAULT", "source-path"), "%s.js" % os.sep.join(parts))
            print(widget_path)

        if widget_path is None or not os.path.exists(widget_path):
            # find widget
            widget_path = os.path.join(config.get("manual-en", "widgets-path"), "%s.js" % widget_name)

        if not os.path.exists(widget_path):
            # try parser
            widget_path = os.path.join(config.get("manual-en", "parsers-path"), "%s.js" % widget_name)

        if not os.path.exists(widget_path):
            # try plugin
            widget_path = os.path.join(config.get("manual-en", "plugins-path"), "%s.js" % widget_name)

        if not os.path.exists(widget_path):
            print("No widget or plugin named '%s' found at '%s'" % (widget_name, widget_path))
            return []
        else:
            print("using source from: %s" % widget_path)

        content = {}
        with open(widget_path, "rb") as f:

            for line in f:
                for doc_part in doc_parts:
                    match = re.search("^\s+\*\s+@%s\s(.+)$" % doc_part, line.decode('utf-8').rstrip())
                    if match:
                        content[doc_part] = match.group(1)

        res_nodes = []
        if len(content):
            cnode = nodes.Element()  # anonymous container for parsing
            list = ['| **%s**: %s' % (self.normalize_part(part), content) for part, content in content.items()]
            list.append('|')
            sl = statemachine.StringList(list, source='')
            self.state.nested_parse(sl, self.content_offset, cnode)
            node = nodes.line('', '', *cnode)
            res_nodes.append(node)

        return res_nodes
