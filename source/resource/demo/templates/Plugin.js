/**
 * TODO: Describe your plugin here
 *
 * @author add your name here
 * @since ###SINCE###
 */
qx.Class.define('cv.plugin.$0', {
   extend: cv.ui.structure.pure.AbstractWidget,

   /*
   ***********************************************
     CONSTRUCTOR
   ***********************************************
   */
   constructor(props) {
     super(props);
   },

   /*
   ***********************************************
     STATICS
   ***********************************************
   */
   statics: {
     /**
      * Parses the widgets XML configuration and extracts the given information
      * to a simple key/value map.
      *
      * @param xml {Element} XML-Element
      * @param path {String} internal path of the widget
      * @param flavour {String} Flavour of the widget
      * @param pageType {String} Page type (2d, 3d, ...)
      */
     parse (xml, path, flavour, pageType) {
       let data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, this.getAttributeToPropertyMappings());

       // uncomment this line when your plugin has an address element
       // cv.parser.pure.WidgetParser.parseAddress(xml, path);

       // uncomment this line if your plugin needs to refresh regularly (this parses the 'refresh' attribute)
       // cv.parser.pure.WidgetParser.parseRefresh(xml, path);
       return data;
     },

     /**
      * This maps attributes from the plugins XML-definition to properties of this class.
      * @returns {Map}
      */
     getAttributeToPropertyMappings: function () {
       // make sure that you have defined the properties you are trying to map here
       // please use the source code of other plugins to see whats possible here
       return {
         // add your mappings here
       };
     }
   },

  /*
   ***********************************************
     PROPERTIES
   ***********************************************
  */
   properties: {
     
   },

   /*
   ***********************************************
     MEMBERS
   ***********************************************
   */
   members: {
     
   },

   /*
   ***********************************************
     DESTRUCTOR
   ***********************************************
   */
   destruct: function () {
     
   },

   defer: function (statics) {
     // register the parser, Note: element-name must be changed to the xml-elements name this plugin should parse
     cv.parser.pure.WidgetParser.addHandler('element-name', statics);
   }
});
