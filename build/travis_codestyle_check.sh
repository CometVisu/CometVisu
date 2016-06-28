#!/bin/bash
set -ev

# Test for lines starting with a tabulator
# The use of tabulators is violating the coding style. Please use spaces instead 
! grep -rnaP '^\t' --include='*.js' --exclude-dir=dependencies --exclude-dir='dep' src/
