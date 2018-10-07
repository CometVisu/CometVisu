#!/usr/bin/env python
import glob
import json
import os
import shutil
import sys
import time
try:
    import urllib.request as request
except:
    import urllib as request
import xml.etree.ElementTree as ET
import re
import platform
from datetime import datetime
import locale
from zipfile import ZipFile
from argparse import ArgumentParser
try:
    input = raw_input
except NameError:
    pass

locale.setlocale(locale.LC_ALL, '')

NIGHTLY_PATH = 'https://dl.bintray.com/cometvisu/CometVisu/'
RELEASE_PATH = 'https://api.github.com/repos/CometVisu/CometVisu/releases/latest'
date_format = '%Y-%m-%dT%H:%M:%SZ'

sep_width = 70

kernel = platform.uname()[2]
if "wiregate" in kernel:
    print('This script does not work on wiregate systems!')
    print('Downloading date from HTTPS sites is broken on the current wiregate systems.')
    sys.exit(1)


def get_latest_nightly():
    response = request.urlopen(NIGHTLY_PATH)
    html = ET.fromstring(response.read())
    response.close()
    newest = {'date': 0, 'name': '', 'version': ''}
    for node in html.findall('.//body/pre/a'):
        match = re.search('^CometVisu-([0-9\.]+(-dev)?)-([0-9]+)\.zip$', node.text)
        if match is not None:
            date = datetime.strptime(match.group(3), '%Y%m%d%H%M%S')
            name = match.group(0)
            version = match.group(1)
            if newest['date'] == 0 or newest['date'] < date:
                newest = {'date': date, 'name': name, 'version': version, 'url': '%s%s' % (NIGHTLY_PATH, name)}
    newest['type'] = 'nightly'
    return newest


def get_latest_release():
    response = request.urlopen(RELEASE_PATH)
    data = json.loads(response.read())
    response.close()
    release = {
        'date': datetime.strptime(data['published_at'], date_format),
        'name': data['name'],
        'version': data['tag_name'],
        'type': 'release'
    }
    for asset in data['assets']:
        if asset['content_type'] == 'application/zip':
            release['url'] = asset['browser_download_url']
            release['name'] = asset['name']

    return release


def get_installed_version(current_dir):
    res = {
        'version': '',
        'type': '',
        'date': None
    }
    if not os.path.exists(os.path.join(current_dir, 'version')):
        return None
    with open(os.path.join(current_dir, 'version')) as f:
        res['version'] = f.read()
    if os.path.exists(os.path.join(current_dir, 'NIGHTLY')):
        with open(os.path.join(current_dir, 'NIGHTLY')) as f:
            res['date'] = datetime.strptime(f.read(), date_format)
            res['type'] = 'nightly'
    else:
        res['type'] = 'nightly' if res['version'][-4:] == '-dev' else 'release'
    return res


def has_resource_folder(version):
    match = re.search('^v?([0-9]+)\.([0-9]+)\.([0-9]+)(-dev)?$', version)
    return int(match.group(1)) > 0 or int(match.group(2)) >= 11


def install_version(cv, current, current_dir):
    # 1. Download + extract in temp dir
    tmp_dir = 'tmp'
    if not os.path.exists(tmp_dir):
        os.makedirs(tmp_dir)

    # TODO: define source and target dirs from versions (>0.11 use resource folder, <=0.10 no resource folder)

    tmp_file = os.path.join('download.zip')
    print()
    print('-' * sep_width)
    print('>>> Downloading %s to %s' % (cv['url'], tmp_file))
    if os.path.exists(tmp_file):
        os.remove(tmp_file)

    with open(tmp_file, 'wb') as f:
        response = request.urlopen(cv['url'])
        data = response.read() # a `bytes` object
        response.close()
        f.write(data)

    print('-' * sep_width)
    # create tempdir
    new_cv_dir = os.path.join('tmp', 'cometvisu', 'release')
    with ZipFile(tmp_file, 'r') as zip:
        files = [n for n in zip.namelist()
                 if n.startswith('cometvisu/release/') and not n.endswith('/')]
        zip.extractall('tmp', members=files)

    # create a timestamp file if the new version is a nightly build (used to compare fpr newer ones)
    if cv['type'] == 'nightly':
        with open(os.path.join(new_cv_dir, 'NIGHTLY'), 'w') as f:
            f.write(cv['date'].strftime(date_format))

    # 2.1 copy config from old visu
    if current is not None:
        target_has_resource = has_resource_folder(cv['version'])
        source_config_dir = os.path.join(current_dir, 'resource', 'config') if has_resource_folder(current['version']) else os.path.join(current_dir, 'config')
        target_config_dir = os.path.join(new_cv_dir, 'resource', 'config') if target_has_resource else os.path.join(new_cv_dir, 'config')
        print()
        print('-' * sep_width)
        print('>>> Copying customizable files from old installation')
        if os.path.exists(source_config_dir):
            shutil.rmtree(target_config_dir)
            print(' - copying %s to %s' % (source_config_dir, target_config_dir))
            shutil.copytree(source_config_dir, target_config_dir)
        else:
            print('existing config directory not found')
            return

        # 2.2 copy design customs from old visu
        for file in glob.glob(os.path.join(current_dir, '**', 'designs', '*', 'custom.css')):
            match = re.search('.+%sdesigns%s(.+)%scustom\.css$' % (os.path.sep, os.path.sep, os.path.sep), file)
            dest_dir = os.path.join(new_cv_dir, 'resource', 'designs', match.group(1)) if target_has_resource else os.path.join(new_cv_dir, 'designs', match.group(1))
            print(' - copying %s to %s' % (file, dest_dir))
            shutil.copy(file, dest_dir)
        print('-' * sep_width)

        # 3. move old visu to backup
        print()
        print('-' * sep_width)
        print('>>> Replacing old installation')
        backup_dir = os.path.join('cv-backup-%s' % time.time())
        print(' - backup old installation to %s' % backup_dir)
        shutil.move(current_dir, backup_dir)

    # 4. move new visu to old position
    print(' - move new installation to %s' % current_dir)
    for f in os.listdir(new_cv_dir):
        shutil.move(os.path.join(new_cv_dir, f), current_dir)
    print('-' * sep_width)

    print('')
    print('>>> DONE. CometVisu version %s has been installed into %s!' % (cv['version'], current_dir))


