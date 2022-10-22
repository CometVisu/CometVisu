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
        return res

    def get_attribute(self, widget_name):
        return self.findall("xs:attribute[@name='%s']" % widget_name)[0]

    def get_widget_elements(self, widget_name, locale='en', ctype=None, sub_type=False):
        if ctype is None:
            ctype = self.find("xs:complexType[@name='%s']" % widget_name)
        if ctype is None:
            return []
        elems = ctype.findall(".//xs:element".replace("xs:", SCHEMA_SPACE))
        ext = ctype.find(".//xs:simpleContent/xs:extension".replace("xs:", SCHEMA_SPACE))

        # find extended elements
        for elem in elems:
            if not isinstance(elem, tuple) and elem.get('type') is None:
                sub_type = elem.find("./xs:complexType".replace("xs:", SCHEMA_SPACE))
                if sub_type is not None:
                    for sub_elem in self.get_widget_elements(elem.get('name'), ctype=sub_type, sub_type=True):
                        elems.append(sub_elem)
        if ext is not None and ext.get("base") is not None:
            # should we really hardcode this?
            ref = self.find("xs:simpleType[@name='%s']" % ext.get("base"))
            doc = self.get_node_documentation(ref, locale).text if ref is not None and self.get_node_documentation(ref, locale) is not None else ""
            elems.append(("#text", "string", doc))
        elif ctype.get("mixed", "false") == "true":
            doc = self.get_node_documentation(ctype, locale).text if self.get_node_documentation(ctype, locale) is not None else ""
            elems.append(("#text", "string", doc))
        return elems

    def get_elements_of_attribute(self, attribute):
        return self.names_of(self.findall(".//xs:element/xs:complexType/xs:" + attribute + "/../.."))

    def get_node_documentation(self, node, locale):
        return node.find("%sannotation/%sdocumentation[@%slang='%s']" % (SCHEMA_SPACE, SCHEMA_SPACE, XML_SPACE, locale))

    def get_attribute_type(self, node):
        type = None
        values = []
        enums = None
        if 'type' in node.attrib:
            type = node.get('type')
        elif len(node.findall("xs:simpleType/xs:restriction".replace("xs:", SCHEMA_SPACE))) > 0:
            enums = node.findall("xs:simpleType/xs:restriction/xs:enumeration".replace("xs:", SCHEMA_SPACE))
            values = [enum.get('value') for enum in enums]
            type = node.find("xs:simpleType/xs:restriction".replace("xs:", SCHEMA_SPACE)).get("base")
        return type, values, enums

    def get_element_attributes(self, name):

        node = self.find(".//xs:element[@name='" + name + "']")
        if node is None:
            node = self.find(".//xs:complexType[@name='" + name + "']")
        if node is None:
            return None
        else:
            return node.attrib
