/* ConfigUpgrader.js
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
 * Upgrade config file to the current library version
 * @since 0.12.0
 * @author Tobias Bräutigam
 */
qx.Class.define("cv.util.ConfigUpgrader", {
  extend: qx.core.Object,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __indentation: 2,
    __log: null,

    /**
     * Upgrade config source
     * @param source {String|Document} content of a config file
     */
    upgrade(source) {
      this.__log = [];
      if (typeof source === "string") {
        source = qx.xml.Document.fromString(source);
      }
      // read version from config
      const pagesNode = source.documentElement;
      const isTileStructure = pagesNode.tagName.toLowerCase() === "config";
      const systemLibVersion = isTileStructure
        ? cv.Version.LIBRARY_VERSION_TILE
        : cv.Version.LIBRARY_VERSION_PURE;
      let version = isTileStructure
        ? parseInt(pagesNode.getAttribute("version"))
        : parseInt(pagesNode.getAttribute("lib_version"));
      if (version === cv.Version.LIBRARY_VERSION_PURE) {
        // nothing to do
        return [null, source, this.__log];
      }
      const suffix = isTileStructure ? "Tile" : "Pure";
      while (version < systemLibVersion) {
        // upgrade step by step
        const method = this["from" + version + "to" + (version + 1) + suffix];
        if (method) {
          version = method.call(this, source);
        } else {
          return [
            qx.locale.Manager.tr(
              "Upgrader from version %1 not implemented",
              version
            ),
            source,
            this.__log,
          ];
        }
      }
      this.info("  - " + this.__log.join("\n  - "));
      return [null, source, this.__log];
    },

    from7to8Pure(source) {
      let c = 0;
      source
        .querySelectorAll("plugins > plugin[name='gweather']")
        .forEach((node) => {
          const parent = node.parentNode;
          const indentNode = node.previousSibling;
          parent.removeChild(node);
          if (indentNode.nodeType === 3) {
            parent.removeChild(indentNode);
          }
          c++;
        });
      this.__setVersion(source, 8);
      if (c > 0) {
        this.__log.push(
          "removed " + c + " 'plugin'-nodes with obsolete plugin (gweather)"
        );
      }
      return 8;
    },

    from8to9Pure(source) {
      let c = 0;
      const singleIndent = "".padEnd(this.__indentation, " ");
      source.querySelectorAll("multitrigger").forEach((node) => {
        let level = this.__getLevel(node);
        level++;
        const indent = "".padEnd(this.__indentation * level, " ");
        const buttonConf = {};
        const attributesToDelete = [];
        const nameRegex = /^button([\d]+)(label|value)$/;
        for (let i = 0, l = node.attributes.length; i < l; i++) {
          const match = nameRegex.exec(node.attributes[i].name);
          if (match) {
            if (!Object.prototype.hasOwnProperty.call(buttonConf, match[1])) {
              buttonConf[match[1]] = {};
            }
            buttonConf[match[1]][match[2]] = node.attributes[i].value;
            attributesToDelete.push(node.attributes[i]);
          }
        }
        attributesToDelete.forEach((attr) => node.removeAttributeNode(attr));
        const buttonIds = Object.keys(buttonConf).sort();
        if (buttonIds.length > 0) {
          const buttons = source.createElement("buttons");
          buttonIds.forEach((bid) => {
            const button = source.createElement("button");
            button.textContent = buttonConf[bid].value;
            if (buttonConf[bid].label) {
              button.setAttribute("label", buttonConf[bid].label);
            }
            const ind = source.createTextNode("\n" + indent + singleIndent);
            buttons.appendChild(ind);
            buttons.appendChild(button);
          });
          buttons.appendChild(source.createTextNode("\n" + indent));
          node.appendChild(source.createTextNode(singleIndent));
          node.appendChild(buttons);
          node.appendChild(
            source.createTextNode(
              "\n" + "".padEnd(this.__indentation * (level - 1), " ")
            )
          );
          c++;
        }
      });
      this.__setVersion(source, 9);
      if (c > 0) {
        this.__log.push(
          "converted " + c + " 'multitrigger'-nodes to new button configuration"
        );
      }
      return 9;
    },

    __getLevel(node) {
      let level = 1;
      let parent = node.parentNode;
      while (parent && parent.nodeName !== "pages") {
        parent = parent.parentNode;
        level++;
      }
      return level;
    },

    __setVersion(xml, version, isTile) {
      if (isTile === true) {
        xml.documentElement.setAttribute("version", version);
      } else {
        xml.documentElement.setAttribute("lib_version", version);
      }
    },

    /**
     * Converts a pure-config file to a tile-config file. Currently only a small amount widgets can be converted
     * because they have a similar equivalent in the tile-structure. This is the list of converted widgets:
     *  - Pages
     *  - Meta-Area (only mappings, stylings and files)
     *  - Switch (without mappings, stylings)
     *  - Info
     *  - Pushbutton (without mappings, stylings)
     *  - Trigger (without mappings, stylings)
     *  - Group (only the ones that do not have nowidget="true")
     *
     *  Whats not working:
     *  - Everything that uses templates
     *  - All other widgets that have not been mentioned above
     *
     * @param sourceXml {XMLDocument|string}
     * @return [{String}, {String}] Error, Result
     */
    convertPureToTile(sourceXml) {
      if (typeof sourceXml === "string") {
        sourceXml = qx.xml.Document.fromString(sourceXml);
      }
      const rootNode = sourceXml.documentElement;
      if (rootNode.tagName.toLowerCase() === "pages") {
        const target = document.implementation.createDocument(null, "config");
        const targetRoot = target.documentElement;
        targetRoot.setAttribute("version", "1");
        const attr = target.createAttributeNS(
          "http://www.w3.org/2001/XMLSchema-instance",
          "noNamespaceSchemaLocation"
        );
        attr.value = "../visu_config_tile.xsd";
        targetRoot.setAttributeNodeNS(attr);

        // add some basics
        const header = target.createElement("header");
        const nav = target.createElement("nav");
        const menu = target.createElement("cv-menu");
        menu.setAttribute("model", "pages");
        nav.appendChild(menu);
        header.appendChild(nav);
        targetRoot.appendChild(header);
        const main = target.createElement("main");
        targetRoot.appendChild(main);

        this._convertElement(targetRoot, rootNode, { pageIds: [] });
        //console.log(new XMLSerializer().serializeToString(target));
        return ["", cv.util.Prettifier.xml(target)];
      }
      return [
        qx.locale.Manager.tr(
          "This is no pure-structure config, root element pages not found"
        ),
        "",
      ];
    },

    /**
     * @param target {Element}
     * @param element {Element}
     * @param options {Object}
     * @private
     */
    _convertElement(target, element, options) {
      if (!options) {
        options = {};
      }
      const tagName = element.tagName.toLowerCase();
      let attr;
      let id;
      let postfix;

      switch (tagName) {
        case "pages":
          for (let i = element.attributes.length - 1; i >= 0; i--) {
            attr = element.attributes[i];
            if (attr.name.startsWith("backend")) {
              if (!options.backends) {
                options.backends = {};
              }
              options.backends[attr.name] = attr.value;
            } else {
              switch (attr.name) {
                case "username":
                case "password":
                  if (!options.backends) {
                    options.backends = {};
                  }
                  options.backends[attr.name] = attr.value;
                  break;

                default:
                  this.debug(
                    `ignoring attribute ${attr.name} from element ${tagName}`
                  );
                  break;
              }
            }
          }
          break;

        case "page":
          postfix = options.pageIds.length;
          id = "page-" + postfix;
          if (element.hasAttribute("name")) {
            target.setAttribute("name", element.getAttribute("name"));
          }
          target.setAttribute("id", id);
          options.pageIds.push(id);
          break;
      }

      // traverse children
      let child;
      let clonedChild;
      let elem;
      let value;
      for (let i = 0; i < element.childNodes.length; i++) {
        child = element.childNodes[i];
        switch (child.nodeType) {
          case Node.CDATA_SECTION_NODE:
          case Node.COMMENT_NODE:
            // just copy
            target.appendChild(child.cloneNode());
            break;

          case Node.ELEMENT_NODE:
            switch (child.tagName.toLowerCase()) {
              case "meta":
                clonedChild = target.ownerDocument.createElement(
                  "cv-" + child.tagName
                );
                // copy mappings
                child.querySelectorAll("mappings > mapping").forEach((node) => {
                  const mapping =
                    target.ownerDocument.createElement("cv-mapping");
                  this._copyAttributes(node, mapping);
                  this._copyChildren(node, mapping);
                  clonedChild.appendChild(mapping);
                });
                child.querySelectorAll("stylings > styling").forEach((node) => {
                  const styling =
                    target.ownerDocument.createElement("cv-styling");
                  this._copyAttributes(node, styling);
                  this._copyChildren(node, styling);
                  clonedChild.appendChild(styling);
                });
                // convert files to loader
                child.querySelectorAll("file").forEach((fileNode) => {
                  const loader =
                    target.ownerDocument.createElement("cv-loader");
                  loader.setAttribute("type", fileNode.getAttribute("type"));
                  loader.setAttribute("src", fileNode.textContent.trim());
                  clonedChild.appendChild(loader);
                });
                // prefix all icons with knxuf-
                clonedChild.querySelectorAll("icon").forEach((icon) => {
                  // there is no real check if this is an KNXUF icon, so we only check for '_' in string
                  let name = icon.getAttribute("name");
                  if (name.indexOf("_") >= 0) {
                    name = "knxuf-" + name;
                  }
                  icon.parentElement.textContent = name;
                  icon.remove();
                });

                clonedChild.querySelectorAll("entry").forEach((entry) => {
                  if (entry.hasAttribute("range_min")) {
                    entry.setAttribute(
                      "range-min",
                      entry.getAttribute("range_min")
                    );
                    entry.removeAttribute("range_min");
                  }
                  if (entry.hasAttribute("range_max")) {
                    entry.setAttribute(
                      "range-max",
                      entry.getAttribute("range_max")
                    );
                    entry.removeAttribute("range_max");
                  }
                });

                if (options.backends) {
                  if (options.backends.backend) {
                    const backend =
                      target.ownerDocument.createElement("cv-backend");
                    let type;
                    switch (options.backends.backend) {
                      case "oh2":
                      case "oh":
                      case "openhab2":
                        type = "openhab";
                        break;

                      case "default":
                      case "cgi-bin":
                        type = "knxd";
                        break;

                      default:
                        type = options.backends.backend;
                        break;
                    }

                    backend.setAttribute("type", type);
                    if (options.backends["backend-" + type + "-url"]) {
                      backend.setAttribute(
                        "uri",
                        options.backends["backend-" + type + "-url"]
                      );
                    }
                    if (options.backends.username) {
                      backend.setAttribute(
                        "username",
                        options.backends.username
                      );
                    }
                    if (options.backends.password) {
                      backend.setAttribute(
                        "password",
                        options.backends.password
                      );
                    }
                  }
                }
                target.ownerDocument.documentElement.insertBefore(
                  clonedChild,
                  target.ownerDocument.documentElement.firstChild
                );
                break;

              case "page":
                clonedChild = target.ownerDocument.createElement(
                  "cv-" + child.tagName
                );
                // flatten first two page levels
                if (
                  child.parentElement.tagName.toLowerCase() === "pages" ||
                  child.parentElement.parentElement.tagName.toLowerCase() ===
                    "pages"
                ) {
                  const main = target.ownerDocument.querySelector("main");
                  main.appendChild(clonedChild);
                } else {
                  target.appendChild(clonedChild);
                }
                this._convertElement(clonedChild, child, options);
                break;

              case "group":
                if (child.getAttribute("nowidget") === "true") {
                  this.warn("skipping nowidget-groups");
                } else {
                  clonedChild = target.ownerDocument.createElement(
                    "cv-" + child.tagName
                  );
                  clonedChild.setAttribute("open", "true");
                  if (child.hasAttribute("name")) {
                    clonedChild.setAttribute(
                      "name",
                      child.getAttribute("name")
                    );
                  }
                  target.appendChild(clonedChild);
                  this._convertElement(clonedChild, child, options);
                }
                break;

              case "switch":
                clonedChild = target.ownerDocument.createElement(
                  "cv-" + child.tagName
                );
                // do not copy mappings and styling as they might not work for switched in most of the cases
                // and we want to used the default ones in the first place
                this._copyAttributes(child, clonedChild, {
                  on_value: "on-value",
                  off_value: "off-value",
                });

                if (child.getAttribute("bind_click_to_widget") === "false") {
                  // only copy when this ix explicitly set
                  clonedChild.setAttribute("whole-tile", "false");
                }
                this._copyAddresses(
                  child.querySelectorAll(":scope > address"),
                  clonedChild,
                  "address"
                );
                this._copyLabel(
                  child.querySelector(":scope > label"),
                  clonedChild,
                  "primaryLabel"
                );
                target.appendChild(clonedChild);
                break;

              case "trigger":
                clonedChild = target.ownerDocument.createElement("cv-switch");
                this._copyAttributes(child, clonedChild, {
                  format: true,
                });

                value = child.getAttribute("value");
                this._copyAddresses(
                  child.querySelectorAll(":scope > address"),
                  clonedChild,
                  "address",
                  null,
                  (address) => {
                    address.setAttribute("mode", "write");
                    address.setAttribute("value", value);
                  }
                );
                this._copyLabel(
                  child.querySelector(":scope > label"),
                  clonedChild,
                  "primaryLabel"
                );
                target.appendChild(clonedChild);
                break;

              case "pushbutton":
                clonedChild = target.ownerDocument.createElement("cv-switch");
                this._copyAttributes(child, clonedChild, {
                  format: true,
                });

                value = {
                  down: child.getAttribute("downValue"),
                  up: child.getAttribute("upValue"),
                };

                this._copyAddresses(
                  child.querySelectorAll(":scope > address"),
                  clonedChild,
                  "address",
                  null,
                  (address) => {
                    if (!address.hasAttribute("variant")) {
                      address.setAttribute("value", value.down);
                      address.setAttribute("on", "down");
                      const upAddress = address.cloneNode(true);
                      upAddress.setAttribute("value", value.up);
                      upAddress.setAttribute("on", "up");
                      clonedChild.appendChild(upAddress);
                    } else {
                      address.setAttribute(
                        "value",
                        address.getAttribute("variant") === "up"
                          ? value.up
                          : value.down
                      );
                      address.setAttribute(
                        "on",
                        address.getAttribute("variant")
                      );
                      address.removeAttribute("variant");
                    }
                  }
                );
                this._copyLabel(
                  child.querySelector(":scope > label"),
                  clonedChild,
                  "primaryLabel"
                );
                target.appendChild(clonedChild);
                break;

              case "info":
                // use cv-value > cv-icon when the mapping uses icons
                if (
                  child.hasAttribute("mapping") &&
                  child.ownerDocument.querySelector(
                    'mapping[name="' +
                      child.getAttribute("mapping") +
                      '"] > entry > icon'
                  )
                ) {
                  clonedChild = target.ownerDocument.createElement("cv-tile");

                  const sourceLabel = child.querySelector(":scope > label");
                  if (sourceLabel) {
                    const row = target.ownerDocument.createElement("cv-row");
                    row.setAttribute("colspan", "3");
                    row.setAttribute("row", "last");

                    const label = target.ownerDocument.createElement("label");
                    label.setAttribute("class", "primary");
                    label.textContent = sourceLabel.textContent.trim();
                    row.appendChild(label);
                    clonedChild.appendChild(row);
                  }

                  const value = target.ownerDocument.createElement("cv-value");
                  value.setAttribute("colspan", "3");
                  value.setAttribute("row", "2");
                  this._copyAttributes(child, value, {
                    mapping: true,
                    styling: true,
                    format: true,
                  });

                  const icon = target.ownerDocument.createElement("cv-icon");
                  icon.setAttribute("class", "value");
                  icon.setAttribute("size", "xxx-large");
                  value.appendChild(icon);

                  this._copyAddresses(
                    child.querySelectorAll(":scope > address"),
                    value
                  );
                  clonedChild.appendChild(value);
                } else {
                  clonedChild = target.ownerDocument.createElement(
                    "cv-" + child.tagName
                  );
                  this._copyAddresses(
                    child.querySelectorAll(":scope > address"),
                    clonedChild,
                    "address"
                  );
                  this._copyLabel(
                    child.querySelector(":scope > label"),
                    clonedChild,
                    "label"
                  );
                  this._copyAttributes(child, clonedChild, {
                    mapping: true,
                    styling: true,
                    format: true,
                  });
                }
                target.appendChild(clonedChild);
                break;

              case "infoaction":
                clonedChild =
                  target.ownerDocument.createElement("cv-tile-pair");
                target.appendChild(clonedChild);
                if (child.querySelector("widgetinfo")) {
                  this._convertElement(
                    clonedChild,
                    child.querySelector("widgetinfo"),
                    options
                  );
                  if (child.querySelector(":scope > label")) {
                    elem = clonedChild.querySelector(":scope > cv-info");
                    if (elem) {
                      this._copyLabel(
                        child.querySelector(":scope > label"),
                        elem,
                        "label"
                      );
                    }
                  }
                }
                if (child.querySelector("widgetaction")) {
                  this._convertElement(
                    clonedChild,
                    child.querySelector("widgetaction"),
                    options
                  );
                }
                break;

              case "layout":
                // silently ignore those
                break;

              default:
                this.info("cannot convert", child.nodeName);
                // no conversion possible, add as comment placeholder for manual conversion
                clonedChild = target.ownerDocument.createComment(`
                
###########################################################
### Automatic conversion to tile-structure not possible ###
###########################################################
${
  child.previousSibling.nodeType === Node.TEXT_NODE
    ? child.previousSibling.textContent
    : ""
}${child.outerHTML.replaceAll("<!--", "").replaceAll("-->", "")}`);
                target.appendChild(clonedChild);
                break;
            }

            break;
        }
      }
    },

    /**
     * @param source {Element}
     * @param target {Element}
     * @param converters {Object|null}
     * @private
     */
    _copyAttributes(source, target, converters) {
      let converter;
      for (let i = 0; i < source.attributes.length; i++) {
        if (!converters) {
          target.setAttribute(
            source.attributes[i].name,
            source.attributes[i].value
          );
        } else {
          converter = converters[source.attributes[i].name];
          if (converter === true) {
            target.setAttribute(
              source.attributes[i].name,
              source.attributes[i].value
            );
          } else if (typeof converter === "string") {
            target.setAttribute(converter, source.attributes[i].value);
          }
        }
      }
    },

    _copyAddresses(addresses, target, slotName, converters, callback) {
      addresses.forEach((e) => {
        let address = target.ownerDocument.createElement("cv-address");
        if (slotName) {
          address.setAttribute("slot", slotName);
        }
        this._copyAttributes(e, address, converters);
        address.textContent = e.textContent.trim();
        if (callback) {
          callback(address);
        }
        target.appendChild(address);
      });
    },

    _copyLabel(sourceLabel, target, slotName) {
      if (sourceLabel) {
        // <span slot="primaryLabel">Default</span>
        let label = target.ownerDocument.createElement("span");
        label.setAttribute("slot", slotName);
        let child;
        for (let i = 0; i < sourceLabel.childNodes.length; i++) {
          child = sourceLabel.childNodes[i];
          if (child.nodeType === Node.TEXT_NODE) {
            label.appendChild(child.cloneNode());
          } else if (
            child.nodeType === Node.ELEMENT_NODE &&
            child.tagName.toLowerCase() === "icon"
          ) {
            const icon = target.ownerDocument.createElement("cv-icon");
            let name = child.getAttribute("name");
            if (name.indexOf("_") >= 0) {
              name = "knxuf-" + name;
            }
            icon.textContent = name;
            label.appendChild(icon);
          }
        }
        target.appendChild(label);
      }
    },

    /**
     * @param source {Element}
     * @param target {Element}
     * @private
     */
    _copyChildren(source, target) {
      for (let i = 0; i < source.childNodes.length; i++) {
        target.appendChild(source.childNodes[i].cloneNode(true));
      }
    },
  },
});
