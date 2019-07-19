const path = require('path');

const resourcesDir = path.resolve(path.join(__dirname, '..', '..', 'resource'));
const configDir = path.join(resourcesDir, 'config');
const trashFolderName = '.trash';

module.exports = {
  resourcesDir: resourcesDir,
  configDir: configDir,
  designsDir: path.join(resourcesDir, 'designs'),
  trashFolderName: trashFolderName,
  trashFolder: path.join(configDir, trashFolderName),
  backupFolder: path.join(configDir, 'backup'),
  backupOnChange: [/visu_config.*\.xml/],
  mounts: [
    {
      mountPoint: 'demo',
      path: path.join(resourcesDir, 'demo'),
      showSubDirs: false,
      writeable: false
    }
  ],
  addressFiles: {
    addresses: [
      path.join(configDir, 'media', 'eibga.conf'),
      '/etc/wiregate/eibga.conf'
    ],
    mainGroups: [
      path.join(configDir, 'media', 'eibga_hg.conf'),
      '/etc/wiregate/eibga_hg.conf'
    ],
    middleGroups: [
      path.join(configDir, 'media', 'eibga_mg.conf'),
      '/etc/wiregate/eibga_mg.conf'
    ]
  },
  onewire: {
    sensors: [
      path.join(configDir, 'media', 'owsensors.conf'),
      '/etc/wiregate/owsensors.conf'
    ],
    rrdDir: '/var/www/rrd/'
  }
}