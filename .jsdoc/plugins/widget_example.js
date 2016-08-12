/**
 @module plugins/widget_example
 @author Tobias Bräutigam
 */
'use strict';

var logger = require('jsdoc/util/logger');
var fs = require('fs');
var xsd = require('libxml-xsd');

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
        e.doclet.examples.push(tag.value);
        var name = e.doclet.name.replace(/\//g,"_")+index;
        var filename = "cache/widget_examples/"+name+".xml";
        var configSource = configParts.start + tag.value.replace(/^\s*<caption>[^<]+<\/caption>\n?/,"") + configParts.end;
        // validate the configSource snippet against the visu_config.xsd file
        var validationErrors = schema.validate(configSource);
        if (validationErrors) {
          logger.error(validationErrors);
          logger.error(configSource);
          return
        }
        // example is a valid configuration
        fs.writeFile(filename, configSource, function(err) {
          if (err) {
            logger.error(err);
          }
        });
      });
    }
  }
};