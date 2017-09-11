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
 * XSD-based code completion provider for the monaco text editor.
 *
 * @since 0.11.0
 * @author Tobias Bräutigam
 */
function CompletionProvider(monaco, schemaNode) {
  var __elementCache = {};

  function getLastOpenedTag(text) {
    // get all tags inside of the content
    var tags = text.match(/<\/*(?=\S*)([a-zA-Z-]+)/g);
    if (!tags) {
      return undefined;
    }
    // we need to know which tags are closed
    var closingTags = [];
    for (var i = tags.length - 1; i >= 0; i--) {
      if (tags[i].indexOf('</') === 0) {
        closingTags.push(tags[i].substring('</'.length));
      }
      else {
        // get the last position of the tag
        var tagPosition = text.lastIndexOf(tags[i]);
        var tag = tags[i].substring('<'.length);
        var closingBracketIdx = text.indexOf('/>', tagPosition);
        // if the tag wasn't closed
        if (closingBracketIdx === -1) {
          // if there are no closing tags or the current tag wasn't closed
          if (!closingTags.length || closingTags[closingTags.length - 1] !== tag) {
            // we found our tag, but let's get the information if we are looking for
            // a child element or an attribute
            text = text.substring(tagPosition);

            var openedTag = text.indexOf('<') > text.indexOf('>');
            var contentSearch = openedTag && /="[^"]*$/.test(text);
            var filteredElementSearch = /<[\w-_\d]+$/.test(text);
            return {
              tagName: tag,
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
  }

  function findElements(parent, elementName, maxDepth, currentDepth) {
    if (elementName in __elementCache) {
      return __elementCache[elementName];
    }
    if (maxDepth < currentDepth) {
      return null;
    }
    if (!parent) {
      parent = schemaNode.allowedRootElements.pages;
    }
    if (currentDepth === undefined) {
      currentDepth = 1;
    }
    var allowedElements = parent.getAllowedElements();
    // console.log(parent.name+" looking for "+elementName+" in tree level "+currentDepth+ "(<"+maxDepth+") ("+Object.getOwnPropertyNames(allowedElements).join(", ")+")");
    if (elementName in allowedElements) {
      // console.log("found "+elementName+" in tree level "+currentDepth);
      __elementCache[elementName] = allowedElements[elementName];
      return allowedElements[elementName];
    } else {
      for (var element in allowedElements) {
        if (maxDepth > currentDepth) {
          var result = findElements(allowedElements[element], elementName, maxDepth, currentDepth + 1);
          if (result) {
            __elementCache[elementName] = result;
            // console.log("found " + elementName + " in tree level " + currentDepth);
            return result;
          }
        }
      }
    }

  }

  function isItemAvailable(itemName, maxOccurs, items) {
    // the default for 'maxOccurs' is 1
    maxOccurs = maxOccurs || '1';
    // the element can appere infinite times, so it is available
    if (maxOccurs && maxOccurs === 'unbounded') {
      return true;
    }
    // count how many times the element appeared
    var count = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i] === itemName) {
        count++;
      }
    }
    // if it didn't appear yet, or it can appear again, then it
    // is available, otherwise it't not
    return count === 0 || parseInt(maxOccurs) > count;
  }

  function getElementString(element, indent, prefix) {
    var insertText = indent+prefix+element.name+" ";
    // add all required attributes with default values
    Object.getOwnPropertyNames(element.allowedAttributes).forEach(function(attr) {
      var attribute = element.allowedAttributes[attr];
      if (!attribute.isOptional) {
        insertText += attr+'="'+(attribute.defaultValue ? attribute.defaultValue : "")+'" ';
      }
    });
    // add mandatory children
    var requiredElements = element.getRequiredElements();
    var allowedContent = element.getAllowedContent();
    var isContentAllowed = allowedContent._text || requiredElements.length > 0 || !!allowedContent._grouping;
    if (!isContentAllowed) {
      // close tag
      insertText = insertText.trim()+"/";
    } else {
      // close open tag
      insertText = insertText.trim()+">";

      // insert required elements
      var children = 0;
      requiredElements.forEach(function(elemName) {
        var elem = findElements(element, elemName, 1, 0);
        if (elem) {
          insertText += "\n    " + getElementString(elem, indent + "    ", "<") + ">";
          children++;
        }
      });
      // add closing tag
      if (children > 0) {
        insertText += "\n"+indent;
      }
      insertText += "</"+element.name;
    }
    return insertText;
  }

  function getAvailableElements(monaco, element, usedItems) {
    var availableItems = [];
    var children = element.getAllowedElements();

    // if there are no such elements, then there are no suggestions
    if (!children) {
      return [];
    }
    Object.getOwnPropertyNames(children).forEach(function(name) {
      // get all element attributes
      var childElem = children[name];
      // the element is a suggestion if it's available
      if (isItemAvailable(childElem.name, childElem.getBounds().max, usedItems)) {
        // mark it as a 'field', and get the documentation
        availableItems.push({
          label: childElem.name,
          insertText: getElementString(childElem, "", ""),
          kind: monaco.languages.CompletionItemKind.Field,
          detail: childElem.type,
          documentation: childElem.getDocumentation().join("\n")
        });
      }
    });
    // return the suggestions we found
    return availableItems;
  }

  function getAvailableAttributes(monaco, element, usedChildTags) {
    var availableItems = [];
    // get all attributes for the element
    var attrs = element.allowedAttributes;
    Object.getOwnPropertyNames(attrs).forEach(function(name) { // jshint ignore:line
      var attr = attrs[name];
      // accept it in a suggestion list only the attribute is not used yet
      if (usedChildTags.indexOf(attr.name) === -1) {
        // mark it as a 'property', and get it's documentation
        availableItems.push({
          label: attr.name,
          insertText: attr.name+'=""',
          kind: monaco.languages.CompletionItemKind.Property,
          detail: attr.getTypeString(),
          documentation: attr.getDocumentation().join("\n")
        });
      }
    });

    // return the elements we found
    return availableItems;
  }

  this.getProvider = function() {
    return {
      triggerCharacters: ['<', '"'],
      provideCompletionItems: function (model, position) {
        // get editor content before the pointer
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        // if we want suggestions, inside of which tag are we?
        var lastOpenedTag = getLastOpenedTag(textUntilPosition);
        // console.log(lastOpenedTag);
        // get opened tags to see what tag we should look for in the XSD schema
        var openedTags = [];
        // get the elements/attributes that are already mentioned in the element we're in
        var usedItems = [];
        var isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
        var isContentSearch = lastOpenedTag && lastOpenedTag.isContentSearch;
        var filteredElementSearch = lastOpenedTag && lastOpenedTag.filteredElementSearch;
        // no need to calculate the position in the XSD schema if we are in the root element
        if (lastOpenedTag) {
          // try to create a valid XML document
          var parts = lastOpenedTag.text.split(" ");
          parts.shift();
          var cleanedText = textUntilPosition;
          if (parts.length) {
            cleanedText = cleanedText.substring(0, cleanedText.length-parts.join(" ").length)+">";
          }
          // parse the content (not cleared text) into an xml document
          var xmlDoc = stringToXml(cleanedText);
          var lastChild = xmlDoc.lastElementChild;
          var i;
          var lastFound = false;
          while (lastChild) {
            openedTags.push(lastChild.tagName);
            // if we found our last opened tag
            if (lastChild.tagName === lastOpenedTag.tagName) {
              lastFound = true;
              // if we are looking for attributes, then used items should
              // be the attributes we already used
              if (lastOpenedTag.isAttributeSearch && lastChild.outerHTML === lastOpenedTag.text) {
                var attrs = lastChild.attributes;
                for (i = 0; i < attrs.length; i++) {
                  usedItems.push(attrs[i].nodeName);
                }
              }
              else {
                // if we are looking for child elements, then used items
                // should be the elements that were already used
                var children = lastChild.children;
                for (i = 0; i < children.length; i++) {
                  usedItems.push(children[i].tagName);
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
              var parts = lastOpenedTag.text.split(" ");
              // skip tag name
              parts.shift();
              parts.forEach(function(entry) {
                usedItems.push(entry.split("=").shift());
              });
            }
          }
        }
        // find the last opened tag in the schema to see what elements/attributes it can have
        var searchedElement = openedTags[openedTags.length-1];
        if (isContentSearch) {
          searchedElement = lastOpenedTag.tagName;
        } else if (!isAttributeSearch && filteredElementSearch) {
          searchedElement = openedTags[openedTags.length-2];
        }
        var currentItem = findElements(schemaNode.allowedRootElements.pages, searchedElement, openedTags.length);
        var res = [];

        // return available elements/attributes if the tag exists in the schema, or an empty
        // array if it doesn't
        if (isContentSearch) {
          var currentAttribute = usedItems[usedItems.length-1];

          if (currentItem && currentAttribute in currentItem.allowedAttributes) {
            var attribute = currentItem.allowedAttributes[currentAttribute];
            var type = attribute.getTypeString();
            attribute.getEnumeration().forEach(function(entry) {
              res.push({
                label: entry,
                kind: monaco.languages.CompletionItemKind.Value,
                detail: type,
                documentation: attribute.getDocumentation().join("\n")
              });
            });
          }
        }
        else if (isAttributeSearch) {
          // get attributes completions
          res = currentItem ? getAvailableAttributes(monaco, currentItem, usedItems) : [];
        }
        else {
          // get elements completions
          if (lastOpenedTag && lastOpenedTag.text.endsWith("</")) {
            res.push({
              label: lastOpenedTag.tagName,
              kind: monaco.languages.CompletionItemKind.Field
            });
          } else {
            res = currentItem ? getAvailableElements(monaco, currentItem, usedItems) : [];
          }
        }
        return res;
      }
    };
  };
}