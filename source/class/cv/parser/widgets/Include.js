/* Include.js 
 * 
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
 * Includes other configuration snippets. Note that this is no widget shown in your visualization it just gives
 * you the opportunity to split you configuration into multiple files. If you have a large configuration file
 * splitting it up might help to keep track of your configuration.
 * The path to the included files must be relative to the root folder (the one with the index.html).
 *
 * <h4>Example</h4>
 * <pre class="sunlight-highlight-xml">
 * &lt;page&gt;
 *  &lt;include src=&quot;config/part1.xml&quot;/&gt;
 *  &lt;include src=&quot;config/part2.xml&quot;/&gt;
 * &lt;/page&gt;
 * </pre>
 *
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
qx.Class.define('cv.parser.widgets.Include', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    maturity: cv.Config.Maturity.development,
    __xhr: null,

    getRequest: function(url) {
      url = qx.util.ResourceManager.getInstance().toUri(url);
      if (!this.__xhr) {
        this.__xhr = new qx.io.request.Xhr(url);
        this.__xhr.set({
          accept: "application/xml",
          async: false
        });
      } else {
        this.__xhr.setUrl(url);
      }
      return this.__xhr;
    },

    parse: function( xml, path, flavour, pageType ) {
      var xhr = this.getRequest(xml.getAttribute("src"));
      var children = [];
      xhr.addListenerOnce("success", function(e) {
        var req = e.getTarget();
        var xml = req.getResponse();
        qx.dom.Hierarchy.getChildElements(xml).forEach(function(child, idx) {
          var childData = cv.parser.WidgetParser.parse(child, path + '_' + idx, flavour, pageType);
          children.push(childData);
        }, this);
      }, this);
      xhr.send();
      return children;
    }
  },

  defer: function(statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler("include", statics);
  }
});