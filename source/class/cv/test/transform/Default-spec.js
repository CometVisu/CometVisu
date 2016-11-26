/**
 * Test the default transforms
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('checking default transforms', function() {

  it('should transform int values', function() {
    expect(cv.Transform.encode('int', 0)).toEqual('0');
    expect(cv.Transform.decode('int', "0")).toEqual(0);
  });

  it('should transform float values', function() {
    expect(cv.Transform.encode('float', 0.5)).toEqual('0.5');
    expect(cv.Transform.decode('float', "0.5")).toEqual(0.5);
  });

  it('should transform raw values', function() {
    expect(cv.Transform.encode('raw', 0.5)).toEqual(0.5);
    expect(cv.Transform.decode('raw', "0.5")).toEqual("0.5");
  });
});