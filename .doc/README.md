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
Install required python3 packages specified in .doc/docutils/requirements.txt
(and python3 if it is not installed on your system)
 
generate doc with: 
```
sphinx-build -b html doc/manual/de/rst/ doc/manual/de/html
```