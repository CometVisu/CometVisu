/**
 * Test the openhab specific transforms
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
define(['transform_default', 'transform_oh'], function(Transform) {

  describe('checking openhab transforms', function() {

    it('should transform switch values', function() {
      expect(Transform.Transform['OH:switch'].encode(0)).toEqual('OFF');
      expect(Transform.Transform['OH:switch'].encode(1)).toEqual('ON');
      expect(Transform.Transform['OH:switch'].decode('ON')).toEqual(1);
      expect(Transform.Transform['OH:switch'].decode('OFF')).toEqual(0);

      expect(Transform.Transform['OH:switch'].decode('NaN')).toEqual(0);
      expect(Transform.Transform['OH:switch'].decode('Uninitialized')).toEqual(0);
    });

    it('should transform contact values', function() {
      expect(Transform.Transform['OH:contact'].encode(0)).toEqual('CLOSED');
      expect(Transform.Transform['OH:contact'].encode(1)).toEqual('OPEN');
      expect(Transform.Transform['OH:contact'].decode('OPEN')).toEqual(1);
      expect(Transform.Transform['OH:contact'].decode('CLOSED')).toEqual(0);

      expect(Transform.Transform['OH:contact'].decode('NaN')).toEqual(0);
      expect(Transform.Transform['OH:contact'].decode('Uninitialized')).toEqual(0);
    });

    it('should transform rollershutter values', function() {
      expect(Transform.Transform['OH:rollershutter'].encode(0)).toEqual('UP');
      expect(Transform.Transform['OH:rollershutter'].encode(1)).toEqual('DOWN');
      expect(Transform.Transform['OH:rollershutter'].decode('DOWN')).toEqual(1);
      expect(Transform.Transform['OH:rollershutter'].decode('UP')).toEqual(0);
    });

    it('should transform dimmer values', function() {
      expect(Transform.Transform['OH:dimmer'].encode("0")).toEqual(0);
      expect(Transform.Transform['OH:dimmer'].encode("50")).toEqual(50);
      expect(Transform.Transform['OH:dimmer'].decode('OFF')).toEqual(0);
      expect(Transform.Transform['OH:dimmer'].decode('ON')).toEqual(100);
      expect(Transform.Transform['OH:dimmer'].decode('53')).toEqual(53);
      expect(Transform.Transform['OH:dimmer'].decode('NaN')).toEqual(0);
      expect(Transform.Transform['OH:dimmer'].decode('Uninitialized')).toEqual(0);
    });

    it('should transform number values', function() {
      expect(Transform.Transform['OH:number'].encode("0.5")).toEqual(0.5);
      expect(Transform.Transform['OH:number'].encode("50")).toEqual(50);
      expect(Transform.Transform['OH:number'].decode('0.5')).toEqual(0.5);
      expect(Transform.Transform['OH:number'].decode('NaN')).toEqual(0);
      expect(Transform.Transform['OH:number'].decode('Uninitialized')).toEqual(0);
    });

    it('should transform string values', function() {
      expect(Transform.Transform['OH:string'].encode("example string")).toEqual("example string");
      expect(Transform.Transform['OH:string'].decode("example string")).toEqual("example string");
    });

    it('should transform datetime values', function() {
      var dateString = "2016-12-24T16:13:52Z";
      var date = new Date(dateString);
      expect(Transform.Transform['OH:datetime'].encode(date)).toEqual(date.toLocaleDateString());
      expect(Transform.Transform['OH:datetime'].decode(dateString)).toEqual(date);

      expect(Transform.Transform['OH:datetime'].decode('NaN')).toEqual("-");
      expect(Transform.Transform['OH:datetime'].decode('Uninitialized')).toEqual("-");
    });

    it('should transform time values', function() {
      var date = new Date("2016-12-24T16:13:52Z");
      expect(Transform.Transform['OH:time'].encode(date)).toEqual(date.toLocaleTimeString());
      date = new Date();
      date.setHours(12);
      date.setMinutes(53);
      date.setSeconds(13);
      expect(Transform.Transform['OH:time'].decode("12:53:13").toLocaleTimeString("de-DE")).toEqual(date.toLocaleTimeString("de-DE"));

      expect(Transform.Transform['OH:time'].decode('NaN')).toEqual("-");
      expect(Transform.Transform['OH:time'].decode('Uninitialized')).toEqual("-");
    });

    it('should transform color values', function() {
      // encode RGB -> HSV
      expect(Transform.Transform['OH:color'].encode([59, 60, 64])).toEqual([228, 7.8, 25.1]);
      // decode HSV -> RGB
      expect(Transform.Transform['OH:color'].decode("228, 7.8, 25.1")).toEqual([59, 60, 64]);
    });
  });
});