if __name__ == '__main__':
    parser = ArgumentParser(usage="%(prog)s [OPTIONS] [CURRENT]\nCometVisu update/install script updates your local installation to the latest release or nightly build.")
    parser.add_argument('current', type=str, help='path to your current CometVisu installation', nargs='?')
    parser.add_argument('--force', '-f', dest="force", action='store_true', help="show options even if we're up-to-date")

    options, unknown = parser.parse_known_args()
    if options.current is None:
        print('you have to specify a path to your current CometVisu installation')
        parser.print_help()
    else:
        current = None
        if not os.path.exists(options.current):
            print('no CometVisu found in path: %s' % options.current)
            res = str(input('should I create the directory (Y/n):'))
            if res.lower() in ['y', 'yes', '']:
                os.makedirs(options.current)
            else:
                sys.exit(0)
        else:
            if not os.path.exists(os.path.join(options.current, 'version')):
                print('%s does not seem to be a valid CometVisu installation. Proceed to install the CometVisu in this folder.' % options.current)
                res = str(input('Proceed (Y/n):'))
                if res.lower() not in ['y', 'yes', '']:
                    sys.exit(0)
            else:
                current = get_installed_version(options.current)
        try:
            nightly = get_latest_nightly()
            release = get_latest_release()
        except IOError as e:
            print('An error occured while checking the latest CometVisu versions:\n%s\n\nPlease check your systems internet connection.' % str(e))
            sys.exit(1)

        print('No\t\t\t\t\tVersion\t\tDate')
        print('-' * sep_width)
        if current is None:
            print('0:\tCurrently installed version:\tNone')
        else:
            print('0:\tCurrently installed version:\t{:}\t{:}'.format(
                current['version'],
                '{:%x %X}'.format(current['date']) if current['date'] is not None else '')
            )
        print('1:\tLatest nightly build:\t\t{:}\t{:%x %X}'.format(nightly['version'], nightly['date']))
        print('2:\tLatest release:\t\t\t{:}\t\t{:%x %X}'.format(release['version'], release['date']))

        if current is not None:
            if current['type'] == 'nightly' and current['date'] is None or current['date'] == nightly['date']:
                print('')
                msg = '* You are up to date: the latest available nightly build is installed on your system! *'
                print('*' * len(msg))
                print(msg)
                if options.force is False:
                    print('* If you want to dowgrade to a release version run this script with --force parameter *')
                print('*' * len(msg))
                if options.force is False:
                    sys.exit(0)

        # check if the current version is upgradable and let the user decide which version to use
        print('\nPlease choose which CometVisu version should be installed:')
        action_string = ''
        available = ['0', '1']
        if current is not None and current['type'] == 'nightly':
            action_string = '0 - do nothing\n1 - downgrade to latest release [%s]' % release['version']
            if current['date'] is None or current['date'] > nightly['date']:
                action_string += '\n2 - latest nightly build [%s]' % nightly['version']
                available.append('2')
        else:
            action_string = '0 - do nothing\n1 - latest release [%s]\n2 - latest nightly build [%s]' % (release['version'], nightly['version'])
            available.append('2')

        action_string += '\nPlease enter number: '
        action = str(input(action_string))
        if action not in available:
            print('unknown option: %s' % action)
        elif action == "1":
            install_version(release, current, options.current)
        elif action == "2":
            install_version(nightly, current, options.current)
        elif action == "0":
            pass
        else:
            print('unknown option: %s' % type(action))