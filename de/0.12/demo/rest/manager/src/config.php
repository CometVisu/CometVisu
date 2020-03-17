<?php
namespace OpenAPIServer;

$resourcesDir = realpath(getcwd() . '/../../resource/');
$configDir = realpath($resourcesDir .  '/config');
$trashFolderName = '.trash';
$backupFolderName = 'backup';

return (object) array(
  'resourcesDir' => $resourcesDir,
  'configDir' => $configDir,
  'designsDir' => realpath($resourcesDir .'/designs'),
  'trashFolderName' => $trashFolderName,
  'trashFolder' => realpath($configDir .'/' . $trashFolderName),
  'backupFolderName' => $backupFolderName,
  'backupFolder' => realpath($configDir . '/' . $backupFolderName),
  'backupOnChange' => ['/visu_config.*\.xml/'],
  'mounts' => [
    [
      'mountPoint' => 'demo',
      'path' => realpath($resourcesDir . '/demo'),
      'showSubDirs' => false,
      'writeable' => false
    ]
  ],
  'addressFiles' => [
    'addresses' => [
      realpath($configDir . '/media/eibga.conf'),
      '/etc/wiregate/eibga.conf'
    ],
    'mainGroups' => [
      realpath($configDir . '/media/eibga_hg.conf'),
      '/etc/wiregate/eibga_hg.conf'
    ],
    'middleGroups' => [
      realpath($configDir . '/media/eibga_mg.conf'),
      '/etc/wiregate/eibga_mg.conf'
    ]
  ],
  'onewire' => [
    'sensors' => [
      realpath($configDir . '/media/owsensors.conf'),
      '/etc/wiregate/owsensors.conf'
    ],
    'rrdDir' => '/var/www/rrd/'
  ]
);
