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

from docutils import nodes
from helper.schema import *
from docutils.parsers.rst import directives
from common import BaseXsdDirective, schema
import gettext
gettext.install('cv', localedir='locale')

# TODO: possibility to map attribute names to links
# TODO: read + display allowed elements, link to external pages (or include page with detailed element description)


class ElementsInformationDirective(BaseXsdDirective):
    """
    reStructuredText directive for information about allowed child elements. Extracts information for the given element from
    the visu_config.xsd file and adds it to the document.

    ..elements_information:: <element-name>

    @author Tobias Bräutigam
    @since 0.10.0
    """
    required_arguments = 1
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {}
    has_content = False

    def make_title(self, element):
        if element.get("name", None) is not None:
            name = element.get("name")
            if int(element.get("minOccurs")) > 0:
                name += "*"
            text_nodes, messages = self.state.inline_text(name,
                                                          self.lineno)
            title = nodes.title(name, '', *text_nodes)
        else:
            title = None
            messages = []
        return title, messages

    def run(self):
        self.init_locale()

        element_name = self.arguments[0]
        res_nodes = []

        for element in schema.get_widget_elements(element_name):
            title, messages = self.make_title(element)

            table_node = self.generate_table(element.get("name"))
            if table_node is not None:
                if title is not None:
                    table_node.insert(0, title)

                res_nodes.append(table_node)

        return res_nodes

directives.register_directive("elements_information", ElementsInformationDirective)