const fs = require('fs-extra');
const path = require('path');
const convert = require('xml-js');
const crypto = require('crypto');
// const xmllint = require('../../../source/resource/manager/xmllint')
const { AbstractCompileHandler } = require('../AbstractCompileHandler');

const additionalResources = [
  'qxl/apiviewer/lib/sunlight.javascript-min.js',
  'qxl/apiviewer/lib/sunlight.xml-min.js',
  'qxl/apiviewer/lib/sunlight-min.js',
  'qxl/apiviewer/css/sunlight.default.css'
];

class ApiCompileHandler extends AbstractCompileHandler {
  constructor(compilerApi, dbConfig) {
    super(compilerApi, dbConfig);
    this.configParts = {
      start: '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="9" design="%%%DESIGN%%%" xsi:noNamespaceSchemaLocation="../visu_config.xsd" scroll_speed="0">',
      meta: '<meta/>',
      content_start: '<page name="Example">',
      content_end: '</page>',
      end:   '</pages>'
    };
    this.settingsTemplate = {
      selector: '.widget_container',
      screenshotDir: ''
    };
    const currentDir = process.cwd();
    this.schema = fs.readFileSync(path.join(currentDir, 'source', 'resource', 'visu_config.xsd'));
    this.exampleDir = null;
    this.convertConfig = {compact: true, spaces: 2, ignoreDeclaration: true};
    this.defaultDesign = 'metal';
    this.counters = {};
    this._docConfig = {};
  }


  onLoad () {
    const targetType = this._compilerApi.getCommand().getTargetType();
    this.exampleDir = path.join(process.cwd(), 'cache', 'widget_examples', targetType);
    fs.ensureDir(this.exampleDir);
    if (targetType === 'build') {
      this._config.targets.some(target => {
        if (target.type === 'build') {
          target.targetClass = qx.tool.compiler.targets.BuildTarget;
          return true;
        }
        return false;
      });
    }

    const targetDir = this._getTargetDir();
    this.settingsTemplate.screenshotDir = path.join(targetDir, 'resource', 'qxl', 'apiviewer', 'examples');

    let command = this._compilerApi.getCommand();
    command.addListener('made', () => this._onMade());
    command.addListener('compiledClass', this._onCompiledClass, this);
  }

  _onMade() {
    // cleanup files we do not need (everything from the compiled cv application: resources, application)
    const targetDir = this._getTargetDir();
    if (targetDir) {
      fs.readdirSync(path.join(targetDir, 'resource')).forEach(file => {
        if (!file.startsWith('qx') && !file.startsWith('apidata')) {
          const dir = path.join(targetDir, 'resource', file);
          fs.removeSync(dir);
        }
      });
      // remove the cv application
      fs.removeSync(path.join(targetDir, 'cv'));
    }
  }

  async _onCompiledClass(ev) {
    const data = ev.getData();
    if (data.classFile.getClassName() === 'qxl.apiviewer.Application') {
      additionalResources.forEach(res => data.dbClassInfo.assets.push(res));
    }
    if (data.classFile.getClassName().startsWith('cv')) {
      const jsdoc = data.classFile.getOuterClassMeta().clazz.jsdoc;

      // 1. delete the copyright comment
      if (jsdoc && jsdoc.hasOwnProperty('@description')) {
        while (jsdoc['@description'].length > 1) {
          jsdoc['@description'].shift();
        }
      } else {
        return;
      }

      if (jsdoc.hasOwnProperty('@widgetexample')) {
        jsdoc['@widgetexample'].forEach(example => {
          const body = example['body'];
          try {
            const parsed = this.parseWidgetExample(convert.xml2js('<root>'+body+ '</root>', this.convertConfig));
            jsdoc['@description'][0]['body'] += this.getScreenshotsHtml(parsed);
            jsdoc['@description'][0]['body'] += '\n<div class="code"><pre class="sunlight-highlight-xml">' + parsed.display_content + '\n</pre></div>\n';
            this.saveScreenshotControlFile(parsed);
          } catch (e) {
            console.error('Parsing widget example failed', body, e);
          }
        });
      }

      if (jsdoc.hasOwnProperty('@author')) {
        const authors = [];
        jsdoc['@author'].forEach(author => {
          authors.push(author.body);
        });
        jsdoc['@description'][0]['body'] += '<div class="authors"><label>' + (authors.length > 1 ? 'Authors' : 'Author') +':</label> ' + authors.join('; ') +'</div>';
      }
      if (jsdoc.hasOwnProperty('@since')) {
        let since = '<div class="since"><label>Since:</label> ';
        jsdoc['@since'].forEach(s => {
          since += s.body;
        });
        since += '</div>';
        jsdoc['@description'][0]['body'] += since;
      }
    }
  }

