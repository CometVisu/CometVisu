#!/usr/bin/env python

import json


def merge(meta_json, json_file, copy=True):
    with open(json_file) as fs:
        map = json.loads(fs.read())
        inv_map = {v: k for k, v in map.iteritems()}
    new_mapping = {}
    with open(meta_json, 'r+') as fm:
        meta = json.loads(fm.read())
        for key, value in meta['mapping'].items():
            if key[0:3] == "uni":
                hex = key[3:].lower()
                if hex in inv_map:
                    new_mapping[inv_map[hex]] = value
                else:
                    new_mapping[key] = value
            else:
                new_mapping[key] = value

        meta['mapping'] = new_mapping
        if copy is True:
            with open('test.meta', 'w') as f:
                f.write(json.dumps(meta))
        else:
            fm.truncate()
            fm.seek(0)
            fm.write(json.dumps(meta))


if __name__ == '__main__':
    merge(
        './external/qx-iconfont-material/source/resource/iconfont/material/MaterialIcons-Regular.meta',
        './external/qx-iconfont-material/source/resource/iconfont/material/MaterialIcons-Regular.json',
        False
    )