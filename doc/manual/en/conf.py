# -*- coding: utf-8 -*-
import json
import sys, os, re
from datetime import date

root_dir = os.path.abspath(os.path.join('..', '..', '..'))

extensions_path = os.path.join(root_dir, 'utils', 'docutils', 'directives')

sys.path.insert(0, extensions_path)

extensions = ['sphinx.ext.todo',
              'sphinx.ext.coverage',
              'sphinx.ext.ifconfig',
              'sphinxcontrib.plantuml',
              'cometvisu',
              'sphinxcontrib.spelling'
              ]

todo_include_todos = True
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'
exclude_patterns = ['parts/*']
add_function_parentheses = True
#add_module_names = True
# A list of ignored prefixes for module index sorting.
#modindex_common_prefix = []
language = 'en'
locale_dirs = ["locale/"]

project = 'CometVisu'
copyright = '2010-%s Christian Mayer and the CometVisu contributers' % date.today().year

spelling_lang = 'en_US'
spelling_ignore_wiki_words = True
spelling_ignore_acronyms = True
spelling_filters = ["enchant.tokenize.URLFilter", "enchant.tokenize.EmailFilter"]

with open(os.path.join(root_dir, "package.json")) as data_file:
    data = json.load(data_file)
    version = data['version']

# read versions file
versions_file = os.path.join(root_dir, 'out', language, 'versions.json')
versions = []

if os.path.exists(versions_file):
    with open(versions_file) as f:
        data = json.load(f)
        for ver in data['versions']:
            versions.append((ver, '../%s/manual' % ver))

releaselevel = 'dev' if version[-4:] == '-dev' else 'release'
release = ''

versionpath = version
match = re.match("([0-9]+.[0-9]+).[0-9]+.*", version)
if match:
    versionpath = match.group(1)

# -- Options for HTML output ---------------------------------------------------

html_theme = 'cv_theme'
html_theme_options = {
    'canonical_url': ('https://www.cometvisu.org/CometVisu/%s/%s/manual/' % (language, versionpath) )
}
html_theme_path = [os.path.join(root_dir, 'utils', 'docutils', 'template')]
html_title = "CometVisu"
#html_short_title = None
html_logo = os.path.join(root_dir, "source", "resource", "icons", "comet_webapp_icon_android_48.png")
#html_favicon = None
html_static_path = ['_static']
html_domain_indices = False
html_use_index = True
html_show_sphinx = False
htmlhelp_basename = 'CometVisu'
html_show_sourcelink = False

if len(versions):
    html_context = {
        'versions': versions,
        'current_version': version
    }


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
    app.add_css_file('theme_override.css')
    app.add_config_value('releaselevel', '', 'env')

    from sphinx.util.texescape import tex_replacements
    tex_replacements += [(u'♮', u'$\\natural$'),
                         (u'ē', u'\=e'),
                         (u'♩', u'\quarternote'),
                         (u'↑', u'$\\uparrow$'),
                         ]