  /**
   * Generates the screenshot settings for a widget example
   * @param raw {Object} JSON structure converted from the example code
   */
  parseWidgetExample(raw) {
    let settings = Object.assign({
      screenshots: [],
      fixtures: []
    }, this.settingsTemplate);
    const parsed = raw.root;
    if (!parsed) {
      throw new Error('Parsing failed: no root element found');
    }
    let exampleTag = '';
    Object.keys(parsed).filter(name => !name.startsWith('_') && ['settings', 'meta'].indexOf(name) === -1).forEach(elementName => {
      exampleTag = elementName;
    });
    if (!this.counters.hasOwnProperty(exampleTag)) {
      this.counters[exampleTag] = 0;
    } else {
      this.counters[exampleTag] += 1;
    }
    let globalCaption = '';
    let design = this.defaultDesign;
    if (parsed.hasOwnProperty('settings')) {
      Object.keys(parsed.settings).forEach(element => {
        let fixtures;
        let screenshots;
        switch (element) {
          case '_attributes':
            if (parsed.settings._attributes.design) {
              design = parsed.settings._attributes.design;
              delete parsed.settings._attributes.design;
            }
            settings = Object.assign(settings, parsed.settings._attributes);
            break;

          case 'fixture':
            fixtures = Array.isArray(parsed.settings.fixture) ? parsed.settings.fixture : [parsed.settings.fixture];
            fixtures.forEach(fixture => {
              settings.fixtures.push({
                'sourceFile': fixture._attributes['source-file'],
                'targetPath': fixture._attributes['target-path']
              });
            });
            break;

          case 'screenshot':
            screenshots = Array.isArray(parsed.settings.screenshot) ? parsed.settings.screenshot : [parsed.settings.screenshot];
            screenshots.forEach((screenshot, shot_index) => {
              const attrs = screenshot.hasOwnProperty('_attributes') ? screenshot._attributes : {};
              let shot = {
                name: exampleTag + this.counters[exampleTag] + shot_index,
                data: []
              };

              Object.keys(attrs).forEach(name => {
                switch (name) {
                  case 'clickpath':
                    shot['clickPath'] = attrs[name];
                    break;

                  case 'waitfor':
                    shot['waitFor'] = attrs[name];
                    break;

                  default:
                    shot[name] = attrs[name];
                    break;
                }
              });

              if (screenshot.data) {
                const data = Array.isArray(screenshot.data) ? screenshot.data : [screenshot.data];
                data.forEach(d => {
                  const values = {
                    'address': d._attributes.address || '0/0/0',
                    'value': d._text
                  };
                  if (d._attributes.type) {
                    values.type = d._attributes.type;
                  }
                  shot.data.push(values);
                });
                if (screenshot.hasOwnProperty('caption')) {
                  const captions = Array.isArray(screenshot.caption) ? screenshot.caption : [screenshot.caption];
                  if (captions.length > 0) {
                    if (!shot.hasOwnProperty('caption')) {
                      shot.caption = '';
                    }
                    shot.caption += captions.map(c => c._text).join();
                  }
                }
              }
              settings.screenshots.push(shot);
            });
            break;

          case 'caption':
            globalCaption = parsed.settings.caption._text;
            break;
        }
      });
      delete parsed.settings;
    }
    let code = '';
    let meta = '';

    if (parsed.hasOwnProperty('meta')) {
      meta = '<meta>\n' + convert.json2xml(parsed.meta, this.convertConfig) + '\n</meta>\n';
      code += '\n...\n' + this.escapeXml(meta) + '...\n';
      delete parsed.meta;
    }
    let exampleCode = convert.json2xml(parsed, this.convertConfig);
    code += this.escapeXml(exampleCode);

    return {
      example_content: exampleCode,
      display_content: code,
      example_tag: exampleTag,
      meta_content: meta,
      global_caption: globalCaption,
      settings: settings,
      design: design
    };
  }

  /**
   * Generate the HTML-Code for displaying the generated screenshots
   * @param control {Object} parsed screenshot data
   */
  // eslint-disable-next-line class-methods-use-this
  getScreenshotsHtml(control) {
    let text = '';
    control.settings.screenshots.forEach((shot, i) => {
      const classes = ['widget-example'];
      if (i % 2 === 0) {
        classes.push('last');
      }
      text += '<div class="' + classes.join(' ') + '">';
      text += '<img id="' + shot.name + '" src="resource/qxl/apiviewer/examples/' + shot.name + '.png"';
      if (shot.caption) {
        text += ' alt="' + shot.caption + '" title="' + shot.caption + '"/>';
        text += '<label for="' + shot.name + '">' + shot.caption + '</label>';
      } else {
        text += '/>';
      }
      text += '</div>';
    });
    if (control.global_caption) {
      text += '<div class="caption">' + control.global_caption + '</div>';
    }
    return text;
  }

  async saveScreenshotControlFile(control) {
    const visuConfigParts = Object.assign({}, this.configParts);
    // replace the design value in the config
    visuConfigParts.start = visuConfigParts['start'].replace('%%%DESIGN%%%', control.design);
    if (control.example_tag === 'page') {
      visuConfigParts.content_start = '';
      visuConfigParts.content_end = '';
    }

    if (control.meta_content && control.meta_content.length > 0) {
      // replace default value
      visuConfigParts.meta = control.meta_content;
    }

    // build the real config source
    const visu_config = visuConfigParts.start +
      visuConfigParts.meta +
      visuConfigParts.content_start +
      control.example_content +
      visuConfigParts.content_end +
      visuConfigParts.end;

    control.settings.config = visu_config;
    const strippedData = Object.assign({}, control.settings);
    delete strippedData.screenshots;
    const baseHashValue = JSON.stringify(strippedData);
    for (const shot of control.settings.screenshots) {
      shot.hash = crypto.createHash('md5').update(baseHashValue + JSON.stringify(shot)).digest('hex');
    }

    fs.outputFileSync(
      path.join(this.exampleDir, control.example_tag) + '_' + this.counters[control.example_tag] + '.json',
      JSON.stringify(control.settings, null, 4),
      'utf8'
    );
  }

  // eslint-disable-next-line class-methods-use-this
  escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
      return '';
    });
  }
}

module.exports = {
  ApiCompileHandler: ApiCompileHandler
};
