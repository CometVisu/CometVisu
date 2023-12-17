(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.util.IconTools": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* IconConfig.js
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
   * Static access to internal icon database.
   */
  qx.Class.define('cv.IconConfig', {
    type: 'static',
    /*
    ******************************************************
      STATICS
    ******************************************************
    */
    statics: {
      /**
       * Internal database of the known icons.
       * Initially filled with the default icons.
       * @type {iconDB}
       */
      DB: {
        'CometVisu': {
          '*': '128',
          '16': {
            'black': '*/000000',
            'white': '*/ffffff',
            'antimony': '*/00ddff',
            'boron': '*/00ff11',
            'lithium': '*/ff0000',
            'potassium': '*/d00055',
            'orange  ': '*/ff8000',
            '*': {
              '*': 'ff8000',
              '000000': {
                'uri': 'icons/comet_16_000000.png'
              },
              'ffffff': {
                'uri': 'icons/comet_16_ffffff.png'
              },
              '00ddff': {
                'uri': 'icons/comet_16_00ddff.png'
              },
              '00ff11': {
                'uri': 'icons/comet_16_00ff11.png'
              },
              'ff0000': {
                'uri': 'icons/comet_16_ff0000.png'
              },
              'd00055': {
                'uri': 'icons/comet_16_d00055.png'
              },
              'ff8000': {
                'uri': 'icons/comet_16_ff8000.png'
              }
            }
          },
          '32': {
            'black': '*/000000',
            'white': '*/ffffff',
            'antimony': '*/00ddff',
            'boron': '*/00ff11',
            'lithium': '*/ff0000',
            'potassium': '*/d00055',
            'orange  ': '*/ff8000',
            '*': {
              '*': 'ff8000',
              '000000': {
                'uri': 'icons/comet_32_000000.png'
              },
              'ffffff': {
                'uri': 'icons/comet_32_ffffff.png'
              },
              '00ddff': {
                'uri': 'icons/comet_32_00ddff.png'
              },
              '00ff11': {
                'uri': 'icons/comet_32_00ff11.png'
              },
              'ff0000': {
                'uri': 'icons/comet_32_ff0000.png'
              },
              'd00055': {
                'uri': 'icons/comet_32_d00055.png'
              },
              'ff8000': {
                'uri': 'icons/comet_32_ff8000.png'
              }
            }
          },
          '64': {
            'black': '*/000000',
            'white': '*/ffffff',
            'antimony': '*/00ddff',
            'boron': '*/00ff11',
            'lithium': '*/ff0000',
            'potassium': '*/d00055',
            'orange  ': '*/ff8000',
            '*': {
              '*': 'ff8000',
              '000000': {
                'uri': 'icons/comet_64_000000.png'
              },
              'ffffff': {
                'uri': 'icons/comet_64_ffffff.png'
              },
              '00ddff': {
                'uri': 'icons/comet_64_00ddff.png'
              },
              '00ff11': {
                'uri': 'icons/comet_64_00ff11.png'
              },
              'ff0000': {
                'uri': 'icons/comet_64_ff0000.png'
              },
              'd00055': {
                'uri': 'icons/comet_64_d00055.png'
              },
              'ff8000': {
                'uri': 'icons/comet_64_ff8000.png'
              }
            }
          },
          '128': {
            'black': '*/000000',
            'white': '*/ffffff',
            'antimony': '*/00ddff',
            'boron': '*/00ff11',
            'lithium': '*/ff0000',
            'potassium': '*/d00055',
            'orange  ': '*/ff8000',
            '*': {
              '*': 'ff8000',
              '000000': {
                'uri': 'icons/comet_128_000000.png'
              },
              'ffffff': {
                'uri': 'icons/comet_128_ffffff.png'
              },
              '00ddff': {
                'uri': 'icons/comet_128_00ddff.png'
              },
              '00ff11': {
                'uri': 'icons/comet_128_00ff11.png'
              },
              'ff0000': {
                'uri': 'icons/comet_128_ff0000.png'
              },
              'd00055': {
                'uri': 'icons/comet_128_d00055.png'
              },
              'ff8000': {
                'uri': 'icons/comet_128_ff8000.png'
              }
            }
          }
        },
        // Do not remove this line: Dynamic Icons Start

        'audio_audio': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_audio')
            }
          }
        },
        'audio_desync': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_desync')
            }
          }
        },
        'audio_eject': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_eject')
            }
          }
        },
        'audio_eq': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_eq')
            }
          }
        },
        'audio_fade': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_fade')
            }
          }
        },
        'audio_ff': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_ff')
            }
          }
        },
        'audio_headphone': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_headphone')
            }
          }
        },
        'audio_loudness': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_loudness')
            }
          }
        },
        'audio_ls_51': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_ls_51')
            }
          }
        },
        'audio_ls_51_center': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_ls_51_center')
            }
          }
        },
        'audio_ls_51_front': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_ls_51_front')
            }
          }
        },
        'audio_ls_51_rear': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_ls_51_rear')
            }
          }
        },
        'audio_ls_51_sub': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_ls_51_sub')
            }
          }
        },
        'audio_mic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_mic')
            }
          }
        },
        'audio_mic_mute': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_mic_mute')
            }
          }
        },
        'audio_pause': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_pause')
            }
          }
        },
        'audio_play': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_play')
            }
          }
        },
        'audio_playlist': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_playlist')
            }
          }
        },
        'audio_rec': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_rec')
            }
          }
        },
        'audio_repeat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_repeat')
            }
          }
        },
        'audio_rew': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_rew')
            }
          }
        },
        'audio_shuffle': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_shuffle')
            }
          }
        },
        'audio_sound': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_sound')
            }
          }
        },
        'audio_stop': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_stop')
            }
          }
        },
        'audio_sync': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_sync')
            }
          }
        },
        'audio_volume_high': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_volume_high')
            }
          }
        },
        'audio_volume_low': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_volume_low')
            }
          }
        },
        'audio_volume_mid': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_volume_mid')
            }
          }
        },
        'audio_volume_mute': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('audio_volume_mute')
            }
          }
        },
        'control_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_1')
            }
          }
        },
        'control_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_2')
            }
          }
        },
        'control_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3')
            }
          }
        },
        'control_3dot_hor_e': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3dot_hor_e')
            }
          }
        },
        'control_3dot_hor_f': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3dot_hor_f')
            }
          }
        },
        'control_3dot_hor_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3dot_hor_s')
            }
          }
        },
        'control_3dot_vert_e': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3dot_vert_e')
            }
          }
        },
        'control_3dot_vert_f': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3dot_vert_f')
            }
          }
        },
        'control_3dot_vert_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_3dot_vert_s')
            }
          }
        },
        'control_4': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_4')
            }
          }
        },
        'control_all_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_all_on_off')
            }
          }
        },
        'control_arrow_down': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_down')
            }
          }
        },
        'control_arrow_down_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_down_left')
            }
          }
        },
        'control_arrow_down_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_down_right')
            }
          }
        },
        'control_arrow_downward': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_downward')
            }
          }
        },
        'control_arrow_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_left')
            }
          }
        },
        'control_arrow_leftward': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_leftward')
            }
          }
        },
        'control_arrow_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_right')
            }
          }
        },
        'control_arrow_rightward': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_rightward')
            }
          }
        },
        'control_arrow_turn_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_turn_left')
            }
          }
        },
        'control_arrow_turn_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_turn_right')
            }
          }
        },
        'control_arrow_up': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_up')
            }
          }
        },
        'control_arrow_up_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_up_left')
            }
          }
        },
        'control_arrow_up_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_up_right')
            }
          }
        },
        'control_arrow_upward': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_arrow_upward')
            }
          }
        },
        'control_building_2_s_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_all')
            }
          }
        },
        'control_building_2_s_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_dg')
            }
          }
        },
        'control_building_2_s_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_eg')
            }
          }
        },
        'control_building_2_s_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_int_all')
            }
          }
        },
        'control_building_2_s_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_int_dg')
            }
          }
        },
        'control_building_2_s_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_int_eg')
            }
          }
        },
        'control_building_2_s_int_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_int_kg')
            }
          }
        },
        'control_building_2_s_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_2_s_kg')
            }
          }
        },
        'control_building_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_all')
            }
          }
        },
        'control_building_control': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_control')
            }
          }
        },
        'control_building_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_dg')
            }
          }
        },
        'control_building_edg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_all')
            }
          }
        },
        'control_building_edg_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_dg')
            }
          }
        },
        'control_building_edg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_eg')
            }
          }
        },
        'control_building_edg_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_int_all')
            }
          }
        },
        'control_building_edg_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_int_dg')
            }
          }
        },
        'control_building_edg_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_int_eg')
            }
          }
        },
        'control_building_edg_int_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_int_kg')
            }
          }
        },
        'control_building_edg_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_edg_kg')
            }
          }
        },
        'control_building_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_eg')
            }
          }
        },
        'control_building_empty': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_empty')
            }
          }
        },
        'control_building_filled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_filled')
            }
          }
        },
        'control_building_flat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat')
            }
          }
        },
        'control_building_flat_filled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_filled')
            }
          }
        },
        'control_building_flat_okg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_okg_all')
            }
          }
        },
        'control_building_flat_okg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_okg_eg')
            }
          }
        },
        'control_building_flat_okg_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_okg_og')
            }
          }
        },
        'control_building_flat_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s')
            }
          }
        },
        'control_building_flat_s_filled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_filled')
            }
          }
        },
        'control_building_flat_s_mkg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_mkg')
            }
          }
        },
        'control_building_flat_s_mkg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_mkg_all')
            }
          }
        },
        'control_building_flat_s_mkg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_mkg_eg')
            }
          }
        },
        'control_building_flat_s_mkg_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_mkg_kg')
            }
          }
        },
        'control_building_flat_s_mkg_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_mkg_og')
            }
          }
        },
        'control_building_flat_s_okg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_okg_all')
            }
          }
        },
        'control_building_flat_s_okg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_okg_eg')
            }
          }
        },
        'control_building_flat_s_okg_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_flat_s_okg_og')
            }
          }
        },
        'control_building_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_int_all')
            }
          }
        },
        'control_building_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_int_dg')
            }
          }
        },
        'control_building_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_int_eg')
            }
          }
        },
        'control_building_int_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_int_kg')
            }
          }
        },
        'control_building_int_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_int_og')
            }
          }
        },
        'control_building_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_kg')
            }
          }
        },
        'control_building_modern02_okg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_all')
            }
          }
        },
        'control_building_modern02_okg_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_dg')
            }
          }
        },
        'control_building_modern02_okg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_eg')
            }
          }
        },
        'control_building_modern02_okg_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_int_all')
            }
          }
        },
        'control_building_modern02_okg_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_int_dg')
            }
          }
        },
        'control_building_modern02_okg_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_int_eg')
            }
          }
        },
        'control_building_modern02_okg_int_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_int_og')
            }
          }
        },
        'control_building_modern02_okg_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern02_okg_og')
            }
          }
        },
        'control_building_modern_s_2og_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_all')
            }
          }
        },
        'control_building_modern_s_2og_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_dg')
            }
          }
        },
        'control_building_modern_s_2og_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_eg')
            }
          }
        },
        'control_building_modern_s_2og_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_int_all')
            }
          }
        },
        'control_building_modern_s_2og_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_int_dg')
            }
          }
        },
        'control_building_modern_s_2og_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_int_eg')
            }
          }
        },
        'control_building_modern_s_2og_int_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_int_kg')
            }
          }
        },
        'control_building_modern_s_2og_int_og1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_int_og1')
            }
          }
        },
        'control_building_modern_s_2og_int_og2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_int_og2')
            }
          }
        },
        'control_building_modern_s_2og_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_kg')
            }
          }
        },
        'control_building_modern_s_2og_og1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_og1')
            }
          }
        },
        'control_building_modern_s_2og_og2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_2og_og2')
            }
          }
        },
        'control_building_modern_s_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_all')
            }
          }
        },
        'control_building_modern_s_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_dg')
            }
          }
        },
        'control_building_modern_s_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_eg')
            }
          }
        },
        'control_building_modern_s_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_int_all')
            }
          }
        },
        'control_building_modern_s_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_int_dg')
            }
          }
        },
        'control_building_modern_s_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_int_eg')
            }
          }
        },
        'control_building_modern_s_int_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_int_kg')
            }
          }
        },
        'control_building_modern_s_int_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_int_og')
            }
          }
        },
        'control_building_modern_s_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_kg')
            }
          }
        },
        'control_building_modern_s_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_og')
            }
          }
        },
        'control_building_modern_s_okg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_all')
            }
          }
        },
        'control_building_modern_s_okg_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_dg')
            }
          }
        },
        'control_building_modern_s_okg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_eg')
            }
          }
        },
        'control_building_modern_s_okg_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_int_all')
            }
          }
        },
        'control_building_modern_s_okg_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_int_dg')
            }
          }
        },
        'control_building_modern_s_okg_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_int_eg')
            }
          }
        },
        'control_building_modern_s_okg_int_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_int_og')
            }
          }
        },
        'control_building_modern_s_okg_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_modern_s_okg_og')
            }
          }
        },
        'control_building_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_og')
            }
          }
        },
        'control_building_outside': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_outside')
            }
          }
        },
        'control_building_s_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_all')
            }
          }
        },
        'control_building_s_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_dg')
            }
          }
        },
        'control_building_s_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_eg')
            }
          }
        },
        'control_building_s_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_int_all')
            }
          }
        },
        'control_building_s_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_int_dg')
            }
          }
        },
        'control_building_s_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_int_eg')
            }
          }
        },
        'control_building_s_int_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_int_kg')
            }
          }
        },
        'control_building_s_int_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_int_og')
            }
          }
        },
        'control_building_s_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_kg')
            }
          }
        },
        'control_building_s_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_og')
            }
          }
        },
        'control_building_s_okg_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_all')
            }
          }
        },
        'control_building_s_okg_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_dg')
            }
          }
        },
        'control_building_s_okg_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_eg')
            }
          }
        },
        'control_building_s_okg_int_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_int_all')
            }
          }
        },
        'control_building_s_okg_int_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_int_dg')
            }
          }
        },
        'control_building_s_okg_int_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_int_eg')
            }
          }
        },
        'control_building_s_okg_int_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_int_og')
            }
          }
        },
        'control_building_s_okg_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_building_s_okg_og')
            }
          }
        },
        'control_cancel': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_cancel')
            }
          }
        },
        'control_centr_arrow_down': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_down')
            }
          }
        },
        'control_centr_arrow_down_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_down_left')
            }
          }
        },
        'control_centr_arrow_down_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_down_right')
            }
          }
        },
        'control_centr_arrow_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_left')
            }
          }
        },
        'control_centr_arrow_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_right')
            }
          }
        },
        'control_centr_arrow_up': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_up')
            }
          }
        },
        'control_centr_arrow_up_left': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_up_left')
            }
          }
        },
        'control_centr_arrow_up_right': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_centr_arrow_up_right')
            }
          }
        },
        'control_circuit_breaker_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_circuit_breaker_off')
            }
          }
        },
        'control_circuit_breaker_on': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_circuit_breaker_on')
            }
          }
        },
        'control_clear': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_clear')
            }
          }
        },
        'control_fault_current_circuit_breaker_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_fault_current_circuit_breaker_off')
            }
          }
        },
        'control_fault_current_circuit_breaker_on': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_fault_current_circuit_breaker_on')
            }
          }
        },
        'control_hamburger_e': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_hamburger_e')
            }
          }
        },
        'control_hamburger_f': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_hamburger_f')
            }
          }
        },
        'control_hamburger_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_hamburger_s')
            }
          }
        },
        'control_home': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_home')
            }
          }
        },
        'control_minus': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_minus')
            }
          }
        },
        'control_ok': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_ok')
            }
          }
        },
        'control_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_on_off')
            }
          }
        },
        'control_outside_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_outside_on_off')
            }
          }
        },
        'control_plus': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_plus')
            }
          }
        },
        'control_reboot': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_reboot')
            }
          }
        },
        'control_reload': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_reload')
            }
          }
        },
        'control_reset': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_reset')
            }
          }
        },
        'control_return': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_return')
            }
          }
        },
        'control_standby': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_standby')
            }
          }
        },
        'control_switch_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_switch_1')
            }
          }
        },
        'control_switch_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_switch_3')
            }
          }
        },
        'control_switch_m_4': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_switch_m_4')
            }
          }
        },
        'control_switch_m_8': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_switch_m_8')
            }
          }
        },
        'control_x': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_x')
            }
          }
        },
        'control_zoom_in': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_zoom_in')
            }
          }
        },
        'control_zoom_out': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('control_zoom_out')
            }
          }
        },
        'edit_collapse': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_collapse')
            }
          }
        },
        'edit_copy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_copy')
            }
          }
        },
        'edit_cut': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_cut')
            }
          }
        },
        'edit_delete': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_delete')
            }
          }
        },
        'edit_expand': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_expand')
            }
          }
        },
        'edit_favorites': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_favorites')
            }
          }
        },
        'edit_input_numeric': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_input_numeric')
            }
          }
        },
        'edit_numeric_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_0')
            }
          }
        },
        'edit_numeric_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_1')
            }
          }
        },
        'edit_numeric_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_2')
            }
          }
        },
        'edit_numeric_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_3')
            }
          }
        },
        'edit_numeric_4': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_4')
            }
          }
        },
        'edit_numeric_5': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_5')
            }
          }
        },
        'edit_numeric_6': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_6')
            }
          }
        },
        'edit_numeric_7': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_7')
            }
          }
        },
        'edit_numeric_8': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_8')
            }
          }
        },
        'edit_numeric_9': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_numeric_9')
            }
          }
        },
        'edit_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_open')
            }
          }
        },
        'edit_paste': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_paste')
            }
          }
        },
        'edit_save': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_save')
            }
          }
        },
        'edit_settings': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_settings')
            }
          }
        },
        'edit_sort': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('edit_sort')
            }
          }
        },
        'fts_awning': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_awning')
            }
          }
        },
        'fts_balcony': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_balcony')
            }
          }
        },
        'fts_blade_arc': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc')
            }
          }
        },
        'fts_blade_arc_-10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-10')
            }
          }
        },
        'fts_blade_arc_-20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-20')
            }
          }
        },
        'fts_blade_arc_-30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-30')
            }
          }
        },
        'fts_blade_arc_-40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-40')
            }
          }
        },
        'fts_blade_arc_-50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-50')
            }
          }
        },
        'fts_blade_arc_-60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-60')
            }
          }
        },
        'fts_blade_arc_-70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_-70')
            }
          }
        },
        'fts_blade_arc_00': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_00')
            }
          }
        },
        'fts_blade_arc_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_10')
            }
          }
        },
        'fts_blade_arc_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_100')
            }
          }
        },
        'fts_blade_arc_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_20')
            }
          }
        },
        'fts_blade_arc_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_30')
            }
          }
        },
        'fts_blade_arc_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_40')
            }
          }
        },
        'fts_blade_arc_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_50')
            }
          }
        },
        'fts_blade_arc_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_60')
            }
          }
        },
        'fts_blade_arc_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_70')
            }
          }
        },
        'fts_blade_arc_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_80')
            }
          }
        },
        'fts_blade_arc_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_90')
            }
          }
        },
        'fts_blade_arc_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_automatic')
            }
          }
        },
        'fts_blade_arc_close_00': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_close_00')
            }
          }
        },
        'fts_blade_arc_close_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_close_100')
            }
          }
        },
        'fts_blade_arc_close_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_close_50')
            }
          }
        },
        'fts_blade_arc_sun': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_arc_sun')
            }
          }
        },
        'fts_blade_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s')
            }
          }
        },
        'fts_blade_s_00': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_00')
            }
          }
        },
        'fts_blade_s_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_10')
            }
          }
        },
        'fts_blade_s_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_100')
            }
          }
        },
        'fts_blade_s_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_20')
            }
          }
        },
        'fts_blade_s_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_30')
            }
          }
        },
        'fts_blade_s_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_40')
            }
          }
        },
        'fts_blade_s_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_50')
            }
          }
        },
        'fts_blade_s_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_60')
            }
          }
        },
        'fts_blade_s_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_70')
            }
          }
        },
        'fts_blade_s_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_80')
            }
          }
        },
        'fts_blade_s_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_90')
            }
          }
        },
        'fts_blade_s_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_automatic')
            }
          }
        },
        'fts_blade_s_sun': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_s_sun')
            }
          }
        },
        'fts_blade_z': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z')
            }
          }
        },
        'fts_blade_z_00': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_00')
            }
          }
        },
        'fts_blade_z_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_10')
            }
          }
        },
        'fts_blade_z_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_100')
            }
          }
        },
        'fts_blade_z_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_20')
            }
          }
        },
        'fts_blade_z_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_30')
            }
          }
        },
        'fts_blade_z_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_40')
            }
          }
        },
        'fts_blade_z_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_50')
            }
          }
        },
        'fts_blade_z_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_60')
            }
          }
        },
        'fts_blade_z_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_70')
            }
          }
        },
        'fts_blade_z_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_80')
            }
          }
        },
        'fts_blade_z_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_90')
            }
          }
        },
        'fts_blade_z_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_automatic')
            }
          }
        },
        'fts_blade_z_sun': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_blade_z_sun')
            }
          }
        },
        'fts_door': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door')
            }
          }
        },
        'fts_door_locked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_locked')
            }
          }
        },
        'fts_door_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_open')
            }
          }
        },
        'fts_door_opener_key': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_opener_key')
            }
          }
        },
        'fts_door_slide': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide')
            }
          }
        },
        'fts_door_slide_2w': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_2w')
            }
          }
        },
        'fts_door_slide_2w_open_l': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_2w_open_l')
            }
          }
        },
        'fts_door_slide_2w_open_lr': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_2w_open_lr')
            }
          }
        },
        'fts_door_slide_2w_open_r': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_2w_open_r')
            }
          }
        },
        'fts_door_slide_m': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_m')
            }
          }
        },
        'fts_door_slide_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_open')
            }
          }
        },
        'fts_door_slide_open_m': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_slide_open_m')
            }
          }
        },
        'fts_door_tilt': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_tilt')
            }
          }
        },
        'fts_door_unlocked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_door_unlocked')
            }
          }
        },
        'fts_entrance_boom_closed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_entrance_boom_closed')
            }
          }
        },
        'fts_entrance_boom_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_entrance_boom_open')
            }
          }
        },
        'fts_frontdoor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_frontdoor')
            }
          }
        },
        'fts_garage': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage')
            }
          }
        },
        'fts_garage_car_01': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_car_01')
            }
          }
        },
        'fts_garage_door_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_10')
            }
          }
        },
        'fts_garage_door_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_100')
            }
          }
        },
        'fts_garage_door_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_20')
            }
          }
        },
        'fts_garage_door_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_30')
            }
          }
        },
        'fts_garage_door_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_40')
            }
          }
        },
        'fts_garage_door_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_50')
            }
          }
        },
        'fts_garage_door_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_60')
            }
          }
        },
        'fts_garage_door_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_70')
            }
          }
        },
        'fts_garage_door_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_80')
            }
          }
        },
        'fts_garage_door_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_door_90')
            }
          }
        },
        'fts_garage_motorbike': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_garage_motorbike')
            }
          }
        },
        'fts_light_dome': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_light_dome')
            }
          }
        },
        'fts_light_dome_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_light_dome_open')
            }
          }
        },
        'fts_shutter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter')
            }
          }
        },
        'fts_shutter_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_10')
            }
          }
        },
        'fts_shutter_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_100')
            }
          }
        },
        'fts_shutter_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_20')
            }
          }
        },
        'fts_shutter_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_30')
            }
          }
        },
        'fts_shutter_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_40')
            }
          }
        },
        'fts_shutter_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_50')
            }
          }
        },
        'fts_shutter_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_60')
            }
          }
        },
        'fts_shutter_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_70')
            }
          }
        },
        'fts_shutter_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_80')
            }
          }
        },
        'fts_shutter_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_90')
            }
          }
        },
        'fts_shutter_attention': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_attention')
            }
          }
        },
        'fts_shutter_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_automatic')
            }
          }
        },
        'fts_shutter_down': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_down')
            }
          }
        },
        'fts_shutter_jam': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_jam')
            }
          }
        },
        'fts_shutter_locked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_locked')
            }
          }
        },
        'fts_shutter_manual': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_manual')
            }
          }
        },
        'fts_shutter_stop': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_stop')
            }
          }
        },
        'fts_shutter_unlocked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_unlocked')
            }
          }
        },
        'fts_shutter_up': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_up')
            }
          }
        },
        'fts_shutter_vert': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert')
            }
          }
        },
        'fts_shutter_vert_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_10')
            }
          }
        },
        'fts_shutter_vert_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_100')
            }
          }
        },
        'fts_shutter_vert_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_20')
            }
          }
        },
        'fts_shutter_vert_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_30')
            }
          }
        },
        'fts_shutter_vert_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_40')
            }
          }
        },
        'fts_shutter_vert_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_50')
            }
          }
        },
        'fts_shutter_vert_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_60')
            }
          }
        },
        'fts_shutter_vert_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_70')
            }
          }
        },
        'fts_shutter_vert_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_80')
            }
          }
        },
        'fts_shutter_vert_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_90')
            }
          }
        },
        'fts_shutter_vert_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_automatic')
            }
          }
        },
        'fts_shutter_vert_blade_00': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_00')
            }
          }
        },
        'fts_shutter_vert_blade_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_10')
            }
          }
        },
        'fts_shutter_vert_blade_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_100')
            }
          }
        },
        'fts_shutter_vert_blade_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_20')
            }
          }
        },
        'fts_shutter_vert_blade_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_30')
            }
          }
        },
        'fts_shutter_vert_blade_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_40')
            }
          }
        },
        'fts_shutter_vert_blade_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_50')
            }
          }
        },
        'fts_shutter_vert_blade_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_60')
            }
          }
        },
        'fts_shutter_vert_blade_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_70')
            }
          }
        },
        'fts_shutter_vert_blade_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_80')
            }
          }
        },
        'fts_shutter_vert_blade_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_blade_90')
            }
          }
        },
        'fts_shutter_vert_down': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_down')
            }
          }
        },
        'fts_shutter_vert_manual': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_manual')
            }
          }
        },
        'fts_shutter_vert_up': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_shutter_vert_up')
            }
          }
        },
        'fts_sliding_gate': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sliding_gate')
            }
          }
        },
        'fts_sliding_gate_closed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sliding_gate_closed')
            }
          }
        },
        'fts_sliding_gate_l': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sliding_gate_l')
            }
          }
        },
        'fts_sliding_gate_l_closed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sliding_gate_l_closed')
            }
          }
        },
        'fts_sliding_gate_l_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sliding_gate_l_open')
            }
          }
        },
        'fts_sliding_gate_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sliding_gate_open')
            }
          }
        },
        'fts_sunblind': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sunblind')
            }
          }
        },
        'fts_sunblind_closed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sunblind_closed')
            }
          }
        },
        'fts_sunblind_volant': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_sunblind_volant')
            }
          }
        },
        'fts_umbrella_offset_closed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_umbrella_offset_closed')
            }
          }
        },
        'fts_umbrella_offset_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_umbrella_offset_open')
            }
          }
        },
        'fts_window_1w': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_1w')
            }
          }
        },
        'fts_window_1w_locked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_1w_locked')
            }
          }
        },
        'fts_window_1w_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_1w_open')
            }
          }
        },
        'fts_window_1w_tilt': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_1w_tilt')
            }
          }
        },
        'fts_window_1w_unlocked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_1w_unlocked')
            }
          }
        },
        'fts_window_2w': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w')
            }
          }
        },
        'fts_window_2w_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_open')
            }
          }
        },
        'fts_window_2w_open_l': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_open_l')
            }
          }
        },
        'fts_window_2w_open_l_tilt_r': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_open_l_tilt_r')
            }
          }
        },
        'fts_window_2w_open_lr': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_open_lr')
            }
          }
        },
        'fts_window_2w_open_r': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_open_r')
            }
          }
        },
        'fts_window_2w_tilt': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_tilt')
            }
          }
        },
        'fts_window_2w_tilt_l': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_tilt_l')
            }
          }
        },
        'fts_window_2w_tilt_l_open_r': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_tilt_l_open_r')
            }
          }
        },
        'fts_window_2w_tilt_lr': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_tilt_lr')
            }
          }
        },
        'fts_window_2w_tilt_r': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_2w_tilt_r')
            }
          }
        },
        'fts_window_louvre': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_louvre')
            }
          }
        },
        'fts_window_louvre_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_louvre_open')
            }
          }
        },
        'fts_window_roof': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof')
            }
          }
        },
        'fts_window_roof_open_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_open_1')
            }
          }
        },
        'fts_window_roof_open_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_open_2')
            }
          }
        },
        'fts_window_roof_shutter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter')
            }
          }
        },
        'fts_window_roof_shutter_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_10')
            }
          }
        },
        'fts_window_roof_shutter_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_100')
            }
          }
        },
        'fts_window_roof_shutter_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_20')
            }
          }
        },
        'fts_window_roof_shutter_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_30')
            }
          }
        },
        'fts_window_roof_shutter_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_40')
            }
          }
        },
        'fts_window_roof_shutter_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_50')
            }
          }
        },
        'fts_window_roof_shutter_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_60')
            }
          }
        },
        'fts_window_roof_shutter_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_70')
            }
          }
        },
        'fts_window_roof_shutter_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_80')
            }
          }
        },
        'fts_window_roof_shutter_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_window_roof_shutter_90')
            }
          }
        },
        'fts_yard_gate_2w': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_yard_gate_2w')
            }
          }
        },
        'fts_yard_gate_2w_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('fts_yard_gate_2w_open')
            }
          }
        },
        'info_ack': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_ack')
            }
          }
        },
        'info_attention': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_attention')
            }
          }
        },
        'info_bug': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_bug')
            }
          }
        },
        'info_catastrophe': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_catastrophe')
            }
          }
        },
        'info_error': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_error')
            }
          }
        },
        'info_info': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_info')
            }
          }
        },
        'info_no_state': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_no_state')
            }
          }
        },
        'info_ok': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_ok')
            }
          }
        },
        'info_warning': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('info_warning')
            }
          }
        },
        'it_av_receiver': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_av_receiver')
            }
          }
        },
        'it_camera': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_camera')
            }
          }
        },
        'it_fax': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_fax')
            }
          }
        },
        'it_internet': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_internet')
            }
          }
        },
        'it_media_player': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_media_player')
            }
          }
        },
        'it_nas': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_nas')
            }
          }
        },
        'it_net': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_net')
            }
          }
        },
        'it_network': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_network')
            }
          }
        },
        'it_pc': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_pc')
            }
          }
        },
        'it_radio': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_radio')
            }
          }
        },
        'it_remote': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_remote')
            }
          }
        },
        'it_router': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_router')
            }
          }
        },
        'it_satellite_dish': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_satellite_dish')
            }
          }
        },
        'it_satellite_dish_heating': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_satellite_dish_heating')
            }
          }
        },
        'it_server': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_server')
            }
          }
        },
        'it_smartphone': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_smartphone')
            }
          }
        },
        'it_telephone': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_telephone')
            }
          }
        },
        'it_television': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_television')
            }
          }
        },
        'it_ups': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_ups')
            }
          }
        },
        'it_ups_attention': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_ups_attention')
            }
          }
        },
        'it_ups_battery_empty': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_ups_battery_empty')
            }
          }
        },
        'it_ups_charging': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_ups_charging')
            }
          }
        },
        'it_ups_on_battery': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_ups_on_battery')
            }
          }
        },
        'it_ups_standby': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_ups_standby')
            }
          }
        },
        'it_wifi': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_wifi')
            }
          }
        },
        'it_wifi_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_wifi_2')
            }
          }
        },
        'it_wireless_dcf77': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('it_wireless_dcf77')
            }
          }
        },
        'light_ball': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_ball')
            }
          }
        },
        'light_bar_table': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_bar_table')
            }
          }
        },
        'light_bedside': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_bedside')
            }
          }
        },
        'light_bollard_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_bollard_1')
            }
          }
        },
        'light_bollard_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_bollard_2')
            }
          }
        },
        'light_cabinet': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_cabinet')
            }
          }
        },
        'light_ceiling_infrared': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_ceiling_infrared')
            }
          }
        },
        'light_ceiling_light': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_ceiling_light')
            }
          }
        },
        'light_ceiling_spots': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_ceiling_spots')
            }
          }
        },
        'light_control': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_control')
            }
          }
        },
        'light_corridor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_corridor')
            }
          }
        },
        'light_cube': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_cube')
            }
          }
        },
        'light_diffused': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_diffused')
            }
          }
        },
        'light_dinner_table': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_dinner_table')
            }
          }
        },
        'light_disco_ball': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_disco_ball')
            }
          }
        },
        'light_disco_ball_on': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_disco_ball_on')
            }
          }
        },
        'light_downlight': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_downlight')
            }
          }
        },
        'light_dressing_room': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_dressing_room')
            }
          }
        },
        'light_fairy_lights': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_fairy_lights')
            }
          }
        },
        'light_floor_lamp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_floor_lamp')
            }
          }
        },
        'light_floor_lamp_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_floor_lamp_2')
            }
          }
        },
        'light_fountain_indoor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_fountain_indoor')
            }
          }
        },
        'light_garage': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_garage')
            }
          }
        },
        'light_indoor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor')
            }
          }
        },
        'light_indoor_dg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_dg')
            }
          }
        },
        'light_indoor_eg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_eg')
            }
          }
        },
        'light_indoor_kg': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_kg')
            }
          }
        },
        'light_indoor_og': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_og')
            }
          }
        },
        'light_indoor_og_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_og_1')
            }
          }
        },
        'light_indoor_og_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_og_2')
            }
          }
        },
        'light_indoor_ug': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_indoor_ug')
            }
          }
        },
        'light_kitchen_hood': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_kitchen_hood')
            }
          }
        },
        'light_led': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_led')
            }
          }
        },
        'light_led_stripe': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_led_stripe')
            }
          }
        },
        'light_led_stripe_rgb': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_led_stripe_rgb')
            }
          }
        },
        'light_light': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light')
            }
          }
        },
        'light_light_dim_00': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_00')
            }
          }
        },
        'light_light_dim_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_10')
            }
          }
        },
        'light_light_dim_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_100')
            }
          }
        },
        'light_light_dim_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_20')
            }
          }
        },
        'light_light_dim_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_30')
            }
          }
        },
        'light_light_dim_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_40')
            }
          }
        },
        'light_light_dim_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_50')
            }
          }
        },
        'light_light_dim_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_60')
            }
          }
        },
        'light_light_dim_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_70')
            }
          }
        },
        'light_light_dim_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_80')
            }
          }
        },
        'light_light_dim_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_light_dim_90')
            }
          }
        },
        'light_mirror': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_mirror')
            }
          }
        },
        'light_mirrored_wardrobe': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_mirrored_wardrobe')
            }
          }
        },
        'light_office': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_office')
            }
          }
        },
        'light_office_desk': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_office_desk')
            }
          }
        },
        'light_outdoor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_outdoor')
            }
          }
        },
        'light_painting': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_painting')
            }
          }
        },
        'light_party': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_party')
            }
          }
        },
        'light_pendant_light': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_pendant_light')
            }
          }
        },
        'light_pendant_light_round': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_pendant_light_round')
            }
          }
        },
        'light_plant': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_plant')
            }
          }
        },
        'light_plant_spot': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_plant_spot')
            }
          }
        },
        'light_pool': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_pool')
            }
          }
        },
        'light_pool_rgb': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_pool_rgb')
            }
          }
        },
        'light_rgb': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_rgb')
            }
          }
        },
        'light_showcase': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_showcase')
            }
          }
        },
        'light_stairs': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_stairs')
            }
          }
        },
        'light_starlit_sky': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_starlit_sky')
            }
          }
        },
        'light_table_lamp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_table_lamp')
            }
          }
        },
        'light_television_backlight': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_television_backlight')
            }
          }
        },
        'light_uplight': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_uplight')
            }
          }
        },
        'light_wall_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_wall_1')
            }
          }
        },
        'light_wall_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_wall_2')
            }
          }
        },
        'light_wall_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_wall_3')
            }
          }
        },
        'light_wall_4': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_wall_4')
            }
          }
        },
        'light_waterfall': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_waterfall')
            }
          }
        },
        'light_window': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_window')
            }
          }
        },
        'light_wire_system_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_wire_system_1')
            }
          }
        },
        'light_wire_system_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_wire_system_2')
            }
          }
        },
        'light_x-mas_candle_arch': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_x-mas_candle_arch')
            }
          }
        },
        'light_x-mas_manger': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_x-mas_manger')
            }
          }
        },
        'light_x-mas_star_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_x-mas_star_1')
            }
          }
        },
        'light_x-mas_star_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_x-mas_star_2')
            }
          }
        },
        'light_x-mas_tree': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('light_x-mas_tree')
            }
          }
        },
        'measure_battery_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_battery_0')
            }
          }
        },
        'measure_battery_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_battery_100')
            }
          }
        },
        'measure_battery_25': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_battery_25')
            }
          }
        },
        'measure_battery_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_battery_50')
            }
          }
        },
        'measure_battery_75': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_battery_75')
            }
          }
        },
        'measure_cistern_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_0')
            }
          }
        },
        'measure_cistern_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_10')
            }
          }
        },
        'measure_cistern_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_100')
            }
          }
        },
        'measure_cistern_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_20')
            }
          }
        },
        'measure_cistern_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_30')
            }
          }
        },
        'measure_cistern_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_40')
            }
          }
        },
        'measure_cistern_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_50')
            }
          }
        },
        'measure_cistern_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_60')
            }
          }
        },
        'measure_cistern_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_70')
            }
          }
        },
        'measure_cistern_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_80')
            }
          }
        },
        'measure_cistern_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_cistern_90')
            }
          }
        },
        'measure_current': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_current')
            }
          }
        },
        'measure_globe': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_globe')
            }
          }
        },
        'measure_globe_lat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_globe_lat')
            }
          }
        },
        'measure_globe_long': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_globe_long')
            }
          }
        },
        'measure_ph_value': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_ph_value')
            }
          }
        },
        'measure_photovoltaic_inst': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_photovoltaic_inst')
            }
          }
        },
        'measure_pond_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_0')
            }
          }
        },
        'measure_pond_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_10')
            }
          }
        },
        'measure_pond_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_100')
            }
          }
        },
        'measure_pond_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_20')
            }
          }
        },
        'measure_pond_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_30')
            }
          }
        },
        'measure_pond_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_40')
            }
          }
        },
        'measure_pond_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_50')
            }
          }
        },
        'measure_pond_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_60')
            }
          }
        },
        'measure_pond_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_70')
            }
          }
        },
        'measure_pond_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_80')
            }
          }
        },
        'measure_pond_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pond_90')
            }
          }
        },
        'measure_power': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_power')
            }
          }
        },
        'measure_power_meter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_power_meter')
            }
          }
        },
        'measure_pressure_bar': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_pressure_bar')
            }
          }
        },
        'measure_radioactivity': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_radioactivity')
            }
          }
        },
        'measure_smart_meter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_smart_meter')
            }
          }
        },
        'measure_voltage': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_voltage')
            }
          }
        },
        'measure_water_meter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('measure_water_meter')
            }
          }
        },
        'message_achtung': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_achtung')
            }
          }
        },
        'message_attention': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_attention')
            }
          }
        },
        'message_attention_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_attention_2')
            }
          }
        },
        'message_bell': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_bell')
            }
          }
        },
        'message_bell_door': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_bell_door')
            }
          }
        },
        'message_bell_door_disabled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_bell_door_disabled')
            }
          }
        },
        'message_bug': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_bug')
            }
          }
        },
        'message_bug_filled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_bug_filled')
            }
          }
        },
        'message_caution': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_caution')
            }
          }
        },
        'message_empty': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_empty')
            }
          }
        },
        'message_error': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_error')
            }
          }
        },
        'message_garbage': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_garbage')
            }
          }
        },
        'message_garbage_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_garbage_2')
            }
          }
        },
        'message_garbage_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_garbage_3')
            }
          }
        },
        'message_garbage_4': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_garbage_4')
            }
          }
        },
        'message_garbage_collection': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_garbage_collection')
            }
          }
        },
        'message_help': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_help')
            }
          }
        },
        'message_info': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_info')
            }
          }
        },
        'message_light_barrier': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_light_barrier')
            }
          }
        },
        'message_light_barrier_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_light_barrier_open')
            }
          }
        },
        'message_light_intensity': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_light_intensity')
            }
          }
        },
        'message_mail': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_mail')
            }
          }
        },
        'message_mail_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_mail_open')
            }
          }
        },
        'message_manual': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_manual')
            }
          }
        },
        'message_medicine': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_medicine')
            }
          }
        },
        'message_notice': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_notice')
            }
          }
        },
        'message_ok': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_ok')
            }
          }
        },
        'message_postbox': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_postbox')
            }
          }
        },
        'message_postbox_mail': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_postbox_mail')
            }
          }
        },
        'message_presence': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_presence')
            }
          }
        },
        'message_presence_active': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_presence_active')
            }
          }
        },
        'message_presence_disabled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_presence_disabled')
            }
          }
        },
        'message_presence_geo_active': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_presence_geo_active')
            }
          }
        },
        'message_presence_geo_inactive': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_presence_geo_inactive')
            }
          }
        },
        'message_presence_inactive': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_presence_inactive')
            }
          }
        },
        'message_service': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_service')
            }
          }
        },
        'message_socket': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_socket')
            }
          }
        },
        'message_socket_ch': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_socket_ch')
            }
          }
        },
        'message_socket_ch_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_socket_ch_3')
            }
          }
        },
        'message_socket_ch_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_socket_ch_on_off')
            }
          }
        },
        'message_socket_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_socket_on_off')
            }
          }
        },
        'message_stop': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_stop')
            }
          }
        },
        'message_street_sweeper': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_street_sweeper')
            }
          }
        },
        'message_tendency_downward': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_tendency_downward')
            }
          }
        },
        'message_tendency_steady': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_tendency_steady')
            }
          }
        },
        'message_tendency_upward': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('message_tendency_upward')
            }
          }
        },
        'phone_answering': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_answering')
            }
          }
        },
        'phone_call': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_call')
            }
          }
        },
        'phone_call_end': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_call_end')
            }
          }
        },
        'phone_call_end_in': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_call_end_in')
            }
          }
        },
        'phone_call_end_out': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_call_end_out')
            }
          }
        },
        'phone_call_in': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_call_in')
            }
          }
        },
        'phone_call_out': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_call_out')
            }
          }
        },
        'phone_dial': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_dial')
            }
          }
        },
        'phone_missed_in': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_missed_in')
            }
          }
        },
        'phone_missed_out': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_missed_out')
            }
          }
        },
        'phone_remote_trans_disabled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_remote_trans_disabled')
            }
          }
        },
        'phone_ring': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_ring')
            }
          }
        },
        'phone_ring_in': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_ring_in')
            }
          }
        },
        'phone_ring_out': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('phone_ring_out')
            }
          }
        },
        'sani_boiler_temp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_boiler_temp')
            }
          }
        },
        'sani_buffer_temp_all': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_buffer_temp_all')
            }
          }
        },
        'sani_buffer_temp_down': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_buffer_temp_down')
            }
          }
        },
        'sani_buffer_temp_up': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_buffer_temp_up')
            }
          }
        },
        'sani_central_vacuum_cleaner': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_central_vacuum_cleaner')
            }
          }
        },
        'sani_central_vacuum_cleaner_dust_cont': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_central_vacuum_cleaner_dust_cont')
            }
          }
        },
        'sani_central_vacuum_cleaner_filter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_central_vacuum_cleaner_filter')
            }
          }
        },
        'sani_cogeneration': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_cogeneration')
            }
          }
        },
        'sani_cooling': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_cooling')
            }
          }
        },
        'sani_cooling_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_cooling_automatic')
            }
          }
        },
        'sani_cooling_manual': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_cooling_manual')
            }
          }
        },
        'sani_cooling_temp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_cooling_temp')
            }
          }
        },
        'sani_domestic_waterworks': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_domestic_waterworks')
            }
          }
        },
        'sani_earth_source_heat_pump': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_earth_source_heat_pump')
            }
          }
        },
        'sani_floor_heating': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_floor_heating')
            }
          }
        },
        'sani_garden_pump': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_garden_pump')
            }
          }
        },
        'sani_heating': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_heating')
            }
          }
        },
        'sani_heating_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_heating_automatic')
            }
          }
        },
        'sani_heating_manual': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_heating_manual')
            }
          }
        },
        'sani_heating_temp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_heating_temp')
            }
          }
        },
        'sani_irrigation': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_irrigation')
            }
          }
        },
        'sani_irrigation_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_irrigation_automatic')
            }
          }
        },
        'sani_irrigation_manual': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_irrigation_manual')
            }
          }
        },
        'sani_irrigation_pop_up_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_irrigation_pop_up_off')
            }
          }
        },
        'sani_irrigation_pop_up_on': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_irrigation_pop_up_on')
            }
          }
        },
        'sani_irrigation_water_plug': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_irrigation_water_plug')
            }
          }
        },
        'sani_leakage': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_leakage')
            }
          }
        },
        'sani_pool_filter_pump': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_pool_filter_pump')
            }
          }
        },
        'sani_pump': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_pump')
            }
          }
        },
        'sani_return_temp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_return_temp')
            }
          }
        },
        'sani_solar': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_solar')
            }
          }
        },
        'sani_solar_temp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_solar_temp')
            }
          }
        },
        'sani_sprinkling': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_sprinkling')
            }
          }
        },
        'sani_supply_temp': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_supply_temp')
            }
          }
        },
        'sani_towel_rad': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_towel_rad')
            }
          }
        },
        'sani_valve_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_0')
            }
          }
        },
        'sani_valve_10': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_10')
            }
          }
        },
        'sani_valve_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_100')
            }
          }
        },
        'sani_valve_20': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_20')
            }
          }
        },
        'sani_valve_30': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_30')
            }
          }
        },
        'sani_valve_40': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_40')
            }
          }
        },
        'sani_valve_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_50')
            }
          }
        },
        'sani_valve_60': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_60')
            }
          }
        },
        'sani_valve_70': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_70')
            }
          }
        },
        'sani_valve_80': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_80')
            }
          }
        },
        'sani_valve_90': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_valve_90')
            }
          }
        },
        'sani_water_cold': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_water_cold')
            }
          }
        },
        'sani_water_hot': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_water_hot')
            }
          }
        },
        'sani_water_softening_unit': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_water_softening_unit')
            }
          }
        },
        'sani_water_tap': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_water_tap')
            }
          }
        },
        'sani_well_pump': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('sani_well_pump')
            }
          }
        },
        'scene_3d_printer': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_3d_printer')
            }
          }
        },
        'scene_aquarium': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_aquarium')
            }
          }
        },
        'scene_baby': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_baby')
            }
          }
        },
        'scene_baking_oven': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_baking_oven')
            }
          }
        },
        'scene_bath': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_bath')
            }
          }
        },
        'scene_bathroom': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_bathroom')
            }
          }
        },
        'scene_beer': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_beer')
            }
          }
        },
        'scene_birthday': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_birthday')
            }
          }
        },
        'scene_bumper_car': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_bumper_car')
            }
          }
        },
        'scene_cat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cat')
            }
          }
        },
        'scene_childs_room': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_childs_room')
            }
          }
        },
        'scene_cinema': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cinema')
            }
          }
        },
        'scene_cleaning': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cleaning')
            }
          }
        },
        'scene_clothes_dryer': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_clothes_dryer')
            }
          }
        },
        'scene_cockle_stove': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cockle_stove')
            }
          }
        },
        'scene_coffee_maker_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_coffee_maker_automatic')
            }
          }
        },
        'scene_cooking': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cooking')
            }
          }
        },
        'scene_cooking_alternat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cooking_alternat')
            }
          }
        },
        'scene_cooking_hob': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cooking_hob')
            }
          }
        },
        'scene_corridor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_corridor')
            }
          }
        },
        'scene_cubby': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_cubby')
            }
          }
        },
        'scene_day': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_day')
            }
          }
        },
        'scene_deckchair': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_deckchair')
            }
          }
        },
        'scene_dinner': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_dinner')
            }
          }
        },
        'scene_dishwasher': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_dishwasher')
            }
          }
        },
        'scene_dog': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_dog')
            }
          }
        },
        'scene_dressing_room': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_dressing_room')
            }
          }
        },
        'scene_dressing_room_alternat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_dressing_room_alternat')
            }
          }
        },
        'scene_drink': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_drink')
            }
          }
        },
        'scene_drink_hot': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_drink_hot')
            }
          }
        },
        'scene_dump_truck': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_dump_truck')
            }
          }
        },
        'scene_firewood': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_firewood')
            }
          }
        },
        'scene_fitness': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_fitness')
            }
          }
        },
        'scene_fitness_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_fitness_2')
            }
          }
        },
        'scene_flash': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_flash')
            }
          }
        },
        'scene_football': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_football')
            }
          }
        },
        'scene_fountain': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_fountain')
            }
          }
        },
        'scene_fountain_indoor': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_fountain_indoor')
            }
          }
        },
        'scene_freezer': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_freezer')
            }
          }
        },
        'scene_gaming': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_gaming')
            }
          }
        },
        'scene_gaming_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_gaming_2')
            }
          }
        },
        'scene_gaming_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_gaming_3')
            }
          }
        },
        'scene_garden': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_garden')
            }
          }
        },
        'scene_gas_station': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_gas_station')
            }
          }
        },
        'scene_hall': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_hall')
            }
          }
        },
        'scene_hall_alternat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_hall_alternat')
            }
          }
        },
        'scene_horse': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_horse')
            }
          }
        },
        'scene_ironing': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_ironing')
            }
          }
        },
        'scene_jukebox': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_jukebox')
            }
          }
        },
        'scene_keyboard': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_keyboard')
            }
          }
        },
        'scene_kitchen_hood': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_kitchen_hood')
            }
          }
        },
        'scene_kitchen_sink': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_kitchen_sink')
            }
          }
        },
        'scene_laundry_room': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_laundry_room')
            }
          }
        },
        'scene_laundry_room_fem': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_laundry_room_fem')
            }
          }
        },
        'scene_living': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_living')
            }
          }
        },
        'scene_livingroom': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_livingroom')
            }
          }
        },
        'scene_making_love': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_making_love')
            }
          }
        },
        'scene_making_love_clean': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_making_love_clean')
            }
          }
        },
        'scene_massage_jet': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_massage_jet')
            }
          }
        },
        'scene_microwave_oven': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_microwave_oven')
            }
          }
        },
        'scene_minion': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_minion')
            }
          }
        },
        'scene_multicooker': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_multicooker')
            }
          }
        },
        'scene_night': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_night')
            }
          }
        },
        'scene_office': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_office')
            }
          }
        },
        'scene_party': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_party')
            }
          }
        },
        'scene_pet': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_pet')
            }
          }
        },
        'scene_plant': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_plant')
            }
          }
        },
        'scene_pool': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_pool')
            }
          }
        },
        'scene_power_grid': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_power_grid')
            }
          }
        },
        'scene_power_inverter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_power_inverter')
            }
          }
        },
        'scene_princess': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_princess')
            }
          }
        },
        'scene_projector_closed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_projector_closed')
            }
          }
        },
        'scene_projector_closed_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_projector_closed_on_off')
            }
          }
        },
        'scene_projector_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_projector_open')
            }
          }
        },
        'scene_projector_open_on_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_projector_open_on_off')
            }
          }
        },
        'scene_robo_lawnmower': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_lawnmower')
            }
          }
        },
        'scene_robo_lawnmower_active': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_lawnmower_active')
            }
          }
        },
        'scene_robo_lawnmower_attention': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_lawnmower_attention')
            }
          }
        },
        'scene_robo_lawnmower_charging': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_lawnmower_charging')
            }
          }
        },
        'scene_robo_lawnmower_paused': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_lawnmower_paused')
            }
          }
        },
        'scene_robo_vac_cleaner': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_vac_cleaner')
            }
          }
        },
        'scene_robo_vac_cleaner_active': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_vac_cleaner_active')
            }
          }
        },
        'scene_robo_vac_cleaner_attention': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_vac_cleaner_attention')
            }
          }
        },
        'scene_robo_vac_cleaner_charging': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_vac_cleaner_charging')
            }
          }
        },
        'scene_robo_vac_cleaner_paused': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_robo_vac_cleaner_paused')
            }
          }
        },
        'scene_sauna': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sauna')
            }
          }
        },
        'scene_scene': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_scene')
            }
          }
        },
        'scene_scene_teach_in': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_scene_teach_in')
            }
          }
        },
        'scene_shower': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_shower')
            }
          }
        },
        'scene_sleeping': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sleeping')
            }
          }
        },
        'scene_sleeping_alternat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sleeping_alternat')
            }
          }
        },
        'scene_sleeping_twin_0_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sleeping_twin_0_0')
            }
          }
        },
        'scene_sleeping_twin_0_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sleeping_twin_0_1')
            }
          }
        },
        'scene_sleeping_twin_1_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sleeping_twin_1_0')
            }
          }
        },
        'scene_sleeping_twin_1_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_sleeping_twin_1_1')
            }
          }
        },
        'scene_solar_panel': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_solar_panel')
            }
          }
        },
        'scene_stairs': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_stairs')
            }
          }
        },
        'scene_storeroom': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_storeroom')
            }
          }
        },
        'scene_stove': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_stove')
            }
          }
        },
        'scene_stream_course': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_stream_course')
            }
          }
        },
        'scene_summerhouse': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_summerhouse')
            }
          }
        },
        'scene_swimming': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_swimming')
            }
          }
        },
        'scene_teens_room': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_teens_room')
            }
          }
        },
        'scene_terrace': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_terrace')
            }
          }
        },
        'scene_toilet': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_toilet')
            }
          }
        },
        'scene_toilet_alternat': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_toilet_alternat')
            }
          }
        },
        'scene_unicorn': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_unicorn')
            }
          }
        },
        'scene_visit_guests': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_visit_guests')
            }
          }
        },
        'scene_washing_machine': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_washing_machine')
            }
          }
        },
        'scene_waterfall': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_waterfall')
            }
          }
        },
        'scene_wine_cellar': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_wine_cellar')
            }
          }
        },
        'scene_workshop': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_workshop')
            }
          }
        },
        'scene_x-mas': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('scene_x-mas')
            }
          }
        },
        'secur_alarm': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_alarm')
            }
          }
        },
        'secur_alarm_alarm': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_alarm_alarm')
            }
          }
        },
        'secur_alarm_disabled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_alarm_disabled')
            }
          }
        },
        'secur_alarm_enabled': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_alarm_enabled')
            }
          }
        },
        'secur_alarm_test': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_alarm_test')
            }
          }
        },
        'secur_breakage_glass': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_breakage_glass')
            }
          }
        },
        'secur_burglary': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_burglary')
            }
          }
        },
        'secur_encoding': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_encoding')
            }
          }
        },
        'secur_fingerprint_reader': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_fingerprint_reader')
            }
          }
        },
        'secur_frost_protection': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_frost_protection')
            }
          }
        },
        'secur_heat_protection': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_heat_protection')
            }
          }
        },
        'secur_locked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_locked')
            }
          }
        },
        'secur_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_open')
            }
          }
        },
        'secur_sabotage': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_sabotage')
            }
          }
        },
        'secur_smoke_detector': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('secur_smoke_detector')
            }
          }
        },
        'status_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_automatic')
            }
          }
        },
        'status_available': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_available')
            }
          }
        },
        'status_away_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_away_1')
            }
          }
        },
        'status_away_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_away_2')
            }
          }
        },
        'status_child_boy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_child_boy')
            }
          }
        },
        'status_child_girl': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_child_girl')
            }
          }
        },
        'status_comfort': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_comfort')
            }
          }
        },
        'status_economy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_economy')
            }
          }
        },
        'status_frost': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_frost')
            }
          }
        },
        'status_light_high': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_light_high')
            }
          }
        },
        'status_light_low': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_light_low')
            }
          }
        },
        'status_light_max': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_light_max')
            }
          }
        },
        'status_light_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_light_off')
            }
          }
        },
        'status_locked': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_locked')
            }
          }
        },
        'status_man': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_man')
            }
          }
        },
        'status_night': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_night')
            }
          }
        },
        'status_not_available': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_not_available')
            }
          }
        },
        'status_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_open')
            }
          }
        },
        'status_presence_simulation': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_presence_simulation')
            }
          }
        },
        'status_presence_simulation_rec': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_presence_simulation_rec')
            }
          }
        },
        'status_presence_simulation_run': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_presence_simulation_run')
            }
          }
        },
        'status_protection': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_protection')
            }
          }
        },
        'status_standby': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_standby')
            }
          }
        },
        'status_vacation': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_vacation')
            }
          }
        },
        'status_woman': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('status_woman')
            }
          }
        },
        'temp_control': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_control')
            }
          }
        },
        'temp_dew_point': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_dew_point')
            }
          }
        },
        'temp_frost': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_frost')
            }
          }
        },
        'temp_inside': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_inside')
            }
          }
        },
        'temp_outside': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_outside')
            }
          }
        },
        'temp_soil': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_soil')
            }
          }
        },
        'temp_temperature': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_temperature')
            }
          }
        },
        'temp_temperature_max': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_temperature_max')
            }
          }
        },
        'temp_temperature_min': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_temperature_min')
            }
          }
        },
        'temp_windchill': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('temp_windchill')
            }
          }
        },
        'text_exclamation_mark': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('text_exclamation_mark')
            }
          }
        },
        'text_max': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('text_max')
            }
          }
        },
        'text_min': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('text_min')
            }
          }
        },
        'text_na': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('text_na')
            }
          }
        },
        'text_question_mark': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('text_question_mark')
            }
          }
        },
        'time_alarm_clock': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_alarm_clock')
            }
          }
        },
        'time_alarm_clock_alarm_off': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_alarm_clock_alarm_off')
            }
          }
        },
        'time_alarm_clock_alarm_on': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_alarm_clock_alarm_on')
            }
          }
        },
        'time_alarm_clock_snooze': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_alarm_clock_snooze')
            }
          }
        },
        'time_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_automatic')
            }
          }
        },
        'time_calendar': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_calendar')
            }
          }
        },
        'time_clock': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_clock')
            }
          }
        },
        'time_eco_mode': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_eco_mode')
            }
          }
        },
        'time_graph': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_graph')
            }
          }
        },
        'time_manual_mode': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_manual_mode')
            }
          }
        },
        'time_note': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_note')
            }
          }
        },
        'time_sandglass': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_sandglass')
            }
          }
        },
        'time_statistic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_statistic')
            }
          }
        },
        'time_timer': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_timer')
            }
          }
        },
        'time_timer_switch': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('time_timer_switch')
            }
          }
        },
        'user_available': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('user_available')
            }
          }
        },
        'user_away': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('user_away')
            }
          }
        },
        'user_ext_away': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('user_ext_away')
            }
          }
        },
        'user_n_a': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('user_n_a')
            }
          }
        },
        'veh_car_01': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01')
            }
          }
        },
        'veh_car_01_charging': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01_charging')
            }
          }
        },
        'veh_car_01_charging_battery': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01_charging_battery')
            }
          }
        },
        'veh_car_01_charging_battery_100': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01_charging_battery_100')
            }
          }
        },
        'veh_car_01_charging_battery_25': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01_charging_battery_25')
            }
          }
        },
        'veh_car_01_charging_battery_50': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01_charging_battery_50')
            }
          }
        },
        'veh_car_01_charging_battery_75': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_car_01_charging_battery_75')
            }
          }
        },
        'veh_wallbox': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('veh_wallbox')
            }
          }
        },
        'vent_air_filter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_air_filter')
            }
          }
        },
        'vent_air_filter_full': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_air_filter_full')
            }
          }
        },
        'vent_ambient_air': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ambient_air')
            }
          }
        },
        'vent_bypass': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_bypass')
            }
          }
        },
        'vent_bypass_open': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_bypass_open')
            }
          }
        },
        'vent_error': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_error')
            }
          }
        },
        'vent_exhaust_air': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_exhaust_air')
            }
          }
        },
        'vent_humidifier': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_humidifier')
            }
          }
        },
        'vent_low_pressure_protection_unit': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_low_pressure_protection_unit')
            }
          }
        },
        'vent_low_pressure_warning': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_low_pressure_warning')
            }
          }
        },
        'vent_stop': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_stop')
            }
          }
        },
        'vent_supply_air': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_supply_air')
            }
          }
        },
        'vent_used_air': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_used_air')
            }
          }
        },
        'vent_ventilation': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation')
            }
          }
        },
        'vent_ventilation_control': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_control')
            }
          }
        },
        'vent_ventilation_level_0': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_level_0')
            }
          }
        },
        'vent_ventilation_level_1': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_level_1')
            }
          }
        },
        'vent_ventilation_level_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_level_2')
            }
          }
        },
        'vent_ventilation_level_3': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_level_3')
            }
          }
        },
        'vent_ventilation_level_automatic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_level_automatic')
            }
          }
        },
        'vent_ventilation_level_manual_m': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('vent_ventilation_level_manual_m')
            }
          }
        },
        'weather_barometric_pressure': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_barometric_pressure')
            }
          }
        },
        'weather_cloudy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_cloudy')
            }
          }
        },
        'weather_cloudy_heavy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_cloudy_heavy')
            }
          }
        },
        'weather_cloudy_light': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_cloudy_light')
            }
          }
        },
        'weather_directions': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions')
            }
          }
        },
        'weather_directions_n': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_n')
            }
          }
        },
        'weather_directions_no': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_no')
            }
          }
        },
        'weather_directions_nw': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_nw')
            }
          }
        },
        'weather_directions_o': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_o')
            }
          }
        },
        'weather_directions_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_s')
            }
          }
        },
        'weather_directions_so': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_so')
            }
          }
        },
        'weather_directions_sw': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_sw')
            }
          }
        },
        'weather_directions_w': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_directions_w')
            }
          }
        },
        'weather_fog': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_fog')
            }
          }
        },
        'weather_fog_heavy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_fog_heavy')
            }
          }
        },
        'weather_frost': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_frost')
            }
          }
        },
        'weather_humidity': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_humidity')
            }
          }
        },
        'weather_humidity_abs': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_humidity_abs')
            }
          }
        },
        'weather_humidity_rel': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_humidity_rel')
            }
          }
        },
        'weather_humidity_soil': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_humidity_soil')
            }
          }
        },
        'weather_light_meter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_light_meter')
            }
          }
        },
        'weather_moon_phases_1_new': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_1_new')
            }
          }
        },
        'weather_moon_phases_2': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_2')
            }
          }
        },
        'weather_moon_phases_3_half': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_3_half')
            }
          }
        },
        'weather_moon_phases_4': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_4')
            }
          }
        },
        'weather_moon_phases_5_full': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_5_full')
            }
          }
        },
        'weather_moon_phases_6': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_6')
            }
          }
        },
        'weather_moon_phases_7_half': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_7_half')
            }
          }
        },
        'weather_moon_phases_8': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moon_phases_8')
            }
          }
        },
        'weather_moonrise': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moonrise')
            }
          }
        },
        'weather_moonset': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_moonset')
            }
          }
        },
        'weather_night_cloudy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_night_cloudy')
            }
          }
        },
        'weather_night_fog': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_night_fog')
            }
          }
        },
        'weather_night_starry': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_night_starry')
            }
          }
        },
        'weather_pollen': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_pollen')
            }
          }
        },
        'weather_rain': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_rain')
            }
          }
        },
        'weather_rain_gauge': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_rain_gauge')
            }
          }
        },
        'weather_rain_heavy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_rain_heavy')
            }
          }
        },
        'weather_rain_light': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_rain_light')
            }
          }
        },
        'weather_rain_meter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_rain_meter')
            }
          }
        },
        'weather_sleet': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_sleet')
            }
          }
        },
        'weather_snow': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_snow')
            }
          }
        },
        'weather_snow_heavy': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_snow_heavy')
            }
          }
        },
        'weather_snow_ice_warning': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_snow_ice_warning')
            }
          }
        },
        'weather_snow_light': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_snow_light')
            }
          }
        },
        'weather_station': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_station')
            }
          }
        },
        'weather_station_generic': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_station_generic')
            }
          }
        },
        'weather_station_quadra': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_station_quadra')
            }
          }
        },
        'weather_storm': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_storm')
            }
          }
        },
        'weather_summer': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_summer')
            }
          }
        },
        'weather_sun': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_sun')
            }
          }
        },
        'weather_sunrise': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_sunrise')
            }
          }
        },
        'weather_sunset': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_sunset')
            }
          }
        },
        'weather_thunderstorm': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_thunderstorm')
            }
          }
        },
        'weather_wind': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind')
            }
          }
        },
        'weather_wind_directions_e': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_e')
            }
          }
        },
        'weather_wind_directions_n': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_n')
            }
          }
        },
        'weather_wind_directions_ne': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_ne')
            }
          }
        },
        'weather_wind_directions_nw': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_nw')
            }
          }
        },
        'weather_wind_directions_s': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_s')
            }
          }
        },
        'weather_wind_directions_se': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_se')
            }
          }
        },
        'weather_wind_directions_sw': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_sw')
            }
          }
        },
        'weather_wind_directions_w': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_directions_w')
            }
          }
        },
        'weather_wind_no_wind': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_no_wind')
            }
          }
        },
        'weather_wind_speed': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_speed')
            }
          }
        },
        'weather_wind_speed_bft': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_speed_bft')
            }
          }
        },
        'weather_wind_speed_ms': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_wind_speed_ms')
            }
          }
        },
        'weather_winter': {
          '*': {
            'white': '*/white',
            'ws': '*/white',
            'antimony': '*/blue',
            'boron': '*/green',
            'lithium': '*/red',
            'potassium': '*/purple',
            'sodium': '*/orange',
            '*': {
              '*': cv.util.IconTools.svgKUF('weather_winter')
            }
          }
        }

        // Do not remove this line: Dynamic Icons End
      }
    }
  });
  cv.IconConfig.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IconConfig.js.map?dt=1702815244154