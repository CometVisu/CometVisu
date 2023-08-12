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
from helper.schema import *
import gettext
import sys
import re
import os
from settings import config, root_dir

kwargs = {}
if sys.version_info[0] < 3:
    kwargs['unicode'] = True

gettext.install('messages', **kwargs)

pure_schema = Schema(os.path.join(root_dir, config.get("DEFAULT", "schema-file")))
tile_schema = Schema(os.path.join(root_dir, config.get("tile", "schema-file")))


class BaseDirective(Directive):
    locale = 'en'
    type_mapping = {}

    def init_type_mapping(self):
        self.type_mapping = {
            'boolean': "*true* %s *false*" % _('or'),
            'string': _('string'),
            'decimal': _('decimal'),
            'uri': _('uri'),
            'addr': _('addr'),
            'nonNegativeInteger': _('nonNegativeInteger'),
            'dimension': _('dimension')
        }

    def init_locale(self):
        self.locale = self.state.document.settings.env.config.language
        t = gettext.translation('messages', localedir=os.path.join(root_dir, config.get("DEFAULT", "locale")), languages=[self.locale])
        t.install(**kwargs)

        self.init_type_mapping()


class BaseXsdDirective(BaseDirective):

    def get_cell_data(self, content):
        return 0, 0, self.content_offset, statemachine.StringList(content.splitlines())

    def normalize_values(self, values):
        if len(values) <= 1:
            res = "*%s*" % ("* %s *" % _("or")).join(values)
        else:
            res = " ".join(["*%s*" % "*, *".join(values[0:-1]), _("or"), "*%s*" % values[-1]])
        return res

    def normalize_type(self, type_name):
        if type_name is None:
            return ""
        if type_name[0:4] == "xsd:":
            type_name = type_name[4:]
        res = self.type_mapping[type_name] if type_name in self.type_mapping else type_name
        return res

    def get_name(self, name):
        name = ":ref:`%s`" % name
        cnode = nodes.Element()  # anonymous container for parsing
        sl = statemachine.StringList([name], source='')
        self.state.nested_parse(sl, self.content_offset, cnode)
        return nodes.label(name, '', *cnode)

    def generate_table(self, element_name, structure_name="pure", include_name=False, mandatory=False):
        table_body = []
        schema = tile_schema if structure_name == "tile" else pure_schema

        attributes = schema.get_widget_attributes(element_name)
        if include_name:
            rowspan = len(attributes)-1
        line = 0
        for attr in attributes:
            if 'name' in attr.attrib:
                name = attr.get('name')
                atype, values, enums, description = schema.get_attribute_type(attr, self.locale)
                if len(description) == 0 and enums is not None:
                    description = self.get_description(enums, schema)
            elif 'ref' in attr.attrib:
                name = attr.get('ref')
                type_def = schema.get_attribute(name)
                atype, values, enums, description = schema.get_attribute_type(type_def, self.locale)
                # check if there is some documentation here
                if len(description) == 0:
                    description = schema.get_node_documentation(attr, self.locale)
                    if description is not None:
                        description = re.sub("\n\s+", " ", description.text).strip()
                    elif enums is not None:
                        description = self.get_description(enums, schema)
                    else:
                        description = ''

            #name = ":ref:`%s <%s>`" % (name, name)
            if attr.get('use', 'optional') == "required":
                name = ":abbr:`%s(%s)`" % (name, _('mandatory'))

            atype = self.normalize_type(atype) if len(values) == 0 else self.normalize_values(values)
            if include_name:
                if line == 0:
                    if mandatory:
                        element_name = ":abbr:`%s(%s)`" % (element_name, _('mandatory'))

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
            table_head = [
                [self.get_cell_data(_('Element')), (0, 3, 0, statemachine.StringList(_('Attribute').splitlines())), None, None],
                [self.get_cell_data(''), self.get_cell_data(_('Name')), self.get_cell_data(_('Content')), self.get_cell_data(_('Description'))]
            ]
            table = ([10, 15, 20, 55], table_head, table_body)
        else:
            table_head = [
                [(0, 3, 0, statemachine.StringList(_('Attribute').splitlines())), None, None],
                [self.get_cell_data(_('Name')), self.get_cell_data(_('Content')), self.get_cell_data(_('Description'))]
            ]
            table = ([20, 20, 60], table_head, table_body)

        table_node = self.state.build_table(table, self.content_offset)
        table_node['classes'] += self.options.get('class', [])

        return table_node

    def get_description(self, enums, schema):
        tmp_doc = ""
        enum_doc_found = False
        for enum_node in enums:
            ed = schema.get_node_documentation(enum_node, self.locale)
            if ed is not None:
                enum_doc_found = True
                tmp_doc += "%s* *%s*: %s" % ("\n" if len(tmp_doc) else "", enum_node.get('value'), ed.text)
        if enum_doc_found:
            return tmp_doc
        else:
            return ""

    def generate_complex_table(self, element_name, structure_name="pure", include_name=False, mandatory=False, element_type=None,
                               table_body=None, sub_run=False, parent=None, node=None, depth=-1, level=0, exclude_attributes=[]):
        """ needs to be fixed """
        if table_body is None:
            table_body = []

        schema = tile_schema if structure_name == "tile" else pure_schema

        if not element_name == "#text":
            attributes = schema.get_widget_attributes(element_type if element_type is not None else element_name, type_node=node)
            elements = schema.get_widget_elements(element_type if element_type is not None else element_name, locale=self.locale)
            if include_name:
                rowspan = len(attributes)-1

            line = 0
            for attr in attributes:
                if 'name' in attr.attrib:
                    name = attr.get('name')
                    if name in exclude_attributes:
                        continue
                    atype, values, enums, description = schema.get_attribute_type(attr, self.locale)
                    if len(description) == 0 and enums is not None:
                        description = self.get_description(enums, schema)
                elif 'ref' in attr.attrib:
                    name = attr.get('ref')
                    if name in exclude_attributes:
                        continue
                    type_def = schema.get_attribute(name)
                    atype, values, enums, description = schema.get_attribute_type(type_def, self.locale)
                    if len(description) == 0:
                        description = schema.get_node_documentation(attr, self.locale)
                        if description is not None:
                            description = re.sub("\n\s+", " ", description.text).strip()
                        elif enums is not None:
                            description = self.get_description(enums, schema)
                        else:
                            description = ''

                #name = ":ref:`%s <%s>`" % (name, name)
                if attr.get('use', 'optional') == "required":
                    name = ":abbr:`%s (%s)`" % (name, _('mandatory'))

                atype = self.normalize_type(atype) if len(values) == 0 else self.normalize_values(values)
                if include_name:
                    if line == 0:
                        element_title = element_name
                        if mandatory:
                            element_title = ":abbr:`%s (%s)`" % (element_title, _('mandatory'))

                        if parent:
                            element_title = "%s\n  * %s" % (parent, element_title)

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
                    sub_type = sub_element.get("type")
                    mandatory = sub_element.get("minOccurs") is not None and int(sub_element.get("minOccurs")) > 0
                    if parent is not None:
                        sub_parent = "%s\n  * %s" % (parent, element_name)
                    else:
                        sub_parent = element_name
                    #no recursions
                    if sub_type != element_type and (depth < 0 or depth < level):
                        self.generate_complex_table(name, include_name=include_name,
                                                    mandatory=mandatory, table_body=table_body, element_type=sub_type,
                                                    sub_run=True, parent=sub_parent, depth=depth, level=level+1, exclude_attributes=[])
                else:
                    (sub_element, atype, doc) = sub_element
                    indent = 2 if parent is not None else 1
                    element_title = "%s\n\n%s* %s" % (element_name, "  " * indent, sub_element)
                    if parent:
                        element_title = "%s\n  * %s" % (parent, element_title)

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
                elem = schema.find(".//xs:element[@name='%s']" % element_name)
                doc = schema.get_node_documentation(elem, self.locale)
                if doc is not None:
                    if include_name:
                        row = [self.get_cell_data(element_name), self.get_cell_data(""), self.get_cell_data(self.normalize_type("string")), self.get_cell_data(doc.text)]
                    else:
                        row = [self.get_cell_data(element_name), self.get_cell_data(self.normalize_type("string")), self.get_cell_data(doc)]
                    table_body.append(row)
                else:
                    return None

            if include_name:
                table_head = [
                    [self.get_cell_data(_('Element')), (0, 3, 0, statemachine.StringList(_('Attribute').splitlines())), None, None],
                    [self.get_cell_data(_('Structure')), self.get_cell_data(_('Name')), self.get_cell_data(_('Content')), self.get_cell_data(_('Description'))]
                ]
                table = ([15, 15, 15, 55], table_head, table_body)
            else:
                table_head = [
                    [(0, 3, 0, statemachine.StringList(_('Attribute').splitlines())), None, None],
                    [self.get_cell_data(_('Name')), self.get_cell_data(_('Content')), self.get_cell_data(_('Description'))]
                ]
                table = ([20, 20, 60], table_head, table_body)

            table_node = self.state.build_table(table, self.content_offset)
            table_node['classes'] += self.options.get('class', [])
            table_node['classes'] += ["schema-table"]

            return table_node
