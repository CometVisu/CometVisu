



/**
 * <h3> CometVisu Plugin system </h3>
 *
 * The CometVisu can load plugins in two different ways.
 *
 * <h4>1. As part of the main code repository</h4>
 * These plugins are split into the main plugin source code, which is placed
 * in "source/class/cv/plugins" and the optional other data needed by the plugin to run. like
 * CSS-files, images, other libraries. Those files are placed in the resources subfolder
 * "source/resources/plugins/<name-of-the-plugin>/"
 *
 * This is the preferred way to go if you want to add your plugin to the main repository later.
 *
 * <h4>2. As external file</h4>
 * You can place a javascript source code file in "source/resources/plugins/my-plugin/index.js"
 * and load it by adding <code><plugin name="my-plugin"/></code> to your config file.
 *
 *
 */
