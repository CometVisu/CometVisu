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

from os import path, makedirs
from lxml import etree
from io import open
import json
import hashlib
from xml.sax.saxutils import escape
from settings import config, root_dir

xsd = etree.XMLSchema(etree.parse(path.join(root_dir, config.get("DEFAULT", "schema-file"))))
parser = etree.XMLParser(schema=xsd)

class WidgetExampleParser:

    config_parts = {
        "start": '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="9" design="%%%DESIGN%%%" xsi:noNamespaceSchemaLocation="../visu_config.xsd" scroll_speed="0">',
        "meta": '<meta/>',
        "content_start": '<page name="Example">',
        "content_end": '</page>',
        "end":   '</pages>'
    }
    screenshot_dir = None

    def __init__(self, mode):
        self.mode = mode
        self.example_dir = path.join("cache", "widget_examples", mode)
        self.counters = {}

    def set_screenshot_dir(self, dir):
        self.screenshot_dir = dir

    def parse(self, source, name="", editor=False):
        meta_node = None
        settings_node = None
        global_caption = None
        meta_content = None
        config_example = None

        if not name in self.counters:
            self.counters[name] = 0
        else:
            self.counters[name] += 1
        try:
            # we need one surrouding element to prevent parse errors
            xml = etree.fromstring("<root>%s</root>" % source)
            for child in xml:
                if etree.iselement(child):

                    if child.tag == "settings":
                        # meta settings
                        settings_node = child
                    elif child.tag == "meta":
                        # config meta settings
                        meta_node = child
                    elif child.tag == "caption":
                        global_caption = child.text
                    else:
                        # the config example
                        config_example = child
        except Exception as e:
            print("Parse error: %s" % str(e))

        example_content = etree.tostring(config_example, encoding='utf-8')
        display_content = example_content

        if meta_node is not None:
            display_content = b"...\n%s...\n%s" % (etree.tostring(meta_node, encoding='utf-8'), display_content)
            meta_content = etree.tostring(meta_node, encoding='utf-8').decode('utf-8')

        settings = {
            "selector": ".widget_container",
            "screenshots": [],
            "screenshotDir": self.screenshot_dir,
            "fixtures": []
        }
        design = "metal"

        shot_index = 0
        if settings_node is not None:
            # read meta settings
            design = settings_node.get("design", "metal")
            settings['selector'] = settings_node.get("selector", ".widget_container")
            if settings_node.get("sleep"):
                settings['sleep'] = settings_node.get("sleep")

            for fixture in settings_node.iter('fixture'):
                values = {
                    'sourceFile': fixture.get("source-file"),
                    'targetPath': fixture.get("target-path"),
                    'mimeType': fixture.get("mime-type")
                }
                settings['fixtures'].append(values)

            for screenshot in settings_node.iter('screenshot'):
                shot = {
                    "name": screenshot.get("name", name + str(self.counters[name] + shot_index)),
                    "data": []
                }

                shot_index += 1
                if screenshot.get("sleep"):
                    shot['sleep'] = screenshot.get("sleep")
                if screenshot.get("clickpath", None):
                    shot['clickPath'] = screenshot.get('clickpath')
                if screenshot.get("waitfor", None):
                    shot['waitFor'] = screenshot.get('waitfor')

                for data in screenshot.iter('data'):
                    values = {
                        'address': data.get("address", "0/0/0"),
                        'value': data.text
                    }
                    if data.get("type"):
                        values['type'] = data.get("type")

                    shot['data'].append(values)

                for caption in screenshot.iter('caption'):
                    if 'caption' not in shot:
                        shot['caption'] = caption.text
                    else:
                        shot['caption'] += caption.text

                settings['screenshots'].append(shot)

            for caption in settings_node.iterchildren('caption'):
                global_caption = caption.text

        # no screenshots defined, add a default one
        if len(settings['screenshots']) == 0 and editor is False:
            settings['screenshots'].append({
                "name": name + str(self.counters[name] + shot_index)
            })

        result = {
            "example_content": example_content,
            "display_content": display_content,
            "example_tag": config_example.tag,
            "meta_content": meta_content,
            "global_caption": global_caption,
            "settings": settings,
            "design": design
        }
        return result

    def save_screenshot_control_files(self, parsed, name="", editor=False):
        visu_config_parts = self.config_parts.copy()
        # replace the design value in the config
        visu_config_parts['start'] = visu_config_parts['start'].replace("%%%DESIGN%%%", parsed['design'])
        if parsed['example_tag'] == "page":
            visu_config_parts['content_start'] = ""
            visu_config_parts['content_end'] = ""

        if parsed['meta_content'] and len(parsed['meta_content']) > 0:
            # replace default value
            visu_config_parts['meta'] = parsed['meta_content']

        # build the real config source
        visu_config = visu_config_parts['start'] + \
                      visu_config_parts['meta'] + \
                      visu_config_parts['content_start'] + \
                      parsed['example_content'].decode('utf-8') + \
                      visu_config_parts['content_end'] + \
                      visu_config_parts['end']

        # validate generated config against XSD
        etree.fromstring(visu_config, parser)
        parsed["settings"]["config"] = visu_config

        # generate hash
        stripped_data = {k: v for k, v in parsed['settings'].items() if k != "screenshots"}
        base_hash_value = json.dumps(stripped_data, sort_keys=True).encode("utf-8")
        for shot in parsed["settings"]["screenshots"]:
            shot_dump = json.dumps(shot, sort_keys=True).encode("utf-8")
            shot["hash"] = hashlib.md5(base_hash_value+shot_dump).hexdigest()

        if not path.exists(self.example_dir):
            makedirs(self.example_dir)

        with open("%s_%s.json" % (path.join(self.example_dir, name), self.counters[name]), encoding='utf-8', mode="w") as f:
            f.write(u"%s" % json.dumps(parsed['settings'], indent=4))

    ##
    # "@widgetexample text"
    def parse_at_widgetexample(self, line):
        """ parse @widgetexample inside source code comments used by qx/tool/pylib/ecmascript/frontend/Comment.py """
        content = line[14:].strip()
        # set screenshot dir
        self.set_screenshot_dir(path.join(config.get("api", "generator_target"), "resource", "apiviewer", "examples"))
        parsed_result = self.parse(content, "source")
        text = ''
        try:
            self.save_screenshot_control_files(parsed_result, "source")
            for i, shot in enumerate(parsed_result['settings']['screenshots']):
                classes = "widget-example"
                if i % 2 == 0:
                    classes += " last"
                text += '<div class="%s">' % classes
                text += '<img id="%s" src="resource/apiviewer/examples/%s.png"' % (shot['name'], shot['name'])
                if 'caption' in shot:
                    text += ' alt="%s" title="%s"/>' % (shot['caption'].decode('utf-8'), shot['caption'].decode('utf-8'))
                    text += '<label for="'+shot['name']+'">'+shot['caption']+'</label>'
                else:
                    text += ' "/>'
                text += '</div>'
            if parsed_result['global_caption']:
                text += '<div class="caption">%s</div>' % parsed_result['global_caption'].decode('utf-8')
        except etree.XMLSyntaxError as e:
            print("ERROR: %s" % str(e))

        text += '<div class="code"><pre class="sunlight-highlight-xml">%s</pre></div>' % escape(parsed_result['display_content'])
        res = {
            'category' : 'description',
            'text' : text,
        }
        return res
