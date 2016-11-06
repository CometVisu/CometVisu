# Makefile for Sphinx documentation
#

.PHONY: help
help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  html       to make standalone HTML files"

.PHONY: html
html:
	../../../cv doc -l de --target out/preview/de
	@echo
	@echo "Build finished. The HTML pages are in $(BUILDDIR)/html."