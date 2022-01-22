/* TransformMqtt-spec.js 
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
 * Test the MQTT transforms
 *
 * @author Christian Mayer
 * @since 2021
 */
describe('checking MQTT transforms', function() {
  it('should transform MQTT_Number values', function() {
    expect(cv.Transform.encode('MQTT:number', 0)).toEqual('0');
    expect(cv.Transform.decode('MQTT:number', 0)).toEqual(0);
    expect(cv.Transform.encode('MQTT:number', -1.2)).toEqual('-1.2');
    expect(cv.Transform.decode('MQTT:number', -1.2)).toEqual(-1.2);

    expect(cv.Transform.encode('MQTT:number', '-1.2')).toEqual('-1.2'); // misuse robustness
  });

  it('should transform MQTT_String values', function() {
    expect(cv.Transform.encode('MQTT:string', 'abc')).toEqual('abc');
    expect(cv.Transform.decode('MQTT:string', 'abc')).toEqual('abc');
    expect(cv.Transform.encode('MQTT:string', 12)).toEqual('12');
    expect(cv.Transform.decode('MQTT:string', '12')).toEqual('12');
  });

  it('should transform MQTT_JSON values', function() {
    expect(cv.Transform.encode('MQTT:json:a', -0.5)).toEqual('{"a":-0.5}');
    expect(cv.Transform.encode('MQTT:json:s', '-0.5')).toEqual('{"s":"-0.5"}');
    expect(cv.Transform.encode('MQTT:json:b.c', -0.5)).toEqual('{"b":{"c":-0.5}}');
    expect(cv.Transform.decode('MQTT:json', '{"b":{"c":-0.5}}')).toEqual({'b':{'c':-0.5}});
    expect(cv.Transform.decode('MQTT:json:a', '{"a":-0.5}')).toEqual(-0.5);
    expect(cv.Transform.decode('MQTT:json:b.c', '{"b":{"c":-0.5}}')).toEqual(-0.5);

    expect(cv.Transform.encode('MQTT:json', -0.5)).toEqual('-0.5'); // misuse robustness
  });
});
