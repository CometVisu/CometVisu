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
from docutils.parsers.rst import Directive
from os import path
from helper.schema import *
import gettext
gettext.install('messages', localedir='locale')

type_mapping = {
    'boolean': "true %s false" % _('or'),
    'string': _('string'),
    'decimal': _('decimal')
}

schema = Schema(path.join("src", "visu_config.xsd"))


class BaseDirective(Directive):
    locale = 'en'

    def init_locale(self):
        #locale = self.state_machine.document.settings.language_code
        # this is a hack, but as language_code settings returns 'en' its the only known way to get the locale
        self.locale = self.state_machine.document.settings._source.split(path.sep +"manual" + path.sep, 1)[1].split(path.sep)[0]
        t = gettext.translation('messages', localedir='locale', languages=[self.locale])
        t.install()


class BaseXsdDirective(BaseDirective):

    def get_cell_data(self, content):
        return 0, 0, 0, statemachine.StringList( content.splitlines())

    def normalize_values(self, values):
        if len(values) <= 1:
            return (" %s " % _("or")).join(values)
        else:
            return " ".join([", ".join(values[0:-1]), _("or"), values[-1]])

    def normalize_type(self, type):
        if type[0:4] == "xsd:":
            type = type[4:]
        return type_mapping[type] if type in type_mapping else type

    def generate_table(self, element_name):
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

        if len(table_body) == 0:
            return None

        table_head = [[self.get_cell_data(_('Name')), self.get_cell_data(_('Type')), self.get_cell_data(_('Description'))]]
        table = ([20, 20, 60], table_head, table_body)

        table_node = self.state.build_table(table, self.content_offset)
        table_node['classes'] += self.options.get('class', [])

        return table_node
