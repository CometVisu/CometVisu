<?php
/* config.php
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

namespace OpenAPIServer;

$resourcesDir = realpath(getcwd() . "/../../resource/");
$configDir = realpath($resourcesDir . "/config");
$trashFolderName = ".trash";
$backupFolderName = "backup";

return (object) [
    "resourcesDir" => $resourcesDir,
    "configDir" => $configDir,
    "designsDir" => realpath($resourcesDir . "/designs"),
    "trashFolderName" => $trashFolderName,
    "trashFolder" => realpath($configDir . "/" . $trashFolderName),
    "backupFolderName" => $backupFolderName,
    "backupFolder" => realpath($configDir . "/" . $backupFolderName),
    "backupOnChange" => ["/visu_config(?!_previewtemp).*\.xml/"],
    "mounts" => [
        [
            "mountPoint" => "demo",
            "path" => realpath($resourcesDir . "/demo"),
            "showSubDirs" => true,
            "writeable" => false,
        ],
        [
            // mounting this file allows copying it to the config folder, so that the manager can create a default file if it is missing
            "mountPoint" => "resource/custom_visu_config.xsd",
            "path" => realpath($resourcesDir . "/custom_visu_config.xsd"),
            "showSubDirs" => false,
            "writeable" => false,
            "visible" => false,
        ],
    ],
    "addressFiles" => [
        "addresses" => [
            realpath($configDir . "/media/eibga.conf"),
            "/etc/wiregate/eibga.conf",
        ],
        "mainGroups" => [
            realpath($configDir . "/media/eibga_hg.conf"),
            "/etc/wiregate/eibga_hg.conf",
        ],
        "middleGroups" => [
            realpath($configDir . "/media/eibga_mg.conf"),
            "/etc/wiregate/eibga_mg.conf",
        ],
    ],
    "onewire" => [
        "sensors" => [
            realpath($configDir . "/media/owsensors.conf"),
            "/etc/wiregate/owsensors.conf",
        ],
        "rrdDir" => "/var/www/rrd/",
    ],
];
