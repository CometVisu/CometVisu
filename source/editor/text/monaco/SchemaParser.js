/**
 * SchemaParser
 *
 * @author tobiasb
 * @since 2017
 */

function SchemaParser(schema) {

  this.attributes = {};
  this.elements = {
    root : {
      children: []
    }
  };


  function parse() {
    // find root elements
    schema.children.forEach(function(child) {
      if (this["__parse_"+child.nodeName]) {
        this["__parse_"+child.nodeName](child);
      } else {
        console.log("unhandled node type "+child.nodeName);
      }
    });
  }

  function __parse_attribute(node) {

  }
}