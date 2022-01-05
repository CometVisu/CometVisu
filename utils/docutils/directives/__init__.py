#!/usr/bin/python
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

try:
    import sh
except:
    import pbs as sh
import json
import re
import os
import configparser

root_dir = os.path.abspath(os.path.join(os.path.realpath(os.path.dirname(__file__)), '..', '..', '..'))

class Version:
    _source_version = None
    config = configparser.ConfigParser()
    config.read(os.path.join(root_dir, 'utils', 'config.ini'))

    @classmethod
    def get_doc_version(cls):
        git = sh.Command("git")
        branch = git("rev-parse", "--abbrev-ref", "HEAD").strip() if os.environ.get('GITHUB_REF') is None \
            else os.environ.get('GITHUB_REF').split("/")[:-1]

        if branch == "develop":
            return cls.config.get("DEFAULT", "develop-version-mapping")
        else:
            # read version
            return cls.get_source_version()

    @classmethod
    def get_source_version(cls):
        if cls._source_version is None:
            with open(os.path.join(root_dir, "package.json")) as data_file:
                data = json.load(data_file)
                cls._source_version = data['version']
        return cls._source_version

    @classmethod
    def get_doc_target_path(cls):
        """ returns the target sub directory where the documentation should be stored."""
        ver = cls.get_doc_version()
        match = re.match("([0-9]+.[0-9]+).[0-9]+.*", ver)
        if match:
            return match.group(1)
        else:
            return ver