# -*- coding: utf-8 -*-

# copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
from docutils.statemachine import ViewList
from common import BaseDirective
import glob
import subprocess
import json
import re

class BackendTransformDirective(BaseDirective):
    """
    reStructuredText directive for information about transformations. The
    information is extracted by the files in the path source/class/cv/transforms/

    ..backend_transform:: <prefix>

    @author Christian Mayer
    @since 0.12.0
    """
    required_arguments = 0
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {}
    has_content = False

    transforms = {}

    def fill_transforms(self):
        if len(self.transforms) > 0:
            return

        files = glob.glob('source/class/cv/transforms/*.js')
        files.extend(["source/class/cv/Transform.js"])

        for name in files:
            print("Load transforms at " + name)
            this_transforms=json.loads(subprocess.check_output(["utils/docutils/directives/helper/backend_transform_parse.js", name]))
            self.transforms[this_transforms[0]] = [this_transforms[1], this_transforms[2]]

    def run(self):
        self.init_locale()
        self.fill_transforms()

        element_name = ""
        if len(self.arguments) > 0:
            element_name = self.arguments[0]

        if element_name not in self.transforms:
            failure = "Backend transform '%s' not found" % element_name
            raise self.warning(failure)

        # sorting contained numbers (e.g. at KNX DPT) with leading and following
        # zeros to follow human expectaions
        def leadingzeros(key):
            r=re.split('([^0-9.]*)([0-9]*\.?[0-9]*)(.*$)',key[0])
            if r[2] == '':
                return r[1] + r[2] + r[3]
            else:
                n = r[2].split('.')
                if len(n) < 2:
                    n.append('')
                return r[1] + n[0].zfill(6) + '.' + n[1].ljust(6, '0') + r[3]

        rst = ViewList()
        rst.append(".. csv-table::", "fakefile4transform.rst", self.lineno)
        rst.append("   :escape: \\", "fakefile4transform.rst", self.lineno)
        if self.transforms[element_name][1]:
            rst.append("   :header: \"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"" % (
                "``transform``", _("name"), _("description"), _("example"), _("unit"), _("min"), _("max")
            ), "fakefile4transform.rst", self.lineno)
        else:
            rst.append("   :header: \"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"" % (
                "``transform``", _("name"), _("description"), _("unit"), _("min"), _("max")
            ), "fakefile4transform.rst", self.lineno)
        rst.append("", "fakefile4transform.rst", self.lineno)
        for transform, t_content in sorted(self.transforms[element_name][0][self.locale].items(), key=leadingzeros):
            unit = t_content.get("unit", "")
            if unit == "-":
                unit = "\\\\-"
            range = t_content.get("range", {})
            if self.transforms[element_name][1]:
                rst.append("   \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\"" % (
                    transform.replace("\"", "\\\""),
                    t_content.get("name", "").replace("\"", "\\\""),
                    t_content.get("lname", "").replace("\"", "\\\""),
                    ('``' + t_content.get("example", "").replace("\"", "\\\"") + '``') if len(t_content.get("example", ""))>0 else "",
                    unit.replace("\"", "\\\""),
                    range.get("min", ""),
                    range.get("max", "")
                ), "fakefile4transform.rst", self.lineno)
            else:
                rst.append("   \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\"" % (
                    transform.replace("\"", "\\\""),
                    t_content.get("name", "").replace("\"", "\\\""),
                    t_content.get("lname", "").replace("\"", "\\\""),
                    unit.replace("\"", "\\\""),
                    range.get("min", ""),
                    range.get("max", "")
                ), "fakefile4transform.rst", self.lineno)

        paragraph_node = nodes.paragraph()
        self.state.nested_parse(rst, 0, paragraph_node)
        return [paragraph_node]
