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
 * Webworker for CometVisu's XML text editor. Detects changes in document,
 * Syntax errors and other stuff.
 *
 * @since 0.11.0
 * @author Tobias Bräutigam
 */
importScripts('xmllint.js');
importScripts('crc32.js');

let configSchemas = {};
let currentSchema;

const schemaRegex = /\w+:noNamespaceSchemaLocation="([^"]+)"/;

/**
 * @param path
 */
function getFileContent (path) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false); // Note: synchronous
    xhr.send();
    if (xhr.status === 200) {
      return xhr.response;
    } 
      console.error('XHR Error for ', path, xhr.status, xhr.statusText);
      return null;
  } catch (e) {
    console.error('XHR Error for ', path, e.toString());
    return null;
  }
}

class SourceFile {
  constructor(path, features) {
    this.path = path;
    this.initialHash = null;
    this.initialCode = null;
    this.currentHash = null;
    this.isConfigFile = /visu_config.*\.xml$/.test(path);

    this.features = Object.assign({
      hash: true,
      validate: true,
      modified: true,
      initialValidation: false
    }, features || {});
  }

  /**
   * Called after editor has been loaded with a config file
   * @param data {Map}
   */
  open(data) {
    if (!data || !data.code) {
      return;
    }
    this.initialCode = data.code.split('\n');

    // detect schema
    let schemaFile = '../visu_config.xsd';
    this.initialCode.some(line => {
      const match = schemaRegex.exec(line);
      if (match) {
        schemaFile = match[1];
        return true;
      }
      return false;
    });

    if (this.isConfigFile) {
      if (!configSchemas.hasOwnProperty(schemaFile)) {
        // load scheme file
        configSchemas[schemaFile] = getFileContent(schemaFile);
      }
      currentSchema = configSchemas[schemaFile];
    }

    if (this.features.hash) {
      this.initialHash = SourceFile.hashCode(data.code);
    }

    // initial syntax check
    this.contentChange(data);
    if (!this.features.validate && this.features.initialValidation) {
      this.validateConfig(data.code);
    }
  }

  /**
   * Called after file has been saved
   * @param data {String} Complete code
   */
  saved(data) {
    if (!data || !data.code) {
      return;
    }
    this.initialCode = data.split("\n");
    if (this.features.hash) {
      this.initialHash = SourceFile.hashCode(data);
    }
  }

  contentChange(data) {
    if (this.features.hash) {
      this.currentHash = SourceFile.hashCode(data.code);
    }
    if (this.features.modified) {
      // check modifications
      postMessage(['modified', {
        modified: (this.currentHash !== this.initialHash),
        currentHash: this.currentHash,
        initialHash: this.initialHash
      }, this.path]);
    } else if (this.features.hash) {
      postMessage(['hash', this.currentHash, this.path]);
    }

    this.validateConfig(data.code);

    // currently disabled as these are hard to maintain (e.g. if you delete a line the range of existing decorators change
    // and they all need to be re-evaluated)
    //this.checkModification(data.code.split("\n"), data.event.changes);
  }

  validateConfig(code, force) {
    if ((this.features.validate || force) && this.isConfigFile) {
      const lint = xmllint.validateXML({
        xml: code,
        schema: currentSchema
      });
      postMessage(['errors', parseErrors(code, lint.errors), this.path]);
    }
  }

  checkModification(lines, changes) {
    var decorations = [];

    changes.forEach(function(change) {
      for (var i=change.range.startLineNumber; i<=change.range.endLineNumber; i++) {
        if (this.initialCode[i] !== lines[i]) {
          decorations.push({
            range: {
              startLineNumber: change.range.startLineNumber+1,
              endLineNumber: change.range.endLineNumber+1,
              startColumn: 1,
              endColumn: 1
            },
            options: {
              isWholeLine: true,
              linesDecorationsClassName: 'modified-line'
            }
          });
          break;
        }
      }
    });
    postMessage(['decorations', decorations, this.path]);
  }

  /**
   * Calculate HashCode from string using the crc32 lib.
   *
   * @param string
   * @return {number}
   */
  static hashCode(string) {
    return crc32(string);
  }
}

// mapping calls to SourceFile instances
const openFiles = {};

