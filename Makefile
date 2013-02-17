PROJECT = "CometVisu"
BUILD_DIR = build
TARGET_DIR = release
JS_ENGINE ?= `which node nodejs 2>/dev/null`
LINT = ${JS_ENGINE} ${BUILD_DIR}/jslint.js

VERSION = $(shell cat VERSION)
YUIDOCPATH = /home/cm/devel/yuidoc

SRC = src/designs/structure_pure.js

STRUCTURE_PURE_SRC = $(shell cat src/index.html | grep ScriptsToInclude.push | sed 's_ScriptsToInclude.push( "\(.*\)" );_src/\1_')
TIMESTAMP := $(shell date +%Y%m%d-%H%M%S)

all: docs build

docs:
	${YUIDOCPATH}/bin/yuidoc.py src/lib src/designs -p docs/parser -o docs -t build/template\
         -v ${VERSION} -C "The CometVisu developers (please consult the <a href=\"../AUTHORS\">AUTHORS</a> file)" --showprivate -m ${PROJECT}\
	 -u "http://cometvisu.org/"

lint:
	${LINT} ${SRC}

release: 
	cp -rfp src/* release
	find release -path "*/.svn" -exec rm -rf {} +

release/structure/pure.$(TIMESTAMP).js: release $(STRUCTURE_PURE_SRC)
	cat src/dependencies/jquery.js src/lib/compatibility.js $(STRUCTURE_PURE_SRC) | \
	  yui-compressor --type js > release/structure/pure.$(TIMESTAMP).js
	cat src/cometvisu.appcache | \
	  sed 's/# Version.*/# Version $(VERSION):$(TIMESTAMP)/' | \
	  sed 's%# structure_pure.*%structure/pure.$(TIMESTAMP).js%' \
	  > release/cometvisu.appcache
	cat src/index.html | \
	  egrep -v "jquery.js|compatibility.js|make scripts debugable|ScriptsToInclude" | \
	  sed 's%<script type="text/javascript">%<script src="structure/pure.$(TIMESTAMP).js" type="text/javascript">%' \
	  > release/index.html
	
build: release/structure/pure.$(TIMESTAMP).js
	
	
clean:
	rm -rf release

.PHONY: lint docs build clean release
