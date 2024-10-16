(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IStringForm": {
        "require": true
      },
      "qx.ui.form.IForm": {
        "require": true
      },
      "qx.ui.form.MForm": {
        "require": true
      },
      "cv.ui.manager.editor.Source": {},
      "qx.ui.core.queue.Layout": {},
      "qx.ui.core.queue.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* SourceCodeField.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   *
   */
  qx.Class.define('cv.ui.manager.form.SourceCodeField', {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IStringForm, qx.ui.form.IForm],
    include: [qx.ui.form.MForm],
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(value, type) {
      qx.ui.core.Widget.constructor.call(this);
      this._init();
      if (type) {
        this.setType(type);
      }
      if (value) {
        this.setValue(value);
      }
      this.getContentElement().setAttribute('contenteditable', 'true');
    },
    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      /** Fired when the value was modified */
      changeValue: 'qx.event.type.Data'
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        check: 'String',
        init: 'xml',
        apply: '_applyType'
      },
      // overridden
      focusable: {
        refine: true,
        init: true
      },
      autoSize: {
        check: 'Boolean',
        init: false,
        apply: '_autoSize'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _editor: null,
      __P_42_0: null,
      __P_42_1: null,
      _hasBeenEdited: false,
      _applyType: function _applyType(value) {
        if (value && this.__P_42_0) {
          this.setValue(this.__P_42_0);
          this.__P_42_0 = null;
        }
      },
      _autoSize: function _autoSize() {
        if (this._editor && this.isAutoSize()) {
          var contentHeight = (this._editor.getModel().getLineCount() + 1) * 19;
          this._setAreaHeight(contentHeight);
        }
      },
      /**
       * Sets the element's value.
       *
       * @param value {String|null} The new value of the element.
       */
      setValue: function setValue(value) {
        if (!this._hasBeenEdited) {
          if (this._editor && this.getType()) {
            this._editor.setValue(value);
          } else {
            this.__P_42_0 = value;
          }
        }
        this._autoSize();
      },
      /**
       * Resets the element's value to its initial value.
       */
      resetValue: function resetValue() {
        if (this._editor) {
          this._editor.setValue('');
        }
      },
      /**
       * The element's user set value.
       *
       * @return {String|null} The value.
       */
      getValue: function getValue() {
        if (this._editor) {
          return this._editor.getValue();
        } else if (this.__P_42_0) {
          return this.__P_42_0;
        }
        return '';
      },
      _init: function _init() {
        var _this = this;
        if (!window.monaco) {
          cv.ui.manager.editor.Source.load(this._init, this);
        } else {
          var domElement = this.getContentElement().getDomElement();
          if (!domElement) {
            this.addListenerOnce('appear', function () {
              _this._init();
            });
          } else {
            this._editor = window.monaco.editor.create(domElement, {
              suggestOnTriggerCharacters: true,
              folding: true,
              autoIndent: true,
              automaticLayout: true,
              dragAndDrop: true,
              formatOnPaste: true,
              formatOnType: true,
              renderValidationDecorations: 'on',
              minimap: {
                enabled: false
              },
              theme: 'vs-dark'
            });
            if (this.getType()) {
              var model = this._editor.getModel();
              var uri = monaco.Uri.parse('cv://SourceCode.' + this.getType());
              var newModel = window.monaco.editor.getModel(uri);
              if (!newModel) {
                newModel = window.monaco.editor.createModel(this.__P_42_0, this.getType(), uri);
              } else {
                newModel.setValue(this.__P_42_0);
              }
              if (model !== newModel) {
                newModel.updateOptions({
                  tabSize: 2,
                  indentSize: 2,
                  insertSpaces: true
                });
                this._editor.setModel(newModel);
                this._autoSize();
              }
            }
            if (this.__P_42_0) {
              this.__P_42_0 = null;
            }
            this._editor.onDidChangeModelContent(this._onContentChange.bind(this));
          }
        }
      },
      _onContentChange: function _onContentChange() {
        this._hasBeenEdited = true;
        this.fireDataEvent('changeValue', this._editor.getValue());
        this._autoSize();
      },
      // overridden
      getFocusElement: function getFocusElement() {
        var el = this.getContentElement();
        if (el) {
          return el;
        }
        return null;
      },
      _setAreaHeight: function _setAreaHeight(height) {
        if (this.__P_42_1 !== height) {
          this.__P_42_1 = height;
          qx.ui.core.queue.Layout.add(this);
          qx.ui.core.queue.Manager.flush();
          if (this._editor) {
            this._editor.layout();
          }
        }
      },
      // overridden
      _getContentHint: function _getContentHint() {
        var hint = cv.ui.manager.form.SourceCodeField.superclass.prototype._getContentHint.call(this);
        if (this.isAutoSize()) {
          hint.height = this.__P_42_1 || hint.height;
        }
        return hint;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._hasBeenEdited = false;
      if (this._editor) {
        this._editor.dispose();
        this._editor = null;
      }
    }
  });
  cv.ui.manager.form.SourceCodeField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SourceCodeField.js.map?dt=1729101215679