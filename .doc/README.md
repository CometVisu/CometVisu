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