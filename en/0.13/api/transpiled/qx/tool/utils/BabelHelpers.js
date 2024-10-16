(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.lang.Type": {},
      "qx.tool.compiler.jsdoc.Parser": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.tool.utils.BabelHelpers", {
    extend: qx.core.Object,
    statics: {
      /**
       * Helper method that collapses the MemberExpression into a string
       * @param node
       * @returns {string}
       */
      collapseMemberExpression: function collapseMemberExpression(node) {
        var types = require("@babel/types");
        var done = false;
        function doCollapse(node) {
          if (node.type == "ThisExpression") {
            return "this";
          }
          if (node.type == "Identifier") {
            return node.name;
          }
          if (node.type == "RestElement") {
            return "..." + doCollapse(node.argument);
          }
          if (node.type == "ArrayExpression") {
            var result = [];
            node.elements.forEach(function (element) {
              return result.push(doCollapse(element));
            });
            return result;
          }
          if (node.type === "StringLiteral") {
            return node.value;
          }
          if (node.type != "MemberExpression") {
            return "(" + node.type + ")";
          }
          if (types.isIdentifier(node.object)) {
            var _str = node.object.name;
            if (node.property.name) {
              _str += "." + node.property.name;
            } else {
              done = true;
            }
            return _str;
          }
          var str;
          if (node.object.type == "ArrayExpression") {
            str = "[]";
          } else {
            str = doCollapse(node.object);
          }
          if (done) {
            return str;
          }
          // `computed` is set if the expression is a subscript, eg `abc[def]`
          if (node.computed) {
            done = true;
          } else if (node.property.name) {
            str += "." + node.property.name;
          } else {
            done = true;
          }
          return str;
        }
        return doCollapse(node);
      },
      /**
       * Helper method that collapses the MemberExpression into a string
       * @param param
       * @param {number} idx
       * @returns {string}
       */
      collapseParam: function collapseParam(param, idx) {
        switch (param.type) {
          case "Identifier":
            return param.name;
          case "AssignmentPattern":
            return qx.tool.utils.BabelHelpers.collapseParam(param.left, idx);
          case "RestElement":
            return "..." + qx.tool.utils.BabelHelpers.collapseParam(param.argument, idx);
          case "ObjectPattern":
          case "ArrayPattern":
            return "arg".concat(idx);
        }
        throw new Error("collapseParam: ".concat(param.type, " not useable as a parameter"));
      },
      /**
       * Collects JSON data as best as possible - it will not output anything which is not valid JSON, eg it
       * will not collect function expressions
       *
       * @param {*} node
       * @param {*} isProperties
       * @param {*} jsonPath
       * @returns
       */
      collectJson: function collectJson(node, isProperties, jsonPath) {
        var result;
        if (node.type == "ObjectExpression") {
          result = {};
          var nextJsonPath = jsonPath ? jsonPath + "." : "";
          node.properties.forEach(function (prop) {
            var key = prop.key.name;
            if (prop.type == "ObjectMethod") {
              result[key] = "[[ ObjectMethod Function ]]";
            } else {
              var value = qx.tool.utils.BabelHelpers.collectJson(prop.value, isProperties, nextJsonPath + key);
              result[key] = value;
            }
          });
        } else if (node.type == "Literal" || node.type == "StringLiteral" || node.type == "BooleanLiteral" || node.type == "NumericLiteral" || node.type == "NullLiteral") {
          if (typeof node.value == "string") {
            var isIdentifier = false;
            if (isProperties && (jsonPath === "apply" || jsonPath === "transform" || jsonPath === "isEqual")) {
              isIdentifier = true;
            }
          }
          result = node.value;
        } else if (node.type == "ArrayExpression") {
          result = [];
          node.elements.forEach(function (elem) {
            result.push(qx.tool.utils.BabelHelpers.collectJson(elem, isProperties));
          });
        } else if (node.type == "Identifier") {
          result = node.name;
        } else if (node.type == "CallExpression" || node.type == "FunctionExpression" || node.type == "ArrowFunctionExpression") {
          result = new Function("[[ Function ]]");
        } else if (node.type == "MemberExpression") {
          result = qx.tool.utils.BabelHelpers.collapseMemberExpression(node);
        } else if (node.type == "UnaryExpression") {
          if (node.operator == "-") {
            var tmp = qx.tool.utils.BabelHelpers.collectJson(node.argument, isProperties);
            if (typeof tmp == "number") {
              return tmp * -1;
            }
          } else if (node.operator == "!") {
            var _tmp = qx.tool.utils.BabelHelpers.collectJson(node.argument, isProperties);
            if (typeof _tmp == "boolean") {
              return !_tmp;
            }
          }
          result = "[[ UnaryExpression ]]";
        } else if (node.type == "NewExpression" || node.type == "BinaryExpression") {
          result = "[[ " + node.type + " ]]";
        } else {
          console.warn("Cannot interpret AST " + node.type + " at " + (node.loc ? " [" + node.loc.start.line + "," + node.loc.start.column + "]" : ""));
          result = null;
        }
        return result;
      },
      /**
       * Extracts and parses JSDoc
       *
       * @param {*} comment
       * @returns
       */
      getJsDoc: function getJsDoc(comment) {
        var _comment$value;
        if (!comment) {
          return null;
        }
        if (qx.lang.Type.isArray(comment)) {
          comment = comment.slice(-1)[0];
        }
        var result = {
          raw: (_comment$value = comment.value) === null || _comment$value === void 0 ? void 0 : _comment$value.split("\n")
        };
        var tmp = qx.tool.compiler.jsdoc.Parser.parseComment(comment.value);
        for (var key in tmp) {
          result[key] = tmp[key];
        }
        return result;
      }
    }
  });
  qx.tool.utils.BabelHelpers.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BabelHelpers.js.map?dt=1729101257678