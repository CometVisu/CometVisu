
/**
 * Font definitions
 *
 */
qx.Theme.define("cv.theme.dark.Font",
{
  extend : qx.theme.simple.Font,

  fonts : {
    "default" :
    {
      size : 13,
      family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    },

    "bold" :
      {
        size : 13,
        family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"],
        bold: true
      },

    "subtext" :
    {
      size : 12,
      family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    },
    
    "title" :
    {
      size : 18,
      bold : true,
      family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    }
  }
});