#  Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
#
#  This program is free software; you can redistribute it and/or modify it
#  under the terms of the GNU General Public License as published by the Free
#  Software Foundation; either version 3 of the License, or (at your option)
#  any later version.
#
#  This program is distributed in the hope that it will be useful, but WITHOUT
#  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
#  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
#  more details.
#
#  You should have received a copy of the GNU General Public License along
#  with this program; if not, write to the Free Software Foundation, Inc.,
#  59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
#

from pathlib import Path

from sphinx_rtd_theme import setup as base_setup


# See https://www.sphinx-doc.org/en/master/development/theming.html
#         #distribute-your-theme-as-a-python-package
def setup(app):
    # Register the theme that can be referenced without adding a theme path
    app.add_html_theme(
        "sphinx_rtd_theme_cv", Path(__file__).absolute().parent
    )
    return base_setup(app)


__all__ = ["setup"]
