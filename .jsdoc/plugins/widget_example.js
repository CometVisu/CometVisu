/**
 @module plugins/widget_example
 @author Tobias Bräutigam
 */
'use strict';

var logger = require('jsdoc/util/logger');
var fs = require('fs');
var xsd = require('libxml-xsd');
var libxmljs = require('libxml-xsd').libxmljs;

var configParts = {
  start : '<pages xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" lib_version="8" design="metal" xsi:noNamespaceSchemaLocation="../visu_config.xsd"><meta/><page name="Example">',
  end :   '</page></pages>'
};

var schemaString = fs.readFileSync("src/visu_config.xsd", "utf-8");
var schema = xsd.parse(schemaString);

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
        var jsdocExample, configExample, configNode;
        var name = e.doclet.name.replace(/\//g,"_")+index;
        var filename = "cache/widget_examples/"+name+".xml";
        var xml = libxmljs.parseXmlString('<?xml version="1.0" encoding="UTF-8"?><root>'+tag.value+"</root>");
        var firstChild = xml.root().childNodes()[0];

        if (firstChild.name() == "meta") {
          // read meta settings
          var screenshots = [];
          var shotIndex = 0;
          var globalCaption = null;
          firstChild.childNodes().forEach(function(screenshot) {
            if (screenshot.name() == "screenshot") {
              var shot = {name: screenshot.attr("name").value() || name + shotIndex, data: {}};
              screenshot.childNodes().forEach(function (node) {
                if (node.name() == "caption") {
                  shot.caption = node.text();
                } else if (node.name() == "data") {
                  shot.data[node.attr("address").value()] = node.text()
                }
              });
              screenshots.push(shot);
              shotIndex++;
            } else if (screenshot.name() == "caption") {
              // global caption
              globalCaption = screenshot;
            }
          });
          // get the next non-text node
          xml.root().childNodes().forEach(function(child, index) {
            if (child.name() != "text") {
              configNode = child;
              return;
            }
          });
          configExample = configNode.toString(true);
          jsdocExample = configExample;
          var globalCaptionString = "";
          if (globalCaption) {
            // add caption for further example processing
            globalCaptionString = globalCaption.text();
          } else if (screenshots.length == 1) {
            // use the caption of the only screenshot we have as global caption for the example
            globalCaptionString = screenshots[0].caption;
          }
          for (var i=0; i < screenshots.length; i++) {
            globalCaptionString += '<br/>' +
              '<img style="margin-bottom: 3px" id="'+screenshots[i].name+'" src="static/'+screenshots[i].name+'.png" alt="'+screenshots[i].caption+'" title="'+screenshots[i].caption+'"/>' +
              '<label style="margin-left: 10px" for="'+screenshots[i].name+'">'+screenshots[i].caption+'</label>';
          }
          jsdocExample = '<caption>'+globalCaptionString+'</caption>\n' + jsdocExample;
        } else if (firstChild.name() == "caption") {
          configExample = xml.root().childNodes()[1].toString(true);
          jsdocExample = tag.value;
        } else {
          jsdocExample = tag.value;
          configExample = tag.value;
        }
        e.doclet.examples.push(jsdocExample);
        var configSource = configParts.start + configExample + configParts.end;

        // validate the configSource snippet against the visu_config.xsd file
        var validationErrors = schema.validate(configSource);
        if (validationErrors) {
          logger.error(validationErrors);
          logger.error(configSource);
          return
        }
        // example is a valid configuration
        fs.writeFile(filename, JSON.stringify(screenshots)+"\n"+configSource, function(err) {
          if (err) {
            logger.error(err);
          }
        });
      });
    }
  }
};