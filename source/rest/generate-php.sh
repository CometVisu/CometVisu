#!/bin/bash

npx openapi-generator generate -i ./openapi.yaml -g php-slim -o ./cv

# delete generated model as we do not use it
rm -r ./cv/lib/Model
