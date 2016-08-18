Setup documentation build system
--------------------------------

Source docs
-----------
Install required packages
```
npm install jsdoc
npm install libxmljs-mt
npm install libxml-xsd
```

generate doc with
```
grunt apt-doc
```

User Manual
-----------
Install libxml2 + libxslt development files (e.g. `apt-get install libxml2-dev libxslt-dev`)
Install required python3 packages specified in .doc/docutils/requirements.txt
(and python3 if it is not installed on your system)
 
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

TODO: possibility to map attribute names to links
TODO: improve element description retrieval from XSD, possibility to extend
TODO: widget description page scaffolding + (include TODOs for those pages)
TODO: transfer content from wiki
TODO: establish structure for manual
TODO: python command line tool for:

 * generating rst -> html -> screenshots
 * scaffolding
 * syntax check for examples

TODO: cleanup, doc, travis integration

Optional
--------

 * auto-generate english widget descriptions from jsdoc