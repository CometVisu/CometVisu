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
from docutils.nodes import target, General, Element
from docutils.parsers.rst import Directive
from widget_example import WidgetExampleDirective
from parameter_information import ParameterInformationDirective
from elements_information import ElementsInformationDirective
from api_doc import ApiDocDirective
from backend_transform import BackendTransformDirective
from settings import config, root_dir
from __init__ import Version

references = {"_base": "https://www.cometvisu.org/CometVisu/"}
reference_prefix = config.get("references", "prefix").replace("<version>", Version.get_doc_target_path())
references_file = os.path.join(root_dir, config.get("references", "target"))
redirect_file = os.path.join(root_dir, config.get("redirect", "target"))

default_ref = re.compile("^index-[0-9]+$")
redirect_map = {}
if os.path.exists(redirect_file):
    with open(redirect_file, "r") as f:
        for line in f:
            if re.match("  \"(.+)\"$", line):
                wiki, manual = line[3:-2].strip().split("|")
                redirect_map[wiki] = manual
            elif "|" in line:
                wiki, manual = line.strip().split("|")
                redirect_map[wiki] = manual


def process_references(app, doctree, fromdocname):
    for ref_info in doctree.traverse(target):
        anchor = ref_info['refid'] if 'refid' in ref_info else None
        if anchor is None or default_ref.match(anchor):
            # skip the default ones like index-0...
            continue
        link = app.builder.get_relative_uri('index', fromdocname)
        link += '#' + anchor
        references[anchor] = "%s%s" % (reference_prefix, link)

    # traverse the replacements
    for node in doctree.traverse(replaces):
        for replacement in node.rawsource:
            redirect_map[replacement] = "%s%s%s.html" % (app.config.language, reference_prefix, fromdocname)
        node.parent.remove(node)


def store_references(app):
    if app.config.language == config.get("references", "language"):
        if references_file[-5:] == ".json":
            with open(references_file, "w") as f:
                f.write(dumps(references, indent=2, sort_keys=True))
        else:
            content_before = []
            content_after = []
            mode = "before"
            with open(references_file, "r") as f:
                for l in f:
                    if re.match("^    MAP:\\s{\\s*$", l):
                        mode = "inside"
                        content_before.append(l)
                    elif re.match("^    }$", l):
                        mode = "after"
                    if mode == "before":
                        content_before.append(l)
                    elif mode == "after":
                        content_after.append(l)
            content = "%s    %s\n%s" % (
                     "".join(content_before),
                     "\n    ".join(dumps(references, indent=2, sort_keys=True).replace("\"", "'").split("\n")[1:-1]),
                     "".join(content_after)
                 )
            with open(references_file, "w") as f:
                f.write(content)


def store_redirect_map():
    source = ""
    for src in sorted(redirect_map):
        source += '%s|%s\n' % (src, redirect_map[src])

    with open(redirect_file, "w") as f:
        f.write(source)


def on_finish(app, exception):
    if exception is None:
        store_references(app)
        store_redirect_map()


def source_read(app, docname, source):
    """ prepend header to every file """
    section = "manual-%s" % app.config.language
    header_file = config.get(section, "header-file")
    if header_file and os.path.exists(header_file):
        with open(header_file, "rb") as f:
            source[0] = "%s\n%s" % (f.read().decode('utf-8'), source[0])


class replaces(General, Element):
    pass


class ReplacesDirective(Directive):
    # this enables content in the directive
    has_content = True

    def run(self):
        return [replaces(self.content)]


def setup(app):
    app.add_node(replaces)

    app.add_directive("widget-example", WidgetExampleDirective)
    app.add_directive("elements-information", ElementsInformationDirective)
    app.add_directive("parameter-information", ParameterInformationDirective)
    app.add_directive("replaces", ReplacesDirective)
    app.add_directive("api-doc", ApiDocDirective)
    app.add_directive("backend-transform", BackendTransformDirective)

    app.connect('doctree-resolved', process_references)
    app.connect('build-finished', on_finish)
    app.connect('source-read', source_read)

    config.set("DEFAULT", "language", app.config.language)

    return {'version': '0.1'}
