# -*- coding: utf-8 -*-
import json

import sphinx_rtd_theme
import sys, os

root_dir = os.path.abspath(os.path.join('..', '..', '..'))

extensions_path = os.path.join(root_dir, '.doc', 'docutils', 'directives')

sys.path.insert(0, extensions_path)

extensions = ['sphinx.ext.todo',
              'sphinx.ext.coverage',
              'sphinx.ext.ifconfig',
              'sphinxcontrib.plantuml',
              'widget_example',
              'parameter_information',
              'elements_information']

todo_include_todos = True
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'
exclude_patterns = []
add_function_parentheses = True
#add_module_names = True
# A list of ignored prefixes for module index sorting.
#modindex_common_prefix = []
language = 'de'

project = 'CometVisu'
copyright = '2010-2016 Christian Mayer and the CometVisu contributers'

with open(os.path.join(root_dir, "package.json")) as data_file:
    data = json.load(data_file)
    version = data['version']

release = ''

# -- Options for HTML output ---------------------------------------------------

html_theme = 'sphinx_rtd_theme'
html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]
html_title = "CometVisu"
#html_short_title = None
html_logo = os.path.join(root_dir, "src", "icon", "comet_webapp_icon_android_48.png")
#html_favicon = None
html_static_path = ['_static']
html_domain_indices = False
html_use_index = True
html_show_sphinx = False
htmlhelp_basename = 'CometVisu'
html_show_sourcelink = False

# -- Options for LaTeX output --------------------------------------------------

latex_elements = {
    'papersize': '',
    'fontpkg': '',
    'fncychap': '',
    'maketitle': '\\cover',
    'pointsize': '',
    'preamble': '',
    'releasename': "",
    'babel': '',
    'printindex': '',
    'fontenc': '',
    'inputenc': '',
    'classoptions': '',
    'utf8extra': '',

}

#latex_additional_files = ["mfgan-bw.sty", "mfgan.sty", "_static/cover.png"]

latex_documents = [
    ('index', 'music-for-geeks-and-nerds.tex', u'Music for Geeks and Nerds',
     u'Pedro Kroger', 'manual'),
]

latex_show_pagerefs = False
latex_domain_indices = False
latex_use_modindex = False
#latex_logo = None
#latex_show_urls = False

# -- Options for Epub output ---------------------------------------------------

epub_title = project
epub_copyright = copyright

epub_theme = 'epub2'

# The scheme of the identifier. Typical schemes are ISBN or URL.
#epub_scheme = ''

# The unique identifier of the text. This can be a ISBN number
# or the project homepage.
#epub_identifier = ''

# A unique identification for the text.
#epub_uid = ''

# A tuple containing the cover image and cover page html template filenames.
epub_cover = ("_static/cover.png", "epub-cover.html")

# HTML files that should be inserted before the pages created by sphinx.
# The format is a list of tuples containing the path and title.
#epub_pre_files = []

# HTML files shat should be inserted after the pages created by sphinx.
# The format is a list of tuples containing the path and title.
#epub_post_files = []

# A list of files that should not be packed into the epub file.
epub_exclude_files = []

# The depth of the table of contents in toc.ncx.
epub_tocdepth = 2

# Allow duplicate toc entries.
epub_tocdup = False


# -- Options for Mobi output ---------------------------------------------------

mobi_theme = "mobi"
mobi_title = project
mobi_copyright = copyright

# The scheme of the identifier. Typical schemes are ISBN or URL.
#mobi_scheme = ''

# The unique identifier of the text. This can be a ISBN number
# or the project homepage.
#mobi_identifier = ''

# A unique identification for the text.
#mobi_uid = ''

mobi_cover = "_static/cover.png"

# HTML files that should be inserted before the pages created by sphinx.
# The format is a list of tuples containing the path and title.
#mobi_pre_files = []

# HTML files shat should be inserted after the pages created by sphinx.
# The format is a list of tuples containing the path and title.
#mobi_post_files = []

# A list of files that should not be packed into the mobi file.
mobi_exclude_files = []

# The depth of the table of contents in toc.ncx.
mobi_tocdepth = 2

# Allow duplicate toc entries.
mobi_tocdup = False

mobi_add_visible_links = False


# -- Options for Code Examples output ---------------------------------------------------


code_example_dir = "code-example"
code_add_python_path = ["../py"]


################################################################################


def setup(app):
    app.add_stylesheet('theme_override.css')
    from sphinx.util.texescape import tex_replacements
    tex_replacements += [(u'♮', u'$\\natural$'),
                         (u'ē', u'\=e'),
                         (u'♩', u'\quarternote'),
                         (u'↑', u'$\\uparrow$'),
                         ]