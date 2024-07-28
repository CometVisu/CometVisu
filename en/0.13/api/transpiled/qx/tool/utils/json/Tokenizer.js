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
      "qx.tool.utils.json.Parser": {}
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

  /* eslint-disable no-labels */
  /* eslint-disable no-prototype-builtins */
  /* eslint-disable no-redeclare */
  /* eslint-disable no-constant-condition */
  /* eslint-disable no-labels */

  var __P_518_0 = {
    LEFT_BRACE: 0,
    // {
    RIGHT_BRACE: 1,
    // }
    LEFT_BRACKET: 2,
    // [
    RIGHT_BRACKET: 3,
    // ]
    COLON: 4,
    // :
    COMMA: 5,
    // ,
    STRING: 6,
    //
    NUMBER: 7,
    //
    TRUE: 8,
    // true
    FALSE: 9,
    // false
    NULL: 10,
    // null
    COMMENT: 11,
    WHITESPACE: 12
  };

  /**
   * Tokenizer, based on json-to-ast by Vlad trushin
   */
  qx.Class.define("qx.tool.utils.json.Tokenizer", {
    extend: qx.core.Object,
    construct: function construct(input, settings) {
      qx.core.Object.constructor.call(this);
      this.input = input;
      this.settings = settings || {};
      this.tokens = null;
      this.tokenIndex = -1;
    },
    members: {
      token: function token() {
        if (this.tokens === null) {
          throw new Error("No tokens to return (have you called tokenize?)");
        }
        if (this.tokenIndex >= this.tokens.length) {
          throw new Error("No more tokens available");
        }
        if (this.tokenIndex < 0) {
          return this.next();
        }
        return this.tokens[this.tokenIndex];
      },
      hasMore: function hasMore() {
        var tokenTypes = qx.tool.utils.json.Tokenizer.tokenTypes;
        if (this.tokens === null) {
          throw new Error("No tokens to return (have you called tokenize?)");
        }
        if (this.settings.returnWhitespace) {
          return this.tokenIndex < this.tokens.length;
        }
        var tokenIndex = this.tokenIndex;
        if (tokenIndex < 0) {
          tokenIndex = 0;
        }
        for (; tokenIndex < this.tokens.length; tokenIndex++) {
          var token = this.tokens[tokenIndex];
          if (token.type != tokenTypes.COMMENT && token.type != tokenTypes.WHITESPACE) {
            return true;
          }
        }
        return false;
      },
      next: function next() {
        var tokenTypes = qx.tool.utils.json.Tokenizer.tokenTypes;
        if (this.tokens === null) {
          throw new Error("No tokens to return (have you called tokenize?)");
        }
        if (this.tokenIndex >= this.tokens.length) {
          throw new Error("No more tokens to get");
        }
        if (this.settings.returnWhitespace) {
          if (this.tokenIndex < this.tokens.length) {
            return this.tokens[++this.tokenIndex];
          }
        } else {
          for (++this.tokenIndex; this.tokenIndex < this.tokens.length; this.tokenIndex++) {
            var token = this.tokens[this.tokenIndex];
            if (token.type != tokenTypes.COMMENT && token.type != tokenTypes.WHITESPACE) {
              return token;
            }
          }
        }
        return null;
      },
      tokenize: function tokenize() {
        var Tokenizer = qx.tool.utils.json.Tokenizer;
        var line = 1;
        var column = 1;
        var index = 0;
        var tokens = this.tokens = [];
        var input = this.input;
        while (index < input.length) {
          var args = [input, index, line, column, this.settings];
          var matched = Tokenizer.parseWhitespace.apply(Tokenizer, args) || Tokenizer.parseComment.apply(Tokenizer, args) || Tokenizer.parseChar.apply(Tokenizer, args) || Tokenizer.parseKeyword.apply(Tokenizer, args) || Tokenizer.parseString.apply(Tokenizer, args) || Tokenizer.parseNumber.apply(Tokenizer, args);
          if (matched) {
            var token = {
              type: matched.type,
              value: matched.value,
              loc: qx.tool.utils.json.Parser.location(line, column, index, matched.line, matched.column, matched.index, this.settings.source)
            };
            if (matched.rawValue) {
              token.rawValue = matched.rawValue;
            }
            tokens.push(token);
            index = matched.index;
            line = matched.line;
            column = matched.column;
          } else {
            qx.tool.utils.json.Parser.error(Tokenizer.cannotTokenizeSymbol(input.charAt(index), line, column), input, line, column);
          }
        }
        return tokens;
      }
    },
    statics: {
      tokenTypes: __P_518_0,
      punctuatorTokensMap: {
        // Lexeme: Token
        "{": __P_518_0.LEFT_BRACE,
        "}": __P_518_0.RIGHT_BRACE,
        "[": __P_518_0.LEFT_BRACKET,
        "]": __P_518_0.RIGHT_BRACKET,
        ":": __P_518_0.COLON,
        ",": __P_518_0.COMMA
      },
      keywordTokensMap: {
        // Lexeme: Token config
        "true": {
          type: __P_518_0.TRUE,
          value: true
        },
        "false": {
          type: __P_518_0.FALSE,
          value: false
        },
        "null": {
          type: __P_518_0.NULL,
          value: null
        }
      },
      stringStates: {
        _START_: 0,
        START_QUOTE_OR_CHAR: 1,
        ESCAPE: 2
      },
      escapes: {
        '"': '"',
        // Quotation mask
        "\\": "\\",
        // Reverse solidus
        "/": "/",
        // Solidus
        b: "\b",
        // Backspace
        f: "\f",
        // Form feed
        n: "\n",
        // New line
        r: "\r",
        // Carriage return
        t: "\t",
        // Horizontal tab
        u: "u" // 4 hexadecimal digits
      },
      numberStates: {
        _START_: 0,
        MINUS: 1,
        ZERO: 2,
        DIGIT: 3,
        POINT: 4,
        DIGIT_FRACTION: 5,
        EXP: 6,
        EXP_DIGIT_OR_SIGN: 7
      },
      // HELPERS
      isDigit1to9: function isDigit1to9(_char) {
        return _char >= "1" && _char <= "9";
      },
      isDigit: function isDigit(_char2) {
        return _char2 >= "0" && _char2 <= "9";
      },
      isHex: function isHex(_char3) {
        return qx.tool.utils.json.Tokenizer.isDigit(_char3) || _char3 >= "a" && _char3 <= "f" || _char3 >= "A" && _char3 <= "F";
      },
      isExp: function isExp(_char4) {
        return _char4 === "e" || _char4 === "E";
      },
      // ERRORS
      cannotTokenizeSymbol: function cannotTokenizeSymbol(symbol, line, column) {
        return "Cannot tokenize symbol <".concat(symbol, "> at ").concat(line, ":").concat(column);
      },
      // PARSERS
      parseWhitespace: function parseWhitespace(input, index, line, column) {
        var value = "";
        while (true) {
          var _char5 = input.charAt(index);
          if (_char5 === "\r") {
            // CR (Unix)
            index++;
            line++;
            column = 1;
            value += _char5;
            if (input.charAt(index) === "\n") {
              // CRLF (Windows)
              index++;
              value += "\n";
            }
          } else if (_char5 === "\n") {
            // LF (MacOS)
            index++;
            line++;
            column = 1;
            value += _char5;
          } else if (_char5 === "\t" || _char5 === " ") {
            index++;
            column++;
            value += _char5;
          } else {
            break;
          }
        }
        if (value.length == 0) {
          return null;
        }
        return {
          index: index,
          line: line,
          column: column,
          type: qx.tool.utils.json.Tokenizer.tokenTypes.WHITESPACE,
          value: value
        };
      },
      parseComment: function parseComment(input, index, line, column) {
        var str = input.substring(index, index + 2);
        var startIndex = index;
        if (str === "/*") {
          for (index += 2; index < input.length; index++) {
            var _char6 = input[index];
            if (_char6 === "*" && input[index + 1] === "/") {
              index += 2;
              column += 2;
              break;
            } else if (_char6 === "\r") {
              // CR (Unix)
              index++;
              line++;
              column = 1;
              if (input.charAt(index) === "\n") {
                // CRLF (Windows)
                index++;
              }
            } else if (_char6 === "\n") {
              // LF (MacOS)
              index++;
              line++;
              column = 1;
            } else {
              column++;
            }
          }
          return {
            index: index,
            line: line,
            column: column,
            type: qx.tool.utils.json.Tokenizer.tokenTypes.COMMENT,
            value: input.substring(startIndex, index)
          };
        } else if (str === "//") {
          for (index += 2; index < input.length; index++) {
            var _char6 = input[index];
            if (_char6 === "\r") {
              // CR (Unix)
              index++;
              line++;
              column = 1;
              if (input.charAt(index) === "\n") {
                // CRLF (Windows)
                index++;
              }
              break;
            } else if (_char6 === "\n") {
              // LF (MacOS)
              index++;
              line++;
              column = 1;
              break;
            }
          }
          return {
            index: index,
            line: line,
            column: column,
            type: qx.tool.utils.json.Tokenizer.tokenTypes.COMMENT,
            value: input.substring(startIndex, index)
          };
        }
        return null;
      },
      parseChar: function parseChar(input, index, line, column) {
        var _char7 = input.charAt(index);
        var punctuatorTokensMap = qx.tool.utils.json.Tokenizer.punctuatorTokensMap;
        if (_char7 in punctuatorTokensMap) {
          return {
            type: punctuatorTokensMap[_char7],
            line: line,
            column: column + 1,
            index: index + 1,
            value: _char7
          };
        }
        return null;
      },
      parseKeyword: function parseKeyword(input, index, line, column) {
        var keywordTokensMap = qx.tool.utils.json.Tokenizer.keywordTokensMap;
        for (var name in keywordTokensMap) {
          if (keywordTokensMap.hasOwnProperty(name) && input.substr(index, name.length) === name) {
            var _keywordTokensMap$nam = keywordTokensMap[name],
              type = _keywordTokensMap$nam.type,
              value = _keywordTokensMap$nam.value;
            return {
              type: type,
              line: line,
              column: column + name.length,
              index: index + name.length,
              value: value
            };
          }
        }
        return null;
      },
      parseString: function parseString(input, index, line, column, settings) {
        var _qx$tool$utils$json$T = qx.tool.utils.json.Tokenizer,
          stringStates = _qx$tool$utils$json$T.stringStates,
          tokenTypes = _qx$tool$utils$json$T.tokenTypes,
          escapes = _qx$tool$utils$json$T.escapes;
        var startIndex = index;
        var buffer = "";
        var state = stringStates._START_;
        while (index < input.length) {
          var _char8 = input.charAt(index);
          switch (state) {
            case stringStates._START_:
              {
                if (_char8 === '"') {
                  state = stringStates.START_QUOTE_OR_CHAR;
                  index++;
                } else {
                  return null;
                }
                break;
              }
            case stringStates.START_QUOTE_OR_CHAR:
              {
                if (_char8 === "\\") {
                  state = stringStates.ESCAPE;
                  index++;
                } else if (_char8 === '"') {
                  index++;
                  var result = {
                    type: tokenTypes.STRING,
                    line: line,
                    column: column + index - startIndex,
                    index: index,
                    value: buffer
                  };
                  if (settings.verbose) {
                    result.rawValue = input.substring(startIndex, index);
                  }
                  return result;
                } else {
                  buffer += _char8;
                  index++;
                }
                break;
              }
            case stringStates.ESCAPE:
              {
                if (_char8 in escapes) {
                  if (_char8 === "u") {
                    index++;
                    for (var i = 0; i < 4; i++) {
                      var curChar = input.charAt(index);
                      if (curChar && qx.tool.utils.json.Tokenizer.isHex(curChar)) {
                        buffer += curChar;
                        index++;
                      } else {
                        return null;
                      }
                    }
                  } else {
                    buffer += escapes[_char8];
                    index++;
                  }
                  state = stringStates.START_QUOTE_OR_CHAR;
                } else {
                  return null;
                }
                break;
              }
          }
        }
        return null;
      },
      parseNumber: function parseNumber(input, index, line, column) {
        var numberStates = qx.tool.utils.json.Tokenizer.numberStates;
        var startIndex = index;
        var passedValueIndex = index;
        var state = numberStates._START_;
        iterator: while (index < input.length) {
          var _char9 = input.charAt(index);
          switch (state) {
            case numberStates._START_:
              {
                if (_char9 === "-") {
                  state = numberStates.MINUS;
                } else if (_char9 === "0") {
                  passedValueIndex = index + 1;
                  state = numberStates.ZERO;
                } else if (qx.tool.utils.json.Tokenizer.isDigit1to9(_char9)) {
                  passedValueIndex = index + 1;
                  state = numberStates.DIGIT;
                } else {
                  return null;
                }
                break;
              }
            case numberStates.MINUS:
              {
                if (_char9 === "0") {
                  passedValueIndex = index + 1;
                  state = numberStates.ZERO;
                } else if (qx.tool.utils.json.Tokenizer.isDigit1to9(_char9)) {
                  passedValueIndex = index + 1;
                  state = numberStates.DIGIT;
                } else {
                  return null;
                }
                break;
              }
            case numberStates.ZERO:
              {
                if (_char9 === ".") {
                  state = numberStates.POINT;
                } else if (qx.tool.utils.json.Tokenizer.isExp(_char9)) {
                  state = numberStates.EXP;
                } else {
                  break iterator;
                }
                break;
              }
            case numberStates.DIGIT:
              {
                if (qx.tool.utils.json.Tokenizer.isDigit(_char9)) {
                  passedValueIndex = index + 1;
                } else if (_char9 === ".") {
                  state = numberStates.POINT;
                } else if (qx.tool.utils.json.Tokenizer.isExp(_char9)) {
                  state = numberStates.EXP;
                } else {
                  break iterator;
                }
                break;
              }
            case numberStates.POINT:
              {
                if (qx.tool.utils.json.Tokenizer.isDigit(_char9)) {
                  passedValueIndex = index + 1;
                  state = numberStates.DIGIT_FRACTION;
                } else {
                  break iterator;
                }
                break;
              }
            case numberStates.DIGIT_FRACTION:
              {
                if (qx.tool.utils.json.Tokenizer.isDigit(_char9)) {
                  passedValueIndex = index + 1;
                } else if (qx.tool.utils.json.Tokenizer.isExp(_char9)) {
                  state = numberStates.EXP;
                } else {
                  break iterator;
                }
                break;
              }
            case numberStates.EXP:
              {
                if (_char9 === "+" || _char9 === "-") {
                  state = numberStates.EXP_DIGIT_OR_SIGN;
                } else if (qx.tool.utils.json.Tokenizer.isDigit(_char9)) {
                  passedValueIndex = index + 1;
                  state = numberStates.EXP_DIGIT_OR_SIGN;
                } else {
                  break iterator;
                }
                break;
              }
            case numberStates.EXP_DIGIT_OR_SIGN:
              {
                if (qx.tool.utils.json.Tokenizer.isDigit(_char9)) {
                  passedValueIndex = index + 1;
                } else {
                  break iterator;
                }
                break;
              }
          }
          index++;
        }
        if (passedValueIndex > 0) {
          return {
            type: qx.tool.utils.json.Tokenizer.tokenTypes.NUMBER,
            line: line,
            column: column + passedValueIndex - startIndex,
            index: passedValueIndex,
            value: parseFloat(input.substring(startIndex, passedValueIndex))
          };
        }
        return null;
      }
    }
  });
  qx.tool.utils.json.Tokenizer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Tokenizer.js.map?dt=1722153845523