/**
 * @param data
 * @param features
 */
// eslint-disable-next-line no-unused-vars
function openFile(data, features) {
  if (!openFiles.hasOwnProperty(data.path)) {
    const source = new SourceFile(data.path, features);
    openFiles[data.path] = source;
  }
  openFiles[data.path].open(data);
}

/**
 * @param data
 */
// eslint-disable-next-line no-unused-vars
function closeFile(data) {
  delete openFiles[data.path];
}

/**
 * @param data
 */
// eslint-disable-next-line no-unused-vars
function contentChange(data) {
  if (openFiles.hasOwnProperty(data.path)) {
    const source = openFiles[data.path];
    source.contentChange(data);
  } else {
    console.error('no open file found for path', data.path);
  }
}

/**
 * @param lineElementMap
 * @param lineNo
 */
function getPath(lineElementMap, lineNo) {
  if (lineElementMap.has(lineNo)) {
    const parts = [];
    let child = lineElementMap.get(lineNo);
    let parent = child.parent;
    while (parent) {
      parts.unshift(`${parent.name}[${parent.children.indexOf(child)}]`);
      child = parent;
      parent = child.parent;
    }
    return '/' + parts.join('/');
  }
  return '';
}

/**
 * @param content
 * @param errors
 * @param includePaths
 */
function parseErrors(content, errors, includePaths) {
  if (!errors) {
    return [];
  }
  // parse errors and add xpath expressions to the errors to make the position findable
  const parsedErrors = [];
  const lineElementMap = new Map();
  const contentLines = content.split("\n");
  if (includePaths) {
    let currentElement;
    let currentParent;
    let root;
    let context;
    contentLines.forEach((line, lineNo) => {
      if (context === "comment") {
        // do not parse comments
        const endOfComment = line.indexOf('-->');
        if (endOfComment < 0) {
          // multiline comment goto next line
          return;
        }
      }
      for (let i = line.search(/[^\s]/), l = line.length; i < l; i++) {
        if (line[i] === '<') {
          if (line[i + 1] === '!') {
            const oldContext = context;
            context = 'comment';
            const endOfComment = line.indexOf('-->', i);
            i++;
            if (endOfComment >= i) {
              i = endOfComment+2;
              context = oldContext;
              continue;
            } else {
              // multiline comment goto next line
              return;
            }
          } else if (line[i + 1] === '/') {
            // close tag
            context = '';
            if (currentParent) {
              currentElement = currentParent;
              currentParent = currentElement.parent;
              context = 'element';
            }
            i++;
            continue;
          } else if (line[i + 1] === '?') {
            context = 'header';
            // skip header
            i = line.indexOf('>', i + 1) + 1;
          } else {
            context = 'element';
          }
          if (context === 'element') {
            // new tag
            const match = /^<([^\s>]+)/.exec(line.substr(i));
            if (currentElement) {
              currentParent = currentElement;
            }
            currentElement = { line: lineNo+1, name: match[1], children: [], parent: currentParent };
            if (currentParent) {
              currentParent.children.push(currentElement);
            }
            if (!root) {
              root = currentElement;
            }
            lineElementMap.set(lineNo+1, currentElement);
            let endIndex = line.indexOf(`</${currentElement.name}>`, i);
            if (endIndex === -1) {
              let endTag = line.substr(i).search('>');
              if (endTag >= 0) {
                endTag+=i;
                if (line.substr(endTag-1, 1) === '/') {
                  // position pointer before the /
                  endIndex = endTag - 2;
                } else {
                  endIndex = endTag;
                }
              }
            }
            if (endIndex > -1) {
              i = endIndex;
            }
          }
        } else if (line[i] === '/') {
          context = '';
          if (currentParent) {
            currentElement = currentParent;
            currentParent = currentElement.parent;
            context = 'element';
          }
        }
      }
    });
  }
  errors.forEach(error => {
    if (/.*\.xml:[\d]+:.+/.test(error)) {
      const parts = error.split(':');
      // eslint-disable-next-line no-unused-vars
      const file = parts.shift();
      let lineNo = parseInt(parts.shift());
      const errorType = parts.shift().trim();
      let title;
      let message;
      if (errorType === 'parser error') {
        const end = parts[parts.length - 1];
        title= errorType;
        message = parts.join(': ');
        const lineMatch = /.+line ([\d]+).+/.exec(end);
        if (lineMatch) {
          lineNo = parseInt(lineMatch[1]);
        }
        const source = contentLines[lineNo - 1];
        const err = {
          line: lineNo,
          title: title,
          message: message,
          element: undefined,
          attribute: undefined,
          path: getPath(lineElementMap, lineNo),
          startColumn: Math.max(0, source.search(/[^\s]/)),
          endColumn: source.length,
          original: error
        };
        err.source = source.substr(err.startColumn, err.endColumn - err.startColumn);
        // in editors columns start counting at 1
        err.startColumn++;
        err.endColumn++;
        parsedErrors.push(err);
      } else if (errorType.startsWith('element')) {
        title = parts.shift().trim();
        const position = parts.shift().trim();
        message = parts.join(':').trim();
        const posMatch = /^Element '([^']+)'(,\sattribute '([^']+)')?/.exec(position);
        // in the last part there might be a more precise line number for the error
        const lineMatch = /.+line ([\d]+) -+/.exec(message);
        if (lineMatch) {
          lineNo = parseInt(lineMatch[1]);
        }
        let element;
        let attribute;
        const source = contentLines[lineNo - 1];
        if (posMatch) {
          element = posMatch[1];
          attribute = posMatch.length > 3 ? posMatch[3] : null;
          const err = {
            line: lineNo,
            title: title,
            message: message,
            element: element,
            attribute: attribute,
            path: getPath(lineElementMap, lineNo),
            startColumn: Math.max(0, source.indexOf(element) - 1),
            endColumn: source.length,
            original: error
          };
          if (attribute && source.indexOf(attribute) >= 0) {
            err.startColumn = source.indexOf(attribute + '=');
            const attrMatch = /^(="[^"]*").*/.exec(source.substr(err.startColumn + attribute.length));
            err.endColumn = err.startColumn + attribute.length + attrMatch[1].length;
          }
          err.source = source.substr(err.startColumn, err.endColumn - err.startColumn);
          // in editors columns start counting at 1
          err.startColumn++;
          err.endColumn++;
          parsedErrors.push(err);
        } else {
          console.error('could parse position', position);
        }
      } else {
        console.error('unhandled error type', errorType, error);
      }
    }
  });
  return parsedErrors;
}

