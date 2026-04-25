#!/usr/bin/python
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

import json
import logging
import os
import re
import shutil
from argparse import ArgumentParser
from datetime import date
from fnmatch import fnmatch

import rjsmin

from . import Command


class BuildHelper(Command):
    COPYRIGHT_INCLUDE_PATTERNS = [
        'client/oo.loader.tmpl.js',
        'client/source/*.js',
        'client/source/**/*.js',
        'source/class/*.js',
        'source/rest/manager/*.php',
        'source/class/**/*.js',
        'source/rest/manager/**/*.php'
    ]

    COPYRIGHT_EXCLUDE_PATTERNS = [
        'source/rest/manager/vendor/**'
    ]

    COPYRIGHT_LINE_PATTERN = re.compile(
        r'^(\s*(?:\*|#|~)\s*)([Cc]opyright) \(c\) (\d{4})(?:-(\d{4}))?, Christian Mayer and the CometVisu contribut(?:ers|ors)\.(\s*)$',
        re.MULTILINE
    )
    COPYRIGHT_OTHER_HEADER_PATTERN = re.compile(r'copyright|\(c\)|licen[cs]ed under|gpl', re.IGNORECASE)
    COPYRIGHT_INSERT_EXCLUDE_PATTERNS = [
        'client/source/resource/**',
        'source/resource/libs/**',
        'source/resource/sentry/**',
        'source/resource/plugins/**/dep/**',
        '**/*.min.js'
    ]

    COPYRIGHT_GPL_MARKER = 'This program is free software; you can redistribute it and/or modify it'
    COPYRIGHT_SCAN_LINES = 25

    def __init__(self):
        super(BuildHelper, self).__init__()
        self.log = logging.getLogger('BuildHelper')
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def _matches_any_pattern(self, relative_path, patterns):
        normalized_path = relative_path.replace(os.path.sep, '/')
        return any(fnmatch(normalized_path, pattern) for pattern in patterns)

    def _iter_copyright_candidates(self):
        for subdir, dirs, files in os.walk(self.root_dir):
            relative_dir = os.path.relpath(subdir, self.root_dir)
            normalized_dir = '.' if relative_dir == '.' else relative_dir.replace(os.path.sep, '/')
            dirs[:] = [
                directory for directory in dirs
                if not self._matches_any_pattern(
                    directory if normalized_dir == '.' else '%s/%s' % (normalized_dir, directory),
                    self.COPYRIGHT_EXCLUDE_PATTERNS
                )
            ]

            for file_name in files:
                relative_path = file_name if relative_dir == '.' else os.path.join(relative_dir, file_name)
                if self._matches_any_pattern(relative_path, self.COPYRIGHT_EXCLUDE_PATTERNS):
                    continue
                if not self._matches_any_pattern(relative_path, self.COPYRIGHT_INCLUDE_PATTERNS):
                    continue
                yield relative_path

    def _build_year_range(self, start_year, end_year):
        return '%d' % start_year if start_year == end_year else '%d-%d' % (start_year, end_year)

    def _get_copyright_header(self, content):
        header = '\n'.join(content.splitlines()[:self.COPYRIGHT_SCAN_LINES])
        return header

    def _get_insert_offset(self, content):
        if content.startswith('#!'):
            offset = content.find('\n')
            if offset == -1:
                return len(content)
            offset += 1
            remaining = content[offset:]
            if remaining.startswith('#'):
                next_line = remaining.splitlines()[0]
                if 'coding' in next_line:
                    coding_end = content.find('\n', offset)
                    if coding_end == -1:
                        return len(content)
                    offset = coding_end + 1
            while offset < len(content) and content[offset] == '\n':
                offset += 1
            return offset

        if content.startswith('<?php') or content.lower().startswith('<!doctype'):
            offset = content.find('\n')
            return len(content) if offset == -1 else offset + 1

        return 0

    def _build_hash_header(self, year):
        year_range = self._build_year_range(2010, year)
        return (
            '# Copyright (c) %s, Christian Mayer and the CometVisu contributors.\n'
            '#\n'
            '# This program is free software; you can redistribute it and/or modify it\n'
            '# under the terms of the GNU General Public License as published by the Free\n'
            '# Software Foundation; either version 3 of the License, or (at your option)\n'
            '# any later version.\n'
            '#\n'
            '# This program is distributed in the hope that it will be useful, but WITHOUT\n'
            '# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or\n'
            '# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for\n'
            '# more details.\n'
            '#\n'
            '# You should have received a copy of the GNU General Public License along\n'
            '# with this program; if not, write to the Free Software Foundation, Inc.,\n'
            '# 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA\n\n'
        ) % year_range

    def _build_block_header(self, relative_path, year):
        year_range = self._build_year_range(2010, year)
        return (
            '/* %s\n'
            ' *\n'
            ' * Copyright (c) %s, Christian Mayer and the CometVisu contributors.\n'
            ' *\n'
            ' * This program is free software; you can redistribute it and/or modify it\n'
            ' * under the terms of the GNU General Public License as published by the Free\n'
            ' * Software Foundation; either version 3 of the License, or (at your option)\n'
            ' * any later version.\n'
            ' *\n'
            ' * This program is distributed in the hope that it will be useful, but WITHOUT\n'
            ' * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or\n'
            ' * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for\n'
            ' * more details.\n'
            ' *\n'
            ' * You should have received a copy of the GNU General Public License along\n'
            ' * with this program; if not, write to the Free Software Foundation, Inc.,\n'
            ' * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA\n'
            ' */\n\n'
        ) % (os.path.basename(relative_path), year_range)

    def _build_html_header(self, year):
        year_range = self._build_year_range(2010, year)
        return (
            '<!--\n'
            '  ~ Copyright (c) %s, Christian Mayer and the CometVisu contributors.\n'
            '  ~\n'
            '  ~ This program is free software; you can redistribute it and/or modify it\n'
            '  ~ under the terms of the GNU General Public License as published by the Free\n'
            '  ~ Software Foundation; either version 3 of the License, or (at your option)\n'
            '  ~ any later version.\n'
            '  ~\n'
            '  ~ This program is distributed in the hope that it will be useful, but WITHOUT\n'
            '  ~ ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or\n'
            '  ~ FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for\n'
            '  ~ more details.\n'
            '  ~\n'
            '  ~ You should have received a copy of the GNU General Public License along\n'
            '  ~ with this program; if not, write to the Free Software Foundation, Inc.,\n'
            '  ~ 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA\n'
            '  -->\n\n'
        ) % year_range

    def _build_missing_copyright_content(self, relative_path, content, year):
        if self._matches_any_pattern(relative_path, self.COPYRIGHT_INSERT_EXCLUDE_PATTERNS):
            return None

        normalized_path = relative_path.replace(os.path.sep, '/')
        if normalized_path.endswith('.html'):
            header = self._build_html_header(year)
        elif normalized_path.endswith(('.js', '.cjs', '.php')):
            header = self._build_block_header(relative_path, year)
        else:
            header = self._build_hash_header(year)

        offset = self._get_insert_offset(content)
        prefix = content[:offset]
        suffix = content[offset:]
        if prefix and not prefix.endswith('\n'):
            prefix += '\n'
        return prefix + header + suffix

    def _plan_copyright_change(self, relative_path, content, year):
        header = self._get_copyright_header(content)
        if self.COPYRIGHT_GPL_MARKER not in header:
            if self.COPYRIGHT_OTHER_HEADER_PATTERN.search(header):
                return None

            inserted_content = self._build_missing_copyright_content(relative_path, content, year)
            if inserted_content is None or inserted_content == content:
                return None

            return {
                'action': 'added',
                'content': inserted_content,
                'current_range': 'missing',
                'next_range': self._build_year_range(2010, year)
            }

        match = self.COPYRIGHT_LINE_PATTERN.search(header)
        if match is None:
            return None

        prefix, label, start_year, end_year, trailing = match.groups()
        start_year = int(start_year)
        end_year = int(end_year or start_year)
        target_year = max(end_year, int(year))
        current_range = self._build_year_range(start_year, end_year)
        next_range = self._build_year_range(start_year, target_year)
        replacement = '%s%s (c) %s, Christian Mayer and the CometVisu contributors.%s' % (
            prefix,
            label,
            next_range,
            trailing
        )
        updated_content = content.replace(match.group(0), replacement, 1)
        if updated_content == content:
            return None

        return {
            'action': 'updated',
            'content': updated_content,
            'current_range': current_range,
            'next_range': next_range
        }

    def update_copyright_headers(self, year=None, write=False, verbose=False):
        year = date.today().year if year is None else year
        scanned = 0
        changed = 0

        for relative_path in sorted(self._iter_copyright_candidates()):
            absolute_path = os.path.join(self.root_dir, relative_path)
            with open(absolute_path, 'r', encoding='utf-8') as handle:
                content = handle.read()

            scanned += 1
            result = self._plan_copyright_change(relative_path, content, year)
            if result is None:
                continue

            changed += 1
            if verbose:
                print('%s: %s %s -> %s' % (relative_path, result['action'], result['current_range'], result['next_range']))
            else:
                print(relative_path)

            if write:
                with open(absolute_path, 'w', encoding='utf-8') as handle:
                    handle.write(result['content'])

        action = 'updated' if write else 'would update'
        print('Scanned %d files, %s %d headers.' % (scanned, action, changed))

    def build_plugins(self, build_dir='build'):
        if not os.path.exists(build_dir):
            print('Please run generate the build first')
            return
        p = re.compile(r"^qx.\$\$packageData\['\d+'\]=(.+);")
        scripts_reg = re.compile(r"[\w]+\.addScripts\(\[?([^\]\)]+)\]?,?(\[[^\]]\]+)?\)")
        for subdir, dirs, files in os.walk(os.path.join(build_dir, 'cv')):
            for file_name in files:
                if file_name[-3:] != '.js':
                    continue
                # print(os.path.join(subdir, file_name))
                with open(os.path.join(subdir, file_name), 'r+') as handle:
                    content = handle.read()
                    if content.split('\n')[0] == '//PROCESSED':
                        continue
                    data = p.findall(content)
                    if len(data) > 0:
                        package_data = json.loads(data[0])
                        first_resource = True
                        js_files = []
                        print(package_data['resources'])
                        for resource in package_data['resources']:
                            if resource.startswith('plugins/') and resource.split('.')[-1] == 'js':
                                js_files.append(resource)
                        if len(js_files) > 0:
                            scripts_match = scripts_reg.findall(content)
                            if len(scripts_match) > 0:
                                scripts = []
                                load_order = json.loads(scripts_match[0][1]) if len(scripts_match[0]) == 2 and scripts_match[0][1] else None
                                for var in scripts_match[0][0].split(','):
                                    var_match = re.search("%s=\\'([^\\']+)\\'" % var, content)
                                    if var_match is not None:
                                        scripts.append(var_match.group(1))
                                loaded = []
                                if load_order is not None:
                                    for idx in load_order:
                                        script = scripts[idx]
                                        with open(os.path.join(build_dir, 'resource', script), 'r') as resource_handle:
                                            if first_resource is True:
                                                content = '//PROCESSED\n%s' % content
                                                first_resource = False
                                            content += ' ' + rjsmin.jsmin(resource_handle.read().replace('\n', ''), keep_bang_comments=True)
                                        loaded.append(script)

                                for script in filter(lambda item: item not in loaded, scripts):
                                    with open(os.path.join(build_dir, 'resource', script), 'r') as resource_handle:
                                        if first_resource is True:
                                            content = '//PROCESSED\n%s' % content
                                            first_resource = False
                                        content += ' ' + rjsmin.jsmin(resource_handle.read(), keep_bang_comments=True)

                        if first_resource is False:
                            handle.seek(0)
                            handle.truncate()
                            handle.write(content)
                            print('%s has been processed' % os.path.join(subdir, file_name))

    def update_paths(self, build_dir='build'):
        with open(os.path.join(build_dir, 'editor', 'text', 'index.html'), 'r+') as handle:
            data = handle.read()
            data = data.replace('../../../node_modules', '../../node_modules')
            data = data.replace('monaco-editor/dev/vs', 'monaco-editor/min/vs')
            handle.seek(0)
            handle.write(data)
            handle.truncate()

        try:
            dev = os.path.join(build_dir, 'node_modules', 'monaco-editor', 'dev')
            if os.path.exists(dev):
                shutil.rmtree(dev)
            maps = os.path.join(build_dir, 'node_modules', 'monaco-editor', 'min-maps')
            if os.path.exists(maps):
                shutil.rmtree(maps)
            ts = os.path.join(build_dir, 'node_modules', 'monaco-editor', 'monaco.d.ts')
            if os.path.exists(ts):
                os.unlink(ts)
        except Exception as error:
            print(str(error))

        media = os.path.join(build_dir, 'resource', 'config', 'media')
        if not os.path.exists(media):
            os.mkdir(media)

        backup = os.path.join(build_dir, 'resource', 'config', 'backup')
        if not os.path.exists(backup):
            os.mkdir(backup)

    def run(self, args):
        parser = ArgumentParser(usage='%(prog)s - CometVisu build helper scripts')

        parser.add_argument('--build-plugins', '-bp', dest='build_plugins', action='store_true', help='include external libs in plugin parts')
        parser.add_argument('--check-copyright-headers', dest='check_copyright_headers', action='store_true', help='show files whose GPL copyright header year would be updated')
        parser.add_argument('--update-copyright-headers', dest='update_copyright_headers', action='store_true', help='update GPL copyright header years in source files')
        parser.add_argument('--update-paths', '-up', dest='update_paths', action='store_true', help='update some paths inside certain files')
        parser.add_argument('--build-dir', '-d', dest='build_dir', default='build', help='build dir')
        parser.add_argument('--year', dest='year', type=int, help='target copyright year for header updates')
        parser.add_argument('--verbose', '-v', dest='verbose', action='store_true', help='print additional details for matching actions')

        options = parser.parse_args(args)

        if options.build_plugins:
            self.build_plugins(options.build_dir)
        elif options.check_copyright_headers:
            self.update_copyright_headers(year=options.year, write=False, verbose=options.verbose)
        elif options.update_copyright_headers:
            self.update_copyright_headers(year=options.year, write=True, verbose=options.verbose)
        elif options.update_paths:
            self.update_paths(options.build_dir)
