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
Install libxml2, libxslt development files and plantuml (e.g. `apt-get install libxml2-dev libxslt-dev plantuml python-pip`)
Install required python3 packages specified in .doc/docutils/requirements.txt
`pip install -r .doc/requirements`
Note: pip install sh must be installed as root `sudo pip install sh`
(and python if it is not installed on your system)
 
generate doc with: 
```
sphinx-build -b html doc/manual/de/rst/ doc/manual/de/html
```

Translation
-----------
```
# update po files
pygettext -d cv -p locale/ .doc/docutils/directives/*.py
# translate with poedit + save
```

TODOs
-----

TODO: improve element description retrieval from XSD, possibility to extend
TODO: transfer content from wiki
TODO: establish structure for manual (done for widgets)
TODO: cleanup, doc

Optional
--------

 * auto-generate english widget descriptions from jsdoc
