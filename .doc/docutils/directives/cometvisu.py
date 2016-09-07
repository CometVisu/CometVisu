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
from json import dumps
from docutils.nodes import target
from widget_example import WidgetExampleDirective
from parameter_information import ParameterInformationDirective
from elements_information import ElementsInformationDirective

references = {"_base": "http://test.cometvisu.org/CometVisu/"}
reference_prefix = "/manual/"
references_file = os.path.join("src", "editor", "lib", "DocumentationMapping.json")
manual_dir = os.path.join("doc", "manual")
default_ref = re.compile("^index-[0-9]+$")


def process_references(app, doctree, fromdocname):
    for ref_info in doctree.traverse(target):
        anchor = ref_info['refid']
        if default_ref.match(anchor):
            # skip the default ones like index-0...
            continue
        link = app.builder.get_relative_uri('index', fromdocname)
        link += '#' + anchor
        references[anchor] = "%s%s" % (reference_prefix, link)


def store_references(app, exception):
    if exception is None:
        with open(references_file, "w") as f:
            f.write(dumps(references, indent=2, sort_keys=True))


def source_read(app, docname, source):
    """ prepend header to every file """
    header_file = os.path.join(manual_dir, app.config.language, "parts", "header.rst")
    if os.path.exists(header_file):
        with open(header_file, "rb") as f:
            source[0] = "%s\n%s" % (f.read().decode('utf-8'), source[0])


def setup(app):
    app.add_directive("widget-example", WidgetExampleDirective)
    app.add_directive("elements-information", ElementsInformationDirective)
    app.add_directive("parameter-information", ParameterInformationDirective)

    app.connect('doctree-resolved', process_references)
    app.connect('build-finished', store_references)
    app.connect('source-read', source_read)

    return {'version': '0.1'}