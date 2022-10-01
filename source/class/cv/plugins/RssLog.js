/* RssLog.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
 * @asset(plugins/rsslog/*)
 */
qx.Class.define("cv.plugins.RssLog", {
  extend: cv.ui.structure.pure.AbstractWidget,
  include: [cv.ui.common.Refresh, cv.ui.common.Update, cv.ui.common.Operate],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    src: {
      check: "String",
      nullable: true,
      transform: "normalizeUrl",
      apply: "_applySrc",
    },

    database: {
      check: "String",
      nullable: true,
    },

    delay: {
      check: "Number",
      init: 0,
    },

    filter: {
      check: "String",
      nullable: true,
    },

    datetime: {
      check: "Boolean",
      init: true,
    },

    mode: {
      check: "String",
      init: "last",
    },

    limit: {
      check: "Number",
      init: 0,
    },

    timeformat: {
      check: "String",
      nullable: true,
    },

    itemoffset: {
      check: "Number",
      init: 0,
    },

    itemack: {
      check: ["modify", "display", "disable"],
      init: "modify",
    },

    future: {
      check: "String",
      nullable: true,
    },

    width: {
      check: "String",
      nullable: true,
    },

    height: {
      check: "String",
      nullable: true,
    },
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
    parse(xml, path, flavour, pageType) {
      const data = cv.parser.pure.WidgetParser.parseElement(
        this,
        xml,
        path,
        flavour,
        pageType,
        this.getAttributeToPropertyMappings()
      );
      cv.parser.pure.WidgetParser.parseFormat(xml, path);
      cv.parser.pure.WidgetParser.parseAddress(xml, path);
      cv.parser.pure.WidgetParser.parseRefresh(xml, path);
      return data;
    },

    getAttributeToPropertyMappings() {
      return {
        src: {},
        database: {},
        delay: { default: 0, transform: parseInt },
        width: {},
        height: {},
        filter: {},
        datetime: {
          default: true,
          transform(value) {
            if (typeof value === "boolean") {
              return value;
            }
            return value === "true";
          },
        },

        mode: { default: "last" },
        limit: { default: 0, transform: parseFloat },
        timeformat: {},
        itemack: { default: "modify" }, // allowed: modify, display, disable
        future: {},
        query: {},
      };
    },
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
    __external: false,

    __separatordate: null,
    __separatoradd: null,
    __isFuture: null,
    __separatorprevday: null,

    /**
     * Strip querystring from URL and store it as Map
     * @param value {String} URL
     * @return {String} normalized URL
     */
    normalizeUrl(value) {
      this.__fixedRequestData = {};
      if (value && value.indexOf("?") > 0) {
        const parts = qx.util.Uri.parseUri(value);
        value = value.substring(0, value.indexOf("?"));
        this.__fixedRequestData = parts.queryKey;
      }
      if (this.getDatabase()) {
        this.__fixedRequestData.database = this.getDatabase();
      }
      return value;
    },

    // property apply
    _applySrc(value) {
      if (value.match(/rsslog_mysql\.php/)) {
        this.error(
          "Use of rsslog_mysql.php is depreciated. Please consult the documentation."
        );
      }
      this.__external =
        !value.match(/rsslog\.php/) &&
        !value.match(/rsslog_mysql\.php/) &&
        !value.match(/rsslog_oh\.php/);
    },

    _getInnerDomString() {
      let style = "";
      if (this.getWidth()) {
        style += "width:" + this.getWidth() + ";";
      }
      if (this.getHeight()) {
        style += "height:" + this.getHeight();
      }

      return (
        '<div class="actor rsslogBody"><div class="rsslog_inline" id="rss_' +
        this.getPath() +
        '" style="' +
        style +
        '"></div></div>'
      );
    },

    _setupRefreshAction() {
      this._timer = new qx.event.Timer(this.getRefresh());
      this._timer.addListener("interval", () => {
        this.refreshRSSlog();
      });
      this._timer.start();
    },

    _onDomReady() {
      if (!this.$$domReady) {
        super._onDomReady();
        qx.event.message.Bus.subscribe(
          "path." + this.getParentPage().getPath() + ".beforePageChange",
          this.refreshRSSlog,
          this
        );
        this.__html = '<span class="mappedValue"></span><span>{text}</span>';
        if (this.getDatetime()) {
          this.__html = "{date}: " + this.__html;
        }
        this.__wrapper = "li";

        if (cv.Config.currentPageId === this.getParentPage().getPath()) {
          this.refreshRSSlog();
        }
      }
    },

    _update() {
      setTimeout(() => this.refreshRSSlog(), this.getDelay());
    },

    _action() {
      const brss = cv.util.String.htmlStringToDomElement(
        '<div class="rsslog_popup" id="rss_' + this.getPath() + '_big"/>'
      );
      const label = document.querySelector("#" + this.getPath() + " .label");
      const title = label ? label.innerText || "" : "";
      const popup = cv.ui.PopupHandler.showPopup("rsslog", {
        title: title,
        content: brss,
      });
      const parent = cv.util.Tree.getParent(brss, "div", null, 1)[0];
      Object.entries({ height: "90%", width: "90%", margin: "auto" }).forEach(
        function (key_value) {
          parent.style[key_value[0]] = key_value[1];
        }
      ); // define parent as 100%!
      if (this._timer) {
        this._timer.stop();
      }
      qx.event.Registration.addListener(
        brss,
        "tap",
        function (event) {
          // don't let the popup know about the click, or it will close on touch-displays
          event.stopPropagation();
        },
        this
      );
      qx.event.Registration.addListener(
        popup,
        "close",
        function () {
          // reload main data - but only once (popup and popup_background are caught
          // here).
          // But delay it so that any change done to the data has a chance to
          // arrive here.

          if (
            popup.getCurrentDomElement() &&
            popup.getCurrentDomElement().classList.contains("popup") &&
            this.getItemack() === "modify"
          ) {
            qx.event.Timer.once(
              function () {
                this.refreshRSSlog();
              },
              this,
              100
            );
            for (let addr in this.getAddress()) {
              if (!cv.data.Model.isWriteAddress(this.getAddress()[addr])) {
                continue;
              } // skip when write flag not set
              cv.io.BackendConnections.getClient().write(
                addr,
                cv.Transform.encode(this.getAddress()[addr], 0)
              );
            }
          }
        },
        this
      );
      popup.getCurrentDomElement().querySelector(".main").style.overflow =
        "auto";
      this.refreshRSSlog(true);
    },

    refreshRSSlog(isBig) {
      const src = this.getSrc();
      if (!src) {
        this.error("no src given, aborting RSS-Log refresh");
        return;
      }
      if (!this.__request) {
        if (!this.__external) {
          this.__refreshRss();
        } else {
          this.error("external sources are no longer supported");
        }
      }
      this.__request.setUserData("big", isBig);
      if (this.__request instanceof qx.io.request.Xhr) {
        this.__request.send();
      }

      const refresh = this.getRefresh();
      if (typeof refresh !== "undefined" && refresh) {
        // reload regularly
        if (this._timer && this._timer.isEnabled()) {
          this._timer.start();
        }
      }
    },

    /**
     * Fetch data from builtin PHP script
     */
    __refreshRss() {
      const src = this.getSrc();
      const requestData = Object.assign({}, this.__fixedRequestData);
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
      this.__request = new qx.io.request.Xhr(
        qx.util.ResourceManager.getInstance().toUri(src)
      );
      this.__request.set({
        accept: "application/json",
        requestData: requestData,
        method: "GET",
      });

      this.__request.addListener("success", this.__updateRssContent, this);
      this.__request.addListener("error", (ev) => {
        this.error(
          "C: #rss_%s, Error: %s, Feed: %s",
          this.getPath(),
          ev.getTarget().getResponse(),
          src
        );
      });
    },

    __prepareContentElement(ul, c) {
      c.replaceChildren(); // delete anything inside

      c.appendChild(ul);

      // get height of one entry, calc max num of display items in widget
      let displayrows = parseInt(c.dataset["last_rowcount"], 10) || 0;
      ul.innerHTML = '<li class="rsslogRow odd" id="dummydiv">.</li>';
      const dummyDiv = c.querySelector("#dummydiv");
      const rect = dummyDiv.getBoundingClientRect();
      const itemheight = Math.round(rect.bottom - rect.top);
      dummyDiv.parentNode.removeChild(dummyDiv);
      if (itemheight !== 0) {
        const widget = c.parentNode.parentNode; // get the parent widget
        const widgetRect = widget.getBoundingClientRect();
        let displayheight = Math.round(widgetRect.bottom - widgetRect.top);
        const labelElem = widget.querySelector(".label");
        if (labelElem) {
          // max. height of actor is widget-label(if exists)
          const labelElemRect = labelElem.getBoundingClientRect();
          displayheight -= Math.round(labelElemRect.bottom - labelElemRect.top);
        }
        displayrows = Math.floor(displayheight / itemheight);
      }
      c.dataset.last_rowcount = displayrows;
      return displayrows;
    },

    __updateRssContent(ev) {
      const result = ev.getTarget().getResponse();
      if (typeof result === "string") {
        // no json -> error
        this.error(
          "Expected JSON, but got response MIME:",
          ev.getTarget().getResponseContentType()
        );
        this.error(result);
        return;
      }
      this.__updateContent(result.responseData.feed.entries);
    },

    __updateContent(items) {
      const isBig = this.__request.getUserData("big");
      const selector =
        "#rss_" + this.getPath() + (isBig === true ? "_big" : "");
      const c = document.querySelector(selector);
      const itemack =
        isBig === true
          ? this.getItemack()
          : this.getItemack() === "modify"
          ? "display"
          : this.getItemack();

      this.debug("ID: " + c.getAttribute("id") + ", Feed: " + this.getSrc());

      const ul = document.createElement("ul");
      const displayrows = this.__prepareContentElement(ul, c);

      const itemnum = items.length;
      this.debug(
        "C: #" +
          this.getPath() +
          ", " +
          itemnum +
          " element(s) found, " +
          displayrows +
          " displayrow(s) available"
      );

      let itemoffset = 0; // correct if mode='last' or itemnum<=displayrows

      if (itemnum > displayrows) {
        // no need to check mode if items are less than rows
        if (this.getMode() === "first") {
          itemoffset = itemnum - displayrows;
        }
        if (this.getMode() === "rollover") {
          itemoffset = parseInt(c.dataset.itemoffset, 10) || 0;
          if (itemoffset === itemnum) {
            itemoffset = 0;
          }
          c.dataset.itemoffset = itemoffset + 1;
        }
      }

      let row = "rsslogodd";
      let last = itemoffset + displayrows;
      last = last > itemnum ? itemnum : last;

      this.__separatordate = new Date().strftime("%d");
      this.__separatoradd = false;
      this.__separatorprevday = false;
      this.__isFuture = false;

      for (let i = itemoffset; i < last; i++) {
        this.debug(
          "C: #" + this.getPath() + ", processing item: " + i + " of " + itemnum
        );
        let idx = i;
        idx = i >= itemnum ? (idx -= itemnum) : idx;

        const item = items[idx];
        const itemHtml = this.__getItemHtml(item, isBig);

        const rowElem = qx.dom.Element.create("li", {
          class: "rsslogRow " + row,
        });
        rowElem.innerHTML = itemHtml;

        if (item.mapping && item.mapping !== "") {
          const mappedValue = this.applyMapping(
            itemack === "disable" ? 0 : item.state,
            item.mapping
          );
          const span = rowElem.querySelector(".mappedValue");
          this.defaultValue2DOM(mappedValue, span);
        }
        if (this.__separatoradd && idx !== 0) {
          rowElem.classList.add("rsslog_separator");
          this.__separatorprevday = true;
        } else {
          this.__separatorprevday = false;
        }

        if (this.__separatorprevday === true) {
          rowElem.classList.add("rsslog_prevday");
        }

        if (this.__isFuture) {
          rowElem.classList.add(
            row === "rsslogodd" ? "rsslog_futureeven" : "rsslog_futureodd"
          );
        }

        rowElem.dataset.id = item.id;
        rowElem.dataset.mapping = item.mapping;
        if (item.tags) {
          const tmp = rowElem.querySelector("span");
          if (Array.isArray(item.tags)) {
            const tags = item.tags.filter((x) => x !== "");
            if (tags.length > 0) {
              tmp.classList.add.apply(tmp.classList, item.tags);
            }
          } else {
            tmp.classList.add(item.tags);
          }
        }
        if (item.state === "1" && itemack !== "disable") {
          rowElem.classList.add("rsslog_ack");
        }

        if (itemack === "modify") {
          qx.event.Registration.addListener(rowElem, "tap", this._onTap, this);
        }
        ul.appendChild(rowElem);

        // Alternate row classes
        row = row === "rsslogodd" ? "rsslogeven" : "rsslogodd";
      }
    },

    __getItemHtml(item, isBig) {
      let itemHtml = "";
      if (!this.__external) {
        itemHtml = this.__html;

        itemHtml = itemHtml.replace(/\{text\}/, item.content);
        const entryDate = new Date(item.publishedDate);
        if (entryDate) {
          itemHtml = this.getTimeformat()
            ? itemHtml.replace(
                /\{date\}/,
                entryDate.strftime(this.getTimeformat()) + "&nbsp;"
              )
            : itemHtml.replace(
                /\{date\}/,
                entryDate.toLocaleDateString() +
                  " " +
                  entryDate.toLocaleTimeString() +
                  "&nbsp;"
              );
          const thisday = entryDate.strftime("%d");
          this.__separatoradd =
            this.__separatordate > 0 && this.__separatordate !== thisday;
          this.__separatordate = thisday;
          this.__isFuture = entryDate > new Date();
        } else {
          itemHtml = itemHtml.replace(/\{date\}/, "");
        }
      } else {
        if (isBig) {
          return (
            '<b><a href="' +
            item.getLink() +
            '">' +
            item.getTitle() +
            "</a></b><br/>" +
            item.getDescription()
          );
        }
        return "<b>" + item.getTitle() + "</b><br/>" + item.getDescription();
      }

      return itemHtml;
    },

    _onTap(ev) {
      const item = ev.getCurrentTarget();

      const id = item.dataset.id;
      const mapping = item.dataset.mapping;
      item.classList.toggle("rsslog_ack");
      const state = +item.classList.contains("rsslog_ack"); // the new state is the same as hasClass
      if (mapping && mapping !== "") {
        const mappedValue = this.applyMapping(state, mapping);
        let span = item.querySelector(".mappedValue");
        span.replaceChildren(); // delete anything inside
        this.defaultValue2DOM(mappedValue, span);
      }
      const req = new qx.io.request.Xhr(this.__request.getUrl());
      req.set({
        method: "GET",
        requestData: Object.assign({}, this.__fixedRequestData, {
          u: id,
          state: state,
        }),

        accept: "application/json",
      });

      req.send();
    },
  },

  defer(statics) {
    const loader = cv.util.ScriptLoader.getInstance();
    loader.addStyles("plugins/rsslog/rsslog.css");
    cv.parser.pure.WidgetParser.addHandler("rsslog", cv.plugins.RssLog);
    cv.ui.structure.WidgetFactory.registerClass("rsslog", statics);
  },
});
