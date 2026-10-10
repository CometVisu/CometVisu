# -*- coding: utf-8 -*-

# copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
import configparser

root_dir = os.path.abspath(os.path.join(os.path.realpath(os.path.dirname(__file__)), '..', '..', '..'))

config = configparser.ConfigParser()
config.read(os.path.join(root_dir, 'utils', 'config.ini'))

# allow overriding the doc-dir globally via environment variable (e.g. set by
# the doc command when called with --doc-dir)
if os.environ.get("CV_DOC_DIR"):
    config.set("DEFAULT", "doc-dir", os.environ["CV_DOC_DIR"])