/* __init__.js
 *
 * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
