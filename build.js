({
  //optimize: 'none', // only for debug
  baseUrl: './',
  appDir: 'src/',  // relative to baseUrl
  dir: 'release/',
  mainConfigFile: 'src/lib/templateengine.js',
 
  // config options to handle required CSS files:
  separateCSS: true,
  paths: {
    'css-builder': '../../../_support/css-builder',
    'normalize': '../../../_support/normalize'
  },
 
  modules: [ 
    // the main application
    { name: 'lib/templateengine', include: ['css'] },
    // optimize the plugins
    { name: 'plugins/calendarlist/structure_plugin',   exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/clock/structure_plugin',          exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/colorchooser/structure_plugin',   exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/diagram/structure_plugin',        exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/gauge/structure_plugin',          exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/rss/structure_plugin',            exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/rsslog/structure_plugin',         exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/strftime/structure_plugin',       exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/svg/structure_plugin',            exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/timeout/structure_plugin',        exclude: ['structure_custom', 'css', 'normalize']  },
    { name: 'plugins/upnpcontroller/structure_plugin', exclude: ['structure_custom', 'css', 'normalize']  }
  ]
})
