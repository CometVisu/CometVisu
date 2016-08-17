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
from helper.schema import *
from docutils.parsers.rst import directives, Directive
from common import BaseDirective
from os import path
import gettext
gettext.install('cv', localedir='locale')

schema = Schema(path.join("src", "visu_config.xsd"))


# TODO: translation (gettext)
# TODO: possibility to map attribute names to links
# TODO: read + display allowed elements, link to external pages (or include page with detailed element description)


type_mapping = {
    'boolean': 'true %s false' % _("or"),
    'string': _("string")
}

class ElementsInformationDirective(BaseDirective):
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

    def get_cell_data(self, content):
        return 0, 0, 0, statemachine.StringList( content.splitlines())

    def normalize_type(self, type):
        if type[0:4] == "xsd:":
            type = type[4:]
        return type_mapping[type] if type in type_mapping else type

    def run(self):
        self.init_locale()

        element_name = self.arguments[0]

        table_body = []
        for attr in schema.get_widget_attributes(element_name):
            if 'name' in attr.attrib:
                name = attr.get('name')
                atype, values = schema.get_attribute_type(attr)
                description = schema.get_node_documentation(attr, self.locale)
                if description is not None:
                    description = description.text
                else:
                    description = ''
            elif 'ref' in attr.attrib:
                name = attr.get('ref')
                type_def = schema.get_attribute(name)
                atype, values = schema.get_attribute_type(type_def)
                description = schema.get_node_documentation(type_def, self.locale)
                if description is not None:
                    description = description.text
                else:
                    description = ''

            if attr.get('use', 'optional') == "required":
                name += "*"

            atype = self.normalize_type(atype) if len(values) == 0 else self.normalize_values(values)
            row = [self.get_cell_data(name), self.get_cell_data(atype), self.get_cell_data(description)]
            table_body.append(row)

        table_head = [[self.get_cell_data('Name'), self.get_cell_data('Type'), self.get_cell_data('Description')]]
        table = ([20, 20, 60], table_head, table_body)

        table_node = self.state.build_table(table, self.content_offset)
        table_node['classes'] += self.options.get('class', [])
        self.add_name(table_node)

        return [table_node]


directives.register_directive("elements_information", ElementsInformationDirective)