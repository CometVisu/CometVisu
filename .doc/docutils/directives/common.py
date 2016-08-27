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

from docutils import statemachine, nodes
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
        return 0, 0, self.content_offset, statemachine.StringList(content.splitlines())

    def normalize_values(self, values):
        if len(values) <= 1:
            return "*%s*" % ("* %s *" % _("or")).join(values)
        else:
            return " ".join(["*%s*" % "*, *".join(values[0:-1]), _("or"), "*%s*" % values[-1]])

    def normalize_type(self, type):
        if type[0:4] == "xsd:":
            type = type[4:]
        return type_mapping[type] if type in type_mapping else type

    def get_name(self, name):
        name = ":ref:`%s`" % name
        cnode = nodes.Element()  # anonymous container for parsing
        sl = statemachine.StringList([name], source='')
        self.state.nested_parse(sl, self.content_offset, cnode)
        return nodes.label(name, '', *cnode)

    def generate_table(self, element_name, include_name=False, mandatory=False):
        table_body=[]
        attributes = schema.get_widget_attributes(element_name)
        if include_name:
            rowspan = len(attributes)-1
        line = 0
        for attr in attributes:
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

            name = ":ref:`%s <%s>`" % (name, name)
            if attr.get('use', 'optional') == "required":
                name += " *"

            atype = self.normalize_type(atype) if len(values) == 0 else self.normalize_values(values)
            if include_name:
                if line == 0:
                    if mandatory:
                        element_name += "*"
                    row = [(rowspan, 0, 0, statemachine.StringList(element_name.splitlines())), self.get_cell_data(name), self.get_cell_data(atype), self.get_cell_data(description)]
                else:
                    row = [ None, self.get_cell_data(name), self.get_cell_data(atype), self.get_cell_data(description)]
            else:
                row = [self.get_cell_data(name), self.get_cell_data(atype), self.get_cell_data(description)]
            table_body.append(row)
            line += 1

        if len(table_body) == 0:
            return None

        if include_name:
            table_head = [[self.get_cell_data(_('Element')), self.get_cell_data(_('Name')), self.get_cell_data(_('Type')), self.get_cell_data(_('Description'))]]
            table = ([10, 15, 20, 55], table_head, table_body)
        else:
            table_head = [[self.get_cell_data(_('Name')), self.get_cell_data(_('Type')), self.get_cell_data(_('Description'))]]
            table = ([20, 20, 60], table_head, table_body)

        table_node = self.state.build_table(table, self.content_offset)
        table_node['classes'] += self.options.get('class', [])

        return table_node

    def generate_complex_table(self, element_name, include_name=False, mandatory=False,
                               table_body=None, sub_run=False, parent=None):
        """ needs to be fixed """
        if table_body is None:
            table_body = []

        if not element_name == "#text":
            attributes = schema.get_widget_attributes(element_name)
            elements = schema.get_widget_elements(element_name, locale=self.locale)
            if include_name:
                rowspan = len(attributes)-1

            line = 0
            for attr in attributes:
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

                name = ":ref:`%s <%s>`" % (name, name)
                if attr.get('use', 'optional') == "required":
                    name += " *"

                atype = self.normalize_type(atype) if len(values) == 0 else self.normalize_values(values)
                if include_name:
                    if line == 0:
                        element_title = element_name
                        if mandatory:
                            element_title += "*"
                        if parent:
                            element_title = "%s\n  * **%s**" % (parent, element_title)
                        row = [(rowspan, 0, 0,
                                statemachine.StringList(element_title.splitlines())),
                               self.get_cell_data(name),
                               self.get_cell_data(atype),
                               self.get_cell_data(description)
                               ]
                    else:
                        row = [ None, self.get_cell_data(name), self.get_cell_data(atype), self.get_cell_data(description)]
                else:
                    row = [self.get_cell_data(name), self.get_cell_data(atype), self.get_cell_data(description)]
                table_body.append(row)
                line += 1

            for sub_element in elements:
                if not isinstance(sub_element, tuple):
                    name = sub_element.get("name")
                    mandatory = sub_element.get("minOccurs") is not None and int(sub_element.get("minOccurs")) > 0
                    if parent is not None:
                        sub_parent = "%s\n * %s" % (parent, element_name)
                    else:
                        sub_parent = element_name
                    self.generate_complex_table(name, include_name=include_name,
                                                mandatory=mandatory, table_body=table_body,
                                                sub_run=True, parent=sub_parent)
                else:
                    (sub_element, atype, doc) = sub_element
                    indent = 2 if parent is not None else 1
                    element_title = "%s\n%s* **%s**" % (element_name, " " * indent, sub_element)
                    if parent:
                        element_title = "%s\n * %s" % (parent, element_title)

                    row = [ self.get_cell_data(element_title), self.get_cell_data(""), self.get_cell_data(self.normalize_type(atype)), self.get_cell_data(doc)]
                    table_body.append(row)
                    line += 1

        else:
            # text node
            if include_name:
                row = [self.get_cell_data(element_name), self.get_cell_data(""), self.get_cell_data(self.normalize_type("string")), self.get_cell_data("")]
            else:
                row = [self.get_cell_data(element_name), self.get_cell_data(self.normalize_type("string")), self.get_cell_data("")]
            table_body.append(row)

        if sub_run is False:
            if len(table_body) == 0:
                return None

            if include_name:
                table_head = [[self.get_cell_data(_('Structure')), self.get_cell_data(_('Name')), self.get_cell_data(_('Type')), self.get_cell_data(_('Description'))]]
                table = ([15, 15, 15, 55], table_head, table_body)
            else:
                table_head = [[self.get_cell_data(_('Name')), self.get_cell_data(_('Type')), self.get_cell_data(_('Description'))]]
                table = ([20, 20, 60], table_head, table_body)

            table_node = self.state.build_table(table, self.content_offset)
            table_node['classes'] += self.options.get('class', [])
            table_node['classes'] += ["schema-table"]

            return table_node