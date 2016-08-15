Setup build environment for documentation
-----------------------------------------

**Prerequisites**
```
sudo apt-get install git npm nodejs-legacy imagemagick
npm install
sudo npm install -g grunt-cli

```
Download + install chrome browser (or chromium)

**node-gyp**
requires python (v2.7), make and gcc,make sure those are installed
```
npm install node-gyp
```

**install documentation requirements**
```
npm install libxml-xsd easyimage jsdoc
```
create the cache/ dir if it does not exist
```
mkdir cache
```
 update/install the selenium chromedriver
```
./node_modules/protractor/bin/webdriver-manager update --standalone --chrome
```
 
**Generate the source code documentation**
Generate HTML pages + screenshots
```
grunt api-doc
```

Generate HTML pages
```
grunt jsdoc:html
```

generate screenshots
```
grunt screenshots
```

