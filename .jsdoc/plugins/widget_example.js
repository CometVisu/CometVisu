/**
 @module plugins/widget_example
 @author Tobias Bräutigam
 */
'use strict';

var logger = require('jsdoc/util/logger');
var fs = require('fs');

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
        fs.writeFile(filename, tag.value.replace(/^\s*<caption>[^<]+<\/caption>\n?/,""), function(err) {
          if (err) {
            logger.error(err);
          }
        });
      });
    }
  }
};