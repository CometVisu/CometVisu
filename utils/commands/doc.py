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

import os
import logging
import configparser
import codecs

import subprocess
from json import dumps
from semver import compare
import yaml

try:
    import sh
except:
    import pbs as sh
import shutil
import json
import sys
import re
from lxml import etree
from distutils.version import LooseVersion
from argparse import ArgumentParser
from . import Command
from utils.commands.scaffolding import Scaffolder

try:
    # Python 2.6-2.7
    from HTMLParser import HTMLParser
    html = HTMLParser()
except ImportError:
    # Python 3
    import html

root_dir = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))

class DocParser:
    """
    Parse an existing rst file, recognize placeholder section and allow
    those sections to be replaced with new content
    """

    def __init__(self, widget=None, plugin=None):
        self.config = configparser.ConfigParser()
        self.config.read(os.path.join(root_dir, 'utils', 'config.ini'))
        self.sections = {}
        self.lines = []
        self.replacements = {}
        self.name = widget if widget is not None else plugin
        self.is_plugin = True if plugin is not None else False
        if self.is_plugin:
            self.file = os.path.join(self.config.get("manual-en", "plugins"), self.name.lower(), "index.rst")
        else:
            self.file = os.path.join(self.config.get("manual-en", "widgets"), self.name.lower(), "index.rst")

    def init(self):
        if not self.is_plugin:
            if not os.path.exists(self.file):
                if os.path.exists(self.config.get("manual-en", "widget-template")):
                    # fallback to template
                    scaffolder = Scaffolder()
                    scaffolder.generate("en", self.name, None)

        else:
            if not os.path.exists(self.file):
                if os.path.exists(self.config.get("manual-en", "plugin-template")):
                    # fallback to template
                    scaffolder = Scaffolder()
                    scaffolder.generate("en", None, self.name)

    def parse(self):
        self.init()
        with open(self.file) as f:
            current_section = None
            # find sections
            for line in f.readlines():
                match = re.match("^\.\. #{3}(START|END)-([A-Z\-]+)#{3}", line)
                if match:
                    section_name = match.group(2)
                    if match.group(1) == "START":
                        current_section = section_name
                        self.lines.append("##########%s" % section_name)
                    else:
                        current_section = None
                    if section_name not in self.sections:
                        self.sections[section_name] = []
                else:
                    if current_section is not None:
                        self.sections[current_section].append(line)
                    else:
                        self.lines.append(line)

    def replace_section(self, name, content):
        self.replacements[name] = content

    def tostring(self):
        content = []
        for line in self.lines:
            if line.startswith("##########"):
                # replace with section content
                section_name = line[10:]
                content.append(".. ###START-%s### Please do not change the following content. Changes will be overwritten\n\n" % section_name)
                if section_name in self.replacements:
                    content.extend(self.replacements[section_name])
                content.append("\n.. ###END-%s###\n" % section_name)
            else:
                content.append(line)
        return "".join(content)

    def write(self):
        with open(self.file, "w") as f:
            f.write(self.tostring())


