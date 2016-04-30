/**
 * Test the knx specific transforms
 *
 * @author Christian Mayer
 * @since 2016
 */
define(['TransformDefault', 'TransformKnx'], function(Transform) {
  
  var testcases = [
    { transform: 'DPT:1',     type: 'encode', source: 0,    target: '80' },
    { transform: 'DPT:1',     type: 'encode', source: 1,    target: '81' },
    { transform: 'DPT:1.001', type: 'encode', source: 1,    target: '81' },
    { transform: 'DPT:1',     type: 'decode', source: '00', target: 0    },
    { transform: 'DPT:1',     type: 'decode', source: '01', target: 1    },
    
    // dummy tests for dummy implementation
    { transform: 'DPT:2',     type: 'encode', source: 0,    target: '80' },
    { transform: 'DPT:2',     type: 'decode', source: '00', target: 0    },
    
    // dummy tests for dummy implementation
    { transform: 'DPT:3',     type: 'encode', source: 0,    target: '80' },
    { transform: 'DPT:3',     type: 'decode', source: '00', target: 0    },
    
    { transform: 'DPT:4',     type: 'encode', source: 'a',  target: '8061', noNumber: true },
    { transform: 'DPT:4',     type: 'decode', source: '61', target: 'a'    },
    
    { transform: 'DPT:5.001', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.001', type: 'encode', source: 100,  target: '80ff' },
    { transform: 'DPT:5.001', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.001', type: 'decode', source: 'ff', target: 100    },
    { transform: 'DPT:5.003', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.003', type: 'encode', source: 100,  target: '8046' },
    { transform: 'DPT:5.003', type: 'encode', source: 360,  target: '80ff' },
    { transform: 'DPT:5.003', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.003', type: 'decode', source: 'ff', target: 360    },
    { transform: 'DPT:5.004', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.004', type: 'encode', source: 100,  target: '8064' },
    { transform: 'DPT:5.004', type: 'encode', source: 255,  target: '80ff' },
    { transform: 'DPT:5.004', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.004', type: 'decode', source: 'ff', target: 255    },
    { transform: 'DPT:5.010', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:5.010', type: 'encode', source: 100,  target: '8064' },
    { transform: 'DPT:5.010', type: 'encode', source: 255,  target: '80ff' },
    { transform: 'DPT:5.010', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:5.010', type: 'decode', source: 'ff', target: 255    },
    
    { transform: 'DPT:6.001', type: 'encode', source: -128, target: '8080' },
    { transform: 'DPT:6.001', type: 'encode', source: -1,   target: '80ff' },
    { transform: 'DPT:6.001', type: 'encode', source: 0,    target: '8000' },
    { transform: 'DPT:6.001', type: 'encode', source: 100,  target: '8064' },
    { transform: 'DPT:6.001', type: 'encode', source: 127,  target: '807f' },
    { transform: 'DPT:6.001', type: 'decode', source: '80', target: -128   },
    { transform: 'DPT:6.001', type: 'decode', source: 'ff', target: -1     },
    { transform: 'DPT:6.001', type: 'decode', source: '00', target: 0      },
    { transform: 'DPT:6.001', type: 'decode', source: '64', target: 100    },
    { transform: 'DPT:6.001', type: 'decode', source: '7f', target: 127    },
    
    { transform: 'DPT:7.001', type: 'encode', source: 0,      target: '800000' },
    { transform: 'DPT:7.001', type: 'encode', source: 100,    target: '800064' },
    { transform: 'DPT:7.001', type: 'encode', source: 65535,  target: '80ffff' },
    { transform: 'DPT:7.001', type: 'decode', source: '0000', target: 0        },
    { transform: 'DPT:7.001', type: 'decode', source: '0064', target: 100      },
    { transform: 'DPT:7.001', type: 'decode', source: 'ffff', target: 65535    },
    
    { transform: 'DPT:8.001', type: 'encode', source: -32768, target: '808000' },
    { transform: 'DPT:8.001', type: 'encode', source: -1,     target: '80ffff' },
    { transform: 'DPT:8.001', type: 'encode', source: 0,      target: '800000' },
    { transform: 'DPT:8.001', type: 'encode', source: 100,    target: '800064' },
    { transform: 'DPT:8.001', type: 'encode', source: 32767,  target: '807fff' },
    { transform: 'DPT:8.001', type: 'decode', source: '8000', target: -32768   },
    { transform: 'DPT:8.001', type: 'decode', source: 'ffff', target: -1       },
    { transform: 'DPT:8.001', type: 'decode', source: '0000', target: 0        },
    { transform: 'DPT:8.001', type: 'decode', source: '0064', target: 100      },
    { transform: 'DPT:8.001', type: 'decode', source: '7fff', target: 32767    },
    
    { transform: 'DPT:9.001', type: 'encode', source: -273,    target: '80a156' },
    { transform: 'DPT:9.001', type: 'encode', source: -1,      target: '80879c' },
    { transform: 'DPT:9.001', type: 'encode', source: 0,       target: '800000' },
    { transform: 'DPT:9.001', type: 'encode', source: 0.01,    target: '800001', noInt: true },
    { transform: 'DPT:9.001', type: 'encode', source: 1,       target: '800064' },
    { transform: 'DPT:9.001', type: 'encode', source: 670760,  target: '807ffe' },
    { transform: 'DPT:9.001', type: 'decode', source: 'a156',  target: -273     },
    { transform: 'DPT:9.001', type: 'decode', source: '879c',  target: -1       },
    { transform: 'DPT:9.001', type: 'decode', source: '0000',  target: 0        },
    { transform: 'DPT:9.001', type: 'decode', source: '0001',  target: 0.01     },
    { transform: 'DPT:9.001', type: 'decode', source: '0064',  target: 1        },
    { transform: 'DPT:9.001', type: 'decode', source: '7ffe',  target: 670760   },
    { transform: 'DPT:9.020', type: 'encode', source: -670760, target: '80f802' },
  ];

  describe('checking knx transforms', function() {
    // run testcases
    testcases.forEach( function( testcase, index ){
      it( 'should transform ' + testcase.transform + ' ' + testcase.type + ' "' + testcase.source + '" (test #' + index + ')', function(){
        switch( testcase.type ) {
          case 'encode':
            // test direct
            expect(Transform.Transform[ testcase.transform ].encode( testcase.source )).toEqual( testcase.target );
            if( !testcase.noNumber )
            {
              // test integer
              if( !testcase.noInt )
                expect(Transform.Transform[ testcase.transform ].encode( testcase.source|0  )).toEqual( testcase.target );
              // test float
              expect(Transform.Transform[ testcase.transform ].encode( +testcase.source   )).toEqual( testcase.target );
              // test string
              expect(Transform.Transform[ testcase.transform ].encode( testcase.source+'' )).toEqual( testcase.target );
            }
          break;
          
        case 'decode':
          expect(Transform.Transform[ testcase.transform ].decode( testcase.source )).toEqual( testcase.target );
          break;
        }
      });
    });
  });
});