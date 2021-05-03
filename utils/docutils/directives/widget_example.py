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

from docutils import nodes, statemachine
from sphinx.util.nodes import set_source_info
from sphinx.directives.code import container_wrapper
from docutils.parsers.rst import directives, Directive
from docutils.utils.code_analyzer import Lexer, LexerError, NumberLines
from os import path
from lxml import etree

from helper.widget_example_parser import WidgetExampleParser

parser = WidgetExampleParser('manual')

def align(argument):
    align_values = ('left', 'center', 'right')
    return directives.choice(argument, align_values)


def editor(argument):
    align_values = ('attributes', 'elements')
    return directives.choice(argument, align_values)


class WidgetExampleDirective(Directive):
    """
    reStructuredText directive for widget examples. Extracts the example code, validates it against the
    XSD-File provided by CometVisu and creates an file with the relevant content the screenshot generation tool needs
    to create the screenshots. Additionally an code block preceeded by references to the screenshots is added to the rst
    document.

    .. code-block:: rst
        ..widget-example::
            :hide-source: false
            :number-lines: 1

            <settings design="metal" selector=".widget_container">
                <fixtures>
                    <fixture source-file="/path/to/read/file/from" target-path="/target/path/to/serve/file/from"/>
                </fixtures>
                <screenshot name="switch_mapping_styling">
                    <data address="1/4/0">0</data>
                </screenshot>
            </settings>
            <meta>
                <mappings>
                    <mapping name="OnOff">
                        <entry value="0">Aus</entry>
                        <entry value="1">An</entry>
                    </mapping>
                </mappings>
                <stylings>
                    <styling name="RedGreen">
                        <entry value="1">red</entry>
                        <entry value="0">green</entry>
                    </styling>
                </stylings>
            </meta>
            <switch on_value="1" off_value="0" mapping="OnOff" styling="RedGreen">
                <label>Kanal 1</label>
                <address transform="DPT:1.001" mode="readwrite">1/1/0</address>
                <address transform="DPT:1.001" mode="read">1/4/0</address>
            </switch>

    @author Tobias Bräutigam
    @since 0.10.0
    """
    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        'linenos': directives.flag,
        'lineno-start': int,
        'scale': int, # scale screenshot in percent
        'hide-source': directives.unchanged, # true or false
        'editor': editor,
        'align': align
    }
    has_content = True

    def add_caption(self, caption_string, node):
        cnode = nodes.Element()  # anonymous container for parsing
        sl = statemachine.StringList([caption_string], source='')
        self.state.nested_parse(sl, self.content_offset, cnode)
        caption = nodes.caption(caption_string, '', *cnode)
        if 'align' in self.options:
            caption['align'] = self.options['align']
        else:
            caption['align'] = 'center'
        node += caption

    def run(self):
        config = None
        # meta_node = None
        # settings_node = None
        # global_caption = None
        show_source = True
        editor = self.options['editor'] if 'editor' in self.options else None
        self.assert_has_content()
        source = "\n".join(self.content)
        source_path = self.state_machine.document.settings._source.split("%s%s" % (path.join("doc", "manual"), path.sep), 1)[1]
        screenshot_dir = path.join("doc", "manual", path.sep.join(source_path.split(path.sep)[0:-1]), "_static")
        parser.set_screenshot_dir(screenshot_dir)
        name = source_path[:-4].replace("/", "_")

        # visu_config_parts = self.config_parts.copy()
        parse_result = parser.parse(source, name, editor)
        # try:
        #     # we need one surrouding element to prevent parse errors
        #     xml = etree.fromstring("<root>%s</root>" % source)
        #     for child in xml:
        #         if etree.iselement(child):
        #
        #             if child.tag == "settings":
        #                 # meta settings
        #                 settings_node = child
        #             elif child.tag == "meta":
        #                 # config meta settings
        #                 meta_node = child
        #             elif child.tag == "caption":
        #                 global_caption = child.text
        #             else:
        #                 # the config example
        #                 config = child
        # except Exception as e:
        #     print("Parse error: %s" % str(e))

        # example_content = etree.tostring(config, encoding='utf-8')
        # if meta_node is not None:
        #     example_content = b"...\n%s...\n%s" % (etree.tostring(meta_node, encoding='utf-8'), example_content)
        #     visu_config_parts['meta'] = etree.tostring(meta_node, encoding='utf-8').decode('utf-8')
        #
        # settings = {
        #     "selector": ".widget_container",
        #     "screenshots": [],
        #     "screenshotDir": screenshot_dir
        # }
        # example_content = parse_result['example_content']
        # visu_config_parts['meta'] = parse_result['meta_content']
        # settings = parse_result['settings']
        # settings['screenshotDir'] = screenshot_dir
        # global_caption = parse_result['global_caption']

        if 'scale' in self.options:
            scale = max(1, min(100, int(self.options['scale'] or 100)))
            parse_result['settings']['scale'] = scale

        if editor is not None:
            # change screenshot + selector
            parse_result['settings']['editor'] = editor
            parse_result['settings']['widget'] = parse_result['example_tag']
            if editor == "attributes":
                parse_result['settings']['selector'] = "div[qxclass='cv.ui.manager.form.ElementForm']"
            elif editor == "elements":
                parse_result['settings']['selector'] = "#manager div[qxclass='qx.ui.virtual.layer.WidgetCell']"
            parse_result['settings']['screenshots'].append({
                "name": "%s_editor_%s" % (name, editor),
                "data": {}
            })
            show_source = False

        try:
            parser.save_screenshot_control_files(parse_result, name, editor=editor is not None)
        except etree.XMLSyntaxError as e:
            raise self.error(str(e))

        # elif settings_node is not None:
        #     # read meta settings
        #     design = settings_node.get("design", "metal")
        #     settings['selector'] = settings_node.get("selector", ".widget_container")
        #     if settings_node.get("sleep"):
        #         settings['sleep'] = settings_node.get("sleep")
        #
        #     for screenshot in settings_node.iter('screenshot'):
        #         shot = {
        #             "name": screenshot.get("name", name + str(counters[name] + shot_index)),
        #             "data": []
        #         }
        #         if screenshot.get("sleep"):
        #             shot['sleep'] = screenshot.get("sleep")
        #         if screenshot.get("clickpath", None):
        #             shot['clickPath'] = screenshot.get('clickpath')
        #         if screenshot.get("waitfor", None):
        #             shot['waitFor'] = screenshot.get('waitfor')
        #
        #         shot_index += 1
        #
        #         for data in screenshot.iter('data'):
        #             values = {
        #                 'address': data.get("address", "0/0/0"),
        #                 'value': data.text
        #             }
        #             if data.get("type"):
        #                 values['type'] = data.get("type")
        #
        #             shot['data'].append(values)
        #
        #         for caption in screenshot.iter('caption'):
        #             if 'caption' not in shot:
        #                 shot['caption'] = caption.text
        #             else:
        #                 shot['caption'] += caption.text
        #
        #         settings['screenshots'].append(shot)
        #
        #     for caption in settings_node.iterchildren('caption'):
        #         global_caption = caption.text

        # # no screenshots defined, add a default one
        # if len(settings['screenshots']) == 0:
        #     settings['screenshots'].append({
        #         "name": name + str(shot_index)
        #     })

        # # replace the design value in the config
        # visu_config_parts['start'] = visu_config_parts['start'].replace("%%%DESIGN%%%", design)
        # if config.tag == "page":
        #     visu_config_parts['content_start'] = ""
        #     visu_config_parts['content_end'] = ""
        #
        # # build the real config source
        # visu_config = visu_config_parts['start'] + \
        #               visu_config_parts['meta'] + \
        #               visu_config_parts['content_start']  + \
        #               etree.tostring(config, encoding='utf-8').decode('utf-8') + \
        #               visu_config_parts['content_end'] + \
        #               visu_config_parts['end']
        #
        # # validate generated config against XSD
        # try:
        #     etree.fromstring(visu_config, parser)
        # except etree.XMLSyntaxError as e:
        #     raise self.error(str(e))
        #
        # if not path.exists(self.example_dir):
        #     makedirs(self.example_dir)
        #
        # with open("%s_%s.xml" % (path.join(self.example_dir, name), parser.counters[name]), encoding='utf-8', mode="w") as f:
        #     f.write(u"%s\n%s" % (json.dumps(settings), visu_config))

        # create the code-block
        classes = ['code', 'xml']
        # set up lexical analyzer
        try:
            tokens = Lexer(parse_result['display_content'], 'xml', self.state.document.settings.syntax_highlight)
        except LexerError as error:
            raise self.warning(error)

        if 'number-lines' in self.options:
            # optional argument `startline`, defaults to 1
            try:
                startline = int(self.options['number-lines'] or 1)
            except ValueError:
                raise self.error(':number-lines: with non-integer start value')
            endline = startline + len(self.content)
            # add linenumber filter:
            tokens = NumberLines(tokens, startline, endline)

        if 'hide-source' in self.options and show_source:
            show_source = self.options['hide-source'] != "true"

        res_nodes = []
        for shot in parse_result['settings']['screenshots']:
            reference = "_static/%s.png" % shot['name']
            options = dict(uri=reference)
            if 'caption' in shot:
                options['alt'] = shot['caption']

            image_node = nodes.image(rawsource=shot['name'], **options)
            figure_node = nodes.figure('', image_node)
            if 'align' in self.options:
                figure_node['align'] = self.options['align']

            if 'caption' in shot:
                self.add_caption(shot['caption'], figure_node)

            elif not show_source and parse_result['global_caption'] and len(parse_result['settings']['screenshots']) == 1:
                self.add_caption(parse_result['global_caption'], figure_node)

            res_nodes.append(figure_node)

        if show_source:
            example_content = parse_result['display_content'].decode('utf-8')
            node = nodes.literal_block(example_content, example_content)
            node['language'] = 'xml'
            node['linenos'] = 'linenos' in self.options or \
                             'lineno-start' in self.options
            node['classes'] += self.options.get('class', [])

            set_source_info(self, node)

            if parse_result['global_caption']:
                self.options.setdefault('name', nodes.fully_normalize_name(parse_result['global_caption']))
                node = container_wrapper(self, node, parse_result['global_caption'])
            self.add_name(node)
            res_nodes.append(node)

        return res_nodes
