#!/bin/bash

npx openapi-generator generate -i ./openapi.yaml -g php-slim -o ./manager

# delete generated model as we do not use it
rm -r ./manager/lib/Model
