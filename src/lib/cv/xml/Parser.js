
define( [
  'dependencies/joose-all-min',
  'lib/cv/Object'
  ],
  function () {
    Class('cv.xml.Parser', {
      isa: cv.Object,

      my: {
        has: {
          handlers: {is: 'rw', init: {}}
        },

        methods: {
          addHandler: function (tagName, handler) {
            this.handlers[tagName] = handler;
          },

          getHandler: function (tagName) {
            return this.handlers[tagName];
          },

          parse: function (xml, path, flavour, type) {
            var parser = this.getHandler(xml.nodeName);
            if (parser) {
              return parser.parse(xml, path, flavour, type);
            }
            return null;
          }
        }
      }
    });
  }
);