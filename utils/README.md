Setup documentation build system
--------------------------------

Source docs
-----------
Install required system packages
```
apt-get install nodejs-legacy imagemagick 
```

Install required packages
```
npm install jsdoc libxmljs-mt libxml-xsd easyimage
```

generate doc with
```
grunt apt-doc
```

User Manual
-----------
Install some required packages (`apt-get install virtualenv libxml2-dev libxslt-dev python-dev plantuml python-pip`)
Create virtualenv `virtualenv --python=python3 --system-site-packages .env`
Activate `source .env/bin/activate`
Install required python packages specified in utils/docutils/requirements.txt with
`pip install -r utils/requirements`
 
generate doc with: 
```
sphinx-build -b html doc/manual/de/rst/ out/docs/de/manual/
```

Translation
-----------
```
# update po files
pygettext -d messages -p locale/ utils/docutils/directives/*.py
# translate with poedit + save
```

TODOs
-----

TODO: complete colaboration pages
TODO: move python part to virtualenv + setuptools, assist as much as possible
        - python-auto-setup (clone, set remotes, 
TODO: improve element description retrieval from XSD, possibility to extend
TODO: transfer content from wiki
TODO: establish structure for manual (done for widgets)
TODO: cleanup, doc, todos
TODO: add since or changelog to widget pages

FIXME: wrong design (pure) in some screenshots, when build on travis


Optional
--------

 * auto-generate english widget descriptions from jsdoc
