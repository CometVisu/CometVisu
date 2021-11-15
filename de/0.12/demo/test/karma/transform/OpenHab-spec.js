/* OpenHab-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * Test the openhab specific transforms
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe('checking openhab transforms', function() {
  it('should transform switch values', function() {
    expect(cv.Transform.encode('OH:switch', 0)).toEqual('OFF');
    expect(cv.Transform.encode('OH:switch', 1)).toEqual('ON');
    expect(cv.Transform.decode('OH:switch', 'ON')).toEqual(1);
    expect(cv.Transform.decode('OH:switch', 'OFF')).toEqual(0);

    expect(cv.Transform.decode('OH:switch', 'NaN')).toEqual(0);
    expect(cv.Transform.decode('OH:switch', 'Uninitialized')).toEqual(0);
  });

  it('should transform contact values', function() {
    expect(cv.Transform.encode('OH:contact', 0)).toEqual('CLOSED');
    expect(cv.Transform.encode('OH:contact', 1)).toEqual('OPEN');
    expect(cv.Transform.decode('OH:contact', 'OPEN')).toEqual(1);
    expect(cv.Transform.decode('OH:contact', 'CLOSED')).toEqual(0);

    expect(cv.Transform.decode('OH:contact', 'NaN')).toEqual(0);
    expect(cv.Transform.decode('OH:contact', 'Uninitialized')).toEqual(0);
  });

  it('should transform rollershutter values', function() {
    expect(cv.Transform.encode('OH:rollershutter', 0)).toEqual('UP');
    expect(cv.Transform.encode('OH:rollershutter', 1)).toEqual('DOWN');
    expect(cv.Transform.encode('OH:rollershutter', 'UP')).toEqual('UP');
    expect(cv.Transform.decode('OH:rollershutter', 'DOWN')).toEqual(1);
    expect(cv.Transform.decode('OH:rollershutter', 'UP')).toEqual(0);
    expect(cv.Transform.decode('OH:rollershutter', 0)).toEqual(0);
    expect(cv.Transform.decode('OH:rollershutter', 'Uninitialized')).toEqual(0);
    expect(cv.Transform.decode('OH:rollershutter', 'NaN')).toEqual(0);
  });

  it('should transform dimmer values', function() {
    expect(cv.Transform.encode('OH:dimmer', '0')).toEqual(0);
    expect(cv.Transform.encode('OH:dimmer', '50')).toEqual(50);
    expect(cv.Transform.decode('OH:dimmer', 'OFF')).toEqual(0);
    expect(cv.Transform.decode('OH:dimmer', 'ON')).toEqual(100);
    expect(cv.Transform.decode('OH:dimmer', '53')).toEqual(53);
    expect(cv.Transform.decode('OH:dimmer', 'NaN')).toEqual(0);
    expect(cv.Transform.decode('OH:dimmer', 'Uninitialized')).toEqual(0);
  });

  it('should transform number values', function() {
    expect(cv.Transform.encode('OH:number', '0.5')).toEqual(0.5);
    expect(cv.Transform.encode('OH:number', '50')).toEqual(50);
    expect(cv.Transform.decode('OH:number', '0.5')).toEqual(0.5);
    expect(cv.Transform.decode('OH:number', 'NaN')).toEqual(0);
    expect(cv.Transform.decode('OH:number', 'Uninitialized')).toEqual(0);
  });

  it('should transform string values', function() {
    expect(cv.Transform.encode('OH:string', 'example string')).toEqual('example string');
    expect(cv.Transform.decode('OH:string', 'example string')).toEqual('example string');
  });

  it('should transform datetime values', function() {
    var dateString = '2016-12-24T16:13:52Z';
    var date = new Date(dateString);

    expect(cv.Transform.encode('OH:datetime', date)).toEqual(date.toLocaleDateString());
    expect(cv.Transform.encode('OH:datetime', dateString)).toEqual(dateString);
    expect(cv.Transform.decode('OH:datetime', dateString)).toEqual(date);

    expect(cv.Transform.decode('OH:datetime', 'NaN')).toEqual('-');
    expect(cv.Transform.decode('OH:datetime', 'Uninitialized')).toEqual('-');
  });

  it('should transform time values', function() {
    var date = new Date('2016-12-24T16:13:52Z');

    expect(cv.Transform.encode('OH:time', date)).toEqual(date.toLocaleTimeString());
    expect(cv.Transform.encode('OH:time', date.toLocaleTimeString())).toEqual(date.toLocaleTimeString());
    date = new Date();
    date.setHours(12);
    date.setMinutes(53);
    date.setSeconds(13);

    expect(cv.Transform.decode('OH:time', '12:53:13').toLocaleTimeString('de-DE')).toEqual(date.toLocaleTimeString('de-DE'));

    expect(cv.Transform.decode('OH:time', 'NaN')).toEqual('-');
    expect(cv.Transform.decode('OH:time', 'Uninitialized')).toEqual('-');
  });

  it('should transform color values', function() {
    // encode RGB -> HSV
    expect(cv.Transform.encode('OH:color', new Map([['r', 59], ['g', 60], ['b', 64]]))).toEqual('228, 8, 25');
    expect(cv.Transform.encode('OH:color', new Map([['r', 48], ['g', 54], ['b', 41]]))).toEqual('88, 24, 21');
    expect(cv.Transform.encode('OH:color', new Map([['r', 110], ['g', 101], ['b', 87]]))).toEqual('37, 21, 43');
    expect(cv.Transform.encode('OH:color', new Map([['r', 110], ['g', 87], ['b', 101]]))).toEqual('323, 21, 43');
    expect(cv.Transform.encode('OH:color', new Map([['r', 0], ['g', 0], ['b', 0]]))).toEqual('0, 0, 0');
    // decode HSV -> RGB
    expect(cv.Transform.decode('OH:color', '228, 7.8, 25.1')).toEqual(new Map([['r', 59], ['g', 60], ['b', 64]]));
    expect(cv.Transform.decode('OH:color', '87.7, 24.1, 21.2')).toEqual(new Map([['r', 47], ['g', 54], ['b', 40]]));
    // Note: there are differences due to rounding
    expect(cv.Transform.decode('OH:color', '36.5, 20.9, 43.1')).toEqual(new Map([['r', 109], ['g', 100], ['b', 86]]));
    expect(cv.Transform.decode('OH:color', '36.5, 20.9, 0')).toEqual(new Map([['r', 0], ['g', 0], ['b', 0]]));
    expect(cv.Transform.decode('OH:color', '120, 60, 10')).toEqual(new Map([['r', 10], ['g', 25], ['b', 10]]));
    expect(cv.Transform.decode('OH:color', '200, 60, 10')).toEqual(new Map([['r', 10], ['g', 20], ['b', 25]]));
    expect(cv.Transform.decode('OH:color', '260, 60, 10')).toEqual(new Map([['r', 14], ['g', 10], ['b', 25]]));
    expect(cv.Transform.decode('OH:color', '320, 60, 10')).toEqual(new Map([['r', 25], ['g', 10], ['b', 20]]));
    expect(cv.Transform.decode('OH:color', '0,0,0')).toEqual(new Map([['r', 0], ['g', 0], ['b', 0]]));
  });
});
