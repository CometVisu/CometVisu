(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.Version": {},
      "cv.io.rest.Client": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* CometVisu.js 
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
  qx.Class.define('cv.ui.manager.editor.completion.CometVisu', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      TEMPLATES: null,
      getTemplates: function getTemplates() {
        if (!this.TEMPLATES) {
          this.TEMPLATES = [{
            filterText: 'cvclass',
            label: 'CometVisu-Class',
            kind: window.monaco.languages.CompletionItemKind.Class,
            detail: 'A generic CometVisu class.',
            insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Class.define("cv.$0", {\n  extend: qx.core.Object,\n\n  \n});\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvwidget',
            label: 'CometVisu-Widget',
            kind: window.monaco.languages.CompletionItemKind.Class,
            detail: 'A CometVisu class for a widget.',
            insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Class.define("cv.ui.structure.pure.$0", {\n  extend: cv.ui.structure.AbstractWidget,\n\n  \n});\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvinterface',
            label: 'CometVisu-Interface',
            kind: window.monaco.languages.CompletionItemKind.Interface,
            detail: 'A generic CometVisu Interface.',
            insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Interface.define("cv.$0", {\n  \n});\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvmixin',
            label: 'CometVisu-Mixin',
            kind: window.monaco.languages.CompletionItemKind.Class,
            detail: 'A generic CometVisu Mixin.',
            insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Mixin.define("cv.$0", {\n  \n});\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvmembers',
            label: 'CometVisu-Class members',
            kind: window.monaco.languages.CompletionItemKind.Struct,
            detail: 'A CometVisu classes members section.',
            insertText: '  /*\n  ***********************************************\n    MEMBERS\n  ***********************************************\n  */\n  members: {\n    $0\n  },\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvproperties',
            label: 'CometVisu-Class properties',
            kind: window.monaco.languages.CompletionItemKind.Struct,
            detail: 'A CometVisu classes properties section.',
            insertText: '  /*\n  ***********************************************\n    PROPERTIES\n  ***********************************************\n  */\n  properties: {\n    $0\n  },\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvstatics',
            label: 'CometVisu-Class statics',
            kind: window.monaco.languages.CompletionItemKind.Struct,
            detail: 'statics section.',
            insertText: '  /*\n  ***********************************************\n    STATICS\n  ***********************************************\n  */\n  statics: {\n    $0\n  },\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvevents',
            label: 'CometVisu-Class events',
            kind: window.monaco.languages.CompletionItemKind.Struct,
            detail: 'events section.',
            insertText: '  /*\n  ***********************************************\n    EVENTS\n  ***********************************************\n  */\n  events: {\n    $0\n  },\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvconstructor',
            label: 'Constructor',
            kind: window.monaco.languages.CompletionItemKind.Method,
            detail: 'constructor.',
            insertText: '  /*\n  ***********************************************\n    CONSTRUCTOR\n  ***********************************************\n  */\n  construct: function () {\n    this.base(arguments);\n    $0\n  },\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }, {
            filterText: 'cvdestructor',
            label: 'Destructor',
            kind: window.monaco.languages.CompletionItemKind.Method,
            detail: 'destructor.',
            insertText: '  /*\n  ***********************************************\n    DESTRUCTOR\n  ***********************************************\n  */\n  destruct: function () {\n    this.base(arguments);\n    $0\n  }\n',
            insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
          }]; // load plugin template from backend

          return new Promise(function (resolve, reject) {
            cv.io.rest.Client.getFsClient().readSync({
              path: 'demo/templates/Plugin.js'
            }, function (err, res) {
              if (err) {
                reject(err);
              } else {
                this.TEMPLATES.push({
                  filterText: 'cvplugin',
                  label: 'CometVisu-Plugin',
                  kind: window.monaco.languages.CompletionItemKind.Class,
                  detail: 'A CometVisu class for a plugin.',
                  insertText: res.replace('###SINCE###', cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)'),
                  insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
                });
                resolve(this.TEMPLATES);
              }
            }, this);
          }.bind(this));
        }

        return Promise.resolve(this.TEMPLATES);
      },
      getProvider: function getProvider() {
        return {
          triggerCharacters: ['cv'],
          provideCompletionItems: function () {
            // get editor content before the pointer
            return this.getTemplates().then(function (sugg) {
              return {
                suggestions: sugg
              };
            });
          }.bind(this)
        };
      }
    }
  });
  cv.ui.manager.editor.completion.CometVisu.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CometVisu.js.map?dt=1648068861343