class DocGenerator(Command):
    _source_version = None
    _doc_version = None

    def __init__(self):
        super(DocGenerator, self).__init__()
        self.log = logging.getLogger("doc")
        logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    def _get_doc_version(self):
        if self._doc_version is None:
            git = sh.Command("git")
            branch = git("rev-parse", "--abbrev-ref", "HEAD").strip() if os.environ.get('TRAVIS_BRANCH') is None \
                else os.environ.get('TRAVIS_BRANCH')

            self._doc_version = self._get_source_version()
        return self._doc_version

    def _get_source_version(self):
        if self._source_version is None:
            with open(os.path.join(self.root_dir, "package.json")) as data_file:
                data = json.load(data_file)
                self._source_version = data['version']
        return self._source_version

    def _get_doc_target_path(self):
        """ returns the target sub directory where the documentation should be stored."""
        ver = self._get_doc_version()
        match = re.match("([0-9]+\.[0-9]+)\.[0-9]+.*", ver)
        if match:
            return match.group(1)
        else:
            return ver

    def _run(self, language, target_dir, browser, skip_screenshots=True, force=False, screenshot_build="source", target_version=None):

        sphinx_build = sh.Command("sphinx-build")

        # check if sources exist for this language
        section = "manual-%s" % language
        target_type = self.config.get(section, "target-type")

        source_dir = os.path.join(self.root_dir, self.config.get(section, "source"))
        if target_dir is None:
            target_dir = os.path.join(self.root_dir, self.config.get(section, "target"))
        else:
            target_dir = os.path.join(self.root_dir, target_dir)
        target_dir = target_dir.replace("<version>", self._get_doc_target_path() if target_version is None else target_version)
        print("generating doc to %s" % target_dir)

        if not os.path.exists(source_dir):
            self.log.error("no sources found for manual (%s) in language '%s'" % (source_dir, language))
            sys.exit(1)

        if force and os.path.exists(target_dir):
            # delete target dir
            print("deleting old content in '%s'" % target_dir)
            shutil.rmtree(target_dir)

        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        # first run generates the widget-example configs
        print ('================================================================================')
        print ('sphinx_build: first run')
        print ('================================================================================')
        sphinx_build("-b", target_type, source_dir, target_dir, _out=self.process_output, _err=self.process_output)

        if not skip_screenshots:
            grunt = sh.Command("grunt")
            # generate the screenshots
            grunt("--force", "screenshots", "--subDir=manual", "--browserName=%s" % browser,
                  "--target=%s" % screenshot_build, _out=self.process_output, _err=self.process_output)

            # 2dn run with access to the generated screenshots
            print ('================================================================================')
            print ('sphinx_build: second run')
            print ('================================================================================')
            sphinx_build("-b", target_type, source_dir, target_dir, _out=self.process_output, _err=self.process_output)

        with open(os.path.join(target_dir, "..", "version"), "w+") as f:
            f.write(self._get_source_version())

        # create symlinks
        symlinkname = ''
        git = sh.Command("git")
        branch = git("rev-parse", "--abbrev-ref", "HEAD").strip() if os.environ.get('TRAVIS_BRANCH') is None \
            else os.environ.get('TRAVIS_BRANCH')

        if branch == "develop":
            # handle develop builds:
            print('detected development build')
            symlinkname = self.config.get("DEFAULT", "develop-version-mapping")
        elif branch == "master":
            # handle releases:
            print('detected build of most recent version of master branch')
            symlinkname = self.config.get("DEFAULT", "most-recent-version-mapping")

        if '' != symlinkname:
            symlinktarget = os.path.join(target_dir, "..")
            print("setting symlink '%s' to '%s'" % (symlinkname, symlinktarget))
            cwd = os.getcwd()
            os.chdir(os.path.join(symlinktarget, ".."))
            try:
                os.remove(symlinkname)
            except Exception as e:
                print(str(e))
            ls = sh.Command("ls")
            print(ls("-la"))
            os.symlink(os.path.relpath(symlinktarget), symlinkname)
            os.chdir(cwd)

    def from_source(self, path, plugin=False):
        """
        Generates the english manual from the source code comments (api documentation)
        """
        # traverse through the widgets
        if not os.path.exists(path):
            print("%s does not exist" % path)
            return
        root, dirs, files = list(os.walk(path))[0]
        source_files = []
        cleanr = re.compile('</?h.*?>')
        clean_tags = re.compile('</?.*?>')
        if plugin:
            for file in files:
                if file.split(os.path.sep)[0] in dirs and file.startswith("Abstract"):
                    # plugin in subdirectory, only read the Abstract Main Class
                    source_files.append((file[0:-3], os.path.join(root, file)))
                elif not file.startswith("Abstract") and file != "__init__.js":
                    source_files.append((file[0:-3], os.path.join(root, file)))
        else:
            for file in files:
                if file not in ["PageLink.js", "Unknown.js", "WidgetInfoAction.js", "__init__.js"] and not file.startswith("Abstract"):
                    source_files.append((file[0:-3], os.path.join(root, file)))

            # add parser widgets if defined

            for parser in self.config.get("manual-en", "parsers-doc-source").split(","):
                parser_path = os.path.join(self.config.get("manual-en", "parsers-path"), "%s.js" % parser)
                if os.path.exists(parser_path):
                    source_files.append((parser, parser_path))
                else:
                    print("file not found %s" % parser_path)

        for name, file in source_files:
            parser = DocParser(widget=name) if not plugin else DocParser(plugin=name)
            api_screenshot_dir = os.path.join(self.config.get("api", "target").replace("<version>", self._get_doc_version()), "resource", "apiviewer", "examples")

            with open(file) as f:
                content = {
                    "WIDGET-DESCRIPTION": [],
                    "WIDGET-EXAMPLES": []
                }
                reading = False
                code_block = False
                unescape = False
                example = False
                section = "WIDGET-DESCRIPTION"
                skip_lines_before = 0
                lines = f.readlines()
                for i, line in enumerate(lines):
                    if skip_lines_before > i:
                        continue

                    if line.startswith("qx.Class.define"):
                        # source code starts here -> do not proceed
                        break

                    if re.match("^\s*/\*\*\s*$", line):
                        reading = True

                    elif reading:
                        if re.match("^[\s*]*\*/\s*$", line):
                            break

                        match = re.match("\s*\*?\s(.+)", line)
                        if match:
                            indent = ""
                            if match.group(1)[0:1] == "@":
                                directive = match.group(1)[1:].split(" ")[0]
                                # print(directive)
                                if directive == "widgetexample":
                                    section = "WIDGET-EXAMPLES"

                                    # we need to parse the examples xml and check if the screenshots already exist
                                    # in the api-docs, then we need not to process them twice and just add a combination
                                    # of a figure and a clode-block here
                                    raw_code = match.group(1)[14:]
                                    example_code = raw_code
                                    for k, example_line in enumerate(lines[i+1:]):
                                        if re.match("^[\s*]*(\*/|@.+)\s*$", example_line) or len(re.sub("[\s*\n]", "", example_line)) == 0:
                                            # example finished
                                            skip_lines_before = k+i+1
                                            #print("skipping example lines from %s to %d" % (i, skip_lines_before))
                                            break
                                        example_code += re.sub("^\s*\*\s", "", example_line)

                                    if len(example_code) > 0:
                                        #print(example_code)
                                        xml = etree.fromstring("<root>%s</root>" % example_code)
                                        nodes = xml.xpath("/root/settings/screenshot")
                                        if len(nodes) > 0:
                                            for screenshot in nodes:
                                                screenshot_name = screenshot.get("name")
                                                screenshot_file = os.path.join(api_screenshot_dir, "%s.png" % screenshot_name)
                                                #print("looking for screenshot %s" % screenshot_file)
                                                if os.path.exists(screenshot_file):
                                                    screenshot_target_dir = os.path.join(os.path.dirname(parser.file), "_static")
                                                    if not os.path.exists(screenshot_target_dir):
                                                        os.makedirs(screenshot_target_dir)
                                                    # copy
                                                    shutil.copy(screenshot_file, screenshot_target_dir)
                                                    content[section].append(".. figure:: _static/%s.png\n" % screenshot_name)

                                                    # check for screenshot caption
                                                    caption = screenshot.find("caption")
                                                    if caption is not None:
                                                        content[section].append("\n    %s\n\n" % caption.text)

                                            # add the code-block
                                            content[section].append(".. code-block:: xml\n\n    ")
                                            for child in xml:
                                                if child.tag == "meta":
                                                    content[section].append("...\n    %s..." % "\n    ".join(etree.tostring(child, encoding='utf-8').decode().split("\n")))
                                                elif child.tag != "settings":
                                                    content[section].append("\n    %s" % "\n    ".join(etree.tostring(child, encoding='utf-8').decode().split("\n")))
                                        else:
                                            # no screenshot name defined, the auto-configured name cannot be guessed
                                            # reliable -> using widget-example
                                            skip_lines_before = 0
                                            content[section].append(".. widget-example::\n\n    %s\n" % raw_code)
                                    else:
                                        # no screenshot found, add widget-example th generate one
                                        content[section].append(".. widget-example::\n\n    %s\n" % raw_code)

                                elif match.group(1)[1:8] == "example":
                                    section = "WIDGET-DESCRIPTION"
                                    content[section].append(".. code-block:: xml\n")
                                    caption = re.match("\s*<caption>([^<]+)</caption>", match.group(1)[9:])
                                    if caption:
                                        content[section].append("    :caption: %s\n" % caption.group(1))
                                    content[section].append("\n")
                                    example = True
                                else:
                                    section = "WIDGET-DESCRIPTION"
                                continue

                            line_content = match.group(1)
                            if match.group(1).strip() == "*":
                                line_content = ""
                                example = False

                            if section == "WIDGET-EXAMPLES" or example:
                                indent = "    "
                            else:
                                line_content = line_content.replace("<code>", "``")
                                line_content = line_content.replace("</code>", "``")
                                line_content = line_content.replace("<li>", "* ")
                                line_content = line_content.replace("</li>", "")

                                if line_content.strip() in ["```", "<pre class=\"sunlight-highlight-xml\">", "</pre>"]:
                                    if not code_block:
                                        if line_content.strip() == "<pre class=\"sunlight-highlight-xml\">":
                                            unescape = True
                                        line_content = "\n.. code-block:: xml\n"
                                        code_block = True
                                    else:
                                        line_content = "\n"
                                        code_block = False
                                        unescape = False
                                elif code_block:
                                    indent = "    "
                                elif re.match("\s*TODO:?\s(.*)$", line_content):
                                    todo = re.match("\s*TODO:?\s(.*)$", line_content)
                                    line_content = ".. TODO::\n\n    %s\n" % todo.group(1)

                            if unescape is True:
                                content[section].append("%s%s\n" % (indent, html.unescape(line_content)))
                            else:
                                line_content = re.sub(cleanr, '**', line_content)
                                if section != "WIDGET-EXAMPLES" and example is False:
                                     line_content = re.sub(clean_tags, '', line_content)
                                content[section].append("%s%s\n" % (indent, line_content))

            if (len("".join(x.strip() for x in content['WIDGET-DESCRIPTION'])) == 0 or
                    content['WIDGET-DESCRIPTION'][0].startswith(".. TODO::\n\n    complete docs")):
                if len(content['WIDGET-EXAMPLES']) == 0:
                    continue
                else:
                    content['WIDGET-DESCRIPTION'].insert(0, ".. TODO::\n\n    add widget description\n")

            parser.parse()
            for section in content:
                parser.replace_section(section, content[section])

            parser.write()
            # print(file)
            # print(content)
            #print(parser.tostring())

    def generate_features(self, widgets={}, plugins={}, lang='de', sanitize=False):

        regex = re.compile("^\| :doc:`([^<]+)<([^>]+)>`\s+\|\s+([^\|]+).*$")
        section = "manual-%s" % lang
        image_prefix = self.config.get(section, "images").replace("<version>", self.config.get("DEFAULT", "develop-version-mapping"))
        link_prefix = self.config.get(section, "html").replace("<version>", self.config.get("DEFAULT", "develop-version-mapping"))
        with codecs.open(os.path.join(self.config.get(section, "widgets"), "index.rst"), encoding='utf-8') as f:
            for line in f.readlines():
                match = regex.match(line)
                if match is not None:

                    name = match.group(1).strip()
                    widget_rst = None
                    screenshot_folder = None
                    ref = match.group(2).strip()
                    link = os.path.join(self.config.get(section, "widgets"), ref)
                    is_plugin = 'plugins/' in ref

                    if os.path.exists(link+".rst"):
                        widget_rst = link+".rst"
                        screenshot_folder = link.replace("/index", "/_static/")
                        link += ".html"
                    else:
                        link = None

                    widget_key = ref.split("/")[1] if is_plugin else ref.split("/")[0]

                    desc = match.group(3).strip()
                    screenshot = self._find_screenshot(widget_key, widget_rst) if widget_rst is not None else None
                    features = plugins if is_plugin else widgets
                    if name not in features:
                        features[name] = {
                            'name': name,
                            'description': {},
                            'manual': {},
                            'screenshot': {}
                        }
                    if desc is not None:
                        features[name]['description'][lang] = desc
                    if link is not None:
                        features[name]['manual'][lang] = "%s/%s.html" % (link_prefix, ref)

                    if screenshot is not None and os.path.exists(os.path.join(screenshot_folder, screenshot)):
                        features[name]['screenshot'][lang] = "%s/%s" % (image_prefix, screenshot)
                    if sanitize:
                        if len(features[name]['screenshot']) == 0:
                            del features[name]['screenshot']
                        elif len(features[name]['screenshot']) == 1:
                            features[name]['screenshot'] = list(features[name]['screenshot'].values())[0]
                        if len(features[name]['manual']) == 0:
                            del features[name]['manual']

        return widgets, plugins

    def _find_screenshot(self, name, widget_rst):
        example = re.compile('.*<screenshot name="([^"]+)"\s*/?>.*')
        figure = re.compile('.. figure:: _static/(.+)')
        with open(widget_rst) as f:
            for line in f.readlines():
                match = example.match(line)

                if match is None:
                    match = figure.match(line)
                    if match and name in match.group(1):
                        return match.group(1)
                else:
                    if name in match.group(1):
                        return "%s.png" % match.group(1)

        return None

    def _key_sort_versions(self, a):
        return LooseVersion(a.split("|")[0])

    def process_versions(self, path):
        root, dirs, files = list(os.walk(path))[0]
        for lang_dir in dirs:
            if lang_dir[0:1] != "." and len(lang_dir) == 2:
                print("checking versions in language: %s" % lang_dir)
                # collect versions and symlinks
                root, dirs, files = list(os.walk(os.path.join(path, lang_dir)))[0]
                symlinks = {}
                versions = []
                special_versions = []
                for version_dir in dirs:
                    version = version_dir
                    if os.path.exists(os.path.join(path, lang_dir, version_dir, "version")) and re.match("^[0-9]+\.[0-9]+\.?[0-9]*$", version) is not None:
                        with open(os.path.join(path, lang_dir, version_dir, "version")) as f:
                            version = f.read().rstrip('\n')
                    if os.path.islink(os.path.join(root, version_dir)):
                        symlinks[version_dir] = os.readlink(os.path.join(root, version_dir)).rstrip("/")
                    elif re.match("^[0-9]+\.[0-9]+.*$", version) is not None:
                        versions.append(version if version == version_dir else "%s|%s" % (version, version_dir))
                    else:
                        special_versions.append(version if version == version_dir else "%s|%s" % (version, version_dir))

                # max_version = max_ver(versions)
                versions.sort(key=self._key_sort_versions)
                max_version = None
                max_version_path = None
                found_max = False
                if len(versions) > 0:
                    for version in versions[::-1]:
                        max_version = version
                        if "|" in max_version:
                            max_version, max_version_path = max_version.split("|")
                        else:
                            max_version_path = max_version
                        if re.match(".+-RC[0-9]+$", max_version) is None:
                            found_max = True
                            break

                print("versions found: %s (%s)" % (versions, special_versions))

                # saving versions to json file
                try:
                    with open(self.config.get("DEFAULT", "versions-file-%s" % lang_dir), "w+") as f:
                        f.write(dumps({
                            "versions": versions+special_versions,
                            "symlinks": symlinks
                        }))
                except configparser.NoOptionError:
                    pass

    def run(self, args):
        parser = ArgumentParser(usage="%(prog)s - CometVisu documentation generator")

        parser.add_argument("--force", "-f", dest="force", action='store_true', help="force existing docs to be overridden")

        parser.add_argument("--complete", "-c", dest="complete", action='store_true', help="Complete run: generate docs + screenshots")

        parser.add_argument("--language", "-l", dest="language", default="de",
                            help="Language of documentation (only available for manual)")

        parser.add_argument("--target", dest="target",
                            help="Target dir for generation")

        parser.add_argument("--browser", "-b", dest="browser", default="chrome",
                            help="Browser used for screenshot generation")

        parser.add_argument('--doc-type', "-dt", dest="doc", default="manual",
                            type=str, help='type of documentation to generate (manual, source)', nargs='?')

        parser.add_argument("--from-source", dest="from_source", action="store_true", help="generate english manual from source comments")
        parser.add_argument("--generate-features", dest="features", action="store_true", help="generate the feature YAML file")
        parser.add_argument("--move-apiviewer", dest="move_apiviewer", action="store_true", help="move the generated apiviewer to the correct version subfolder")
        parser.add_argument("--move-apiviewer-screenshots", dest="move_apiviewer_screenshots", action="store_true", help="move the generated apiviewer screenshots to the correct version subfolder")
        parser.add_argument("--process-versions", dest="process_versions", action="store_true", help="update symlinks to latest/develop docs and weite version files")
        parser.add_argument("--get-version", dest="get_version", action="store_true", help="get version")
        parser.add_argument("--screenshot-build", "-t", dest="screenshot_build", default="source", help="Use 'source' od 'build' to generate screenshots")
        parser.add_argument("--target-version", dest="target_version", help="version target subdir, this option overrides the auto-detection")
        parser.add_argument("--get-target-version", dest="get_target_version", action="store_true", help="returns version target subdir")

        options = parser.parse_args(args)

        if options.features:
            widgets = {}
            plugins = {}
            self.generate_features(widgets=widgets, plugins=plugins, lang="de")
            self.generate_features(widgets=widgets, plugins=plugins, lang="en", sanitize=True)

            features = {
                'widgets': [widgets[i] for i in sorted(widgets)],
                'plugins': [plugins[i] for i in sorted(plugins)]
            }
            with open(self.config.get("DEFAULT", "features-file"), 'w') as f:
                yaml.safe_dump(features, f,
                               default_flow_style=False,
                               encoding='utf-8',
                               indent=2,
                               width=10000,
                               default_style='"',
                               allow_unicode=True)

        elif options.get_version:
            print(self._get_doc_version())

        elif options.get_target_version:
            print(self._get_doc_target_path())

        elif options.process_versions:
            self.process_versions(self.config.get("DEFAULT", "doc-dir"))

        elif options.from_source:
            self.from_source(self.config.get("manual-en", "widgets-path"))
            self.from_source(self.config.get("manual-en", "plugins-path"), plugin=True)

        elif options.move_apiviewer:
            # move to the correct dir
            target_dir = options.target if options.target is not None else os.path.join(self.root_dir, self.config.get("api", "target"))
            target_dir = target_dir.replace("<version>", options.target_version if options.target_version is not None else self._get_doc_version())
            shutil.move(self.config.get("api", "generator_target"), target_dir)

        elif options.move_apiviewer_screenshots:
            # move to the correct dir
            target_dir = options.target if options.target is not None else os.path.join(self.root_dir, self.config.get("api", "target"))
            target_dir = target_dir.replace("<version>", options.target_version if options.target_version is not None else self._get_doc_version())
            screenshots_dir = self.config.get("api", "screenshots-path")
            screenshots_parent_dir = "/".join(screenshots_dir.split("/")[0:-1])
            shutil.move(os.path.join(self.config.get("api", "generator_target"), screenshots_dir), os.path.join(target_dir, screenshots_parent_dir))

        elif 'doc' not in options or options.doc == "manual":
            self._run(options.language, options.target, options.browser, force=options.force,
                      skip_screenshots=not options.complete, screenshot_build=options.screenshot_build,
                      target_version=options.target_version)
            sys.exit(0)

        elif options.doc == "source":
            cmd = "CV_VERSION=%s npm run api" % self._get_doc_version()
            subprocess.call(cmd, shell=True)

        else:
            self.log.error("generation of '%s' documentation is not available" % options.type)
            sys.exit(1)
