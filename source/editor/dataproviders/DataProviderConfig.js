/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Provide a configuration/list of available data-providers for attributes.
 * 
 * May be used for any attribute which is defined in the schema/xsd and referenced by a globally defined type
 *
 *
 * LICENSE: This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://opensource.org/licenses/gpl-license.php>;.
 *
 * @category    editor
 * @package     CometVisu
 * @author      Julian Makowski (julian at makowskis dot de)
 * @copyright   2012 Julian Makowski
 * @license     GPLv3 or later, http://opensource.org/licenses/gpl-license.php
 * @version     SVN: $Id$
 * @link        http://cometvisu.de
 * @since       2012-10-17
 */

var DataProviderConfig = {
  'address': {
    '_nodeValue':  {
      url: 'editor/dataproviders/list_all_addresses.php',
      cache: false,
      userInputAllowed: true,
      grouped: true,
    },
  },
  'rrd': {
    '_nodeValue':  {
      url: 'editor/dataproviders/list_all_rrds.php',
      cache: true,
      userInputAllowed: true,
    },
  },
  'influx': {
    'measurement':  {
      live: getInfluxMeasurements,
      cache: false,
      userInputAllowed: false,
    },
    'field':  {
      live: getInfluxFields,
      cache: false,
      userInputAllowed: false,
    },
  },
  'tag': {
    'key': {
      live: getInfluxTags,
      cache: false,
      userInputAllowed: false,
    },
    'value': {
      live: getInfluxTagValues,
      cache: false,
      userInputAllowed: false,
    }
  },
  'icon': {
    'name':  {
      url: 'editor/dataproviders/list_all_icons.php',
      cache: true,
      userInputAllowed: false,
    },
  },
  'plugin': {
    'name':  {
      url: 'editor/dataproviders/list_all_plugins.php',
      cache: true,
      userInputAllowed: false,
    },
  },
  'pages': {
    'design':  {
      url: 'resource/designs/get_designs.php',
      map: function(element) {
        return {value: element, label: element};
      },
      cache: true,
      userInputAllowed: false,
    },
  },
  // wildcard: will match ANY elements attribute (lower prio than an exact element-attribute-match)
  '*': {
    'rrd':  {
      url: 'editor/dataproviders/list_all_rrds.php',
      cache: true,
      userInputAllowed: true,
    },
    'ga':  {
      url: 'editor/dataproviders/list_all_addresses.php',
      cache: false,
      userInputAllowed: true,
      grouped: true,
    },
    'transform':  {
      url: 'editor/dataproviders/dpt_list.json',
      cache: true,
      userInputAllowed: false,
    },
    'styling': {
      live: function() {
        var stylings = [];
        // find all current stylings and their names
        $('#config').find('.element > .name.nodeType_styling .nameValue').each(function () {
          var text = $(this).text();

          // create an object for this styling
          var styling = {value: text, label: text};

          // push it to the stack
          stylings.push(styling);
        });

        // and off we go.
        return stylings;
      },
      cache: false,
      userInputAllowed: false,
    },
    'mapping': {
      live: function() {
        var stylings = [];
        // find all current mappings and their names
        $('#config').find('.element > .name.nodeType_mapping .nameValue').each(function () {
          var text = $(this).text();

          // create an object for this styling
          var styling = {value: text, label: text};

          // push it to the stack
          stylings.push(styling);
        });

        // and off we go.
        return stylings;
      },
      cache: false,
      userInputAllowed: false,
    },
  },
};

// Special cases:

var influxCache = {};
function getInfluxMeasurements( element ) {
  var
    auth = element.attributes.authentication;

  if( !(auth in influxCache) )
    influxCache[ auth ] = {};

  if( !('' in influxCache[ auth ]) ) {
    $.ajax('editor/dataproviders/list_all_influxdbs.php' + (auth ? '?auth=' + auth : ''),
      {
        dataType: 'json',
        async: false, // at this point, we can no longer async!
        success: function (result) {
          influxCache[auth][''] = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          var result = new Result(false, Messages.dataProvider.loadingError, [textStatus, errorThrown]);
          $(document).trigger('dataprovider_loading_error', [result]);
          influxCache[auth][''] = [];
        }
      }
    );
  }
  return influxCache[ auth ][''];
}
// get the InfluxDB tag and values for the measurement source of the parent influx element.
// also cache it as it is relevant for each tag element below this influx element and it won't change between the
// different measurements
// Return tag key/value data for given measurement. When not available yet put it in the cache first.
function retrieveInfluxCache( measurement, type, auth ) {
  if( undefined === auth )
    auth = '';

  if( !(auth in influxCache) )
    influxCache[ auth ] = {};

  if( !(measurement in influxCache[ auth ] ) )
    influxCache[ auth ][ measurement ] = {};

  if( !(type in influxCache[ auth ][ measurement ]) ) {
    var uri = type === 'tags'
      ? 'editor/dataproviders/list_relevant_influxdb_tags.php?measurement='
      : 'editor/dataproviders/list_relevant_influxdb_fields.php?measurement=';
    $.ajax( uri + measurement + (auth?'&auth='+auth:''),
      {
        dataType: 'json',
        async: false, // at this point, we can no longer async!
        success: function (result) {
          influxCache[ auth ][ measurement ][ type ] = result;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          var result = new Result(false, Messages.dataProvider.loadingError, [textStatus, errorThrown]);
          $(document).trigger('dataprovider_loading_error', [result]);
          influxCache[ auth ][ measurement ][ type ] = [];
        }
      }
    );
  }

  return influxCache[ auth ][ measurement ][ type ];
}
// Return the known tag keys for the measurement of the element
function getInfluxTags( element ) {
  var influx = element;
  // walk the tree to get the selected data source in the influx element
  while( 'influx' != influx.name )
  {
    influx = influx.getParentElement();
    if( undefined === influx )
      return []; // this safety measure can not happen without a bug somewhere!
  }
  var data = retrieveInfluxCache( influx.attributes.measurement, 'tags', influx.attributes.authentication  );
  return Object.keys(data).map( function(x){ return { value:x, label: x }; } );
}
// Return the known tag values for the key of the tag of the measurement of the element
function getInfluxTagValues( element ) {
  var influx = element;
  // walk the tree to get the selected data source in the influx element
  while( 'influx' != influx.name )
  {
    influx = influx.getParentElement();
    if( undefined === influx )
      return []; // this safety measure can not happen without a bug somewhere!
  }
  var data = retrieveInfluxCache(influx.attributes.measurement, 'tags', influx.attributes.authentication );

  if( !(element.attributes.key in data) )
    return [];

  return data[element.attributes.key].map( function(x){ return { value:x, label: x }; } );
}
// Return the known fields for the measurement of the element
function getInfluxFields( element ) {
  var influx = element;
  // walk the tree to get the selected data source in the influx element
  while( 'influx' != influx.name )
  {
    influx = influx.getParentElement();
    if( undefined === influx )
      return []; // this safety measure can not happen without a bug somewhere!
  }
  var data = retrieveInfluxCache(influx.attributes.measurement, 'fields', element.attributes.authentication );

  return data;
}