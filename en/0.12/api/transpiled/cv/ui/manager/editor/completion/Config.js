(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.ui.manager.editor.data.Provider": {
        "construct": true
      },
      "qx.xml.Document": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * XSD-based code completion provider for the monaco text editor.
   *
   * @since 0.11.0
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.manager.editor.completion.Config', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(schemaNode) {
      qx.core.Object.constructor.call(this);
      this.__P_33_0 = {};
      this._schemaNode = schemaNode;
      this._dataProvider = cv.ui.manager.editor.data.Provider.getInstance();
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_33_0: null,
      __P_33_1: null,
      _schemaNode: null,
      _dataProvider: null,
      getLastOpenedTag: function getLastOpenedTag(text) {
        // get all tags inside of the content
        var tags = text.match(/<\/*(?=\S*)([a-zA-Z-]+)/g);

        if (!tags) {
          return undefined;
        } // we need to know which tags are closed


        var closingTags = [];

        for (var i = tags.length - 1; i >= 0; i--) {
          if (tags[i].indexOf('</') === 0) {
            closingTags.push(tags[i].substring('</'.length));
          } else {
            // get the last position of the tag
            var tagPosition = text.lastIndexOf(tags[i]);
            var tag = tags[i].substring('<'.length);
            var closingBracketIdx = text.indexOf('/>', tagPosition); // if the tag wasn't closed

            if (closingBracketIdx === -1) {
              // if there are no closing tags or the current tag wasn't closed
              if (!closingTags.length || closingTags[closingTags.length - 1] !== tag) {
                // we found our tag, but let's get the information if we are looking for
                // a child element or an attribute
                text = text.substring(tagPosition);
                var openedTag = text.indexOf('<') > text.indexOf('>');
                var contentSearch = false;
                var currentAttribute = null;

                if (openedTag) {
                  var attrMatch = /([\w\-_\.\d]+)="[^"]*$/.exec(text);
                  contentSearch = !!attrMatch;
                  currentAttribute = attrMatch ? attrMatch[1] : null;
                }

                var filteredElementSearch = /<[\w-_\d]+$/.test(text);
                return {
                  tagName: tag,
                  currentAttribute: currentAttribute,
                  filteredElementSearch: filteredElementSearch,
                  isAttributeSearch: !filteredElementSearch && openedTag && !contentSearch,
                  isContentSearch: contentSearch,
                  text: text
                };
              } // remove the last closed tag


              closingTags.splice(closingTags.length - 1, 1);
            } // remove the last checked tag and continue processing the rest of the content


            text = text.substring(0, tagPosition);
          }
        }
      },
      findElements: function findElements(parent, elementName, maxDepth, currentDepth, inMeta) {
        var cache = inMeta === true ? this.__P_33_1 : this.__P_33_0;

        if (elementName in cache) {
          return cache[elementName];
        }

        if (maxDepth < currentDepth) {
          return null;
        }

        if (!parent) {
          parent = this._schemaNode.allowedRootElements.pages;
        }

        if (currentDepth === undefined) {
          currentDepth = 1;
        }

        var allowedElements = parent.getAllowedElements(); // console.log(parent.name+" looking for "+elementName+" in tree level "+currentDepth+ "(<"+maxDepth+") ("+Object.getOwnPropertyNames(allowedElements).join(", ")+")");

        if (elementName in allowedElements) {
          // console.log("found "+elementName+" in tree level "+currentDepth);
          this.__P_33_0[elementName] = allowedElements[elementName];
          return allowedElements[elementName];
        } else {
          for (var element in allowedElements) {
            if (inMeta !== true && element === 'meta') {
              continue;
            }

            if (maxDepth > currentDepth) {
              var result = this.findElements(allowedElements[element], elementName, maxDepth, currentDepth + 1);

              if (result) {
                cache[elementName] = result; // console.log("found " + elementName + " in tree level " + currentDepth);

                return result;
              }
            }
          }
        }
      },
      isItemAvailable: function isItemAvailable(itemName, maxOccurs, items) {
        // the default for 'maxOccurs' is 1
        maxOccurs = maxOccurs || '1'; // the element can appere infinite times, so it is available

        if (maxOccurs && maxOccurs === 'unbounded') {
          return true;
        } // count how many times the element appeared


        var count = 0;

        for (var i = 0; i < items.length; i++) {
          if (items[i] === itemName) {
            count++;
          }
        } // if it didn't appear yet, or it can appear again, then it
        // is available, otherwise it't not


        return count === 0 || parseInt(maxOccurs) > count;
      },
      getElementString: function getElementString(element, indent, prefix) {
        var insertText = indent + prefix + element.name + " "; // add all required attributes with default values

        Object.getOwnPropertyNames(element.allowedAttributes).forEach(function (attr) {
          var attribute = element.allowedAttributes[attr];

          if (!attribute.isOptional) {
            insertText += attr + '="' + (attribute.defaultValue ? attribute.defaultValue : "") + '" ';
          }
        }); // add mandatory children

        var requiredElements = element.getRequiredElements();
        var allowedContent = element.getAllowedContent();
        var isContentAllowed = allowedContent._text || requiredElements.length > 0 || !!allowedContent._grouping;

        if (!isContentAllowed) {
          // close tag
          insertText = insertText.trim() + "/";
        } else {
          // close open tag
          insertText = insertText.trim() + ">"; // insert required elements

          var children = 0;
          requiredElements.forEach(function (elemName) {
            var elem = this.findElements(element, elemName, 1, 0);

            if (elem) {
              insertText += "\n    " + this.getElementString(elem, indent + "    ", "<") + ">";
              children++;
            }
          }, this); // add closing tag

          if (children > 0) {
            insertText += "\n" + indent;
          }

          insertText += "</" + element.name;
        }

        return insertText;
      },
      getAvailableElements: function getAvailableElements(element, usedItems) {
        var availableItems = [];
        var children = element.getAllowedElements(); // if there are no such elements, then there are no suggestions

        if (!children) {
          return [];
        }

        Object.getOwnPropertyNames(children).forEach(function (name) {
          // get all element attributes
          var childElem = children[name]; // the element is a suggestion if it's available

          if (this.isItemAvailable(childElem.name, childElem.getBounds().max, usedItems)) {
            // mark it as a 'field', and get the documentation
            availableItems.push({
              label: childElem.name,
              insertText: this.getElementString(childElem, "", ""),
              kind: window.monaco.languages.CompletionItemKind.Field,
              detail: childElem.type,
              documentation: childElem.getDocumentation().join("\n")
            });
          }
        }, this); // return the suggestions we found

        return availableItems;
      },
      getAvailableAttributes: function getAvailableAttributes(element, usedChildTags) {
        var availableItems = []; // get all attributes for the element

        var attrs = element.allowedAttributes;
        Object.getOwnPropertyNames(attrs).forEach(function (name) {
          // jshint ignore:line
          var attr = attrs[name]; // accept it in a suggestion list only the attribute is not used yet

          if (usedChildTags.indexOf(attr.name) === -1) {
            // mark it as a 'property', and get it's documentation
            availableItems.push({
              label: attr.name,
              insertText: attr.name + '=""',
              kind: window.monaco.languages.CompletionItemKind.Property,
              detail: attr.getTypeString(),
              documentation: attr.getDocumentation().join("\n")
            });
          }
        }, this); // return the elements we found

        return availableItems;
      },
      getProvider: function getProvider() {
        return {
          triggerCharacters: ['<', '"'],
          provideCompletionItems: function (model, position) {
            // get editor content before the pointer
            var textUntilPosition = model.getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column
            }); // parse mappings

            var completeText = model.getValue();
            var metaEndPos = completeText.indexOf('</meta>');
            var textMeta = metaEndPos > 0 ? completeText.substring(0, metaEndPos) : completeText;
            var mappingNames = [];
            var stylingNames = [];
            var templates = {};
            var map, vmap;
            var regex = /<mapping name="([^"]+)"/gm;

            while ((map = regex.exec(textMeta)) !== null) {
              mappingNames.push(map[1]);
            }

            regex = /<styling name="([^"]+)"/gm;

            while ((map = regex.exec(textMeta)) !== null) {
              stylingNames.push(map[1]);
            }

            var templatesStart = textMeta.indexOf('<templates>');

            if (templatesStart >= 0) {
              var templatesString = textMeta.substring(templatesStart + 11, textMeta.indexOf('</templates>') - 12).replace(/(?:\r\n|\r|\n)/g, '');
              templatesString.split('</template>').forEach(function (rawTemplate) {
                var nameMatch = /<template name="([^"]+)"/.exec(rawTemplate); // search for variables

                var variables = [];
                var vregex = /{{{?\s*([\w\d]+)\s*}?}}/gm;

                while ((vmap = vregex.exec(rawTemplate)) !== null) {
                  variables.push(vmap[1]);
                }

                templates[nameMatch[1]] = variables;
              }, this);
            } // if we want suggestions, inside of which tag are we?


            var lastOpenedTag = this.getLastOpenedTag(textUntilPosition); // console.log(lastOpenedTag);
            // get opened tags to see what tag we should look for in the XSD schema

            var openedTags = []; // attrobutes of the ancestors

            var openedAttributes = []; // get the elements/attributes that are already mentioned in the element we're in

            var usedItems = [];
            var isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
            var isContentSearch = lastOpenedTag && lastOpenedTag.isContentSearch;
            var filteredElementSearch = lastOpenedTag && lastOpenedTag.filteredElementSearch; // no need to calculate the position in the XSD schema if we are in the root element

            var parts;

            if (lastOpenedTag) {
              // try to create a valid XML document
              parts = lastOpenedTag.text.split(" ");
              parts.shift();
              var cleanedText = textUntilPosition;

              if (parts.length) {
                cleanedText = cleanedText.substring(0, cleanedText.length - parts.join(" ").length) + ">";
              } // parse the content (not cleared text) into an xml document


              var xmlDoc = qx.xml.Document.fromString(cleanedText);
              var lastChild = xmlDoc.lastElementChild;
              var i;
              var lastFound = false;

              while (lastChild) {
                openedTags.push(lastChild.tagName);
                openedAttributes.push(lastChild.attributes); // if we found our last opened tag

                if (lastChild.tagName === lastOpenedTag.tagName) {
                  lastFound = true; // if we are looking for attributes, then used items should
                  // be the attributes we already used

                  if (lastOpenedTag.isAttributeSearch && lastChild.outerHTML === lastOpenedTag.text) {
                    var attrs = lastChild.attributes;

                    for (i = 0; i < attrs.length; i++) {
                      usedItems.push(attrs[i].nodeName);
                    }
                  } else {
                    // if we are looking for child elements, then used items
                    // should be the elements that were already used
                    var children = lastChild.children;

                    for (i = 0; i < children.length; i++) {
                      if (children[i].tagName.toLowerCase() !== 'parsererror') {
                        usedItems.push(children[i].tagName);
                      }
                    }
                  }

                  break;
                } // we haven't found the last opened tag yet, so we move to
                // the next element


                lastChild = lastChild.lastElementChild;
              }

              if (!lastFound) {
                // fallback -> parse string
                if (isAttributeSearch || isContentSearch) {
                  parts = lastOpenedTag.text.split(" "); // skip tag name

                  parts.shift();
                  parts.forEach(function (entry) {
                    usedItems.push(entry.split("=").shift());
                  });
                }
              }
            }

            var res = [];
            var match; // find the last opened tag in the schema to see what elements/attributes it can have

            var searchedElement = openedTags[openedTags.length - 1];

            if (isContentSearch) {
              // handle data providers if the is one relevant
              if (lastOpenedTag.tagName === 'pages' && lastOpenedTag.currentAttribute === 'design') {
                return this._dataProvider.getDesigns().then(function (sugg) {
                  return {
                    suggestions: sugg
                  };
                });
              } else if (lastOpenedTag.tagName === 'address' && lastOpenedTag.currentAttribute === 'transform') {
                return {
                  suggestions: this._dataProvider.getTransforms()
                };
              } else if (lastOpenedTag.tagName === 'plugin' && lastOpenedTag.currentAttribute === 'name') {
                return {
                  suggestions: this._dataProvider.getPlugins()
                };
              } else if (lastOpenedTag.tagName === 'icon' && lastOpenedTag.currentAttribute === 'name') {
                return {
                  suggestions: this._dataProvider.getIcons()
                };
              } else if (lastOpenedTag.tagName === 'influx') {
                if (lastOpenedTag.currentAttribute === 'measurement') {
                  return this._dataProvider.getInfluxDBs().then(function (suggestions) {
                    return {
                      suggestions: suggestions
                    };
                  });
                } else if (lastOpenedTag.currentAttribute === 'field') {
                  match = /measurement="([^"]+)"/.exec(lastOpenedTag.text);

                  if (match) {
                    return this._dataProvider.getInfluxDBFields(match[1]).then(function (suggestions) {
                      return {
                        suggestions: suggestions
                      };
                    });
                  }
                }
              } else if (lastOpenedTag.tagName === 'tag' && (lastOpenedTag.currentAttribute === 'key' || lastOpenedTag.currentAttribute === 'value') && openedTags.includes('influx')) {
                var influxAttributes = openedAttributes[openedTags.indexOf('influx')];
                var attr = influxAttributes.getNamedItem('measurement');

                if (attr) {
                  if (lastOpenedTag.currentAttribute === 'key') {
                    return this._dataProvider.getInfluxDBTags(attr.value).then(function (suggestions) {
                      return {
                        suggestions: suggestions
                      };
                    });
                  } else if (lastOpenedTag.currentAttribute === 'value') {
                    match = /key="([^"]+)"/.exec(lastOpenedTag.text);

                    if (match) {
                      return this._dataProvider.getInfluxDBValues(attr.value, match[1]).then(function (suggestions) {
                        return {
                          suggestions: suggestions
                        };
                      });
                    }
                  }
                }
              } else if (lastOpenedTag.tagName === 'template' && lastOpenedTag.currentAttribute === 'name' && openedTags.includes('meta')) {
                res = Object.keys(templates).map(function (name) {
                  return {
                    label: name,
                    insertText: name,
                    kind: window.monaco.languages.CompletionItemKind.EnumMember
                  };
                }, this);
                return {
                  suggestions: res
                };
              } else if (lastOpenedTag.tagName === 'value' && lastOpenedTag.currentAttribute === 'name' && !openedTags.includes('meta') && openedTags.includes('template')) {
                // TODO: find out template name
                var templateNames = Object.keys(templates);
                templateNames.forEach(function (name) {
                  templates[name].forEach(function (variableName) {
                    res.push({
                      label: variableName,
                      insertText: variableName,
                      detail: qx.locale.Manager.tr('Variable from template %1', name),
                      kind: window.monaco.languages.CompletionItemKind.Variable
                    });
                  }, this);
                }, this);
                return {
                  suggestions: res
                };
              } else if (lastOpenedTag.currentAttribute === 'mapping') {
                res = mappingNames.map(function (mappingName) {
                  return {
                    label: mappingName,
                    insertText: mappingName,
                    kind: window.monaco.languages.CompletionItemKind.EnumMember
                  };
                }, this);
                return {
                  suggestions: res
                };
              } else if (lastOpenedTag.currentAttribute === 'styling') {
                res = stylingNames.map(function (stylingName) {
                  return {
                    label: stylingName,
                    insertText: stylingName,
                    kind: window.monaco.languages.CompletionItemKind.EnumMember
                  };
                }, this);
                return {
                  suggestions: res
                };
              } // TODO: completions that have to be retrieved from the backend
              // * rrds
              // * Influx: dbs, tags fields
              // * media files


              searchedElement = lastOpenedTag.tagName;
            } else if (!isAttributeSearch && filteredElementSearch) {
              searchedElement = openedTags[openedTags.length - 2];
            }

            if (searchedElement === 'rrd') {
              return {
                suggestions: this._dataProvider.getRrds()
              };
            } else if (searchedElement === 'file' && !isAttributeSearch && !isContentSearch && openedTags.includes('files')) {
              match = /type="([^"]+)"/.exec(lastOpenedTag.text);
              var typeFilter = !!match ? match[1] : null;
              return this._dataProvider.getMediaFiles(typeFilter).then(function (suggestions) {
                return {
                  suggestions: suggestions
                };
              });
            }

            var currentItem = this.findElements(this._schemaNode.allowedRootElements.pages, searchedElement, openedTags.length, openedTags.includes('meta')); // return available elements/attributes if the tag exists in the schema, or an empty
            // array if it doesn't

            if (isContentSearch) {
              var currentAttribute = usedItems[usedItems.length - 1];

              if (currentItem && currentAttribute in currentItem.allowedAttributes) {
                var attribute = currentItem.allowedAttributes[currentAttribute];
                var type = attribute.getTypeString();
                attribute.getEnumeration().forEach(function (entry) {
                  res.push({
                    label: entry,
                    kind: window.monaco.languages.CompletionItemKind.Value,
                    detail: type,
                    documentation: attribute.getDocumentation().join("\n")
                  });
                });
              }
            } else if (isAttributeSearch) {
              // get attributes completions
              res = currentItem ? this.getAvailableAttributes(currentItem, usedItems) : [];
            } else {
              // get elements completions
              if (lastOpenedTag && lastOpenedTag.text.endsWith("</")) {
                res.push({
                  label: lastOpenedTag.tagName,
                  kind: window.monaco.languages.CompletionItemKind.Field
                });
              } else {
                res = currentItem ? this.getAvailableElements(currentItem, usedItems) : [];
              }
            }

            return {
              suggestions: res
            };
          }.bind(this)
        };
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_33_0 = null;
      this._schemaNode = null;
      this._dataProvider = null;
    }
  });
  cv.ui.manager.editor.completion.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1613590604603