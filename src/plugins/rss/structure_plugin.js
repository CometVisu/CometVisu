/* structure_plugin.js (c) 2011 by Michael Markstaller [devel@wiregate.de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
*/

/**
 * This plugins integrates zrssfeed to display RSS-Feeds via Google-API 
 * *and* a parser for local feeds using jQuery 1.5+ into CometVisu.
 * rssfeedlocal is derived from simplerss and zrssfeed
 * rssfeedlocal is mainly meant to be used with rsslog.php and plugins
 * Examples
 *   <rss src="/visu/plugins/rss/rsslog.php" refresh="300" link="false" title="false"></rss>
 *   <rss src="http://www.tagesschau.de/xml/rss2" refresh="300">Test API</rss>
 *   <rss src="/visu/plugins/rss/tagesschau-rss2.xml" refresh="300" header="true" date="true"></rss>
 */

require.config({
  shim: {
    'plugins/rss/dep/zrssfeed/jquery.zrssfeed': ['jquery']
  }
});

define( ['structure_custom', 'plugins/rss/dep/zrssfeed/jquery.zrssfeed' ], function( VisuDesign_Custom ) {
  "use strict";

  VisuDesign_Custom.prototype.addCreator("rss", {
    create: function( page, path ) {
      var 
        $p = $(page),
        id = "rss_" + path,
        classes = templateEngine.design.setWidgetLayout( $p, path ),
        ret_val = '<div class="widget clearfix rss ' + classes + '">',
        label = '<div class="label">' + page.textContent + '</div>',
        rssstyle = ''
          + $p.attr('width' ) ? 'width:'  + $p.attr('width' ) : ''
          + $p.attr('height') ? 'height:' + $p.attr('height') : '',
        actor = '<div class="actor"><div class="rss_inline" id="' + id + '" style="' + rssstyle + '"></div>';

      var data = templateEngine.widgetDataInsert( path, {
          id:         id,
          src:        $p.attr("src"),
          label:      page.textContent,
          refresh:    $p.attr("refresh")*1000 || 0,
          limit:      $p.attr("limit") || 10,
          header:     $p.attr("header") || true,
          date:       $p.attr("date") || true,
          content:    $p.attr("content") || true,
          snippet:    $p.attr("snippet") || true,
          showerror:  $p.attr("showerror") || true,
          ssl:        $p.attr("ssl") || false,
          linktarget: $p.attr("linktarget") || "_new",
          link:       $p.attr("link") || true,
          title:      $p.attr("title") || true
        });
          
      templateEngine.postDOMSetupFns.push( function(){
          refreshRSS( path );
        });

      return ret_val + label + actor + '</div>';
    }
  });

  function refreshRSS( path ) {
    var
      data = templateEngine.widgetDataGet( path ),
      src = data.src;
    
    $('#'+path+' .rss_inline').rssfeed( src, data )
      
    if( data.refresh ) {
      // reload regularly
      window.setTimeout( function( path ) {
        refreshRSS( path )
      }, data.refresh, path );
    }
    //rss.data("itemoffset") = itemoffset;
    return false;
  }

});
