function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.tool.utils.json.Tokenizer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
   *
   *    qooxdoo-compiler - node.js based replacement for the Qooxdoo python
   *    toolchain
   *
   *    https://github.com/qooxdoo/qooxdoo
   *
   *    Copyright:
   *      2011-2019 Zenesis Limited, http://www.zenesis.com
   *      Vlad Trushin <monospectr@mail.ru> (https://github.com/vtrushin)
   *
   *    License:
   *      MIT: https://opensource.org/licenses/MIT
   *
   *      This software is provided under the same licensing terms as Qooxdoo,
   *      please see the LICENSE file in the Qooxdoo project's top-level directory
   *      for details.
   *
   *    Authors:
   *      * John Spackman (john.spackman@zenesis.com, @johnspackman)
   *      * Vlad Trushin (monospectr@mail.ru, @vtrushin)
   *
   * *********************************************************************** */

  /**
   * Parser, based on json-to-ast by Vlad trushin
   */

  qx.Class.define("qx.tool.utils.json.Parser", {
    statics: {
      literals: [qx.tool.utils.json.Tokenizer.tokenTypes.STRING, qx.tool.utils.json.Tokenizer.tokenTypes.NUMBER, qx.tool.utils.json.Tokenizer.tokenTypes.TRUE, qx.tool.utils.json.Tokenizer.tokenTypes.FALSE, qx.tool.utils.json.Tokenizer.tokenTypes.NULL],
      objectStates: {
        _START_: 0,
        OPEN_OBJECT: 1,
        PROPERTY: 2,
        COMMA: 3
      },
      propertyStates: {
        _START_: 0,
        KEY: 1,
        COLON: 2
      },
      arrayStates: {
        _START_: 0,
        OPEN_ARRAY: 1,
        VALUE: 2,
        COMMA: 3
      },
      defaultSettings: {
        verbose: true,
        source: null
      },
      location: function location(startLine, startColumn, startOffset, endLine, endColumn, endOffset, source) {
        return {
          start: {
            line: startLine,
            column: startColumn,
            offset: startOffset
          },
          end: {
            line: endLine,
            column: endColumn,
            offset: endOffset
          },
          source: source || null
        };
      },
      comment: function comment(value, name, token) {
        if (token.comments !== undefined) {
          var valueComments = value[name];
          if (valueComments === undefined) {
            valueComments = value[name] = [];
          }
          token.comments.forEach(function (comment) {
            valueComments.push({
              loc: comment.loc,
              source: comment.value
            });
          });
        }
      },
      parseObject: function parseObject(input, tokenizer, settings) {
        var objectStates = qx.tool.utils.json.Parser.objectStates;
        var tokenTypes = qx.tool.utils.json.Tokenizer.tokenTypes;

        // object: LEFT_BRACE (property (COMMA property)*)? RIGHT_BRACE
        var startToken;
        var object = {
          type: "object",
          children: []
        };
        var state = objectStates._START_;
        while (tokenizer.hasMore()) {
          var token = tokenizer.token();
          switch (state) {
            case objectStates._START_:
              {
                if (token.type === tokenTypes.LEFT_BRACE) {
                  startToken = token;
                  state = objectStates.OPEN_OBJECT;
                  if (settings.verbose) {
                    object.startToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(object, "leadingComments", token);
                  }
                  tokenizer.next();
                } else {
                  return null;
                }
                break;
              }
            case objectStates.OPEN_OBJECT:
              {
                if (token.type === tokenTypes.RIGHT_BRACE) {
                  if (settings.verbose) {
                    object.loc = qx.tool.utils.json.Parser.location(startToken.loc.start.line, startToken.loc.start.column, startToken.loc.start.offset, token.loc.end.line, token.loc.end.column, token.loc.end.offset, settings.source);
                    object.endToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(object, "trailingComments", token);
                  }
                  tokenizer.next();
                  return {
                    value: object
                  };
                }
                var property = qx.tool.utils.json.Parser.parseProperty(input, tokenizer, settings);
                object.children.push(property.value);
                state = objectStates.PROPERTY;
                break;
              }
            case objectStates.PROPERTY:
              {
                if (token.type === tokenTypes.RIGHT_BRACE) {
                  if (settings.verbose) {
                    object.loc = qx.tool.utils.json.Parser.location(startToken.loc.start.line, startToken.loc.start.column, startToken.loc.start.offset, token.loc.end.line, token.loc.end.column, token.loc.end.offset, settings.source);
                    object.endToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(object, "trailingComments", token);
                  }
                  tokenizer.next();
                  return {
                    value: object
                  };
                } else if (token.type === tokenTypes.COMMA) {
                  qx.tool.utils.json.Parser.comment(object.children[object.children.length - 1], "trailingComments", token);
                  state = objectStates.COMMA;
                  tokenizer.next();
                } else {
                  qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedToken(input.substring(token.loc.start.offset, token.loc.end.offset), token.loc.start.line, token.loc.start.column), input, token.loc.start.line, token.loc.start.column);
                }
                break;
              }
            case objectStates.COMMA:
              {
                var _property = qx.tool.utils.json.Parser.parseProperty(input, tokenizer, settings);
                if (_property) {
                  object.children.push(_property.value);
                  state = objectStates.PROPERTY;
                } else {
                  qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedToken(input.substring(token.loc.start.offset, token.loc.end.offset), token.loc.start.line, token.loc.start.column), input, token.loc.start.line, token.loc.start.column);
                }
                break;
              }
          }
        }
        qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedEnd());
        return null;
      },
      parseProperty: function parseProperty(input, tokenizer, settings) {
        var _qx$tool$utils$json$P = qx.tool.utils.json.Parser,
          objectStates = _qx$tool$utils$json$P.objectStates,
          propertyStates = _qx$tool$utils$json$P.propertyStates;
        var tokenTypes = qx.tool.utils.json.Tokenizer.tokenTypes;

        // property: STRING COLON value
        var startToken;
        var property = {
          type: "property",
          key: null,
          value: null
        };
        var state = objectStates._START_;
        while (tokenizer.hasMore()) {
          var token = tokenizer.token();
          switch (state) {
            case propertyStates._START_:
              {
                if (token.type === tokenTypes.STRING) {
                  var key = {
                    type: "identifier",
                    value: token.value
                  };
                  if (settings.verbose) {
                    key.loc = token.loc;
                    property.startToken = key.startToken = key.endToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(key, "leadingComments", token);
                  }
                  startToken = token;
                  property.key = key;
                  state = propertyStates.KEY;
                  tokenizer.next();
                } else {
                  return null;
                }
                break;
              }
            case propertyStates.KEY:
              {
                if (token.type === tokenTypes.COLON) {
                  if (settings.verbose) {
                    qx.tool.utils.json.Parser.comment(property.key, "trailingComments", token);
                    property.colonToken = token;
                  }
                  state = propertyStates.COLON;
                  tokenizer.next();
                } else {
                  qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedToken(input.substring(token.loc.start.offset, token.loc.end.offset), token.loc.start.line, token.loc.start.column), input, token.loc.start.line, token.loc.start.column);
                }
                break;
              }
            case propertyStates.COLON:
              {
                var value = qx.tool.utils.json.Parser.parseValue(input, tokenizer, settings);
                property.value = value.value;
                if (settings.verbose) {
                  property.endToken = value.value.endToken;
                  property.loc = qx.tool.utils.json.Parser.location(startToken.loc.start.line, startToken.loc.start.column, startToken.loc.start.offset, value.value.loc.end.line, value.value.loc.end.column, value.value.loc.end.offset, settings.source);
                }
                return {
                  value: property
                };
              }
          }
        }
        return null;
      },
      parseArray: function parseArray(input, tokenizer, settings) {
        var arrayStates = qx.tool.utils.json.Parser.arrayStates;
        var tokenTypes = qx.tool.utils.json.Tokenizer.tokenTypes;

        // array: LEFT_BRACKET (value (COMMA value)*)? RIGHT_BRACKET
        var startToken;
        var array = {
          type: "array",
          children: []
        };
        var state = arrayStates._START_;
        var token;
        while (tokenizer.hasMore()) {
          token = tokenizer.token();
          switch (state) {
            case arrayStates._START_:
              {
                if (token.type === tokenTypes.LEFT_BRACKET) {
                  startToken = token;
                  if (settings.verbose) {
                    array.startToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(array, "leadingComments", token);
                  }
                  state = arrayStates.OPEN_ARRAY;
                  tokenizer.next();
                } else {
                  return null;
                }
                break;
              }
            case arrayStates.OPEN_ARRAY:
              {
                if (token.type === tokenTypes.RIGHT_BRACKET) {
                  if (settings.verbose) {
                    array.loc = qx.tool.utils.json.Parser.location(startToken.loc.start.line, startToken.loc.start.column, startToken.loc.start.offset, token.loc.end.line, token.loc.end.column, token.loc.end.offset, settings.source);
                    array.endToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(array, "trailingComments", token);
                  }
                  tokenizer.next();
                  return {
                    value: array
                  };
                }
                var value = qx.tool.utils.json.Parser.parseValue(input, tokenizer, settings);
                array.children.push(value.value);
                state = arrayStates.VALUE;
                break;
              }
            case arrayStates.VALUE:
              {
                if (token.type === tokenTypes.RIGHT_BRACKET) {
                  if (settings.verbose) {
                    array.loc = qx.tool.utils.json.Parser.location(startToken.loc.start.line, startToken.loc.start.column, startToken.loc.start.offset, token.loc.end.line, token.loc.end.column, token.loc.end.offset, settings.source);
                    array.endToken = tokenizer.tokenIndex;
                    qx.tool.utils.json.Parser.comment(array, "trailingComments", token);
                  }
                  tokenizer.next();
                  return {
                    value: array
                  };
                } else if (token.type === tokenTypes.COMMA) {
                  state = arrayStates.COMMA;
                  tokenizer.next();
                } else {
                  qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedToken(input.substring(token.loc.start.offset, token.loc.end.offset), token.loc.start.line, token.loc.start.column), input, token.loc.start.line, token.loc.start.column);
                }
                break;
              }
            case arrayStates.COMMA:
              {
                var _value = qx.tool.utils.json.Parser.parseValue(input, tokenizer, settings);
                array.children.push(_value.value);
                state = arrayStates.VALUE;
                break;
              }
          }
        }
        qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedEnd());
        return null;
      },
      parseLiteral: function parseLiteral(input, tokenizer, settings) {
        // literal: STRING | NUMBER | TRUE | FALSE | NULL
        var token = tokenizer.token();
        var isLiteral = qx.tool.utils.json.Parser.literals.indexOf(token.type) !== -1;
        if (isLiteral) {
          var value = token.value;
          if (token.type == qx.tool.utils.json.Tokenizer.tokenTypes.STRING) {
            value = value.replace(/\\(.)/g, "$1");
          }
          var literal = {
            type: "literal",
            value: value,
            rawValue: input.substring(token.loc.start.offset, token.loc.end.offset)
          };
          if (settings.verbose) {
            literal.loc = token.loc;
            literal.startToken = literal.endToken = tokenizer.tokenIndex;
            qx.tool.utils.json.Parser.comment(literal, "leadingComments", token);
          }
          tokenizer.next();
          return {
            value: literal
          };
        }
        return null;
      },
      parseValue: function parseValue(input, tokenizer, settings) {
        var _qx$tool$utils$json$P2, _qx$tool$utils$json$P3, _qx$tool$utils$json$P4;
        // value: literal | object | array
        var token = tokenizer.token();
        var value = (_qx$tool$utils$json$P2 = qx.tool.utils.json.Parser).parseLiteral.apply(_qx$tool$utils$json$P2, arguments) || (_qx$tool$utils$json$P3 = qx.tool.utils.json.Parser).parseObject.apply(_qx$tool$utils$json$P3, arguments) || (_qx$tool$utils$json$P4 = qx.tool.utils.json.Parser).parseArray.apply(_qx$tool$utils$json$P4, arguments);
        if (value) {
          return value;
        }
        qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedToken(input.substring(token.loc.start.offset, token.loc.end.offset), token.loc.start.line, token.loc.start.column), input, token.loc.start.line, token.loc.start.column);
        return null;
      },
      parseToAst: function parseToAst(input, settings) {
        settings = Object.assign({}, qx.tool.utils.json.Parser.defaultSettings, settings);
        var tokenizer = new qx.tool.utils.json.Tokenizer(input, settings);
        tokenizer.tokenize();
        if (!tokenizer.hasMore()) {
          qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedEnd());
        }
        var value = qx.tool.utils.json.Parser.parseValue(input, tokenizer, settings);
        if (!tokenizer.hasMore()) {
          var result = value.value;
          if (settings.verbose) {
            result.tokenizer = tokenizer;
          }
          return result;
        }
        var token = tokenizer.next();
        qx.tool.utils.json.Parser.error(qx.tool.utils.json.Parser.unexpectedToken(input.substring(token.loc.start.offset, token.loc.end.offset), token.loc.start.line, token.loc.start.column), input, token.loc.start.line, token.loc.start.column);
        return null;
      },
      parse: function parse(input, settings) {
        return qx.tool.utils.json.Parser.parseToAst(input, settings);
      },
      unexpectedEnd: function unexpectedEnd() {
        return "Unexpected end of JSON input";
      },
      unexpectedToken: function unexpectedToken(token, line, column) {
        return "Unexpected token <".concat(token, "> at ").concat(line, ":").concat(column);
      },
      error: function error(message, source, line, column) {
        function showCodeFragment(source, linePosition, columnPosition) {
          var lines = source.split(/\n|\r\n?|\f/);
          var line = lines[linePosition - 1];
          var marker = new Array(columnPosition).join(" ") + "^";
          return line + "\n" + marker;
        }
        var ParseError = /*#__PURE__*/function (_SyntaxError) {
          "use strict";

          function ParseError(message, source, linePosition, columnPosition) {
            var _this;
            _classCallCheck(this, ParseError);
            var fullMessage = linePosition ? message + "\n" + showCodeFragment(source, linePosition, columnPosition) : message;
            _this = _callSuper(this, ParseError, [fullMessage]);
            _this.rawMessage = message;
            return _this;
          }
          _inherits(ParseError, _SyntaxError);
          return _createClass(ParseError);
        }(/*#__PURE__*/_wrapNativeSuper(SyntaxError));
        throw new ParseError(message, source, line, column);
      }
    }
  });
  qx.tool.utils.json.Parser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Parser.js.map?dt=1735341792215