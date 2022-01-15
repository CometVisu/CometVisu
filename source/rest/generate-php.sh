#!/bin/bash

npx openapi-generator-cli generate -i ./openapi.yaml -g php-slim-deprecated -o ./manager

# delete generated model as we do not use it
rm -r ./manager/lib/Model
