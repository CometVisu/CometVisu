/* RssLog.js 
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
 * @author Michael Markstaller
 * @since 2011
 * @asset(plugins/rsslog/rsslog.css)
 */
qx.Class.define('cv.plugins.RssLog', {
  extend: cv.ui.structure.AbstractWidget,
  include: [cv.ui.common.Refresh, cv.ui.common.Update, cv.ui.common.Operate],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    src: {
      check: "String",
      nullable:true,
      transform: "normalizeUrl",
      apply: "_applySrc"
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
    },
    /**
     * Internal model for YQL data
     */
    model: {
      check : "qx.data.Array",
      nullable: true,
      apply: "_applyModel"
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     * @return {Map} extracted data from config element as key/value map
     */
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());
      cv.parser.WidgetParser.parseFormat(xml, path);
      cv.parser.WidgetParser.parseAddress(xml, path);
      cv.parser.WidgetParser.parseRefresh(xml, path);
      return data;
    },

    getAttributeToPropertyMappings: function() {
      return {
        src:    {},
        width:  {},
        height: {},
        filter: {},
        datetime:   {
          "default": true,
          transform: function(value) {
            if (typeof value === 'boolean') {
              return value;
            }
            return value === "true";
          }
        },
        mode:       { "default": "last" },
        limit:      { "default": 0, transform: parseFloat },
        timeformat: {},
        itemack:    { "default": "modify"}, // allowed: modify, display, disable
        future:     {},
        query:      {}
      };
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
    __fixedRequestData: null,
    __external : false,

    __separatordate: null,
    __separatoradd: null,
    __isFuture: null,
    __separatorprevday: null,

    /**
     * Strip querystring from URL and store is as Map
     * @param value {String} URL
     * @return {String} normalized URL
     */
    normalizeUrl: function(value) {
      this.__fixedRequestData = {};
      if (value && value.indexOf("?") > 0) {
        var parts = qx.util.Uri.parseUri(value);
        value = value.substring(0, value.indexOf("?"));
        this.__fixedRequestData = parts.queryKey;
      }
      return value;
    },

    // property apply
    _applySrc: function(value) {
      this.__external = !value.match(/rsslog\.php/) && !value.match(/rsslog_mysql\.php/) && !value.match(/rsslog_oh\.php/);
    },

    _getInnerDomString: function () {
      var style = '';
      if (this.getWidth()) {
        style += "width:" + this.getWidth() + ';';
      }
      if (this.getHeight()) {
        style += "height:" + this.getHeight();
      }

      return '<div class="actor rsslogBody"><div class="rsslog_inline" id="rss_' + this.getPath() + '" style="' + style + '"></div></div>';
    },

    _setupRefreshAction: function() {
      this._timer = new qx.event.Timer(this.getRefresh());
      this._timer.addListener("interval", function () {
        this.refreshRSSlog();
      }, this);
      this._timer.start();
    },

    _onDomReady: function () {
      if (!this.$$domReady) {
        this.base(arguments);
        qx.event.message.Bus.subscribe("path." + this.getParentPage().getPath() + ".beforePageChange", this.refreshRSSlog, this);
        this.__html = '<span class="mappedValue"></span><span>{text}</span>';
        if (this.getDatetime()) {
          this.__html = '{date}: ' + this.__html;
        }
        this.__wrapper = 'li';

        if (cv.Config.currentPageId === this.getParentPage().getPath()) {
          this.refreshRSSlog();
        }
      }
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
      qx.event.Registration.addListener(brss, "tap", function(event) {
        // don't let the popup know about the click, or it will close on touch-displays
        event.stopPropagation();
      }, this);
      qx.event.Registration.addListener(popup, "close", function () {
        // reload main data - but only once (popup and popup_background are caught
        // here).
        // But delay it so that any change done to the data has a chance to
        // arrive here.

        if (popup.getCurrentDomElement() && qx.bom.element.Class.has(popup.getCurrentDomElement(), 'popup') && this.getItemack() === 'modify') {
          qx.event.Timer.once(function () {
            this.refreshRSSlog();
          }, this, 100);
          for (var addr in this.getAddress()) {
            if (!cv.data.Model.isWriteAddress(this.getAddress()[addr])) { continue; }// skip when write flag not set
            cv.TemplateEngine.getInstance().visu.write(addr, cv.Transform.encode(this.getAddress()[addr][0], 0));
          }
        }
      }, this);
      qx.bom.element.Style.set(qx.bom.Selector.query('.main', popup.getCurrentDomElement())[0], "overflow", "auto");
      this.refreshRSSlog(true);
    },

    refreshRSSlog: function (isBig) {
      var src = this.getSrc();
      if (!src) {
        this.error("no src given, aborting RSS-Log refresh");
        return;
      }
      if (!this.__request) {
        if (!this.__external) {
          this.__refreshRss();
        }
        else {
          this.__refreshYql();
        }
      }
      this.__request.setUserData("big", isBig);
      if (this.__request instanceof qx.io.request.Xhr) {
        this.__request.send();
      } else if (this.__request instanceof qx.data.store.Yql) {
        this.__request.reload();
      }

      var refresh = this.getRefresh();
      if (typeof (refresh) !== "undefined" && refresh) {
        // reload regularly
        if (this._timer && this._timer.isEnabled()) {
          this._timer.start();
        }
      }
    },

    /**
     * Fetch data from builtin PHP script
     */
    __refreshRss: function() {
      var src = this.getSrc();
      var requestData = qx.lang.Object.clone(this.__fixedRequestData);
      if (this.getFilter()) {
        requestData.f = this.getFilter();
      }
      if (this.getLimit()) {
        requestData.limit = this.getLimit();
      }
      if (this.getFuture()) {
        requestData.future = this.getFuture();
      }
      requestData.j = 1;
      this.__request = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri(src));
      this.__request.set({
        accept: "application/json",
        requestData: requestData,
        method: "GET"
      });
      this.__request.addListener("success", this.__updateRssContent, this);
      this.__request.addListener("error", function(ev) {
        this.error('C: #rss_%s, Error: %s, Feed: %s', this.getPath(), ev.getTarget().getResponse(), src);
      }, this);
    },

    /**
     * Fetch data from YQL Service
     */
    __refreshYql: function() {
      if (!this.__request) {
        this.__request = new qx.data.store.Yql("SELECT * FROM rss WHERE url='"+this.getSrc()+"'", {
          manipulateData: function (data) {
            if (data.query.results) {
              return data.query.results.item || data.query.results.entry;
            } else {
              return [];
            }
          }
        });

        this.__request.bind("model", this, "model");
      }
    },

    _applyModel: function(value, old) {
      if (old) {
        old.removeListener("change", this.__updateYqlContent, this);
      }
      if (value) {
        this.__updateYqlContent();
        value.addListener("change", this.__updateYqlContent, this);
      }
    },

    __prepareContentElement: function(ul, c) {
      qx.dom.Element.empty(c);

      qx.dom.Element.insertEnd(ul, c);

      // get height of one entry, calc max num of display items in widget
      var displayrows = parseInt(qx.bom.element.Dataset.get(c, "last_rowcount"), 10) || 0;
      qx.bom.Html.clean(['<li class="rsslogRow odd" id="dummydiv">.</li>'], null, c);
      var dummyDiv = qx.bom.Selector.query('#dummydiv', c)[0];
      var itemheight = qx.bom.element.Dimension.getHeight(dummyDiv);
      qx.dom.Element.remove(dummyDiv);
      if (itemheight !== 0) {
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
      return displayrows;
    },

    __updateRssContent: function(ev) {
      var result = ev.getTarget().getResponse();
      if (qx.lang.Type.isString(result)) {
        // no json -> error
        this.error(result);
        return;
      }
      this.__updateContent(result.responseData.feed.entries);
    },

    __updateYqlContent: function() {
      this.__updateContent(this.getModel().toArray());
    },

    __updateContent: function(items) {

      var isBig = this.__request.getUserData("big");
      var selector = '#rss_' + this.getPath() + (isBig === true ? '_big' : '');
      var c = qx.bom.Selector.query(selector)[0];
      var itemack = isBig === true ? this.getItemack() : ( 'modify' === this.getItemack() ? 'display' : this.getItemack());

      this.debug("ID: "+qx.bom.element.Attribute.get(c, "id")+", Feed: "+this.getSrc());

      var ul = qx.dom.Element.create("ul");
      var displayrows = this.__prepareContentElement(ul, c);

      var itemnum = items.length;
      this.debug('C: #'+this.getPath()+', '+itemnum+' element(s) found, '+displayrows+' displayrow(s) available');

      var itemoffset = 0; // correct if mode='last' or itemnum<=displayrows

      if (itemnum > displayrows) { // no need to check mode if items are less than rows
        if (this.getMode() === 'first') {
          itemoffset = itemnum - displayrows;
        }
        if (this.getMode() === 'rollover') {
          itemoffset = parseInt(qx.bom.element.Dataset.get(c, "itemoffset"), 10) || 0;
          if (itemoffset === itemnum) {
            itemoffset = 0;
          }
          qx.bom.element.Dataset.set(c, "itemoffset", itemoffset + 1);
        }
      }

      var row = 'rsslogodd';
      var last = itemoffset + displayrows;
      last = (last > itemnum) ? itemnum : last;

      this.__separatordate = new Date().strftime('%d');
      this.__separatoradd = false;
      this.__separatorprevday = false;
      this.__isFuture = false;

      for (var i = itemoffset; i < last; i++) {
        this.debug('C: #'+this.getPath()+', processing item: '+i+' of '+itemnum);
        var idx = i;
        idx = (i >= itemnum) ? (idx = idx - itemnum) : idx;

        var item = items[idx];
        var itemHtml = this.__getItemHtml(item, isBig);

        var rowElem = qx.dom.Element.create('li', { 'class' : 'rsslogRow ' + row });
        qx.bom.element.Attribute.set(rowElem, "html", itemHtml);

        if (item.mapping && item.mapping !== '') {
          var mappedValue = this.applyMapping(itemack === 'disable' ? 0 : item.state, item.mapping);
          var span = qx.bom.Selector.query('.mappedValue', rowElem)[0];
          this.defaultValue2DOM(mappedValue, qx.lang.Function.curry(this._applyValueToDom, span));
        }
        if (this.__separatoradd && idx !== 0) {
          qx.bom.element.Class.add(rowElem, 'rsslog_separator');
          this.__separatorprevday = true;
        }
        else {
          this.__separatorprevday = false;
        }

        if (this.__separatorprevday === true) {
          qx.bom.element.Class.add(rowElem, 'rsslog_prevday');
        }

        if (this.__isFuture) {
          qx.bom.element.Class.add(rowElem, (row === 'rsslogodd') ? 'rsslog_futureeven' : 'rsslog_futureodd');
        }

        qx.bom.element.Dataset.set(rowElem, 'id', item.id);
        qx.bom.element.Dataset.set(rowElem, 'mapping', item.mapping);
        if (item.tags) {
          var tmp = qx.bom.Selector.query('span', rowElem)[0];
          if (qx.lang.Type.isArray(item.tags)) {
            item.tags.forEach(qx.lang.Function.curry(qx.bom.element.Class.add, tmp), this);
          } else {
            qx.bom.element.Class.add(tmp, item.tags);
          }
        }
        if (item.state === "1" && itemack !== 'disable') {
          qx.bom.element.Class.add(rowElem, "rsslog_ack");
        }

        if (itemack === 'modify') {
          qx.event.Registration.addListener(rowElem, "tap", this._onTap, this);
        }
        qx.dom.Element.insertEnd(rowElem, ul);

        // Alternate row classes
        row = (row === 'rsslogodd') ? 'rsslogeven' : 'rsslogodd';
      }
    },

    __getItemHtml: function(item, isBig) {
      var itemHtml = "";
      if (!this.__external) {
        itemHtml = this.__html;

        itemHtml = itemHtml.replace(/\{text\}/, item.content);
        var entryDate = new Date(item.publishedDate);
        if (entryDate) {
          itemHtml = (this.getTimeformat()) ?
            (itemHtml.replace(/\{date\}/, entryDate.strftime(this.getTimeformat()) + '&nbsp;')) :
            (itemHtml.replace(/\{date\}/, entryDate.toLocaleDateString() + ' ' + entryDate.toLocaleTimeString() + '&nbsp;'));
          var thisday = entryDate.strftime('%d');
          this.__separatoradd = ((this.__separatordate > 0) && (this.__separatordate !== thisday));
          this.__separatordate = thisday;
          this.__isFuture = (entryDate > new Date() );
        }
        else {
          itemHtml = itemHtml.replace(/\{date\}/, '');
        }
      } else {
        if (isBig) {
          return '<b><a href="' + item.getLink() + '">' + item.getTitle() + '</a></b><br/>' + item.getDescription();
        } else {
          return '<b>' + item.getTitle() + '</b><br/>' + item.getDescription();
        }
      }

      return itemHtml;
    },

    _onTap: function(ev) {
      var item = ev.getCurrentTarget();

      var id = qx.bom.element.Dataset.get(item, 'id');
      var mapping = qx.bom.element.Dataset.get(item, 'mapping');
      qx.bom.element.Class.toggle(item, "rsslog_ack");
      var state = +qx.bom.element.Class.has(item, "rsslog_ack"); // the new state is the same as hasClass
      if (mapping && mapping !== '') {
        var mappedValue = this.applyMapping(state, mapping);
        var span = qx.bom.Selector.query('.mappedValue', item)[0];
        qx.dom.Element.empty(span);
        this.defaultValue2DOM(mappedValue, qx.lang.Function.curry(this._applyValueToDom, span));
      }
      var req = new qx.io.request.Xhr(this.__request.getUrl());
      req.set({
        method: "GET",
        requestData: qx.lang.Object.mergeWith(qx.lang.Object.clone(this.__fixedRequestData), {
          'u': id,
          'state': state
        }),
        accept: "application/json"
      });
      req.send();
    }
  },

  defer: function(statics) {
    var loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles('plugins/rsslog/rsslog.css');
    cv.parser.WidgetParser.addHandler("rsslog", cv.plugins.RssLog);
    cv.ui.structure.WidgetFactory.registerClass("rsslog", statics);
  }
});