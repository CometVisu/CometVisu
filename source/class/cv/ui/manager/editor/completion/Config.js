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
  /**
   *
   */
  construct: function () {
    this.base(arguments);
    this.__elementCache = {};
    this.__currentSchemas = {};
    this._dataProvider = cv.ui.manager.editor.data.Provider.getInstance();
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    currentPath: {
      check: 'String',
      nullable: true,
      apply: '_applyCurrentPath'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _schemas: null,
    __currentSchema: null,
    __elementCache: null,
    __metaElementCache: null,
    _dataProvider: null,
    __rootTagName: null,
    __metaTagName: null,
    _getSuggestions: null,

    _applyCurrentPath() {
      this.__currentSchema = null;
      this.__rootTagName = '';
    },

    setStructure(name) {
      const loaded = Object.prototype.hasOwnProperty.call(this.__currentSchemas, name);
      switch (name) {
        case 'pure':
          if (!loaded) {
            this.__currentSchemas.pure = cv.ui.manager.model.Schema.getInstance('visu_config.xsd');
          }
          this.__currentSchema = this.__currentSchemas.pure;
          this.__rootTagName = 'pages';
          this.__metaTagName = 'meta';
          this._getSuggestions = this.providePureCompletionItems;
          break;

        case 'tile':
          if (!loaded) {
            this.__currentSchemas.tile = cv.ui.manager.model.Schema.getInstance('visu_config_tile.xsd');
          }
          this.__currentSchema = this.__currentSchemas.tile;
          this.__rootTagName = 'config';
          this.__metaTagName = 'cv-meta';
          this._getSuggestions = this.provideTileCompletionItems;
          break;
      }
    },

    getLastOpenedTag: function (text) {
      // get all tags inside of the content
      const tags = text.match(/<\/*(?=\S*)([a-zA-Z-]+)/g);
      if (!tags) {
        return null;
      }
      // we need to know which tags are closed
      const closingTags = [];
      for (let i = tags.length - 1; i >= 0; i--) {
        if (tags[i].indexOf('</') === 0) {
          closingTags.push(tags[i].substring('</'.length));
        } else {
          // get the last position of the tag
          const tagPosition = text.lastIndexOf(tags[i]);
          const tag = tags[i].substring('<'.length);
          const closingBracketIdx = text.indexOf('/>', tagPosition);
          // if the tag wasn't closed
          if (closingBracketIdx === -1) {
            // if there are no closing tags or the current tag wasn't closed
            if (!closingTags.length || closingTags[closingTags.length - 1] !== tag) {
              // we found our tag, but let's get the information if we are looking for
              // a child element or an attribute
              text = text.substring(tagPosition);

              const openedTag = text.indexOf('<') > text.indexOf('>');
              let contentSearch = false;
              let currentAttribute = null;
              if (openedTag) {
                const attrMatch = /([\w\-_\.\d]+)="[^"]*$/.exec(text);
                contentSearch = !!attrMatch;
                currentAttribute = attrMatch ? attrMatch[1] : null;
              }
              const filteredElementSearch = /<[\w-_\d]+$/.test(text);
              return {
                tagName: tag,
                currentAttribute: currentAttribute,
                filteredElementSearch: filteredElementSearch,
                isAttributeSearch: !filteredElementSearch && openedTag && !contentSearch,
                isContentSearch: contentSearch,
                text: text
              };
            }
            // remove the last closed tag
            closingTags.splice(closingTags.length - 1, 1);
          }
          // remove the last checked tag and continue processing the rest of the content
          text = text.substring(0, tagPosition);
        }
      }
      return null;
    },

    findElements: function (parent, elementName, maxDepth, currentDepth, inMeta) {
      const cache = inMeta === true ? this.__metaElementCache : this.__elementCache;
      if (elementName in cache) {
        return cache[elementName];
      }
      if (maxDepth < currentDepth) {
        return null;
      }
      if (!parent) {
        parent = this.__currentSchema.getElementNode(this.__rootTagName);
      }
      if (currentDepth === undefined) {
        currentDepth = 1;
      }
      const allowedElements = parent.getAllowedElements();
      // console.log(parent.name+" looking for "+elementName+" in tree level "+currentDepth+ "(<"+maxDepth+") ("+Object.getOwnPropertyNames(allowedElements).join(", ")+")");
      if (elementName in allowedElements) {
        // console.log("found "+elementName+" in tree level "+currentDepth);
        this.__elementCache[elementName] = allowedElements[elementName];
        return allowedElements[elementName];
      }
      for (let element in allowedElements) {
        if (inMeta !== true && element === this.__metaTagName) {
          continue;
        }
        if (maxDepth > currentDepth) {
          const result = this.findElements(allowedElements[element], elementName, maxDepth, currentDepth + 1);
          if (result) {
            cache[elementName] = result;
            // console.log("found " + elementName + " in tree level " + currentDepth);
            return result;
          }
        }
      }
      return null;
    },

    isItemAvailable: function (itemName, maxOccurs, items) {
      // the default for 'maxOccurs' is 1
      maxOccurs = maxOccurs || '1';
      // the element can appere infinite times, so it is available
      if (maxOccurs && maxOccurs === 'unbounded') {
        return true;
      }
      // count how many times the element appeared
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i] === itemName) {
          count++;
        }
      }
      // if it didn't appear yet, or it can appear again, then it
      // is available, otherwise it't not
      return count === 0 || parseInt(maxOccurs) > count;
    },

    getElementString: function (element, indent, prefix) {
      let insertText = indent + prefix + element.getName() + ' ';
      // add all required attributes with default values
      const allowedAttributes = element.getAllowedAttributes();
      Object.getOwnPropertyNames(allowedAttributes).forEach(function(attr) {
        const attribute = allowedAttributes[attr];
        if (!attribute.isOptional) {
          insertText += attr+'="'+(attribute.getDefaultValue() ? attribute.getDefaultValue() : '')+'" ';
        }
      });
      // add mandatory children
      const requiredElements = element.getRequiredElements();
      const allowedContent = element.getAllowedContent();
      const isContentAllowed = allowedContent._text || requiredElements.length > 0 || !!allowedContent._grouping;
      if (!isContentAllowed) {
        // close tag
        insertText = insertText.trim()+'/';
      } else {
        // close open tag
        insertText = insertText.trim()+'>';

        // insert required elements
        let children = 0;
        requiredElements.forEach(function(elemName) {
          const elem = this.findElements(element, elemName, 1, 0);
          if (elem) {
            insertText += '\n    ' + this.getElementString(elem, indent + '    ', '<') + '>';
            children++;
          }
        }, this);
        // add closing tag
        if (children > 0) {
          insertText += '\n'+indent;
        }
        insertText += '</'+element.getName();
      }
      return insertText;
    },

    getAvailableElements: function (element, usedItems) {
      const availableItems = [];
      const children = element.getAllowedElements();

      // if there are no such elements, then there are no suggestions
      if (!children) {
        return [];
      }
      Object.getOwnPropertyNames(children).filter(name => !name.startsWith('#')).forEach(function(name) {
        // get all element attributes
        const childElem = children[name];
        // the element is a suggestion if it's available
        if (this.isItemAvailable(childElem.getName(), childElem.getBounds().max, usedItems)) {
          // mark it as a 'field', and get the documentation
          availableItems.push({
            label: childElem.getName(),
            insertText: this.getElementString(childElem, '', ''),
            kind: window.monaco.languages.CompletionItemKind.Field,
            detail: childElem.getType(),
            documentation: childElem.getDocumentation().join('\n')
          });
        }
      }, this);
      // return the suggestions we found
      return availableItems;
    },

    getAvailableAttributes: function (element, usedChildTags) {
      const availableItems = [];
      // get all attributes for the element
      const attrs = element.getAllowedAttributes();
      Object.getOwnPropertyNames(attrs).forEach(function(name) { // jshint ignore:line
        const attr = attrs[name];
        // accept it in a suggestion list only the attribute is not used yet
        if (usedChildTags.indexOf(attr.name) === -1) {
          // mark it as a 'property', and get it's documentation
          availableItems.push({
            label: attr.getName(),
            insertText: attr.getName()+'=""',
            kind: window.monaco.languages.CompletionItemKind.Property,
            detail: attr.getTypeString(),
            documentation: attr.getDocumentation().join('\n')
          });
        }
      }, this);

      // return the elements we found
      return availableItems;
    },

    detectSchema(completeText) {
      const match = /xsi:noNamespaceSchemaLocation="([^"]+)"/.exec(completeText.substring(0, 200));
      if (match && match[1].endsWith('visu_config_tile.xsd')) {
        this.setStructure('tile');
      } else {
        this.setStructure('pure');
      }
    },

    getProvider: function () {
      return {
        triggerCharacters: ['<', '"'],
        provideCompletionItems: function (model, position) {
          this.setCurrentPath(model.uri.toString());
          const completeText = model.getValue();
          if (!this.__currentSchema) {
            this.detectSchema(completeText);
          }
          if (this._getSuggestions) {
            return this._getSuggestions(model, position);
          }
          return {suggestions: []};
        }.bind(this)
      };
    },

    providePureCompletionItems(model, position) {
      // get editor content before the pointer
      const textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });
      // parse mappings
      const completeText = model.getValue();
      const metaEndPos = completeText.indexOf('</meta>');
      const textMeta = metaEndPos > 0 ? completeText.substring(0, metaEndPos) : completeText;
      const mappingNames = [];
      const stylingNames = [];
      const templates = {};
      let map;
      let vmap;
      let regex = /<mapping name="([^"]+)"/gm;
      while ((map = regex.exec(textMeta)) !== null) {
        mappingNames.push(map[1]);
      }
      regex = /<styling name="([^"]+)"/gm;
      while ((map = regex.exec(textMeta)) !== null) {
        stylingNames.push(map[1]);
      }
      const templatesStart = textMeta.indexOf('<templates>');
      if (templatesStart >= 0) {
        const templatesString = textMeta.substring(templatesStart + 11, textMeta.indexOf('</templates>') - 12).replace(/(?:\r\n|\r|\n)/g, '');
        templatesString.split('</template>').forEach(function (rawTemplate) {
          const nameMatch = /<template name="([^"]+)"/.exec(rawTemplate);
          // search for variables
          const variables = [];
          const vregex = /{{{?\s*([\w\d]+)\s*}?}}/gm;
          while ((vmap = vregex.exec(rawTemplate)) !== null) {
            variables.push(vmap[1]);
          }
          templates[nameMatch[1]] = variables;
        }, this);
      }

      // if we want suggestions, inside of which tag are we?
      const lastOpenedTag = this.getLastOpenedTag(textUntilPosition);
      // console.log(lastOpenedTag);
      // get opened tags to see what tag we should look for in the XSD schema
      const openedTags = [];
      // attrobutes of the ancestors
      const openedAttributes = [];
      // get the elements/attributes that are already mentioned in the element we're in
      const usedItems = [];
      const isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
      const isContentSearch = lastOpenedTag && lastOpenedTag.isContentSearch;
      const filteredElementSearch = lastOpenedTag && lastOpenedTag.filteredElementSearch;
      // no need to calculate the position in the XSD schema if we are in the root element
      let parts;
      if (lastOpenedTag) {
        // try to create a valid XML document
        parts = lastOpenedTag.text.split(' ');
        parts.shift();
        let cleanedText = textUntilPosition;
        if (parts.length) {
          cleanedText = cleanedText.substring(0, cleanedText.length-parts.join(' ').length)+'>';
        }
        // parse the content (not cleared text) into an xml document
        const xmlDoc = qx.xml.Document.fromString(cleanedText);
        let lastChild = xmlDoc.lastElementChild;
        let i;
        let lastFound = false;
        while (lastChild) {
          openedTags.push(lastChild.tagName);
          openedAttributes.push(lastChild.attributes);
          // if we found our last opened tag
          if (lastChild.tagName === lastOpenedTag.tagName) {
            lastFound = true;
            // if we are looking for attributes, then used items should
            // be the attributes we already used
            if (lastOpenedTag.isAttributeSearch && lastChild.outerHTML === lastOpenedTag.text) {
              const attrs = lastChild.attributes;
              for (i = 0; i < attrs.length; i++) {
                usedItems.push(attrs[i].nodeName);
              }
            } else {
              // if we are looking for child elements, then used items
              // should be the elements that were already used
              const children = lastChild.children;
              for (i = 0; i < children.length; i++) {
                if (children[i].tagName.toLowerCase() !== 'parsererror') {
                  usedItems.push(children[i].tagName);
                }
              }
            }
            break;
          }
          // we haven't found the last opened tag yet, so we move to
          // the next element
          lastChild = lastChild.lastElementChild;
        }
        if (!lastFound) {
          // fallback -> parse string
          if (isAttributeSearch || isContentSearch) {
            parts = lastOpenedTag.text.split(' ');
            // skip tag name
            parts.shift();
            parts.forEach(function(entry) {
              usedItems.push(entry.split('=').shift());
            });
          }
        }
      }
      let res = [];
      let match;
      // find the last opened tag in the schema to see what elements/attributes it can have
      let searchedElement = openedTags[openedTags.length - 1];
      if (isContentSearch) {
        // handle data providers if the is one relevant
        if (lastOpenedTag.tagName === 'pages' && lastOpenedTag.currentAttribute === 'design') {
          return this._dataProvider.getDesigns().then(function (sugg) {
            return {suggestions: sugg};
          });
        } else if (lastOpenedTag.tagName === 'address' && lastOpenedTag.currentAttribute === 'transform') {
          return {suggestions: this._dataProvider.getTransforms()};
        } else if (lastOpenedTag.tagName === 'plugin' && lastOpenedTag.currentAttribute === 'name') {
          return {suggestions: this._dataProvider.getPlugins()};
        } else if (lastOpenedTag.tagName === 'icon' && lastOpenedTag.currentAttribute === 'name') {
          return {suggestions: this._dataProvider.getIcons()};
        } else if (lastOpenedTag.tagName === 'influx') {
          if (lastOpenedTag.currentAttribute === 'measurement') {
            return this._dataProvider.getInfluxDBs().then(function (suggestions) {
              return {suggestions: suggestions};
            });
          } else if (lastOpenedTag.currentAttribute === 'field') {
            match = /measurement="([^"]+)"/.exec(lastOpenedTag.text);
            if (match) {
              return this._dataProvider.getInfluxDBFields(match[1]).then(function (suggestions) {
                return {suggestions: suggestions};
              });
            }
          }
        } else if (lastOpenedTag.tagName === 'tag' && (lastOpenedTag.currentAttribute === 'key' || lastOpenedTag.currentAttribute === 'value') && openedTags.includes('influx')) {
          const influxAttributes = openedAttributes[openedTags.indexOf('influx')];
          const attr = influxAttributes.getNamedItem('measurement');
          if (attr) {
            if (lastOpenedTag.currentAttribute === 'key') {
              return this._dataProvider.getInfluxDBTags(attr.value).then(function (suggestions) {
                return {suggestions: suggestions};
              });
            } else if (lastOpenedTag.currentAttribute === 'value') {
              match = /key="([^"]+)"/.exec(lastOpenedTag.text);
              if (match) {
                return this._dataProvider.getInfluxDBValues(attr.value, match[1]).then(function (suggestions) {
                  return {suggestions: suggestions};
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
          return {suggestions: res};
        } else if (lastOpenedTag.tagName === 'value' &&
          lastOpenedTag.currentAttribute === 'name' &&
          !openedTags.includes('meta') &&
          openedTags.includes('template')) {
          // TODO: find out template name
          const templateNames = Object.keys(templates);
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
          return {suggestions: res};
        } else if (lastOpenedTag.currentAttribute === 'mapping') {
          res = mappingNames.map(function (mappingName) {
            return {
              label: mappingName,
              insertText: mappingName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          }, this);
          return {suggestions: res};
        } else if (lastOpenedTag.currentAttribute === 'styling') {
          res = stylingNames.map(function (stylingName) {
            return {
              label: stylingName,
              insertText: stylingName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          }, this);
          return {suggestions: res};
        }

        // TODO: completions that have to be retrieved from the backend
        // * rrds
        // * Influx: dbs, tags fields
        // * media files

        searchedElement = lastOpenedTag.tagName;
      } else if (!isAttributeSearch && filteredElementSearch) {
        searchedElement = openedTags[openedTags.length-2];
      } else if (lastOpenedTag.tagName === 'address' && lastOpenedTag.currentAttribute === null) {
        return this._dataProvider.getAddresses('monaco').then(res => ({suggestions: res}));
      }
      if (searchedElement === 'rrd') {
        return this._dataProvider.getRrds('monaco').then(res => ({suggestions: res}));
      } else if (searchedElement === 'file' && !isAttributeSearch && !isContentSearch && openedTags.includes('files')) {
        match = /type="([^"]+)"/.exec(lastOpenedTag.text);
        const typeFilter = match ? match[1] : null;
        return this._dataProvider.getMediaFiles(typeFilter).then(function (suggestions) {
          return {suggestions: suggestions};
        });
      }
      const currentItem = this.findElements(this.__currentSchema.getElementNode('pages'), searchedElement, openedTags.length, openedTags.includes('meta'));

      // return available elements/attributes if the tag exists in the schema, or an empty
      // array if it doesn't
      if (isContentSearch) {
        const currentAttribute = usedItems[usedItems.length - 1];

        if (currentItem && currentAttribute in currentItem.getAllowedAttributes()) {
          const attribute = currentItem.getAllowedAttributes()[currentAttribute];
          const type = attribute.getTypeString();
          attribute.getEnumeration().forEach(function(entry) {
            res.push({
              label: entry,
              insertText: entry,
              kind: window.monaco.languages.CompletionItemKind.Value,
              detail: type,
              documentation: attribute.getDocumentation().join('\n')
            });
          });
        }
      } else if (isAttributeSearch) {
        // get attributes completions
        res = currentItem ? this.getAvailableAttributes(currentItem, usedItems) : [];
      } else {
        // get elements completions
        // eslint-disable-next-line no-lonely-if
        if (lastOpenedTag && lastOpenedTag.text.endsWith('</')) {
          res.push({
            label: lastOpenedTag.tagName,
            insertText: lastOpenedTag.tagName,
            kind: window.monaco.languages.CompletionItemKind.Field
          });
        } else {
          res = currentItem ? this.getAvailableElements(currentItem, usedItems) : [];
        }
      }
      return {suggestions: res};
    },

    provideTileCompletionItems(model, position) {
      // get editor content before the pointer
      const textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });
      // parse mappings
      const completeText = model.getValue();
      const metaEndPos = completeText.indexOf('</cv-meta>');
      const textMeta = metaEndPos > 0 ? completeText.substring(0, metaEndPos) : completeText;
      const mappingNames = [];
      const stylingNames = [];
      const templates = {};
      let map;
      let vmap;
      let regex = /<cv-mapping name="([^"]+)"/gm;
      while ((map = regex.exec(textMeta)) !== null) {
        mappingNames.push(map[1]);
      }
      regex = /<cv-styling name="([^"]+)"/gm;
      while ((map = regex.exec(textMeta)) !== null) {
        stylingNames.push(map[1]);
      }
      const templatesStart = textMeta.indexOf('<templates');
      if (templatesStart >= 0) {
        const templatesString = textMeta.substring(templatesStart + 11, textMeta.indexOf('</templates>') - 12).replace(/(?:\r\n|\r|\n)/g, '');
        templatesString.split('</template>').forEach(function (rawTemplate) {
          const nameMatch = /<template id="([^"]+)"/.exec(rawTemplate);
          // search for variables
          const variables = [];
          const vregex = /{{{?\s*([\w\d]+)\s*}?}}/gm;
          while ((vmap = vregex.exec(rawTemplate)) !== null) {
            variables.push(vmap[1]);
          }
          templates[nameMatch[1]] = variables;
        }, this);
      }

      // if we want suggestions, inside of which tag are we?
      const lastOpenedTag = this.getLastOpenedTag(textUntilPosition);
      // console.log(lastOpenedTag);
      // get opened tags to see what tag we should look for in the XSD schema
      const openedTags = [];
      // attrobutes of the ancestors
      const openedAttributes = [];
      // get the elements/attributes that are already mentioned in the element we're in
      const usedItems = [];
      const isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
      const isContentSearch = lastOpenedTag && lastOpenedTag.isContentSearch;
      const filteredElementSearch = lastOpenedTag && lastOpenedTag.filteredElementSearch;
      // no need to calculate the position in the XSD schema if we are in the root element
      let parts;
      if (lastOpenedTag) {
        // try to create a valid XML document
        parts = lastOpenedTag.text.split(' ');
        parts.shift();
        let cleanedText = textUntilPosition;
        if (parts.length) {
          cleanedText = cleanedText.substring(0, cleanedText.length-parts.join(' ').length)+'>';
        }
        // parse the content (not cleared text) into an xml document
        const xmlDoc = qx.xml.Document.fromString(cleanedText);
        let lastChild = xmlDoc.lastElementChild;
        let i;
        let lastFound = false;
        while (lastChild) {
          openedTags.push(lastChild.tagName);
          openedAttributes.push(lastChild.attributes);
          // if we found our last opened tag
          if (lastChild.tagName === lastOpenedTag.tagName) {
            lastFound = true;
            // if we are looking for attributes, then used items should
            // be the attributes we already used
            if (lastOpenedTag.isAttributeSearch && lastChild.outerHTML === lastOpenedTag.text) {
              const attrs = lastChild.attributes;
              for (i = 0; i < attrs.length; i++) {
                usedItems.push(attrs[i].nodeName);
              }
            } else {
              // if we are looking for child elements, then used items
              // should be the elements that were already used
              const children = lastChild.children;
              for (i = 0; i < children.length; i++) {
                if (children[i].tagName.toLowerCase() !== 'parsererror') {
                  usedItems.push(children[i].tagName);
                }
              }
            }
            break;
          }
          // we haven't found the last opened tag yet, so we move to
          // the next element
          lastChild = lastChild.lastElementChild;
        }
        if (!lastFound) {
          // fallback -> parse string
          if (isAttributeSearch || isContentSearch) {
            parts = lastOpenedTag.text.split(' ');
            // skip tag name
            parts.shift();
            parts.forEach(function(entry) {
              usedItems.push(entry.split('=').shift());
            });
          }
        }
      }
      let res = [];
      let match;
      // find the last opened tag in the schema to see what elements/attributes it can have
      let searchedElement = openedTags[openedTags.length - 1];
      if (isContentSearch) {
        // handle data providers if the is one relevant
        if (lastOpenedTag.tagName === 'config' && lastOpenedTag.currentAttribute === 'design') {
          const suggestions = this._dataProvider.getDesigns(null, null, 'tile');
          return {suggestions: suggestions};
        } else if (lastOpenedTag.tagName === 'cv-address' && lastOpenedTag.currentAttribute === 'transform') {
          return {suggestions: this._dataProvider.getTransforms()};
        } else if (lastOpenedTag.tagName === 'cv-plugin' && lastOpenedTag.currentAttribute === 'name') {
          return {suggestions: this._dataProvider.getPlugins()};
        } else if (lastOpenedTag.tagName === 'cv-icon' && lastOpenedTag.currentAttribute === 'name') {
          return {suggestions: this._dataProvider.getIcons()};
        } else if (lastOpenedTag.tagName === 'template' && lastOpenedTag.currentAttribute === 'name' && openedTags.includes('cv-meta')) {
          res = Object.keys(templates).map(function (name) {
            return {
              label: name,
              insertText: name,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          }, this);
          return {suggestions: res};
        } else if (lastOpenedTag.tagName === 'value' &&
          lastOpenedTag.currentAttribute === 'name' &&
          !openedTags.includes('cv-meta') &&
          openedTags.includes('template')) {
          // TODO: find out template name
          const templateNames = Object.keys(templates);
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
          return {suggestions: res};
        } else if (lastOpenedTag.currentAttribute === 'mapping') {
          res = mappingNames.map(function (mappingName) {
            return {
              label: mappingName,
              insertText: mappingName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          }, this);
          return {suggestions: res};
        } else if (lastOpenedTag.currentAttribute === 'styling') {
          res = stylingNames.map(function (stylingName) {
            return {
              label: stylingName,
              insertText: stylingName,
              kind: window.monaco.languages.CompletionItemKind.EnumMember
            };
          }, this);
          return {suggestions: res};
        }
        searchedElement = lastOpenedTag.tagName;
      } else if (!isAttributeSearch && filteredElementSearch) {
        searchedElement = openedTags[openedTags.length-2];
      } else if (lastOpenedTag.tagName === 'cv-address' && lastOpenedTag.currentAttribute === null) {
        return this._dataProvider.getAddresses('monaco').then(res => ({suggestions: res}));
      }
      if (searchedElement === 'rrd') {
        return this._dataProvider.getRrds('monaco').then(res => ({suggestions: res}));
      } else if (searchedElement === 'file' && !isAttributeSearch && !isContentSearch && openedTags.includes('files')) {
        match = /type="([^"]+)"/.exec(lastOpenedTag.text);
        const typeFilter = match ? match[1] : null;
        return this._dataProvider.getMediaFiles(typeFilter).then(function (suggestions) {
          return {suggestions: suggestions};
        });
      }
      const currentItem = this.findElements(this.__currentSchema.getElementNode('config'), searchedElement, openedTags.length, openedTags.includes('cv-meta'));

      // return available elements/attributes if the tag exists in the schema, or an empty
      // array if it doesn't
      if (isContentSearch) {
        const currentAttribute = lastOpenedTag.currentAttribute;

        if (currentItem && currentAttribute in currentItem.getAllowedAttributes()) {
          const attribute = currentItem.getAllowedAttributes()[currentAttribute];
          const type = attribute.getTypeString();
          attribute.getEnumeration().forEach(function(entry) {
            res.push({
              label: entry,
              insertText: entry,
              kind: window.monaco.languages.CompletionItemKind.Value,
              detail: type,
              documentation: attribute.getDocumentation().join('\n')
            });
          });
        }
      } else if (isAttributeSearch) {
        // get attributes completions
        res = currentItem ? this.getAvailableAttributes(currentItem, usedItems) : [];
      } else {
        // get elements completions
        // eslint-disable-next-line no-lonely-if
        if (lastOpenedTag && lastOpenedTag.text.endsWith('</')) {
          res.push({
            label: lastOpenedTag.tagName,
            insertText: lastOpenedTag.tagName,
            kind: window.monaco.languages.CompletionItemKind.Field
          });
        } else {
          res = currentItem ? this.getAvailableElements(currentItem, usedItems) : [];
        }
      }
      return {suggestions: res};
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__elementCache = null;
    this._dataProvider = null;
  }
});
