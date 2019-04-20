/*
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Utility functions for XML text editor
 * @since 0.11.0
 * @author Tobias Bräutigam
 */

function stringToXml(text) {
  var xmlDoc;
  if (window.DOMParser) {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, 'application/xml');
  }
  else {
    xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
    xmlDoc.async = false;
    xmlDoc.loadXML(text);
  }
  return xmlDoc;
}


var timerId = null;
function debounce(innerFunc, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(innerFunc, delay);
}

function saveConfig(filename, data) {
  return new Promise(function(resolve, reject) {
    $.ajax('../bin/save_config.php',
      {
        dataType: 'json',
        data: {
          config: filename,
          data: JSON.stringify([data]),
          configType: "string"
        },
        type: 'POST',
        cache: false,
        success: function (data) {
          if (!data) {
            // some weird generic error
            reject('configuration_saving_error');
            return;
          }

          if (data.success === false) {
            // we have an error.
            var message;

            if (data.message) {
              message = data.message;
            }
            reject("error saving config "+message);
            return;
          }

          // everything is pretty cool.
          resolve('configuration_saving_success');

        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject('configuration_saving_error', textStatus, errorThrown);
        }
      }
    );
  });
}