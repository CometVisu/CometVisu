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

let configSchema;

function getFileContent (path) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false); // Note: synchronous
    xhr.send();
    if (xhr.status === 200) {
      return xhr.response;
    } else {
      console.error("XHR Error for ", path, xhr.status, xhr.statusText);
      return null;
    }
  } catch(e) {
    console.error("XHR Error for ", path, e.toString());
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
      modified: true
    }, features || {});

    if (this.isConfigFile && !configSchema) {
      // load scheme file
      configSchema = getFileContent('../visu_config.xsd');
    }
  }

  /**
   * Called after editor has been loaded with a config file
   * @param data {Map}
   */
  open(data) {
    this.initialCode = data.code.split("\n");
    if (this.features.hash) {
      this.initialHash = SourceFile.hashCode(data.code);
    }

    // initial syntax check
    this.contentChange(data);
  }

  /**
   * Called after file has been saved
   * @param data {String} Complete code
   */
  saved(data) {
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
      postMessage(["modified", {
        modified: (this.currentHash !== this.initialHash),
        currentHash: this.currentHash,
        initialHash: this.initialHash
      }, this.path]);
    } else if (this.features.hash) {
      postMessage(["hash", this.currentHash, this.path]);
    }

    if (this.features.validate && this.isConfigFile) {
      var lint = xmllint.validateXML({
        xml: data.code,
        schema: configSchema
      });
      postMessage(["errors", lint.errors, this.path]);
    }

    // currently disabled as these are hard to maintain (e.g. if you delete a line the range of existing decorators change
    // and they all need to be re-evaluated)
    //this.checkModification(data.code.split("\n"), data.event.changes);
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
    postMessage(["decorations", decorations, this.path]);
  }

  /**
   * Calculate HashCode from string using the crc32 lib.
   *
   * @return {number}
   */
  static hashCode(string) {
    return crc32(string);
  }
}

// mapping calls to SourceFile instances
const openFiles = {};

function openFile(data, features) { // jshint ignore:line
  if (!openFiles.hasOwnProperty(data.path)) {
    const source = new SourceFile(data.path, features);
    openFiles[data.path] = source;
  }
  openFiles[data.path].open(data);
}

function closeFile(path) { // jshint ignore:line
  delete openFiles[path];
}

function contentChange(data) { // jshint ignore:line
  if (openFiles.hasOwnProperty(data.path)) {
    const source = openFiles[data.path];
    source.contentChange(data);
  } else {
    console.error('no open file found for path', data.path);
  }
}

function validateConfig (data) {
  const url = data.path.startsWith('http') ? data.path : '../../' + data.path;
  const content = getFileContent(url);
  if (content) {
    if (!configSchema) {
      configSchema = getFileContent('../visu_config.xsd');
    }
    const lint = xmllint.validateXML({
      xml: content,
      schema: configSchema
    });
    postMessage(["validationResult", lint.errors || true, data.path]);
  }
}

/**
 * Handle messages from application
 */
onmessage = function(ev) {
  var topic = ev.data.shift();
  if (topic in this) {
    // dispatch message to handler
    this[topic].apply(this, ev.data);
  }
};
