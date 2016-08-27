/**
 @module plugins/widget_example
 @author Tobias Bräutigam
 */
'use strict';

var logger = require('jsdoc/util/logger');
var fs = require('fs');
var path = require('path');
var xsd = require('libxml-xsd');
var libxmljs = require('libxml-xsd').libxmljs;

var configParts = {
  start : '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="8" design="%%%DESIGN%%%" xsi:noNamespaceSchemaLocation="../visu_config.xsd">',
  meta : '<meta/>',
  content_start: '<page name="Example">',
  content_end: '</page>',
  end :   '</pages>'
};

var createDir = function(dir) {
  try {
    fs.statSync(dir);
  } catch(e) {
    var create = [dir];
    var parts = dir.split(path.sep);
    parts.pop();
    var parentDir = parts.join(path.sep);
    var exists = false;
    while(!exists && parentDir) {
      try {
        fs.statSync(parentDir);
        exists = true;
      } catch(e) {
        create.unshift(parentDir);
        parts = parentDir.split(path.sep);
        parts.pop();
        parentDir = parts.join(path.sep);
      }
    }
    create.forEach(function(newDir) {
      fs.mkdirSync(newDir, "0744");
    });
  }
};

var cacheDir = path.join("cache", "widget_examples", "jsdoc");
var screenshotDir = path.join("out", "api", "examples");
createDir(cacheDir);

var schemaString = fs.readFileSync(path.join("src", "visu_config.xsd"), "utf-8");
var schema = xsd.parse(schemaString);

function getCaptionString(globalCaption, screenshots) {
  var res = globalCaption;
  for (var i=0; i < screenshots.length; i++) {
    var divStyle = "margin-top: 5px; float:left; width: 50%; text-align: center;";
    if (i % 2 == 0) {
      divStyle += " clear: left";
    }
    res += '<div style="'+divStyle+'">'+
      '<img id="'+screenshots[i].name+'" src="examples/'+screenshots[i].name+'.png"';
    if (screenshots[i].caption) {
      res += ' alt="'+screenshots[i].caption+'" title="'+screenshots[i].caption+' ">';
      res += '<label style="margin-left: 10px; clear: left" for="' + screenshots[i].name + '">' + screenshots[i].caption + '</label>';
    } else {
      res += ' "/>';
    }
    res += '</div>';
  }
  if (res) {
    return '<caption>' + res + '</caption>\n';
  } else {
    return '\n';
  }
}

function traverseElements(rootNode, visuConfigParts) {
  var res = {
    metaNode: null,
    configNode: null
  };
  rootNode.childNodes().forEach(function(child) {
    if (child.type() == "element") {
      if (child.name() == "meta") {
        // this needs to to placed in the configs meta part
        res.metaNode = child;
        visuConfigParts.meta = child.toString(true);
      }
      else {
        // must be the example code
        res.configNode = child;
        return;
      }
    }
  });
  return res;
}

exports.handlers = {
  newDoclet: function(e) {
    var tags = e.doclet.tags;

    // any user-defined tags in this doclet?
    if (typeof tags !== 'undefined') {
      // only interested in the @source tags
      tags = tags.filter(function ($) {
        return $.title === 'widget_example';
      });

      e.doclet.examples = e.doclet.examples || [];

      tags.forEach(function(tag, index) {
        var jsdocExample, configExample;
        var name = e.doclet.name.replace(/\//g,"_")+index;
        var filename = path.join(cacheDir, name+".xml");
        var xml = libxmljs.parseXmlString('<?xml version="1.0" encoding="UTF-8"?><root>'+tag.value+"</root>");
        var firstChild = xml.root().childNodes()[0];

        // clone the configParts
        var visuConfigParts = JSON.parse(JSON.stringify(configParts));
        var design = "metal";
        var settings = {
          selector: ".widget_container",
          screenshots: [],
          screenshotDir: screenshotDir
        };

        if (firstChild.name() == "settings") {
          // read meta settings
          var shotIndex = 0;
          var globalCaption = null;

          if (firstChild.attr("design")) {
            design = firstChild.attr("design").value();
          }
          if (firstChild.attr("selector")) {
            settings.selector = firstChild.attr("selector").value();
          }

          firstChild.childNodes().forEach(function(node) {
            if (node.name() == "screenshot") {
              var shot = {
                name: node.attr("name").value() || name + shotIndex,
                data: []};
              node.childNodes().forEach(function (node) {
                if (node.name() == "caption") {
                  shot.caption = node.text();
                } else if (node.name() == "data") {
                  shot.data.push({
                    'address': node.attr("address").value(),
                    'value': node.text()
                  });
                }
              });
              settings.screenshots.push(shot);
              shotIndex++;
            } else if (node.name() == "caption") {
              // global caption
              globalCaption = node;
            }
          });
          // no screenshots defined, add a default one
          if (settings.screenshots.length == 0) {
            settings.screenshots.push({
              name: name + shotIndex
            });
          }
        } else if (firstChild.name() == "caption") {
          globalCaption = firstChild;
          firstChild.remove();
          settings.screenshots = [{ name: name }];
        } else {
          settings.screenshots = [{ name: name }];
        }
        // replace the design value in the config
        visuConfigParts.start = visuConfigParts.start.replace("%%%DESIGN%%%", design);

        // get the next non-text node
        var configNodes = traverseElements(xml.root(), visuConfigParts);

        configExample = configNodes.configNode.toString(true);
        jsdocExample = configExample;
        if (configNodes.metaNode) {
          // add meta settings to the example
          jsdocExample = "...\n"+visuConfigParts.meta+"\n...\n"+jsdocExample;
        }

        var globalCaptionString = "";
        if (globalCaption) {
          // add caption for further example processing
          globalCaptionString = globalCaption.text();
        } else if (settings.screenshots.length == 1 && settings.screenshots[0].caption) {
          // use the caption of the only screenshot we have as global caption for the example
          globalCaptionString = settings.screenshots[0].caption;
        }
        jsdocExample = getCaptionString(globalCaptionString, settings.screenshots) +" {@lang xml} "+ jsdocExample;

        e.doclet.examples.push(jsdocExample);

        // build the real config source
        var configSource = visuConfigParts.start +
          visuConfigParts.meta +
          visuConfigParts.content_start +
          configExample +
          visuConfigParts.content_end +
          configParts.end;

        // validate the configSource snippet against the visu_config.xsd file
        var validationErrors = schema.validate(configSource);
        if (validationErrors) {
          logger.error(validationErrors);
          logger.error(configSource);
          return
        }
        // example is a valid configuration
        fs.writeFile(filename, JSON.stringify(settings)+"\n"+configSource, function(err) {
          if (err) {
            logger.error(err);
          }
        });
      });
    }
  }
};