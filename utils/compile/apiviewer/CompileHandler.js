const fs = require('fs-extra')
const path = require('path')
const { AbstractCompileHandler } = require('../AbstractCompileHandler')

const additionalResources = [
  'qxl/apiviewer/lib/sunlight.javascript-min.js',
  'qxl/apiviewer/lib/sunlight.xml-min.js',
  'qxl/apiviewer/lib/sunlight-min.js',
  'qxl/apiviewer/css/sunlight.default.css'
];

class ApiCompileHandler extends AbstractCompileHandler {
  onLoad () {
    let command = this._compilerApi.getCommand();
    command.addListener("made", () => this._onMade());
    command.addListener("compiledClass", this._onCompiledClass, this);
  }

  _onMade() {
    // cleanup files we do not need (everything from the compiled cv application: resources, application)
    const targetDir = this._getTargetDir()
    if (targetDir) {
      fs.readdirSync(path.join(targetDir, 'resource')).forEach(file => {
        if (!file.startsWith('qx')) {
          const dir = path.join(targetDir, 'resource', file)
          fs.removeSync(dir)
        }
      })
      // remove the cv application
      fs.removeSync(path.join(targetDir, 'cv'))
    }
  }

  _onCompiledClass(ev) {
    const data = ev.getData();
    if (data.classFile.getClassName() === 'qxl.apiviewer.Application') {
      additionalResources.forEach(res => data.dbClassInfo.assets.push(res))
    }
    if (data.classFile.getClassName().startsWith('cv')) {
      const jsdoc = data.classFile.getOuterClassMeta().clazz.jsdoc

      // 1. delete the copyright comment
      if (jsdoc && jsdoc.hasOwnProperty('@description')) {
        while (jsdoc['@description'].length > 1) {
          jsdoc['@description'].shift()
        }
      } else {
        return
      }

      if (jsdoc.hasOwnProperty('@widgetexample')) {
        jsdoc['@widgetexample'].forEach(example => {
          // TODO: embed screenshot code and create screenshot file
          const body = example['body']
          const parts = /^\s*(<settings>.+<\/settings>)?\n?\s*(<meta>.+<\/meta>)?(.*)$/gms.exec(body)
          if (parts) {
            let code = ''
            if (parts[2]) {
              code += '\n...\n' + this.escapeXml(parts[2]) + '\n...'
            }
            code += this.escapeXml(parts[3])
            jsdoc['@description'][0]['body'] += '\n<pre class="sunlight-highlight-xml">' + code + '\n</pre>\n'
          } else {
            console.error('could not parse', body)
          }
        })
      }

      if (jsdoc.hasOwnProperty('@author')) {
        let authors = '<div><strong>Author</strong>: '
        jsdoc['@author'].forEach(author => {
          authors += author.body
        })
        authors += '</div>'
        jsdoc['@description'][0]['body'] += authors
      }
      if (jsdoc.hasOwnProperty('@since')) {
        let since = '<div><strong>Since</strong>: '
        jsdoc['@since'].forEach(s => {
          since += s.body
        })
        since += '</div>'
        jsdoc['@description'][0]['body'] += since
      }
    }
  }

  escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });
  }
}

module.exports = {
  ApiCompileHandler: ApiCompileHandler
}