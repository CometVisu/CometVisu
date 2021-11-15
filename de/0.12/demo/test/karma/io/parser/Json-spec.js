/**
 * Json-spec
 *
 * @author tobiasb
 * @since 2016
 */

describe('test the json fallback parser', function () {
  it('should parse wrong json data', function() {
    var res = cv.io.parser.Json.parse('{"0": true}{"1": true}');

    expect(res['1']).toBeTruthy();
  });
});
