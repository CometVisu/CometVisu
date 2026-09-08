/* D3.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * Loads the bundled d3 library and applies the locale of the visualisation to it.
 *
 * Everything that draws with d3 waits for {@link cv.util.D3#load}. The script itself is only
 * requested once, no matter how many components ask for it.
 *
 * @asset(libs/d3.min.js)
 * @asset(libs/d3.min.js.map)
 * @ignore(d3)
 */
qx.Class.define('cv.util.D3', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * The time format locale d3 has been set up with, used to format dates with a pattern.
     * Available once the promise of load() has resolved.
     */
    TF: null,

    __loaded: null,

    /**
     * Loads d3 and localizes it. Repeated calls return the same promise.
     * @return {Promise} resolves when window.d3 is usable
     */
    load() {
      if (!cv.util.D3.__loaded) {
        cv.util.D3.__loaded = cv.util.D3.__include().then(() => cv.util.D3.__localize());
      }

      return cv.util.D3.__loaded;
    },

    /**
     * Adds the script tag and waits for the library to appear in the window.
     * @return {Promise}
     */
    __include() {
      return new Promise(async (resolve, reject) => {
        const check = () => typeof window.d3 === 'object';
        try {
          await cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
        } catch (e) {
          qx.log.Logger.error(cv.util.D3, 'Error loading D3:', e);
          reject(new Error('Error loading d3 library'));
          return;
        }

        if (check()) {
          resolve(true);
          return;
        }

        const timer = new qx.event.Timer(50);
        let counter = 0;
        timer.addListener('interval', () => {
          counter++;
          if (check()) {
            timer.stop();
            resolve(true);
          } else if (counter > 5) {
            timer.stop();
            qx.log.Logger.error(cv.util.D3, 'Error loading D3: D3 did not load within expected time');
            reject(new Error('Error loading d3 library'));
          }
        });
        timer.start();
      });
    },

    /**
     * Applies the number and date formats of the current locale to d3.
     */
    __localize() {
      if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
        d3.formatDefaultLocale({
          decimal: qx.locale.Number.getDecimalSeparator().translate().toString(),
          thousands: qx.locale.Number.getGroupSeparator().translate().toString(),
          grouping: [3],
          currency: ['€', '']
        });

        cv.util.D3.TF = d3.timeFormatDefaultLocale({
          dateTime: '%A, der %e. %B %Y, %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],

          days: qx.locale.Date.getDayNames('wide', null, 'format').map(t => t.translate().toString()),
          shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(t => t.translate().toString()),
          months: qx.locale.Date.getMonthNames('wide').map(t => t.translate().toString()),
          shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(t => t.translate().toString())
        });
      } else {
        cv.util.D3.TF = d3.timeFormatDefaultLocale({
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],

          days: qx.locale.Date.getDayNames('wide', null, 'format').map(t => t.translate().toString()),
          shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(t => t.translate().toString()),
          months: qx.locale.Date.getMonthNames('wide').map(t => t.translate().toString()),
          shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(t => t.translate().toString())
        });
      }

      return true;
    }
  }
});
