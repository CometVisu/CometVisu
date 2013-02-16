PROJECT = "CometVisu"
BUILD_DIR = build
TARGET_DIR = release
JS_ENGINE ?= `which node nodejs 2>/dev/null`
LINT = ${JS_ENGINE} ${BUILD_DIR}/jslint.js

VERSION = `cat VERSION`
YUIDOCPATH = /home/cm/devel/yuidoc

SRC = visu/designs/structure_pure.js

STRUCTURE_PURE = visu/structure/pure
STRUCTURE_PURE_SRC = \
  ${STRUCTURE_PURE}/_common.js\
  ${STRUCTURE_PURE}/break.js\
  ${STRUCTURE_PURE}/group.js\
  ${STRUCTURE_PURE}/web.js\
  ${STRUCTURE_PURE}/image.js\
  ${STRUCTURE_PURE}/imagetrigger.js\
  ${STRUCTURE_PURE}/include.js\
  ${STRUCTURE_PURE}/info.js\
  ${STRUCTURE_PURE}/infotrigger.js\
  ${STRUCTURE_PURE}/line.js\
  ${STRUCTURE_PURE}/multitrigger.js\
  ${STRUCTURE_PURE}/page.js\
  ${STRUCTURE_PURE}/slide.js\
  ${STRUCTURE_PURE}/switch.js\
  ${STRUCTURE_PURE}/text.js\
  ${STRUCTURE_PURE}/toggle.js\
  ${STRUCTURE_PURE}/trigger.js\
  ${STRUCTURE_PURE}/unknown.js\
  ${STRUCTURE_PURE}/video.js

docs:
	${YUIDOCPATH}/bin/yuidoc.py visu/lib visu/designs -p docs/parser -o docs -t build/template\
         -v ${VERSION} -C "The CometVisu developers (please consult the <a href=\"../AUTHORS\">AUTHORS</a> file)" --showprivate -m ${PROJECT}\
	 -u "http://cometvisu.org/"

lint:
	${LINT} ${SRC}

release: 
	cp -rfp visu release
	find release -path "*/.svn" -exec rm -rf {} +

release/designs/structure_pure.js: release $(STRUCTURE_PURE_SRC)
	cat $(STRUCTURE_PURE_SRC) > release/designs/structure_pure.js
	cp visu/index.html release/index.html
	cp visu/edit_config.html release/edit_config.html
	for SRC_FILE in $^; do                                                                                       \
		SRC2_FILE=`echo $$SRC_FILE | sed 's_visu/__'`;                                                       \
		sed "s#.*<script src=\"$$SRC2_FILE\" type=\"text/javascript\"></script>.*##" -i release/index.html;  \
	done
	sed 's#<!-- Load the widgets: start -->#<script src="designs/structure_pure.js" type="text/javascript"></script>#' -i release/index.html
	sed 's#<!-- Load the widgets: start -->#<script src="designs/structure_pure.js" type="text/javascript"></script>#' -i release/edit_config.html
	
build: release/designs/structure_pure.js
	
clean:
	rm -rf release

.PHONY: lint docs build
