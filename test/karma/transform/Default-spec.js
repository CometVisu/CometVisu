/**
 * Test the default transforms
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
define(['TransformDefault'], function(Transform) {

  describe('checking default transforms', function() {

    it('should transform int values', function() {
      expect(Transform.Transform['int'].encode(0)).toEqual('0');
      expect(Transform.Transform['int'].decode("0")).toEqual(0);
    });

    it('should transform float values', function() {
      expect(Transform.Transform['float'].encode(0.5)).toEqual('0.5');
      expect(Transform.Transform['float'].decode("0.5")).toEqual(0.5);
    });

    it('should transform raw values', function() {
      expect(Transform.Transform['raw'].encode(0.5)).toEqual(0.5);
      expect(Transform.Transform['raw'].decode("0.5")).toEqual("0.5");
    });
  });
});