function loadSchema(content) {
  const match = schemaRegex.exec(content);
  let schemaFile = '../visu_config.xsd';
  if (match) {
    schemaFile = match[1];
  }
  if (!configSchemas.hasOwnProperty(schemaFile)) {
    configSchemas[schemaFile] = getFileContent(schemaFile);
  }
  currentSchema = configSchemas[schemaFile];
}

/**
 * @param data
 */
// eslint-disable-next-line no-unused-vars
function validateConfig (data) {
  const url = data.path.startsWith('http') ? data.path : '../../' + data.path;
  const content = getFileContent(url);
  if (content) {
    loadSchema(content);
    const lint = xmllint.validateXML({
      xml: content,
      schema: currentSchema
    });
    if (lint.errors) {
      postMessage(['validationResult', parseErrors(content, lint.errors), data.path]);
    } else {
      postMessage(['validationResult', true, data.path]);
    }
  }
}

/**
 * @param id
 * @param content
 * @param includePaths
 */
// eslint-disable-next-line no-unused-vars
function validateXmlConfig(id, content, includePaths) {
  loadSchema(content);
  const lint = xmllint.validateXML({
    xml: content,
    schema: currentSchema
  });
  if (!includePaths || !lint.errors) {
    postMessage(['validationResult', lint.errors || true, id]);
  } else if (lint.errors) {
    postMessage(['validationResult', parseErrors(content, lint.errors, includePaths), id]);
  } else {
    postMessage(['validationResult', true, id]);
  }
}

/**
 * Handle messages from application
 *
 * @param ev
 */
onmessage = function(ev) {
  const topic = ev.data.shift();
  if (topic in this) {
    // dispatch message to handler
    this[topic].apply(this, ev.data);
  }
};
