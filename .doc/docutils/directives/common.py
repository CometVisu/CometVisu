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

from docutils.parsers.rst import Directive
from os import path
import gettext
gettext.install('cv', localedir='locale')


class BaseDirective(Directive):
    locale = 'en'

    def init_locale(self):
        #locale = self.state_machine.document.settings.language_code
        # this is a hack, but as language_code settings returns 'en' its the only known way to get the locale
        self.locale = self.state_machine.document.settings._source.split(path.sep +"rst", 1)[0].split(path.sep)[-1]
        t = gettext.translation('cv', localedir='locale', languages=[self.locale])
        t.install()

    def normalize_values(self, values):
        if len(values) <= 1:
            return (" %s " % _("or")).join(values)
        else:
            return " ".join([", ".join(values[0:-1]), _("or"), values[-1]])
