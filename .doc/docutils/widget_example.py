import xml.etree.ElementTree as ET
from docutils import nodes
from docutils.parsers.rst import directives, Directive
from docutils.utils.code_analyzer import Lexer, LexerError, NumberLines
from os import path


class WidgetExampleDirective(Directive):
    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        'number-lines': directives.unchanged # integer or None
    }
    has_content = True

    example_dir = path.join("cache", "widget_examples", "manual")
    config_parts = {
        "start": '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="8" design="%%%DESIGN%%%" xsi:noNamespaceSchemaLocation="../visu_config.xsd">',
        "meta": '<meta/>',
        "content_start": '<page name="Example">',
        "content_end": '</page>',
        "end":   '</pages>'
    }

    def run(self):
        cv_meta = None
        meta = None
        self.assert_has_content()
        source = "\n".join(self.content)
        print("Source: '%s'" % source)
        try:
            # we need one surrouding element to prevent parse errors
            xml = ET.fromstring("<root>%s</root>" % source)
            for child in xml:
                print(child)
                if ET.iselement(child):
                    if child.tag == "meta":
                        # meta settings
                        meta = child
                    elif child.tag == "cv-meta":
                        # config meta settings
                        cv_meta = child
                        cv_meta.tag = "meta"
                    else:
                        # the config example
                        config = child
        except Exception as e:
            print("Parse error: %s" % str(e))

        example_content = ET.tostring(config, encoding='utf-8')
        if cv_meta:
            example_content = b"...\n%s...\n%s" % (ET.tostring(cv_meta, encoding='utf-8'), example_content)

        # create the code-block
        classes = ['code', 'xml']
        # set up lexical analyzer
        try:
            tokens = Lexer(example_content, 'xml',
                           self.state.document.settings.syntax_highlight)
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

        node = nodes.literal_block(example_content, classes=classes)

        self.add_name(node)
        # if called from "include", set the source
        if 'source' in self.options:
            node.attributes['source'] = self.options['source']
        # analyze content and add nodes for every token
        for classes, value in tokens:
            # print (classes, value)
            if classes:
                node += nodes.inline(value, value, classes=classes)
            else:
                # insert as Text to decrease the verbosity of the output
                node += nodes.Text(value, value)

        return [node]


directives.register_directive("widget_example", WidgetExampleDirective)