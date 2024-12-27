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

from lxml.etree import parse
import re
SCHEMA_SPACE = "{http://www.w3.org/2001/XMLSchema}"
XML_SPACE = "{http://www.w3.org/XML/1998/namespace}"


class Schema:
    """
    Parse visu_config.xsd and retrieve relevant information for a widget

    @author Tobias Bräutigam
    @since 0.10.0
    """

    def __init__(self, schemafile):
        self.root = parse(schemafile)

    def findall(self, path):
        return self.root.findall( path.replace("xs:", SCHEMA_SPACE) )

    def find(self, path):
        return self.root.find( path.replace("xs:", SCHEMA_SPACE) )

    def names_of(self, nodes):
        return [node.get("name") for node in nodes]

    def get_Types(self, t_name):
        return self.names_of( self.findall(t_name) )

    def get_simpleTypes(self):
        return self.get_Types("xs:simpleType")

    def get_complexTypes(self):
        return self.get_Types("xs:complexType")

    def get_widget(self, widget_name):
        return self.findall("xs:complexType[@name='%s']" % widget_name)

    def get_widget_attributes(self, widget_name, type_node=None):
        res = self.findall("xs:complexType[@name='%s']/xs:attribute" % widget_name)
        res += self.findall("xs:complexType[@name='%s']/xs:simpleContent/xs:extension/xs:attribute" % widget_name)
        if len(res) == 0 and type_node is not None:
            res = type_node.findall("xs:complexType/xs:attribute".replace("xs:", SCHEMA_SPACE))
            res += type_node.findall("xs:complexType/xs:simpleContent/xs:extension/xs:attribute".replace("xs:", SCHEMA_SPACE))
            ext = type_node.find(".//xs:simpleContent/xs:extension".replace("xs:", SCHEMA_SPACE))
            if ext is not None and ext.get("base") is not None:
                # get all attributes from extension
                for attr in self.get_widget_attributes(ext.get("base")):
                    res.append(attr)

        # find and resolve attribute groups
        res += self.get_attribute_groups("xs:complexType[@name='%s']/xs:attributeGroup" % widget_name)
        res += self.get_attribute_groups("xs:complexType[@name='%s']/xs:simpleContent/xs:extension/xs:attributeGroup" % widget_name)

        # find and resolve inherited attributes
        ext = self.find("xs:complexType[@name='%s']/xs:complexContent/xs:extension" % widget_name)
        if ext is not None:
            # get attributes from extended element
            res += self.get_widget_attributes(ext.get("base"))
            # get attributes from extension
            res += ext.findall(".//xs:attribute".replace("xs:", SCHEMA_SPACE))

        return res

    def get_attribute_groups(self, query):
        attrs = []
        for group in self.findall(query):
            if "ref" in group.attrib:
                name = group.get('ref')
                attrs += self.get_group_attributes(name)
        return attrs

    def get_attribute(self, widget_name):
        return self.findall("xs:attribute[@name='%s']" % widget_name)[0]

    def get_group_attributes(self, widget_name):
        return self.findall("xs:attributeGroup[@name='%s']/xs:attribute" % widget_name)

    def get_widget_elements(self, widget_name, locale='en', ctype=None, sub_type=False):
        if ctype is None:
            ctype = self.find("xs:complexType[@name='%s']" % widget_name)
        if ctype is None:
            return []
        elems = ctype.findall(".//xs:element".replace("xs:", SCHEMA_SPACE))
        simple_ext = ctype.find("./xs:simpleContent/xs:extension".replace("xs:", SCHEMA_SPACE))
        complex_ext = ctype.find("./xs:complexContent/xs:extension".replace("xs:", SCHEMA_SPACE))
        elem_names = [x.get('name') for x in elems]

        # find extended elements
        for elem in elems:
            if not isinstance(elem, tuple) and elem.get('type') is None:
                sub_type = elem.find("./xs:complexType".replace("xs:", SCHEMA_SPACE))
                if sub_type is not None:
                    for sub_elem in self.get_widget_elements(elem.get('name'), ctype=sub_type, sub_type=True):
                         name = elem.get('name') if not isinstance(sub_elem, tuple) else sub_elem[0]
                         if name not in elem_names:
                             elems.append(sub_elem)
                             elem_names.append(name)

        if simple_ext is not None and simple_ext.get("base") is not None:
            # should we really hardcode this?
            ref = self.find("xs:simpleType[@name='%s']" % simple_ext.get("base"))
            doc = self.get_node_documentation(ref, locale).text if ref is not None and self.get_node_documentation(ref, locale) is not None else ""
            elems.append(("#text", "string", doc))
        elif ctype.get("mixed", "false") == "true":
            doc = self.get_node_documentation(ctype, locale).text if self.get_node_documentation(ctype, locale) is not None else ""
            elems.append(("#text", "string", doc))

        if complex_ext is not None and complex_ext.get("base") is not None:
            for e in self.get_widget_elements(complex_ext.get("base"), locale):
                name = e.get('name') if not isinstance(e, tuple) else e[0]
                if name not in elem_names:
                    elems.append(e)
                    elem_names.append(name)

        return elems

    def get_elements_of_attribute(self, attribute):
        return self.names_of(self.findall(".//xs:element/xs:complexType/xs:" + attribute + "/../.."))

    def get_node_documentation(self, node, locale):
        return node.find("%sannotation/%sdocumentation[@%slang='%s']" % (SCHEMA_SPACE, SCHEMA_SPACE, XML_SPACE, locale))

    def get_attribute_type(self, node, locale):
        a_type = None
        values = []
        enums = None
        description = self.get_node_documentation(node, locale)
        if 'type' in node.attrib:
            a_type = node.get('type')
            if a_type[0:4] != "xsd:":
                # check if this is a type defined in the document
                external_type = self.find("xs:simpleType[@name='"+a_type+"']".replace("xs:", SCHEMA_SPACE))
                if external_type is not None:
                    enums = external_type.findall("xs:restriction/xs:enumeration".replace("xs:", SCHEMA_SPACE))
                    values = [enum.get('value') for enum in enums]
                    a_type = external_type.find("xs:restriction".replace("xs:", SCHEMA_SPACE)).get("base")
                    if description is None:
                        description = self.get_node_documentation(external_type, locale)
        elif len(node.findall("xs:simpleType/xs:restriction".replace("xs:", SCHEMA_SPACE))) > 0:
            enums = node.findall("xs:simpleType/xs:restriction/xs:enumeration".replace("xs:", SCHEMA_SPACE))
            values = [enum.get('value') for enum in enums]
            a_type = node.find("xs:simpleType/xs:restriction".replace("xs:", SCHEMA_SPACE)).get("base")
        if description is not None:
            description = re.sub(r"\n\s+", " ", description.text).strip()
            return a_type, values, enums, description
        return a_type, values, enums, ''

    def get_element_attributes(self, name):

        node = self.find(".//xs:element[@name='" + name + "']")
        if node is None:
            node = self.find(".//xs:complexType[@name='" + name + "']")
        if node is None:
            return None
        else:
            return node.attrib
