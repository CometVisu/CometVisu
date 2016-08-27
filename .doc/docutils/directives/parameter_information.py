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

from docutils import statemachine

from docutils.parsers.rst import directives
from common import BaseXsdDirective


class ParameterInformationDirective(BaseXsdDirective):
    """
    reStructuredText directive for parameter information. Extracts information for the given element from
    the visu_config.xsd file and adds it to the document.

    ..parameter_information:: <element-name>

    @author Tobias Bräutigam
    @since 0.10.0
    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}
    has_content = False

    def run(self):
        self.init_locale()
        table_node = self.generate_table(self.arguments[0], include_name=True)
        if table_node is None:
            return []

        self.add_name(table_node)
        return [table_node]


directives.register_directive("parameter_information", ParameterInformationDirective)