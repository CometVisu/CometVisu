/**
 *
 */
qx.Class.define('cv.ui.structure.tile.AbstractTileWidget', {
  extend: qx.core.Object,
  type: 'abstract',

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    for (let prop in props) {
      if (this['set' + qx.Bootstrap.firstUp(prop)] !== undefined) {
        this.set(prop, props[prop]);
      }
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    /**
     * Internal path to the widget
     */
    path : {
      check: 'String'
    },

    /**
     * The widget type
     */
    $$type : {
      check: 'String'
    },

    /**
     * If true this widget does not automatically apply any listeners
     */
    anonymous : {
      check: 'Boolean',
      init: false
    },
    classes: {
      check: 'String',
      init: '',
      nullable: true
    },
    label: {
      check: 'String',
      init: '',
      nullable: true
    },
    bindClickToWidget : {
      check: 'Boolean',
      init: false
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __parentWidget: null,
    __element: null,

    setParentWidget: function(value) {
      this.__parentWidget = value;
    },

    getParentWidget: function() {
      if (cv.Config.lazyLoading === true && this.__parentWidget === null && this.getPath() !== 'id_') {
        // creating parent widget on demand
        const parentData = cv.util.Tree.getParentData(this.getPath());
        // console.log(parentData.$$type + " (" + parentData.path + ") is parent of " + this.get$$type() + " (" + this.getPath() + ")");
        const parent = cv.ui.structure.WidgetFactory.createInstance(parentData.$$type, parentData);
        this.setParentWidget(parent);
      }
      return this.__parentWidget;
    },

    /**
     * Alias for getDomElement()
     * @return {Element}
     */
    getDom() {
      return this.getDomElement();
    },

    /**
     * Generates the DOM string for this widget
     *
     * @return {Element} The widgets DOM element
     */
    getDomElement : function() {
      if (!this.__element) {
        this.__element = this._createDomElement();
      }
      return this.__element;
    },

    _createDomElement() {
      const element = document.createElement('div');
      element.classList.add('tile', ...this.getClasses().trim().split(' '));
      element.append(this._getInnerDom());
      return element;
    },

    /**
     *
     * @returns {DocumentFragment}
     * @private
     */
    _getInnerDom: function () {
      return document.createDocumentFragment();
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this.__parentWidget = null;
  }
});
