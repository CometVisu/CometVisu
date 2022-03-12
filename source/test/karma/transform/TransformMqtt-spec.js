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
    expect(cv.Transform.encode({transform:'MQTT:number'}, 0)).toEqual(0);
    expect(cv.Transform.encode({transform:'MQTT:number'}, '0')).toEqual(0); // misuse robustness
    expect(cv.Transform.decode({transform:'MQTT:number'}, 0)).toEqual(0);
    expect(cv.Transform.decode({transform:'MQTT:number'}, '0')).toEqual(0);
    expect(cv.Transform.encode({transform:'MQTT:number'}, -1.2)).toEqual(-1.2);
    expect(cv.Transform.encode({transform:'MQTT:number'}, '-1.2')).toEqual(-1.2); // misuse robustness
    expect(cv.Transform.decode({transform:'MQTT:number'}, -1.2)).toEqual(-1.2);
    expect(cv.Transform.decode({transform:'MQTT:number'}, '-1.2')).toEqual(-1.2);
  });

  it('should transform MQTT_String values', function() {
    expect(cv.Transform.encode({transform:'MQTT:string'}, 'abc')).toEqual('abc');
    expect(cv.Transform.decode({transform:'MQTT:string'}, 'abc')).toEqual('abc');
    expect(cv.Transform.encode({transform:'MQTT:string'}, 12)).toEqual('12');
    expect(cv.Transform.decode({transform:'MQTT:string'}, '12')).toEqual('12');
  });

  it('should transform MQTT JSON values', function() {
    expect(cv.Transform.encode({transform:'MQTT:number', selector:'a'}, -0.5)).toEqual('{"a":-0.5}');
    expect(cv.Transform.encode({transform:'MQTT:string', selector:'s'}, '-0.5')).toEqual('{"s":"-0.5"}');
    expect(cv.Transform.encode({transform:'MQTT:number', selector:'["b"][\'c\']'}, -0.5)).toEqual('{"b":{"c":-0.5}}');
    expect(cv.Transform.decode({transform:'MQTT:number', selector:'a'}, '{"a":-0.5}')).toEqual(-0.5);
    expect(cv.Transform.decode({transform:'MQTT:string', selector:'s'}, '{"s":"-0.5"}')).toEqual('-0.5');
    expect(cv.Transform.decode({transform:'MQTT:number', selector:'["b"][\'c\']'}, '{"b":{"c":-0.5}}')).toEqual(-0.5);
  });

  it('should transform MQTT time values', function() {
    expect(cv.Transform.encode({transform:'MQTT:unixtime'}, new Date('01.01.2022 12:13:14Z'))).toEqual(1641039194);
    expect(cv.Transform.decode({transform:'MQTT:unixtime'}, '1641039194')).toEqual(new Date('01.01.2022 12:13:14Z'));
    expect(cv.Transform.encode({transform:'MQTT:unixtime', selector:'a'}, new Date('01.01.2022 12:13:14Z'))).toEqual('{"a":1641039194}');
    expect(cv.Transform.decode({transform:'MQTT:unixtime', selector:'a'}, '{"a":1641039194}')).toEqual(new Date('01.01.2022 12:13:14Z'));

    let time = new Date(); // start with today for the equality check
    time.setHours(12, 13, 14, 0);
    expect(cv.Transform.encode({transform:'MQTT:timestring'}, time)).toEqual('12:13:14');
    expect(cv.Transform.decode({transform:'MQTT:timestring'}, '12:13:14')).toEqual(time);
    expect(cv.Transform.encode({transform:'MQTT:timestring', selector:'a'}, time)).toEqual('{"a":"12:13:14"}');
    expect(cv.Transform.decode({transform:'MQTT:timestring', selector:'a'}, '{"a":"12:13:14"}')).toEqual(time);

    expect(cv.Transform.encode({transform:'MQTT:datetime'}, new Date('01.01.2022 12:13:14.000Z'))).toEqual('2022-01-01T12:13:14.000Z');
    expect(cv.Transform.decode({transform:'MQTT:datetime'}, '2022-01-01T12:13:14.000Z')).toEqual(new Date('01.01.2022 12:13:14.000Z'));
    expect(cv.Transform.encode({transform:'MQTT:datetime', selector:'a'}, new Date('01.01.2022 12:13:14.000Z'))).toEqual('{"a":"2022-01-01T12:13:14.000Z"}');
    expect(cv.Transform.decode({transform:'MQTT:datetime', selector:'a'}, '{"a":"2022-01-01T12:13:14.000Z"}')).toEqual(new Date('01.01.2022 12:13:14.000Z'));
  });

  it('should transform MQTT color values', function() {
    expect(cv.Transform.encode({transform:'MQTT:color_xy'}, new Map([['x',0.1],['y',0.2]]))).toEqual({'x':0.1,'y':0.2});
    expect(cv.Transform.decode({transform:'MQTT:color_xy'}, '{"x":0.1,"y":0.2}')).toEqual(new Map([['x',0.1],['y',0.2],['cValid',true]]));
    expect(cv.Transform.encode({transform:'MQTT:color_xy', selector:'a'}, new Map([['x',0.1],['y',0.2]]))).toEqual('{"a":{"x":0.1,"y":0.2}}');
    expect(cv.Transform.decode({transform:'MQTT:color_xy', selector:'a'}, '{"a":{"x":0.1,"y":0.2}}')).toEqual(new Map([['x',0.1],['y',0.2],['cValid',true]]));

    expect(cv.Transform.encode({transform:'MQTT:color_xyY'}, new Map([['x',0.1],['y',0.2],['Y',1]]))).toEqual({'x':0.1,'y':0.2,'Y':1});
    expect(cv.Transform.decode({transform:'MQTT:color_xyY'}, '{"x":0.1,"y":0.2,"Y":1}')).toEqual(new Map([['x',0.1],['y',0.2],['Y',1],['cValid',true],['YValid',true]]));

    expect(cv.Transform.encode({transform:'MQTT:color_hsv'}, new Map([['h',10],['s',20],['v',30]]))).toEqual('10,20,30');
    expect(cv.Transform.decode({transform:'MQTT:color_hsv'}, '10,20,30')).toEqual(new Map([['h',10],['s',20],['v',30]]));
    expect(cv.Transform.encode({transform:'MQTT:color_hsv', selector:'a'}, new Map([['h',10],['s',20],['v',30]]))).toEqual('{"a":"10,20,30"}');
    expect(cv.Transform.decode({transform:'MQTT:color_hsv', selector:'a'}, '{"a":"10,20,30"}')).toEqual(new Map([['h',10],['s',20],['v',30]]));

    expect(cv.Transform.encode({transform:'MQTT:color_h_s_v'}, new Map([['h',10],['s',20],['v',30]]))).toEqual({'h':10,'s':20,'v':30});
    expect(cv.Transform.decode({transform:'MQTT:color_h_s_v'}, '{"h":10,"s":20,"v":30}')).toEqual(new Map([['h',10],['s',20],['v',30]]));
    expect(cv.Transform.encode({transform:'MQTT:color_h_s_v', selector:'a'}, new Map([['h',10],['s',20],['v',30]]))).toEqual('{"a":{"h":10,"s":20,"v":30}}');
    expect(cv.Transform.decode({transform:'MQTT:color_h_s_v', selector:'a'}, '{"a":{"h":10,"s":20,"v":30}}')).toEqual(new Map([['h',10],['s',20],['v',30]]));

    expect(cv.Transform.encode({transform:'MQTT:color_hsl'}, new Map([['h',10],['s',20],['v',30]]))).toEqual('10,20,30');
    expect(cv.Transform.decode({transform:'MQTT:color_hsl'}, '10,20,30')).toEqual(new Map([['h',10],['s',20],['v',30]]));

    expect(cv.Transform.encode({transform:'MQTT:color_h_s_l'}, new Map([['h',10],['s',20],['v',30]]))).toEqual({'h':10,'s':20,'l':30});
    expect(cv.Transform.decode({transform:'MQTT:color_h_s_l'}, '{"h":10,"s":20,"l":30}')).toEqual(new Map([['h',10],['s',20],['v',30]]));

    expect(cv.Transform.encode({transform:'MQTT:color_rgb'}, new Map([['r',10],['g',20],['b',30]]))).toEqual('10,20,30');
    expect(cv.Transform.decode({transform:'MQTT:color_rgb'}, '10,20,30')).toEqual(new Map([['r',10],['g',20],['b',30]]));

    expect(cv.Transform.encode({transform:'MQTT:color_r_g_b'}, new Map([['r',10],['g',20],['b',30]]))).toEqual({'r':10,'g':20,'b':30});
    expect(cv.Transform.decode({transform:'MQTT:color_r_g_b'}, '{"r":10,"g":20,"b":30}')).toEqual(new Map([['r',10],['g',20],['b',30]]));

    expect(cv.Transform.encode({transform:'MQTT:color_rgbw'}, new Map([['r',10],['g',20],['b',30],['w',40]]))).toEqual('10,20,30,40');
    expect(cv.Transform.decode({transform:'MQTT:color_rgbw'}, '10,20,30,40')).toEqual(new Map([['r',10],['g',20],['b',30],['w',40]]));
    expect(cv.Transform.encode({transform:'MQTT:color_rgbw', selector:'a'}, new Map([['r',10],['g',20],['b',30],['w',40]]))).toEqual('{"a":"10,20,30,40"}');
    expect(cv.Transform.decode({transform:'MQTT:color_rgbw', selector:'a'}, '{"a":"10,20,30,40"}')).toEqual(new Map([['r',10],['g',20],['b',30],['w',40]]));

    expect(cv.Transform.encode({transform:'MQTT:color_r_g_b_w'}, new Map([['r',10],['g',20],['b',30],['w',40]]))).toEqual({'r':10,'g':20,'b':30,'w':40});
    expect(cv.Transform.decode({transform:'MQTT:color_r_g_b_w'}, '{"r":10,"g":20,"b":30,"w":40}')).toEqual(new Map([['r',10],['g',20],['b',30],['w',40]]));
    expect(cv.Transform.encode({transform:'MQTT:color_r_g_b_w', selector:'a'}, new Map([['r',10],['g',20],['b',30],['w',40]]))).toEqual('{"a":{"r":10,"g":20,"b":30,"w":40}}');
    expect(cv.Transform.decode({transform:'MQTT:color_r_g_b_w', selector:'a'}, '{"a":{"r":10,"g":20,"b":30,"w":40}}')).toEqual(new Map([['r',10],['g',20],['b',30],['w',40]]));

    expect(cv.Transform.encode({transform:'MQTT:color_rgb_hex'}, new Map([['r',20],['g',40],['b',60]]))).toEqual('#336699');
    expect(cv.Transform.decode({transform:'MQTT:color_rgb_hex'}, '#336699')).toEqual(new Map([['r',20],['g',40],['b',60]]));
    expect(cv.Transform.encode({transform:'MQTT:color_rgb_hex', selector:'a'}, new Map([['r',20],['g',40],['b',60]]))).toEqual('{"a":"#336699"}');
    expect(cv.Transform.decode({transform:'MQTT:color_rgb_hex', selector:'a'}, '{"a":"#336699"}')).toEqual(new Map([['r',20],['g',40],['b',60]]));

    expect(cv.Transform.encode({transform:'MQTT:color_rgbw_hex'}, new Map([['r',20],['g',40],['b',60],['w',80]]))).toEqual('#336699cc');
    expect(cv.Transform.decode({transform:'MQTT:color_rgbw_hex'}, '#336699cc')).toEqual(new Map([['r',20],['g',40],['b',60],['w',80]]));
    expect(cv.Transform.decode({transform:'MQTT:color_rgbw_hex'}, '#336699CC')).toEqual(new Map([['r',20],['g',40],['b',60],['w',80]]));
  });
});
