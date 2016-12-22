/* structure_plugin.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @author Michael Markstaller
 * @since 2011
 */
qx.Class.define('cv.plugins.RssLog', {
  extend: cv.structure.AbstractWidget,
  include: [cv.role.Refresh, cv.role.Update],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    src: {
      check: "String",
      nullable:true
    },
    filter: {
      check: "String",
      nullable:true
    },
    datetime: {
      check: "Boolean",
      init: true
    },
    mode: {
      check: "String",
      init: "last"
    },
    limit: {
      check: "Number",
      init: 0
    },
    timeformat: {
      check: "String",
      nullable:true
    },
    itemoffset: {
      check: "Number",
      init: 0
    },
    itemack: {
      check: ["modify", "display", "disable"],
      init: "modify"
    },
    future:     {
      check: "String",
      nullable: true
    },
    width: {
      check: "String",
      nullable: true
    },
    height: {
      check: "String",
      nullable: true
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    getAttributeToPropertyMappings: function() {
      return {
        src:    {},
        width:  {},
        height: {},
        filter: {},
        datetime:   {
          "default": true,
          transform: function(value) {
            return value === "true";
          }
        },
        mode:       { "default": "last" },
        limit:      { "default": 0, transform: parseFloat },
        timeformat: {},
        itemack:    { "default": "modify"}, // allowed: modify, display, disable
        future:     {}
      }
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __request: null,
    __html: null,
    __wrapper: null,

    _getInnerDomString: function () {
      var style = '';
      if (this.getWidth()) {
        style += "width:" + this.getWidth() + ';';
      }
      if (this.getHeight()) {
        style += "height:" + this.getHeight();
      }

      return '<div class="actor rsslogBody"><div class="rsslog_inline" id="rss_' + this.getPath() + '" style="' + style + '"></div>';
    },

    _setupRefreshAction: function() {
      this._timer = new qx.event.Timer(this.getRefresh());
      this._timer.addListener("interval", function () {
        this.refreshRSSlog();
      }, this);
      this._timer.start();
    },

    _onDomReady: function () {
      cv.MessageBroker.getInstance().subscribe("path." + this.getParentPage().getPath() + ".beforePageChange", this.refreshRSSlog, this);
      this.__html = '<span class="mappedValue" /><span>{text}</span>';
      if (this.getDatetime()) {
        this.__html = '{date}: ' + this.__html;
      }
      this.__wrapper = 'li';
    },

    _update: function () {
      this.refreshRSSlog();
    },

    _action: function () {
      var brss = qx.bom.Html.clean(['<div class="rsslog_popup" id="rss_' + this.getPath() + '_big"/>'])[0];
      var title = qx.dom.Node.getText(qx.bom.Selector.query('#' + this.getPath() + ' .label')[0]) || '';
      var popup = cv.ui.PopupHandler.showPopup("rsslog", {title: title, content: brss});
      var parent = cv.util.Tree.getParent(brss, "div", null, 1)[0];
      qx.bom.element.Style.setStyles(parent, {height: "90%", width: "90%", margin: "auto"}); // define parent as 100%!
      this._timer.stop();
      qx.event.Registration.addListener(brss, function(event) {
        // don't let the popup know about the click, or it will close on touch-displays
        event.stopPropagation();
      }, this);
      qx.event.Registration.addListener(popup, "close", function () {
        // reload main data - but only once (popup and popup_background are caught
        // here).
        // But delay it so that any change done to the data has a chance to
        // arrive here.

        if (qx.bom.element.Class.has(popup, 'popup') && this.getItemack() === 'modify') {
          qx.event.Timer.once(function () {
            this.refreshRSSlog();
          }, this, 100);
          for (var addr in this.getAddress()) {
            if (!(this.getAddress()[addr][1] & 2)) continue; // skip when write flag not set
            cv.TemplateEngine.getInstance().visu.write(addr, cv.Transform.encode(this.getAddress()[addr][0], 0));
          }
        }
      }, this);
      qx.bom.element.Style.set(qx.bom.Selector.query('.main', popup)[0], "overflow", "auto");
      this.refreshRSSlog(true);
    },

    refreshRSSlog: function (isBig) {
      if (!this.__request) {
        var src = this.getSrc();
        if (!src) {
          this.error("no src given, aborting RSS-Log refresh");
          return;
        }
        var requestData = {};
        if (this.getFilter()) {
          requestData['f'] = this.getFilter();
        }
        if (this.getLimit()) {
          requestData['limit'] = this.getLimit();
        }
        if (this.getFuture()) {
          requestData['future'] = this.getFuture();
        }
        if (!src.match(/rsslog\.php/) && !src.match(/rsslog_mysql\.php/)) {
          requestData['url'] = src;
          src = "plugins/rsslog/rsslog_external.php";
        } else {
          requestData['j'] = 1;
        }
        this.__request = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri(src));
        this.__request.set({
          accept: "application/json",
          requestData: requestData,
          method: "GET"
        });
        this.__request.addListener("success", this.__updateContent, this);
        this.__request.addListener("error", function(ev) {
          this.error('C: #rss_%s, Error: %s, Feed: %s', this.getPath(), ev.getTarget().getResponse(), src);
        }, this)
      }
      this.__request.setUserData("selector", '#rss_' + this.getPath() + (isBig === true ? '_big' : ''));
      this.__request.send();

      var refresh = this.getRefresh();
      if (typeof (refresh) != "undefined" && refresh) {
        // reload regularly
        if (this._timer && this._timer.isEnabled()) {
          this._timer.start();
        }
      }
    },

    __updateContent: function(ev) {
      var result = ev.getTarget().getResponse();
      if (qx.lang.Type.isString(result)) {
        // no json -> error
        this.error(result);
        return;
      }
      var isBig = this.__isBig;
      var c = qx.bom.Selector.query('#rss_' + this.getPath() + (isBig === true ? '_big' : ''))[0];
      var itemack = isBig === true ? this.getItemack() : ( 'modify' === this.getItemack() ? 'display' : this.getItemack());

      //console.log('C: #%s, Success, Feed: %s', $(c).attr('id'), o.src);

      qx.dom.Element.empty(c);
      var ul = qx.dom.Element.create("ul");
      qx.dom.Element.insertEnd(ul, c);

      // get height of one entry, calc max num of display items in widget
      var displayrows = qx.bom.element.Dataset.get(c, "last_rowcount") || 0;
      qx.bom.Html.clean(['<li class="rsslogRow odd" id="dummydiv">.</li>'], null, c)[0];
      var dummyDiv = qx.bom.Selector.query('#dummydiv', c)[0];
      var itemheight = qx.bom.element.Dimension.getHeight(dummyDiv);
      qx.dom.Element.remove(dummyDiv);
      if (itemheight != 0) {
        var widget = qx.dom.Element.getParentElement(qx.dom.Element.getParentElement(c)); // get the parent widget
        var displayheight = qx.bom.element.Dimension.getHeight(widget);
        var labelElem = qx.bom.Selector.query('.label', widget)[0];
        if (labelElem) {
          // max. height of actor is widget-label(if exists)
          displayheight -= qx.bom.element.Dimension.getHeight(labelElem);
        }
        displayrows = Math.floor(displayheight / itemheight);
      }
      qx.bom.element.Dataset.set(c, "last_rowcount", displayrows);

      var items = result.feed.entries;
      var itemnum = items.length;
      //console.log('C: #%s, %i element(s) found, %i displayrow(s) available', $(c).attr('id'), itemnum, displayrows);

      var itemoffset = 0; // correct if mode='last' or itemnum<=displayrows

      if (itemnum > displayrows) { // no need to check mode if items are less than rows
        if (this.getMode() == 'first') {
          itemoffset = itemnum - displayrows;
        }
        if (this.getMode() == 'rollover') {
          itemoffset = qx.bom.element.Dataset.get(c, "itemoffset") || 0;
          if (itemoffset == itemnum) {
            itemoffset = 0;
          }
          qx.bom.element.Dataset.set(c, "itemoffset", itemoffset + 1);
        }
      }

      var row = 'rsslogodd';
      var last = itemoffset + displayrows;
      last = (last > itemnum) ? itemnum : last;

      var separatordate = new Date().strftime('%d');
      var separatoradd = false;
      var separatorprevday = false;
      var isFuture = false;

      for (var i = itemoffset; i < last; i++) {
        //console.log('C: #%s, processing item: %i of %i', $(c).attr('id'), i, itemnum);
        var idx = i;
        idx = (i >= itemnum) ? (idx = idx - itemnum) : idx;

        var item = items[idx];
        var itemHtml = this.__html;

        itemHtml = itemHtml.replace(/\{text\}/, item.content);
        var entryDate = new Date(item.publishedDate);
        if (entryDate) {
          itemHtml = (this.getTimeformat()) ?
            (itemHtml.replace(/\{date\}/, entryDate.strftime(this.getTimeformat()) + '&nbsp;')) :
            (itemHtml.replace(/\{date\}/, entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString() + '&nbsp;'));
          var thisday = entryDate.strftime('%d');
          separatoradd = ((separatordate > 0) && (separatordate != thisday));
          separatordate = thisday;
          isFuture = (entryDate > new Date() );
        }
        else {
          itemHtml = itemHtml.replace(/\{date\}/, '');
        }

        var rowElem = qx.dom.Element.create('li', { 'class' : 'rsslogRow ' + row });

        if (item.mapping !== '') {
          var mappedValue = this.applyMapping(itemack === 'disable' ? 0 : item.state, item.mapping);
          var span = qx.bom.Selector.query('.mappedValue', rowElem)[0];
          this.defaultValue2DOM(mappedValue, qx.lang.Function.curry(this._applyValueToDom, span));
        }
        if (separatoradd && idx !== 0) {
          qx.bom.element.Class.add(rowElem, 'rsslog_separator');
          separatorprevday = true;
        }
        else {
          separatorprevday = false;
        }

        if (separatorprevday == true) {
          qx.bom.element.Class.add(rowElem, 'rsslog_prevday');
        }

        if (isFuture) {
          qx.bom.element.Class.add(rowElem, (row == 'rsslogodd') ? 'rsslog_futureeven' : 'rsslog_futureodd');
        }

        qx.bom.element.Dataset.set(rowElem, 'id', item.id);
        qx.bom.element.Dataset.set(rowElem, 'mapping', item.mapping);
        if (item.tags) {
          var tmp = qx.bom.Selector.query('span', rowElem);
          item.tags.forEach(function(tag) {
            qx.bom.element.Class.add(tmp, tag);
          }, this);
        }
        if (item.state == 1 && itemack !== 'disable') {
          qx.bom.element.Class.add(rowEleme, "rsslog_ack");
        }

        if (itemack === 'modify') {
          qx.event.Registration.addListener(rowElem, "tap", function (ev) {
            var item = ev.getTarget();

            var id = qx.bom.element.Dataset.get(item, 'id');
            var mapping = qx.bom.element.Dataset.get(item, 'mapping');
            qx.bom.element.Class.toggle(item, "rsslog_ack");
            var state = +qx.bom.element.Class.has(item, "rsslog_ack"); // the new state is the same as hasClass
            if (mapping !== '') {
              var mappedValue = this.applyMapping(state, mapping);
              var span = qx.bom.Selector.query('.mappedValue', item)[0];
              qx.dom.Element.empty(span);
              this.defaultValue2DOM(mappedValue, qx.lang.Function.curry(this._applyValueToDom, span));
            }
            var req = new qx.io.request.Xhr(this.__request.getSrc());
            req.set({
              method: "GET",
              requestData: {
                'u': id,
                'state': state
              },
              accept: "application/json"
            });
            req.send();
          }, this);
        }

        qx.dom.Element.insertEnd(rowElem, ul);

        // Alternate row classes
        row = (row == 'rsslogodd') ? 'rsslogeven' : 'rsslogodd';
      }
    }
  },

  defer: function() {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/rsslog/rsslog.css');
    cv.xml.Parser.addHandler("rsslog", cv.plugins.RssLog);
  }
});